// src/pages/admin/AdminMatchReports.tsx
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Loader2, ChevronDown, Download, Mail, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

type Request = {
  id: string
  created_at: string
  full_name: string
  email: string
  degree_type: string
  subject_area: string
  target_degree: string
  preferred_language: string
  current_country: string
  gpa: number | null
  grading_scale: string | null
  preferred_subjects: string[]
  semester_preference: string | null
  additional_notes: string | null
  transcript_path: string | null
  cv_path: string | null
  payment_status: string
  amount_paid: number | null
  status: string
  admin_notes: string | null
  delivered_at: string | null
  stripe_session_id: string | null
}

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
}

const PAYMENT_STYLES: Record<string, string> = {
  pending: 'bg-foreground/5 text-foreground/40',
  paid: 'bg-green-500/10 text-green-400',
  failed: 'bg-red-500/10 text-red-400',
}

function StatusBadge({ status, payment }: { status: string; payment: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLES[status] || 'bg-foreground/5 text-foreground/40 border-transparent'}`}>
        {status.replace('_', ' ')}
      </span>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${PAYMENT_STYLES[payment] || ''}`}>
        {payment}
      </span>
    </div>
  )
}

function RequestRow({ req, onUpdate }: { req: Request; onUpdate: () => void }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState(req.status)
  const [notes, setNotes] = useState(req.admin_notes || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save() {
    setSaving(true)
    await supabase
      .from('match_report_requests')
      .update({
        status,
        admin_notes: notes,
        delivered_at: status === 'delivered' ? new Date().toISOString() : req.delivered_at,
      })
      .eq('id', req.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onUpdate()
  }

  async function getSignedUrl(path: string) {
    const { data } = await supabase.storage
      .from('match-reports')
      .createSignedUrl(path, 60 * 5)
    if (data?.signedUrl) window.open(data.signedUrl, '_blank')
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 hover:bg-card/60 transition-colors text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{req.full_name}</p>
            <p className="text-xs text-foreground/40 truncate">{req.email}</p>
          </div>
          <div className="hidden sm:block text-xs text-foreground/50">
            {req.target_degree} · {req.subject_area}
          </div>
          <StatusBadge status={req.status} payment={req.payment_status} />
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <span className="text-xs text-foreground/30">
            {new Date(req.created_at).toLocaleDateString()}
          </span>
          <ChevronDown className={`w-4 h-4 text-foreground/30 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-border p-5 bg-card/30 space-y-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Country', value: req.current_country },
              { label: 'Current Degree', value: req.degree_type },
              { label: 'GPA', value: req.gpa ? `${req.gpa} (${req.grading_scale || '?'})` : '—' },
              { label: 'Target Degree', value: req.target_degree },
              { label: 'Language Pref.', value: req.preferred_language },
              { label: 'Semester', value: req.semester_preference || 'No preference' },
            ].map(item => (
              <div key={item.label}>
                <p className="text-xs text-foreground/40 mb-1">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          {req.preferred_subjects?.length > 0 && (
            <div>
              <p className="text-xs text-foreground/40 mb-2">Preferred Subjects</p>
              <div className="flex flex-wrap gap-2">
                {req.preferred_subjects.map(s => (
                  <span key={s} className="text-xs bg-accent/10 text-accent px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          {req.additional_notes && (
            <div>
              <p className="text-xs text-foreground/40 mb-2">Notes from applicant</p>
              <p className="text-sm text-foreground/70 bg-background/50 border border-border rounded-xl px-4 py-3 leading-relaxed">
                {req.additional_notes}
              </p>
            </div>
          )}

          {(req.transcript_path || req.cv_path) && (
            <div className="flex flex-wrap gap-3">
              {req.transcript_path && (
                <button
                  onClick={() => getSignedUrl(req.transcript_path!)}
                  className="flex items-center gap-2 text-xs font-semibold bg-card border border-border px-3 py-2 rounded-lg hover:border-accent/40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Transcript
                </button>
              )}
              {req.cv_path && (
                <button
                  onClick={() => getSignedUrl(req.cv_path!)}
                  className="flex items-center gap-2 text-xs font-semibold bg-card border border-border px-3 py-2 rounded-lg hover:border-accent/40 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </button>
              )}
            </div>
          )}

          <div className="border-t border-border pt-5 space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="text-xs text-foreground/40 block mb-2">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs text-foreground/40 block mb-2">Admin Notes</label>
                <input
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Internal notes..."
                  className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 bg-accent text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
              <a
                href={`mailto:${req.email}?subject=Your Studymetaverse Match Report&body=Hi ${req.full_name.split(' ')[0]},%0D%0A%0D%0AYour Match Report is ready.%0D%0A%0D%0ABest regards,%0D%0AStudymetaverse Team`}
                className="flex items-center gap-2 bg-card border border-border text-foreground font-semibold text-sm px-4 py-2 rounded-lg hover:border-accent/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Applicant
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminMatchReports() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'delivered'>('all')

  async function load() {
    const { data } = await supabase
      .from('match_report_requests')
      .select('*')
      .order('created_at', { ascending: false })
    setRequests(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)

  const counts = {
    all: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    delivered: requests.filter(r => r.status === 'delivered').length,
  }

  // FIX: removed unused paidCount variable
  const revenue = requests
    .filter(r => r.payment_status === 'paid')
    .reduce((sum, r) => sum + (r.amount_paid || 2900), 0) / 100

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground">Match Report Requests</h1>
          <p className="text-foreground/50 text-sm mt-1">Manage and fulfil student requests</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { icon: AlertCircle, label: 'New', value: counts.new, color: 'text-blue-400' },
          { icon: Clock, label: 'In Progress', value: counts.in_progress, color: 'text-yellow-400' },
          { icon: CheckCircle2, label: 'Delivered', value: counts.delivered, color: 'text-green-400' },
          { icon: Mail, label: 'Revenue', value: `€${revenue.toFixed(0)}`, color: 'text-accent' },
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-foreground/50">{stat.label}</span>
            </div>
            <p className="text-2xl font-black text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        {(['all', 'new', 'in_progress', 'delivered'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === f
                ? 'bg-accent text-white'
                : 'bg-card border border-border text-foreground/60 hover:text-foreground'
            }`}
          >
            {f.replace('_', ' ')}
            <span className="ml-1.5 opacity-60">({counts[f]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-foreground/30" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-foreground/30">
          <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No requests yet</p>
          <p className="text-sm mt-1">Requests will appear here after students pay.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(req => (
            <RequestRow key={req.id} req={req} onUpdate={load} />
          ))}
        </div>
      )}
    </div>
  )
}