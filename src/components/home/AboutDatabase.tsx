// src/components/home/AboutDatabase.tsx - COMPLETE FILE
import { Database, Shield, Filter, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutDatabase() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find study programmes in Germany with clarity and confidence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Trusted by students from over 150 countries
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/programmes"
              className="px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Programmes
            </Link>
            <Link
              to="/requirements"
              className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all"
            >
              Check Requirements
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Programme-Specific Requirements
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get detailed admission requirements for each programme, not just general university information. Know exactly what you need before applying.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Built for International Students
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We understand the unique challenges international students face. Our platform is designed specifically to address these needs with verified, up-to-date information.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Filter className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Smart Time-Saving Filters
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Find programmes that match your qualifications in seconds. Filter by language, subject, admission type, and more to discover your perfect match.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">100+</div>
            <div className="text-muted-foreground">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">1,400+</div>
            <div className="text-muted-foreground">Programmes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
            <div className="text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">90%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-4">
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">Verified information</span>
          </div>
          <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-4">
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">Regular updates</span>
          </div>
          <div className="flex items-center gap-3 bg-muted/30 rounded-lg p-4">
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">Student-focused design</span>
          </div>
        </div>
      </div>
    </section>
  )
}