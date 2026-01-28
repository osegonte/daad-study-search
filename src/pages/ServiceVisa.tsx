import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Plane, CheckCircle2, Send, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function ServiceVisa() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const { error: dbError } = await supabase
        .from('service_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service_type: 'Study Visa Application',
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])

      if (dbError) throw dbError

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const services = [
    'Visa Application Assessment',
    'VIDEX Form Completion Assistance',
    'Document Checklist & Preparation',
    'Appointment Booking Guidance',
    'Motivation Letter for Visa',
    'CV Tailored for Visa Requirements',
    'Financial Documentation Review',
    'Blocked Account Setup Guidance',
    'Embassy Interview Preparation',
    'Application Tracking & Follow-up'
  ]

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Service Information */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <Plane className="w-8 h-8 text-accent" />
                </div>

                <h1 className="text-4xl font-bold text-primary mb-4">
                  Study Visa Application Support
                </h1>

                <p className="text-xl text-muted-foreground mb-8">
                  Navigate the German student visa process with confidence and expert guidance
                </p>

                <div className="prose prose-lg max-w-none text-foreground/80 mb-12">
                  <p>
                    Securing a German student visa can be complex and time-consuming, with strict requirements 
                    and lengthy processing times. A single mistake in your application can lead to delays or rejection.
                  </p>
                  <p>
                    Our visa specialists understand every step of the process, from gathering the right documents 
                    to filling out the VIDEX form correctly. We've helped thousands of students successfully obtain 
                    their visas, and we know exactly what German embassies and consulates are looking for.
                  </p>
                  <p>
                    We'll guide you through each requirement, help you prepare perfect documentation, and ensure 
                    your application is complete and error-free before submission.
                  </p>
                </div>

                {/* What's Included */}
                <div className="bg-card border border-border rounded-xl p-8 mb-8">
                  <h2 className="text-2xl font-semibold text-primary mb-6">
                    What's Included
                  </h2>

                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Typical Timeline
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    The visa process typically takes 8-12 weeks from start to finish. We'll help you plan ahead 
                    and avoid common delays.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Week 1-2: Document preparation</li>
                    <li>• Week 3-4: Application submission</li>
                    <li>• Week 5-10: Embassy processing</li>
                    <li>• Week 11-12: Visa collection</li>
                  </ul>
                </div>

                {/* Pricing */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Service Pricing
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive visa support packages starting from €299. Submit the form for a detailed quote.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Document Review Only: €99</li>
                    <li>• Standard Package: €299</li>
                    <li>• Premium Package (includes interview prep): €449</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Contact Form - Sticky */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-xl p-6 sticky top-32"
              >
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Request Submitted!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Our visa specialists will contact you within 24 hours to discuss your application.
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="text-accent font-semibold hover:underline"
                    >
                      Back to Home
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      Start Your Visa Application
                    </h3>

                    {error && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-primary mb-2">
                          Your Current Situation *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                          placeholder="Where are you applying from? Have you received admission? When do you plan to travel?"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-12 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Submit Request</span>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center text-muted-foreground">
                        We'll respond within 24 hours
                      </p>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}