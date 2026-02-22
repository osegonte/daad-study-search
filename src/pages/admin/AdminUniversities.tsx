import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, Trash2, X, Save, Loader2, ExternalLink } from 'lucide-react'

type University = {
  id: string
  name: string
  city: string
  type: string
  website_url: string | null
  description: string | null
  created_at: string
}

const emptyForm = {
  name: '',
  city: '',
  type: 'Public',
  website_url: '',
  description: '',
}

export default function AdminUniversities() {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<University | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchUniversities() }, [])

  async function fetchUniversities() {
    setLoading(true)
    const { data } = await supabase.from('universities').select('*').order('name')
    setUniversities(data || [])
    setLoading(false)
  }

  function openAdd() {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setShowModal(true)
  }

  function openEdit(u: University) {
    setEditing(u)
    setForm({
      name: u.name,
      city: u.city,
      type: u.type,
      website_url: u.website_url || '',
      description: u.description || '',
    })
    setError('')
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.name.trim() || !form.city.trim()) {
      setError('Name and city are required.')
      return
    }
    setSaving(true)
    setError('')
    const payload = { ...form, website_url: form.website_url || null, description: form.description || null }
    let err
    if (editing) {
      const { error: e } = await supabase.from('universities').update(payload).eq('id', editing.id)
      err = e
    } else {
      const { error: e } = await supabase.from('universities').insert([{ ...payload, created_at: new Date().toISOString() }])
      err = e
    }
    if (err) { setError(err.message); setSaving(false); return }
    setSaving(false)
    setShowModal(false)
    fetchUniversities()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this university? Any programs linked to it will break.')) return
    setDeletingId(id)
    await supabase.from('universities').delete().eq('id', id)
    setDeletingId(null)
    setUniversities(prev => prev.filter(u => u.id !== id))
  }

  const inputCls = "w-full h-9 px-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Universities</h1>
          <p className="text-gray-400 mt-1">{universities.length} universities total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add University
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">City</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Website</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {universities.map(u => (
                <tr key={u.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-white font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{u.city}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full font-semibold ${u.type === 'Public' ? 'bg-blue-400/20 text-blue-400' : 'bg-purple-400/20 text-purple-400'}`}>{u.type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {u.website_url ? (
                      <a href={u.website_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : <span className="text-gray-600">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(u)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(u.id)} disabled={deletingId === u.id} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                        {deletingId === u.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit University' : 'Add University'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-900/40 border border-red-800 rounded-lg text-sm text-red-300">{error}</div>}
              <F label="University Name">
                <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Technical University of Munich" />
              </F>
              <div className="grid grid-cols-2 gap-4">
                <F label="City">
                  <input className={inputCls} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Munich" />
                </F>
                <F label="Type">
                  <select className={inputCls + " appearance-none cursor-pointer"} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                  </select>
                </F>
              </div>
              <F label="Website URL">
                <input className={inputCls} value={form.website_url} onChange={e => setForm(f => ({ ...f, website_url: e.target.value }))} placeholder="https://www.tum.de" />
              </F>
              <F label="Description">
                <textarea className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of the university..." />
              </F>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save University'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
