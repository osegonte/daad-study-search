// src/pages/About.tsx
import { motion } from 'framer-motion'
import { Database, Shield, Clock, Heart, CheckCircle, Globe, Users, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            About Studymetaverse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            We're building the most comprehensive and trusted platform for international students seeking to study in Germany — free, powerful, and built for you.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Studying in Germany opens doors to world-class education, but navigating the application process can be overwhelming. We created Studymetaverse to simplify this journey.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform provides verified, up-to-date information about German universities and study programmes, helping students make informed decisions with confidence — completely free to search.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-xl border border-border">
                <Database className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-2">1,400+</h3>
                <p className="text-sm text-muted-foreground">Study Programmes</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Globe className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-2">100+</h3>
                <p className="text-sm text-muted-foreground">Universities</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <Users className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-2">10,000+</h3>
                <p className="text-sm text-muted-foreground">Students Helped</p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border">
                <TrendingUp className="w-8 h-8 text-accent mb-3" />
                <h3 className="font-bold text-foreground mb-2">90%</h3>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">How We Help You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Database className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Free Programme Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access detailed information about every study programme — all filters, all requirements, completely free. No paywalls.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Verified Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                All programme data is verified directly from university sources and updated regularly to ensure accuracy.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Personalised Match Report</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload your transcript and get a hand-crafted list of programmes you're most likely to be admitted to — our paid expert service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-16">What Makes Us Different</h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Built for International Students</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We understand the unique challenges international students face. Our platform is designed specifically to address these needs.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Programme-Specific Requirements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get detailed requirements for each programme, not just general university information. Know exactly what you need before applying.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">All Filters, Always Free</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every search filter — language, subject, admission type, MOI letter, motivation letter, interview, and more — is free for everyone.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Expert Match Reports</h3>
                <p className="text-muted-foreground leading-relaxed">
                  For students who want personalised guidance, our Match Report service analyses your transcript and delivers a curated shortlist of programmes you can realistically get into.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Commitment</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We're committed to making German higher education accessible to talented students worldwide. Every feature we build, every piece of information we verify, is designed to help you achieve your dream of studying in Germany.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your success is our success.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore over 1,400 study programmes — or get your personalised Match Report.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/programmes"
              className="inline-block px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Programmes
            </Link>
            <Link
              to="/match-report"
              className="inline-block px-8 py-4 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all"
            >
              Get Match Report
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}