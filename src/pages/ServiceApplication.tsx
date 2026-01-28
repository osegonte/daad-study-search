import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FileText, CheckCircle2, Send, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function ServiceApplication() {
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
            service_type: 'Be a Better Applicant',
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
    'Motivation Letter Writing & Review',
    'CV/Resume Optimization',
    'Statement of Purpose Guidance',
    'Application Document Proofreading',
    'Portfolio Preparation (for creative fields)',
    'Letter of Recommendation Guidance',
    'Application Timeline Planning',
    'Document Translation Assistance'
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
                  <FileText className="w-8 h-8 text-accent" />
                </div>

                <h1 className="text-4xl font-bold text-primary mb-4">
                  Be a Better Applicant
                </h1>

                <p className="text-xl text-muted-foreground mb-8">
                  Professional guidance to strengthen your application and increase your chances of admission
                </p>

                <div className="prose prose-lg max-w-none text-foreground/80 mb-12">
                  <p>
                    Applying to German universities requires more than just meeting the minimum requirements. 
                    Your application documents tell your story and demonstrate why you're the perfect fit for your chosen programme.
                  </p>
                  <p>
                    Our expert advisors have helped thousands of international students craft compelling applications 
                    that stand out. We provide personalized guidance on every aspect of your application, from your 
                    motivation letter to your CV, ensuring you present yourself in the best possible light.
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

                {/* Pricing */}
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Investment in Your Future
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Package pricing starts from €199. Submit the form and we'll send you detailed pricing 
                    information based on your specific needs.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Single Document Review: €49-99</li>
                    <li>• Complete Application Package: €199-349</li>
                    <li>• Multiple Applications: Custom pricing</li>
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
                      We'll get back to you within 24 hours with more information about our services.
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
                      Request More Information
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
                          Tell us about your needs *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                          placeholder="Which documents do you need help with? What programmes are you applying to?"
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