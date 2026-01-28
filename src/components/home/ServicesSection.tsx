// src/components/home/ServicesSection.tsx - COMPLETE FILE
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

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
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-semibold text-primary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond search, get personalized help with applications, visas, and career planning
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-2 gap-6">
          {/* Be a Better Applicant - Large Block (Left, spans 2 rows) */}
          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
            onClick={() => navigate('/services/application')}
            className="lg:col-span-3 lg:row-span-2 group relative h-64 lg:h-full rounded-xl overflow-hidden shadow-medium hover:shadow-strong transition-all"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-blue-100/30 to-blue-50/20">
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent group-hover:from-accent/80 group-hover:via-accent/40 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-left">
              <h3 className="text-xl font-semibold text-white mb-2">
                Be a Better Applicant
              </h3>
              <p className="text-sm text-white/90 mb-4">
                Get expert guidance on motivation letters, CVs, and all application documents to stand out from the crowd.
              </p>
              <span className="text-sm font-medium text-white inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </motion.button>

          {/* Study Visa Application - Small Block (Top Right) */}
          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeInUp}
            onClick={() => navigate('/services/visa')}
            className="lg:col-span-2 group relative h-64 rounded-xl overflow-hidden shadow-medium hover:shadow-strong transition-all"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-purple-100/30 to-purple-50/20">
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent group-hover:from-accent/80 group-hover:via-accent/40 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-left">
              <h3 className="text-xl font-semibold text-white mb-2">
                Study Visa Application
              </h3>
              <p className="text-sm text-white/90 mb-4">
                Navigate the German visa process smoothly with step-by-step assistance.
              </p>
              <span className="text-sm font-medium text-white inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </motion.button>

          {/* Career Guidance - Small Block (Bottom Right) */}
          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeInUp}
            onClick={() => navigate('/services/career')}
            className="lg:col-span-2 group relative h-64 rounded-xl overflow-hidden shadow-medium hover:shadow-strong transition-all"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/40 via-orange-100/30 to-orange-50/20">
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent group-hover:from-accent/80 group-hover:via-accent/40 transition-all duration-300" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-left">
              <h3 className="text-xl font-semibold text-white mb-2">
                Career Guidance
              </h3>
              <p className="text-sm text-white/90 mb-4">
                Plan your future with personalized career counseling and job market insights.
              </p>
              <span className="text-sm font-medium text-white inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  )
}