import { motion } from 'framer-motion'
import { FileText, Plane, Briefcase, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const services = [
  {
    icon: FileText,
    title: 'Be a Better Applicant',
    description: 'Get expert guidance on motivation letters, CVs, and all application documents to stand out from the crowd.',
    features: [
      'Motivation Letter Writing & Review',
      'CV/Resume Optimization',
      'Statement of Purpose Guidance',
      'Application Document Proofreading'
    ],
    gradient: 'from-blue-500 to-blue-600',
    link: '/services/application'
  },
  {
    icon: Plane,
    title: 'Study Visa Application',
    description: 'Navigate the German visa process smoothly with our step-by-step assistance and document preparation.',
    features: [
      'Visa Application Assessment',
      'VIDEX Form Completion',
      'Document Checklist & Preparation',
      'Embassy Interview Preparation'
    ],
    gradient: 'from-purple-500 to-purple-600',
    link: '/services/visa'
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    description: 'Plan your future with personalized career counseling and insights into the German job market.',
    features: [
      'Career Path Exploration',
      'Programme Selection Guidance',
      'Industry Insights & Job Market Analysis',
      'Post-Graduation Work Visa Guidance'
    ],
    gradient: 'from-green-500 to-green-600',
    link: '/services/career'
  }
]

export default function Services() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-primary mb-6">
              Expert Support Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Beyond search, get personalized help with applications, visas, and career planning to make your study abroad journey successful
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(service.link)}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer"
              >
                {/* Icon Section */}
                <div className={`h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <service.icon className="w-20 h-20 text-white relative z-10" />
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/70">
                        <span className="text-accent mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center bg-accent/5 border border-accent/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us for a free consultation and we'll help you determine the best support for your study abroad goals
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}