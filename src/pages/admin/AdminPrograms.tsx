import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Pencil, Trash2, X, Save, Loader2 } from 'lucide-react'

type University = { id: string; name: string; city: string }
type SubjectArea = { id: string; name: string }
type Program = {
  id: string
  university_id: string
  title: string
  degree_type: string
  subject_area_id: string
  study_mode: string
  language_of_instruction: string
  std_period_semesters: number
  start_semester: string
  program_details: string
  nc_status: string
  ects_required: number
  tuition_fee: boolean
  moi_letter_accepted: string | null
  motiv_required: string | null
  test_required: string | null
  interview: string | null
  modul_required: string | null
  prep_course_type: string | null
  universities?: { name: string; city: string }
  subject_areas?: { name: string }
}

const emptyForm = {
  university_id: '',
  title: '',
  degree_type: 'Master',
  subject_area_id: '',
  study_mode: 'Full-time',
  language_of_instruction: 'English',
  std_period_semesters: 4,
  start_semester: 'Winter',
  program_details: '',
  nc_status: 'non-restricted (ohne NC)',
  ects_required: 180,
  tuition_fee: false,
  moi_letter_accepted: 'Accepted',
  motiv_required: 'No',
  test_required: 'No',
  interview: 'No',
  modul_required: 'No',
  prep_course_type: '',
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [universities, setUniversities] = useState<University[]>([])
  const [subjects, setSubjects] = useState<SubjectArea[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Program | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchAll() }, [])

  async function fetchAll() {
    setLoading(true)
    const [{ data: progs }, { data: unis }, { data: subs }] = await Promise.all([
      supabase.from('programs').select('*, universities(name, city), subject_areas(name)').order('created_at', { ascending: false }),
      supabase.from('universities').select('id, name, city').order('name'),
      supabase.from('subject_areas').select('id, name').order('name'),
    ])
    setPrograms(progs || [])
    setUniversities(unis || [])
    setSubjects(subs || [])
    setLoading(false)
  }

  function openAdd() {
    setEditing(null)
    setForm({ ...emptyForm, university_id: universities[0]?.id || '', subject_area_id: subjects[0]?.id || '' })
    setError('')
    setShowModal(true)
  }

  function openEdit(p: Program) {
    setEditing(p)
    setForm({
      university_id: p.university_id,
      title: p.title,
      degree_type: p.degree_type,
      subject_area_id: p.subject_area_id,
      study_mode: p.study_mode,
      language_of_instruction: p.language_of_instruction,
      std_period_semesters: p.std_period_semesters,
      start_semester: p.start_semester,
      program_details: p.program_details || '',
      nc_status: p.nc_status,
      ects_required: p.ects_required,
      tuition_fee: p.tuition_fee,
      moi_letter_accepted: p.moi_letter_accepted || 'Accepted',
      motiv_required: p.motiv_required || 'No',
      test_required: p.test_required || 'No',
      interview: p.interview || 'No',
      modul_required: p.modul_required || 'No',
      prep_course_type: p.prep_course_type || '',
    })
    setError('')
    setShowModal(true)
  }

  async function handleSave() {
    if (!form.title.trim() || !form.university_id || !form.subject_area_id) {
      setError('Title, university, and subject area are required.')
      return
    }
    setSaving(true)
    setError('')
    const payload = {
      ...form,
      prep_course_type: form.prep_course_type || null,
      updated_at: new Date().toISOString(),
    }
    let err
    if (editing) {
      const { error: e } = await supabase.from('programs').update(payload).eq('id', editing.id)
      err = e
    } else {
      const { error: e } = await supabase.from('programs').insert([{ ...payload, created_at: new Date().toISOString() }])
      err = e
    }
    if (err) { setError(err.message); setSaving(false); return }
    setSaving(false)
    setShowModal(false)
    fetchAll()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this program? This cannot be undone.')) return
    setDeletingId(id)
    await supabase.from('programs').delete().eq('id', id)
    setDeletingId(null)
    setPrograms(prev => prev.filter(p => p.id !== id))
  }

  const F = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  )

  const inputCls = "w-full h-9 px-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
  const selectCls = inputCls + " appearance-none cursor-pointer"

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Programs</h1>
          <p className="text-gray-400 mt-1">{programs.length} programs total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Program
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">University</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Degree</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Language</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Semester</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(p => (
                <tr key={p.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 text-sm text-white font-medium max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{p.universities?.name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full font-semibold">{p.degree_type}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-300">{p.language_of_instruction}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{p.start_semester}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors">
                        {deletingId === p.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-3xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit Program' : 'Add Program'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {error && <div className="md:col-span-2 p-3 bg-red-900/40 border border-red-800 rounded-lg text-sm text-red-300">{error}</div>}

              <div className="md:col-span-2">
                <F label="Program Title">
                  <input className={inputCls} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Computer Science (M.Sc.)" />
                </F>
              </div>

              <F label="University">
                <select className={selectCls} value={form.university_id} onChange={e => setForm(f => ({ ...f, university_id: e.target.value }))}>
                  <option value="">Select university...</option>
                  {universities.map(u => <option key={u.id} value={u.id}>{u.name} — {u.city}</option>)}
                </select>
              </F>

              <F label="Subject Area">
                <select className={selectCls} value={form.subject_area_id} onChange={e => setForm(f => ({ ...f, subject_area_id: e.target.value }))}>
                  <option value="">Select subject...</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </F>

              <F label="Degree Type">
                <select className={selectCls} value={form.degree_type} onChange={e => setForm(f => ({ ...f, degree_type: e.target.value }))}>
                  {['Bachelor', 'Master', 'Preparatory'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Language of Instruction">
                <select className={selectCls} value={form.language_of_instruction} onChange={e => setForm(f => ({ ...f, language_of_instruction: e.target.value }))}>
                  {['English', 'German', 'German & English'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Study Mode">
                <select className={selectCls} value={form.study_mode} onChange={e => setForm(f => ({ ...f, study_mode: e.target.value }))}>
                  {['Full-time', 'Hybrid', 'Online'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Starting Semester">
                <select className={selectCls} value={form.start_semester} onChange={e => setForm(f => ({ ...f, start_semester: e.target.value }))}>
                  {['Winter', 'Summer', 'Winter/Summer'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Duration (Semesters)">
                <input type="number" className={inputCls} value={form.std_period_semesters} min={1} max={12} onChange={e => setForm(f => ({ ...f, std_period_semesters: parseInt(e.target.value) || 4 }))} />
              </F>

              <F label="ECTS Required">
                <input type="number" className={inputCls} value={form.ects_required} min={0} onChange={e => setForm(f => ({ ...f, ects_required: parseInt(e.target.value) || 0 }))} />
              </F>

              <F label="Admission Type">
                <select className={selectCls} value={form.nc_status} onChange={e => setForm(f => ({ ...f, nc_status: e.target.value }))}>
                  <option value="non-restricted (ohne NC)">Non-restricted (ohne NC)</option>
                  <option value="restricted (NC)">Restricted (NC)</option>
                </select>
              </F>

              <F label="Tuition Fee">
                <select className={selectCls} value={form.tuition_fee ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, tuition_fee: e.target.value === 'true' }))}>
                  <option value="false">No Tuition</option>
                  <option value="true">Tuition Required</option>
                </select>
              </F>

              <F label="MOI Letter">
                <select className={selectCls} value={form.moi_letter_accepted || ''} onChange={e => setForm(f => ({ ...f, moi_letter_accepted: e.target.value }))}>
                  {['Accepted', 'Not Accepted'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Motivation Letter">
                <select className={selectCls} value={form.motiv_required || ''} onChange={e => setForm(f => ({ ...f, motiv_required: e.target.value }))}>
                  {['No', 'Yes', 'Varied'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Entrance Test">
                <select className={selectCls} value={form.test_required || ''} onChange={e => setForm(f => ({ ...f, test_required: e.target.value }))}>
                  {['No', 'Yes', 'Varied'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Interview">
                <select className={selectCls} value={form.interview || ''} onChange={e => setForm(f => ({ ...f, interview: e.target.value }))}>
                  {['No', 'Yes', 'Varied'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Module Handbook">
                <select className={selectCls} value={form.modul_required || ''} onChange={e => setForm(f => ({ ...f, modul_required: e.target.value }))}>
                  {['No', 'Yes'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </F>

              <F label="Prep Course Type (optional)">
                <input className={inputCls} value={form.prep_course_type || ''} onChange={e => setForm(f => ({ ...f, prep_course_type: e.target.value }))} placeholder="e.g. Studienkolleg" />
              </F>

              <div className="md:col-span-2">
                <F label="Program Description">
                  <textarea className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none" rows={5} value={form.program_details} onChange={e => setForm(f => ({ ...f, program_details: e.target.value }))} placeholder="Detailed description of the program..." />
                </F>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Program'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
