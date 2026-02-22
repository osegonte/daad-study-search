import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Trash2, Loader2, Tag } from 'lucide-react'

type SubjectArea = { id: string; name: string; created_at: string }

export default function AdminSubjectAreas() {
  const [subjects, setSubjects] = useState<SubjectArea[]>([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchSubjects() }, [])

  async function fetchSubjects() {
    setLoading(true)
    const { data } = await supabase.from('subject_areas').select('*').order('name')
    setSubjects(data || [])
    setLoading(false)
  }

  async function handleAdd() {
    if (!newName.trim()) return
    setAdding(true)
    setError('')
    const { error: e } = await supabase.from('subject_areas').insert([{ name: newName.trim(), created_at: new Date().toISOString() }])
    if (e) { setError(e.message); setAdding(false); return }
    setNewName('')
    setAdding(false)
    fetchSubjects()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this subject area? Programs using it will lose their subject.')) return
    setDeletingId(id)
    await supabase.from('subject_areas').delete().eq('id', id)
    setDeletingId(null)
    setSubjects(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Subject Areas</h1>
        <p className="text-gray-400 mt-1">{subjects.length} subject areas total</p>
      </div>

      {/* Add form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Add New Subject Area</h2>
        {error && <div className="mb-3 p-3 bg-red-900/40 border border-red-800 rounded-lg text-sm text-red-300">{error}</div>}
        <div className="flex gap-3">
          <input
            className="flex-1 h-9 px-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            placeholder="e.g. Data Science"
          />
          <button
            onClick={handleAdd}
            disabled={adding || !newName.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-800">
            {subjects.map(s => (
              <div key={s.id} className="flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 text-accent" />
                  <span className="text-sm text-white font-medium">{s.name}</span>
                </div>
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={deletingId === s.id}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {deletingId === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
