import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Calendar, 
  Clock, 
  GraduationCap,
  Building2,
  BookOpen,
  CheckCircle2,
  XCircle,
  Bookmark,
  ExternalLink,
  Euro
} from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

type ProgrammeDetail = {
  id: string
  title: string
  degree_type: string
  language_of_instruction: string
  start_semester: string
  nc_status: string
  tuition_fee: boolean
  study_mode: string
  std_period_semesters: number
  program_details: string
  ects_required: number
  moi_letter_accepted: string | null
  motiv_required: string | null
  test_required: string | null
  interview: string | null
  modul_required: string | null
  prep_course_type: string | null
  university: {
    name: string
    city: string
    type: string
    website_url: string
    description: string
  }
  subject_area: {
    name: string
  }
}

export default function ProgrammeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [programme, setProgramme] = useState<ProgrammeDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgramme() {
      if (!id) return

      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          university:universities(*),
          subject_area:subject_areas(*)
        `)
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching programme:', error)
      } else {
        setProgramme(data as any)
      }

      setLoading(false)
    }

    fetchProgramme()
  }, [id])

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-20 bg-background">
          <div className="container-custom">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/4" />
              <div className="h-12 bg-muted rounded w-3/4" />
              <div className="h-64 bg-muted rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!programme) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-20 bg-background">
          <div className="container-custom text-center">
            <h1 className="mb-4">Programme Not Found</h1>
            <button
              onClick={() => navigate('/programmes')}
              className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90"
            >
              Back to Search
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground font-medium">{value}</p>
      </div>
    </div>
  )

  const RequirementBadge = ({ label, value }: { label: string; value: string | null }) => {
    if (!value) return null
    
    const isYes = value === 'Yes' || value === 'Accepted'
    const isNo = value === 'No' || value === 'Not Accepted'
    
    return (
      <div className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
        isYes ? 'bg-green-50 border border-green-200' :
        isNo ? 'bg-red-50 border border-red-200' :
        'bg-yellow-50 border border-yellow-200'
      }`}>
        {isYes ? (
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        ) : isNo ? (
          <XCircle className="w-5 h-5 text-red-600" />
        ) : (
          <Clock className="w-5 h-5 text-yellow-600" />
        )}
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className={`text-sm font-semibold ${
            isYes ? 'text-green-700' :
            isNo ? 'text-red-700' :
            'text-yellow-700'
          }`}>{value}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          <button
            onClick={() => navigate('/programmes')}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Search</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-3">
                      {programme.degree_type}
                    </span>
                    <h1 className="text-3xl font-bold text-primary mb-4">
                      {programme.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        <span className="font-medium">{programme.university.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{programme.university.city}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-3 rounded-full bg-muted hover:bg-accent/10 hover:text-accent transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    programme.nc_status === 'restricted (NC)' 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-green-50 text-green-600 border border-green-200'
                  }`}>
                    {programme.nc_status}
                  </span>
                  
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    programme.tuition_fee 
                      ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    {programme.tuition_fee ? 'Tuition Fees Apply' : 'No Tuition Fees'}
                  </span>

                  <span className="px-3 py-1 text-sm rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                    {programme.subject_area.name}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-accent" />
                  Programme Overview
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {programme.program_details || 'Detailed programme information coming soon.'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-accent" />
                  Admission Requirements
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <RequirementBadge label="MOI Letter" value={programme.moi_letter_accepted} />
                  <RequirementBadge label="Motivation Letter" value={programme.motiv_required} />
                  <RequirementBadge label="Entrance Test" value={programme.test_required} />
                  <RequirementBadge label="Interview" value={programme.interview} />
                  <RequirementBadge label="Module Handbook" value={programme.modul_required} />
                  
                  {programme.ects_required > 0 && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">ECTS Credits Required</p>
                        <p className="text-sm font-semibold text-blue-700">{programme.ects_required} ECTS</p>
                      </div>
                    </div>
                  )}
                </div>

                {programme.prep_course_type && (
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <p className="text-sm font-semibold text-accent mb-1">Preparatory Course Type</p>
                    <p className="text-foreground/80">{programme.prep_course_type}</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-accent" />
                  About {programme.university.name}
                </h2>
                
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {programme.university.description}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground/80">
                    {programme.university.city}, Germany
                  </span>
                  <span className="px-2 py-1 bg-muted text-xs rounded">
                    {programme.university.type}
                  </span>
                </div>

                {programme.university.website_url && (
                  <a
                    href={programme.university.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
                  >
                    Visit University Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-xl p-6 sticky top-32"
              >
                <h3 className="text-lg font-semibold text-primary mb-6">Quick Facts</h3>
                
                <div className="space-y-0">
                  <InfoRow
                    icon={Globe}
                    label="Language"
                    value={programme.language_of_instruction}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Start Semester"
                    value={programme.start_semester}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Duration"
                    value={`${programme.std_period_semesters} Semesters (${programme.std_period_semesters / 2} Years)`}
                  />
                  <InfoRow
                    icon={GraduationCap}
                    label="Study Mode"
                    value={programme.study_mode}
                  />
                  <InfoRow
                    icon={Euro}
                    label="Tuition Fees"
                    value={programme.tuition_fee ? 'Required' : 'Free'}
                  />
                </div>

                <button className="w-full mt-6 py-4 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Apply Now
                </button>

                <button className="w-full mt-3 py-4 border-2 border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                  <Bookmark className="w-5 h-5" />
                  Save to Watchlist
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
