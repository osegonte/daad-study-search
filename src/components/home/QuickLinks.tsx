// src/components/home/QuickLinks.tsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const links = [
  {
    title: 'University Programmes',
    description: 'Browse all available study programmes',
    href: '/programmes',
    gradient: 'from-accent/30 via-accent/20 to-accent/10'
  },
  {
    title: 'Requirements & Enrollment',
    description: 'Learn about admission requirements',
    href: '/requirements',
    gradient: 'from-blue-200/40 via-blue-100/30 to-blue-50/20'
  },
  {
    title: 'Living in Germany',
    description: 'Student life and practical information',
    href: '/living',
    gradient: 'from-purple-200/40 via-purple-100/30 to-purple-50/20'
  },
  {
    title: 'Work & Career',
    description: 'Career preparation and opportunities',
    href: '/career',
    gradient: 'from-orange-200/40 via-orange-100/30 to-orange-50/20'
  }
]

export default function QuickLinks() {
  const navigate = useNavigate()

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((link, index) => (
            <motion.button
              key={link.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              variants={fadeInUp}
              onClick={() => navigate(link.href)}
              className="group relative h-64 rounded-xl overflow-hidden shadow-medium hover:shadow-strong transition-all"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient}`}>
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent group-hover:from-accent/80 group-hover:via-accent/40 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  {link.description}
                </p>
                <span className="text-sm font-medium text-white inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}