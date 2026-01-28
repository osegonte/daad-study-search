// src/pages/Requirements.tsx - NEW FILE
import { CheckCircle, AlertCircle, FileText, GraduationCap, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Requirements() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Understanding Admission Requirements
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Everything you need to know about German university admission requirements and how to check if you qualify.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* General Requirements */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">General Requirements</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Educational Qualification</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You need a recognized secondary school certificate equivalent to the German Abitur. Each country's qualifications are evaluated differently. Some may require additional preparatory courses (Studienkolleg).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Language Proficiency</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Depending on the programme language, you'll need to prove proficiency:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span><strong>German programmes:</strong> TestDaF, DSH, or Goethe Certificate (usually B2-C1 level)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span><strong>English programmes:</strong> IELTS (6.5+) or TOEFL (80+)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Required Documents</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Standard documents required for most applications:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Certified copies of school certificates and transcripts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Language proficiency certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Passport copy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>CV/Resume</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Motivation letter (if required)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Programme-Specific Requirements */}
          <div className="bg-muted/30 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Programme-Specific Requirements</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Each study programme has unique requirements beyond the general criteria. These may include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-2">Entrance Exams</h3>
                <p className="text-sm text-muted-foreground">Some programmes require specific aptitude tests</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-2">Portfolio</h3>
                <p className="text-sm text-muted-foreground">Required for art, design, and architecture programmes</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-2">Interviews</h3>
                <p className="text-sm text-muted-foreground">Personal or online interviews for selective programmes</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-bold text-foreground mb-2">Work Experience</h3>
                <p className="text-sm text-muted-foreground">Some Master's programmes require relevant experience</p>
              </div>
            </div>
          </div>

          {/* How to Check */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">How to Check Your Eligibility</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Browse Our Database</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Search through our comprehensive database of study programmes. Each programme listing includes detailed admission requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Use Smart Filters</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Filter programmes by language, subject area, and admission type to find options that match your qualifications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Check Programme Details</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Click on any programme to see complete requirements including language certificates, entrance tests, and document checklists.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Upgrade for Advanced Insights</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Premium members get access to detailed filters for MOI letter acceptance, motivation letter requirements, and interview information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">Important Note</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Requirements can change. Always verify the latest information directly with the university before applying. Our database is regularly updated, but universities have the final say on admissions.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Find Your Programme?</h3>
            <p className="text-muted-foreground mb-6">
              Start exploring programmes and check their specific requirements.
            </p>
            <Link
              to="/programmes"
              className="inline-block px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Browse Programmes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}