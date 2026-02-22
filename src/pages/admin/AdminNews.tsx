import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, Trash2, X, Save, Loader2, Star } from 'lucide-react'

type NewsItem = {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  image_url: string | null
  author: string
  published_at: string
  is_featured: boolean
  created_at: string
}

const CATEGORIES = ['Scholarships', 'Visa Updates', 'Applications', 'Student Life', 'Announcements']

const emptyForm = {
  title: '',
  slug: '',
  category: 'Announcements',
  excerpt: '',
  content: '',
  image_url: '',
  author: '',
  published_at: new Date().toISOString().slice(0, 16),
  is_featured: false,
}

function toSlug(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const categoryColors: Record<string, string> = {
  'Scholarships': 'bg-blue-400/20 text-blue-400',
  'Visa Updates': 'bg-green-400/20 text-green-400',
  'Applications': 'bg-purple-400/20 text-purple-400',
  'Student Life': 'bg-orange-400/20 text-orange-400',
  'Announcements': 'bg-yellow-400/20 text-yellow-400',
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchNews() }, [])

  async function fetchNews() {
    setLoading(true)
    const { data } = await supabase.from('news').select('*').order('published_at', { ascending: false })
    setNews(data || [])
    setLoading(false)
  }

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  function openEdit(n: NewsItem) {
    setEditing(n)
    setForm({
      title: n.title,
      slug: n.slug,
      category: n.category,
      excerpt: n.excerpt,
      content: n.content,
      image_url: n.image_url || '',
      author: n.author,
      published_at: new Date(n.published_at).toISOString().slice(0, 16),
      is_featured: n.is_featured,
    })
    setError('')
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.title.trim() || !form.excerpt.trim() || !form.content.trim() || !form.author.trim()) {
      setError('Title, excerpt, content, and author are required.')
      return
    }
    setSaving(true)
    setError('')
    const now = new Date().toISOString()
    const payload = {
      ...form,
      slug: form.slug || toSlug(form.title),
      image_url: form.image_url || null,
      published_at: new Date(form.published_at).toISOString(),
      updated_at: now,
    }
    let err
    if (editing) {
      const { error: e } = await supabase.from('news').update(payload).eq('id', editing.id)
      err = e
    } else {
      const { error: e } = await supabase.from('news').insert([{ ...payload, created_at: now }])
      err = e
    }
    if (err) { setError(err.message); setSaving(false); return }
    setSaving(false)
    setShowModal(false)
    fetchNews()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this article?')) return
    setDeletingId(id)
    await supabase.from('news').delete().eq('id', id)
    setDeletingId(null)
    setNews(prev => prev.filter(n => n.id !== id))
  }

  async function toggleFeatured(item: NewsItem) {
    setTogglingId(item.id)
    await supabase.from('news').update({ is_featured: !item.is_featured }).eq('id', item.id)
    setNews(prev => prev.map(n => n.id === item.id ? { ...n, is_featured: !n.is_featured } : n))
    setTogglingId(null)
  }

  const inputCls = "w-full h-9 px-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  )

  const featuredCount = news.filter(n => n.is_featured).length

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">News</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {news.length} articles · <span className="text-yellow-400">{featuredCount} featured</span> on homepage
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
          <Plus className="w-4 h-4" /><span className="hidden sm:inline">Add Article</span><span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="mb-4 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg flex items-start gap-2">
        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-yellow-300">
          Star an article to feature it in <strong>Latest News</strong> on the homepage. The 3 most recent featured articles will show there.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase w-12">★</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Author</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Published</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map(n => (
                  <tr key={n.id} className={`border-b border-gray-800 hover:bg-gray-800/50 transition-colors ${n.is_featured ? 'bg-yellow-400/5' : ''}`}>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleFeatured(n)} disabled={togglingId === n.id} title={n.is_featured ? 'Remove from homepage' : 'Feature on homepage'}
                        className={`p-1.5 rounded-lg transition-colors ${n.is_featured ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400 hover:bg-gray-700'}`}>
                        {togglingId === n.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className={`w-4 h-4 ${n.is_featured ? 'fill-yellow-400' : ''}`} />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-white font-medium max-w-xs truncate">{n.title}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${categoryColors[n.category] || 'bg-gray-700 text-gray-300'}`}>{n.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{n.author}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {new Date(n.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(n)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(n.id)} disabled={deletingId === n.id} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                          {deletingId === n.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-800">
            {news.map(n => (
              <div key={n.id} className={`p-4 ${n.is_featured ? 'bg-yellow-400/5' : ''}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.author} · {new Date(n.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-xs rounded-full font-semibold flex-shrink-0 ${categoryColors[n.category] || 'bg-gray-700 text-gray-300'}`}>{n.category}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => toggleFeatured(n)} disabled={togglingId === n.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${n.is_featured ? 'bg-yellow-400/20 text-yellow-400' : 'bg-gray-800 text-gray-400 hover:text-yellow-400'}`}>
                    <Star className={`w-3.5 h-3.5 ${n.is_featured ? 'fill-yellow-400' : ''}`} />
                    {n.is_featured ? 'Featured' : 'Feature'}
                  </button>
                  <button onClick={() => openEdit(n)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 text-gray-400 hover:text-white transition-colors">
                    <Pencil className="w-3.5 h-3.5" />Edit
                  </button>
                  <button onClick={() => handleDelete(n.id)} disabled={deletingId === n.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-800 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl my-4 sm:my-8">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h2 className="text-base font-bold text-white">{editing ? 'Edit Article' : 'Add Article'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 space-y-4">
              {error && <div className="p-3 bg-red-900/40 border border-red-800 rounded-lg text-sm text-red-300">{error}</div>}

              <F label="Title">
                <input className={inputCls} value={form.title} onChange={e => {
                  const title = e.target.value
                  setForm(f => ({ ...f, title, slug: toSlug(title) }))
                }} placeholder="Article title..." />
              </F>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Slug (auto)">
                  <input className={inputCls} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} />
                </F>
                <F label="Category">
                  <select className={inputCls + " appearance-none cursor-pointer"} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </F>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <F label="Author">
                  <input className={inputCls} value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} placeholder="Author name" />
                </F>
                <F label="Publish Date">
                  <input type="datetime-local" className={inputCls} value={form.published_at} onChange={e => setForm(f => ({ ...f, published_at: e.target.value }))} />
                </F>
              </div>

              <F label="Image URL (optional)">
                <input className={inputCls} value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
              </F>

              {/* Featured toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2">
                  <Star className={`w-4 h-4 ${form.is_featured ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />
                  <div>
                    <p className="text-sm font-semibold text-white">Feature on Homepage</p>
                    <p className="text-xs text-gray-400">Shows in Latest News section</p>
                  </div>
                </div>
                <button type="button" onClick={() => setForm(f => ({ ...f, is_featured: !f.is_featured }))}
                  className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${form.is_featured ? 'bg-yellow-400' : 'bg-gray-600'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${form.is_featured ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>

              <F label="Excerpt">
                <textarea className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none" rows={3} value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary shown in listings..." />
              </F>

              <F label="Full Content">
                <textarea className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none" rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full article content..." />
              </F>
            </div>

            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}