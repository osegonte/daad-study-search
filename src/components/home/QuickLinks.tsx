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
    image: '/images/university.jpg' // Placeholder - will add default gradient
  },
  {
    title: 'Requirements & Enrollment',
    description: 'Learn about admission requirements',
    href: '/requirements',
    image: '/images/requirements.jpg'
  },
  {
    title: 'Living in Germany',
    description: 'Student life and practical information',
    href: '/living',
    image: '/images/living.jpg'
  },
  {
    title: 'Work & Career',
    description: 'Career preparation and opportunities',
    href: '/career',
    image: '/images/career.jpg'
  }
]

export default function QuickLinks() {
  const navigate = useNavigate()

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-semibold text-primary mb-3">
            Quick Links to Information
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about studying in Germany
          </p>
        </motion.div>

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
              {/* Background Image with Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5"
                style={{
                  backgroundImage: `url(${link.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
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