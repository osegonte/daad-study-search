import { useState, type FormEvent} from 'react'
import { motion } from 'framer-motion'
import { Briefcase, CheckCircle2, Send, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function ServiceCareer() {
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
            service_type: 'Career Guidance',
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
    'Career Path Exploration & Planning',
    'Programme Selection Based on Career Goals',
    'Industry Insights & Job Market Analysis',
    'Networking Strategies in Germany',
    'Internship & Job Search Guidance',
    'German Job Application Requirements',
    'LinkedIn Profile Optimization',
    'Career Fair Preparation',
    'Post-Graduation Work Visa Guidance',
    'Alumni Mentorship Connections'
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
                  <Briefcase className="w-8 h-8 text-accent" />
                </div>

                <h1 className="text-4xl font-bold text-primary mb-4">
                  Career Guidance & Planning
                </h1>

                <p className="text-xl text-muted-foreground mb-8">
                  Make strategic decisions about your education and future career in Germany
                </p>

                <div className="prose prose-lg max-w-none text-foreground/80 mb-12">
                  <p>
                    Choosing the right study programme is not just about academic interests—it's an investment in your future career. 
                    Understanding the German job market, industry trends, and career pathways can help you make informed decisions 
                    that align with your professional goals.
                  </p>
                  <p>
                    Our career counselors have extensive knowledge of the German education system and job market. We help you 
                    understand which programmes lead to the best career opportunities, what skills are in demand, and how to 
                    position yourself for success in Germany's competitive job market.
                  </p>
                  <p>
                    Whether you're unsure which field to pursue, want to understand job prospects in your chosen area, or need 
                    guidance on building a career in Germany after graduation, we're here to help you navigate every step.
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

                {/* Why Career Planning Matters */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      Before You Apply
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Choose programmes with strong career outcomes</li>
                      <li>• Understand salary expectations in your field</li>
                      <li>• Identify programmes with industry connections</li>
                      <li>• Plan for internships during your studies</li>
                    </ul>
                  </div>

                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      After Graduation
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• 18-month job seeker visa for graduates</li>
                      <li>• Strong demand for skilled professionals</li>
                      <li>• Competitive salaries across industries</li>
                      <li>• Clear pathway to permanent residence</li>
                    </ul>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Service Pricing
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Career guidance packages starting from €149. Submit the form for a personalized consultation.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Single Session: €49-79</li>
                    <li>• Career Planning Package: €149-249</li>
                    <li>• Complete Career & Application Support: €399</li>
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
                      Our career counselors will contact you within 24 hours to schedule your consultation.
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
                      Schedule a Consultation
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
                          What are your career goals? *
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                          placeholder="What field interests you? What are your long-term career goals? Do you plan to work in Germany?"
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