import { motion } from 'framer-motion'
import { Database, Users, Building2, TrendingUp } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const stats = [
  {
    icon: Building2,
    value: '100+',
    label: 'Universities',
    description: 'Partner institutions across Germany'
  },
  {
    icon: Database,
    value: '1,400+',
    label: 'Programmes',
    description: 'Study programmes available'
  },
  {
    icon: Users,
    value: '50,000+',
    label: 'Students',
    description: 'Helped find their perfect programme'
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Success Rate',
    description: 'Students accepted to their top choice'
  }
]

export default function AboutDatabase() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-primary mb-4">
              About This Database
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your comprehensive guide to finding the perfect study programme in Germany. 
              We've carefully curated and verified information from universities across the country 
              to help international students make informed decisions about their academic future.
            </p>
          </div>

          {/* Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="bg-card border border-border rounded-xl p-8 mb-12"
          >
            <h3 className="text-xl font-semibold text-primary mb-4">
              What Makes Us Different
            </h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Unlike generic search engines, we specialize exclusively in German university programmes 
                for international students. Our database is regularly updated with the latest admission 
                requirements, language prerequisites, and application deadlines.
              </p>
              <p>
                We go beyond basic programme listings by providing detailed information about admission 
                requirements including NC status, ECTS requirements, motivation letter needs, entrance 
                tests, and interview processes - helping you understand exactly what's needed before you apply.
              </p>
              <p>
                Our premium filters give you advanced search capabilities to find programmes that match 
                your specific qualifications and preferences, saving you hours of research time.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-medium transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground/80 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.7 }}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by students from over 150 countries
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground/60">
              <span className="text-xs">✓ Verified Information</span>
              <span className="text-xs">✓ Regular Updates</span>
              <span className="text-xs">✓ Student-Focused</span>
              <span className="text-xs">✓ Free Access</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}