import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const services = [
  {
    title: 'Be a Better Applicant',
    description: 'We support you in preparing your documents such as your motivation letter, CV, and more to increase your chances of admission.',
    href: '/services/application',
    image: '/images/applicant.jpg'
  },
  {
    title: 'Study Visa Application',
    description: 'We help you prepare your visa application — including joining the waiting list, filling out the VIDEX form, and writing your motivation letter and CV.',
    href: '/services/visa',
    image: '/images/visa.jpg'
  },
  {
    title: 'Career Counselling',
    description: 'We advise you on choosing your field of study, living in Germany, and career preparation to set you up for success.',
    href: '/services/career',
    image: '/images/career-counselling.jpg'
  }
]

export default function ServicesSection() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-accent">Expert Support</span>
          </div>
          <h2 className="text-4xl font-semibold text-primary mb-4">
            Get Expert Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Professional advisory services to help you succeed in your journey to study in Germany
          </p>
        </motion.div>

        {/* Asymmetric Grid - Visual Interest WITHOUT Overlap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1 - Larger, spans 7 columns */}
          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeInUp}
            onClick={() => navigate(services[0].href)}
            className="lg:col-span-7 group relative h-96 rounded-2xl overflow-hidden shadow-strong hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50"
              style={{
                backgroundImage: `url(${services[0].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Bottom gradient for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent group-hover:from-accent/90 group-hover:via-accent/40 transition-all duration-300" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 text-left">
              <h3 className="text-3xl font-semibold text-white mb-3">
                {services[0].title}
              </h3>
              <p className="text-white/90 leading-relaxed mb-6 max-w-lg">
                {services[0].description}
              </p>
              <span className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                Read More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </motion.button>

          {/* Card 2 & 3 - Stack vertically, spans 5 columns */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 2 */}
            <motion.button
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              variants={fadeInUp}
              onClick={() => navigate(services[1].href)}
              className="group relative h-44 rounded-2xl overflow-hidden shadow-strong hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50"
                style={{
                  backgroundImage: `url(${services[1].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent group-hover:from-accent/90 group-hover:via-accent/40 transition-all duration-300" />

              <div className="relative h-full flex flex-col justify-end p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {services[1].title}
                </h3>
                <p className="text-sm text-white/90 mb-3 line-clamp-2">
                  {services[1].description}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.button>

            {/* Card 3 */}
            <motion.button
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              variants={fadeInUp}
              onClick={() => navigate(services[2].href)}
              className="group relative h-44 rounded-2xl overflow-hidden shadow-strong hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50"
                style={{
                  backgroundImage: `url(${services[2].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent group-hover:from-accent/90 group-hover:via-accent/40 transition-all duration-300" />

              <div className="relative h-full flex flex-col justify-end p-6 text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {services[2].title}
                </h3>
                <p className="text-sm text-white/90 mb-3 line-clamp-2">
                  {services[2].description}
                </p>
                <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
