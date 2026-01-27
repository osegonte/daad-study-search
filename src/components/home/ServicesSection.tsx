import { motion } from 'framer-motion'
import { FileText, Plane, Briefcase, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const services = [
  {
    icon: FileText,
    title: 'Be a Better Applicant',
    description: 'Get expert guidance on motivation letters, CVs, and all application documents to stand out from the crowd.',
    gradient: 'from-blue-500 to-blue-600',
    link: '/services/application'
  },
  {
    icon: Plane,
    title: 'Study Visa Application',
    description: 'Navigate the German visa process smoothly with our step-by-step assistance and document preparation.',
    gradient: 'from-purple-500 to-purple-600',
    link: '/services/visa'
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    description: 'Plan your future with personalized career counseling and insights into the German job market.',
    gradient: 'from-green-500 to-green-600',
    link: '/services/career'
  }
]

export default function ServicesSection() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Expert Support Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond search, get personalized help with applications, visas, and career planning
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUp}
              onClick={() => navigate(service.link)}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer"
            >
              {/* Icon Section */}
              <div className={`h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <service.icon className="w-20 h-20 text-white relative z-10" />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* CTA */}
                <button 
                  className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}