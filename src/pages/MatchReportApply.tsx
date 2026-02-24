// src/pages/MatchReportApply.tsx
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Upload, X, CheckCircle2, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const STRIPE_PRICE_ID = import.meta.env.VITE_STRIPE_MATCH_REPORT_PRICE_ID

type FormData = {
  // Step 1 - Contact
  full_name: string
  email: string
  // Step 2 - Background
  degree_type: string
  subject_area: string
  current_country: string
  current_institution: string
  gpa: string
  grading_scale: string
  // Step 3 - Preferences
  target_degree: string
  preferred_subjects: string[]
  preferred_language: string
  semester_preference: string
  additional_notes: string
  // Files
  transcript: File | null
  cv: File | null
}

const subjectAreas = [
  'Agriculture', 'Arts', 'Biochemistry', 'Biology', 'Business', 'Chemistry',
  'Communication', 'Computer Science', 'Economics', 'Education', 'Engineering',
  'Environmental Science', 'Food and Beverage', 'Health', 'Literature',
  'Mathematics', 'Medicine', 'Philosophy', 'Physics', 'Psychology', 'Social Science',
]

const steps = ['Your Details', 'Academic Background', 'Study Preferences']

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              i < current
                ? 'bg-accent text-white'
                : i === current
                ? 'bg-accent text-white ring-4 ring-accent/20'
                : 'bg-card border-2 border-border text-foreground/40'
            }`}
          >
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-0.5 w-8 transition-all ${i < current ? 'bg-accent' : 'bg-border'}`} />
          )}
        </div>
      ))}
      <span className="ml-2 text-sm text-foreground/50 font-medium">
        Step {current + 1} of {total}
      </span>
    </div>
  )
}

function FileUpload({
  label,
  hint,
  file,
  onChange,
}: {
  label: string
  hint: string
  file: File | null
  onChange: (f: File | null) => void
}) {
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <p className="text-xs text-foreground/50 mb-3">{hint}</p>
      {file ? (
        <div className="flex items-center gap-3 bg-accent/5 border border-accent/20 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-sm text-foreground flex-1 truncate">{file.name}</span>
          <button onClick={() => onChange(null)} className="text-foreground/40 hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-accent/40 hover:bg-accent/5 transition-all group"
        >
          <Upload className="w-6 h-6 text-foreground/30 group-hover:text-accent mx-auto mb-2 transition-colors" />
          <p className="text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors">
            Click to upload
          </p>
          <p className="text-xs text-foreground/30 mt-1">PDF, JPG, PNG up to 10MB</p>
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={e => onChange(e.target.files?.[0] || null)}
      />
    </div>
  )
}

export default function MatchReportApply() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<FormData>({
    full_name: '',
    email: '',
    degree_type: '',
    subject_area: '',
    current_country: '',
    current_institution: '',
    gpa: '',
    grading_scale: '',
    target_degree: '',
    preferred_subjects: [],
    preferred_language: '',
    semester_preference: '',
    additional_notes: '',
    transcript: null,
    cv: null,
  })

  function set(key: keyof FormData, value: unknown) {
    setForm(f => ({ ...f, [key]: value }))
  }

  function toggleSubject(subject: string) {
    const list = form.preferred_subjects
    set(
      'preferred_subjects',
      list.includes(subject) ? list.filter(s => s !== subject) : [...list, subject]
    )
  }

  function canProceed() {
    if (step === 0) return form.full_name.trim() && form.email.trim()
    if (step === 1) return form.degree_type && form.subject_area && form.current_country
    if (step === 2) return form.target_degree && form.preferred_language
    return true
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    try {
      // Upload files if provided
      let transcript_path: string | undefined
      let cv_path: string | undefined

      if (form.transcript) {
        const ext = form.transcript.name.split('.').pop()
        const path = `${Date.now()}-transcript.${ext}`
        const { error: upErr } = await supabase.storage
          .from('match-reports')
          .upload(path, form.transcript)
        if (upErr) throw new Error('Failed to upload transcript: ' + upErr.message)
        transcript_path = path
      }

      if (form.cv) {
        const ext = form.cv.name.split('.').pop()
        const path = `${Date.now()}-cv.${ext}`
        const { error: upErr } = await supabase.storage
          .from('match-reports')
          .upload(path, form.cv)
        if (upErr) throw new Error('Failed to upload CV: ' + upErr.message)
        cv_path = path
      }

      // Insert request record
      const { data: inserted, error: dbErr } = await supabase
        .from('match_report_requests')
        .insert([{
          full_name: form.full_name,
          email: form.email,
          degree_type: form.degree_type,
          subject_area: form.subject_area,
          current_country: form.current_country,
          current_institution: form.current_institution || null,
          gpa: form.gpa ? parseFloat(form.gpa) : null,
          grading_scale: form.grading_scale || null,
          target_degree: form.target_degree,
          preferred_subjects: form.preferred_subjects,
          preferred_language: form.preferred_language,
          semester_preference: form.semester_preference || null,
          additional_notes: form.additional_notes || null,
          transcript_path: transcript_path || null,
          cv_path: cv_path || null,
          payment_status: 'pending',
          status: 'new',
        }])
        .select()
        .single()

      if (dbErr) throw new Error('Failed to save request: ' + dbErr.message)

      // Stripe checkout
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const { error: stripeErr } = await stripe.redirectToCheckout({
        lineItems: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
        mode: 'payment',
        customerEmail: form.email,
        successUrl: `${window.location.origin}/match-report/success?request_id=${inserted.id}`,
        cancelUrl: `${window.location.origin}/match-report/cancelled`,
        clientReferenceId: inserted.id,
      })

      if (stripeErr) throw new Error(stripeErr.message)
    } catch (err) {
      setError((err as Error).message)
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-accent transition-colors'
  const labelClass = 'block text-sm font-semibold text-foreground mb-2'
  const selectClass = `${inputClass} cursor-pointer`

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">Get Your Match Report</h1>
          <p className="text-foreground/50 text-sm">
            Complete the form below and proceed to payment. Your report will be delivered
            within 3–5 business days.
          </p>
        </div>

        <StepIndicator current={step} total={steps.length} />

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground mb-6">{steps[step]}</h2>

          <AnimatePresence mode="wait">
            {/* Step 0 - Contact */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Amara Osei"
                    value={form.full_name}
                    onChange={e => set('full_name', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => set('email', e.target.value)}
                  />
                  <p className="text-xs text-foreground/40 mt-2">
                    Your report will be delivered to this email address.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 1 - Background */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <label className={labelClass}>Current / Completed Degree *</label>
                  <select
                    className={selectClass}
                    value={form.degree_type}
                    onChange={e => set('degree_type', e.target.value)}
                  >
                    <option value="">Select degree type</option>
                    <option value="High School / A-Levels">High School / A-Levels</option>
                    <option value="Foundation / Preparatory">Foundation / Preparatory</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Field of Study *</label>
                  <select
                    className={selectClass}
                    value={form.subject_area}
                    onChange={e => set('subject_area', e.target.value)}
                  >
                    <option value="">Select your field</option>
                    {subjectAreas.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Country of Study *</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Nigeria, India, Morocco"
                    value={form.current_country}
                    onChange={e => set('current_country', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClass}>Institution Name</label>
                  <input
                    className={inputClass}
                    placeholder="University name (optional)"
                    value={form.current_institution}
                    onChange={e => set('current_institution', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>GPA / Grade</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. 3.5 / 75 / 2.1"
                      value={form.gpa}
                      onChange={e => set('gpa', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Grading Scale</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. 4.0, 0-100, 1-10"
                      value={form.grading_scale}
                      onChange={e => set('grading_scale', e.target.value)}
                    />
                  </div>
                </div>
                <FileUpload
                  label="Upload Transcript"
                  hint="Optional but strongly recommended for accurate matching."
                  file={form.transcript}
                  onChange={f => set('transcript', f)}
                />
                <FileUpload
                  label="Upload CV / Resume"
                  hint="Optional. Helps for programmes requiring relevant work experience."
                  file={form.cv}
                  onChange={f => set('cv', f)}
                />
              </motion.div>
            )}

            {/* Step 2 - Preferences */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <label className={labelClass}>Target Degree in Germany *</label>
                  <select
                    className={selectClass}
                    value={form.target_degree}
                    onChange={e => set('target_degree', e.target.value)}
                  >
                    <option value="">Select target degree</option>
                    <option value="Preparatory">Preparatory Course (Studienkolleg)</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Master">Master's Degree</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Subject Areas</label>
                  <p className="text-xs text-foreground/40 mb-3">Select all that interest you.</p>
                  <div className="flex flex-wrap gap-2">
                    {subjectAreas.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSubject(s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                          form.preferred_subjects.includes(s)
                            ? 'bg-accent text-white border-accent'
                            : 'bg-card text-foreground/70 border-border hover:border-accent/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Language of Instruction *</label>
                  <select
                    className={selectClass}
                    value={form.preferred_language}
                    onChange={e => set('preferred_language', e.target.value)}
                  >
                    <option value="">Select language preference</option>
                    <option value="English">English only</option>
                    <option value="German">German only</option>
                    <option value="Both">Either — show both</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Intake</label>
                  <select
                    className={selectClass}
                    value={form.semester_preference}
                    onChange={e => set('semester_preference', e.target.value)}
                  >
                    <option value="">No preference</option>
                    <option value="Summer">Summer Semester (April)</option>
                    <option value="Winter">Winter Semester (October)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Anything else we should know?</label>
                  <textarea
                    className={`${inputClass} resize-none h-28`}
                    placeholder="Specific universities, cities, requirements, career goals..."
                    value={form.additional_notes}
                    onChange={e => set('additional_notes', e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="mt-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-foreground disabled:opacity-0 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="flex items-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Pay €29 & Submit
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-foreground/30 mt-4">
          Secured by Stripe · Your data is encrypted · Cancel anytime before payment
        </p>
      </div>
    </div>
  )
}