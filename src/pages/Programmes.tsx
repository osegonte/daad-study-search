import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Search, MapPin, GraduationCap, Globe, Calendar } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FilterSidebar from '../components/programmes/FilterSidebar'

type Programme = {
  id: string
  title: string
  degree_type: string
  language_of_instruction: string
  start_semester: string
  nc_status: string
  tuition_fee: boolean
  study_mode: string
  ects_required: number
  university: {
    name: string
    city: string
    type: string
  }
  subject_area: {
    name: string
  }
}

export default function Programmes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')

  const [filters, setFilters] = useState({
    courseType: '',
    language: '',
    subjectArea: '',
    admissionType: '',
    beginning: '',
    studyMode: '',
    ectsRequired: '',
    institutionType: '',
    tuitionFees: ''
  })

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('query', searchQuery)
    setSearchParams(params)
  }

  useEffect(() => {
    async function fetchProgrammes() {
      setLoading(true)

      let query = supabase
        .from('programs')
        .select(`
          id,
          title,
          degree_type,
          language_of_instruction,
          start_semester,
          nc_status,
          tuition_fee,
          study_mode,
          ects_required,
          university:universities(name, city, type),
          subject_area:subject_areas(name)
        `, { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(20)

      // Apply search
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`)
      }

      // Apply filters
      if (filters.courseType) {
        query = query.eq('degree_type', filters.courseType)
      }
      if (filters.language) {
        query = query.eq('language_of_instruction', filters.language)
      }
      if (filters.admissionType) {
        query = query.eq('nc_status', filters.admissionType)
      }
      if (filters.beginning) {
        query = query.eq('start_semester', filters.beginning)
      }
      if (filters.studyMode) {
        query = query.eq('study_mode', filters.studyMode)
      }
      if (filters.ectsRequired) {
        query = query.eq('ects_required', parseInt(filters.ectsRequired))
      }
      if (filters.tuitionFees) {
        query = query.eq('tuition_fee', filters.tuitionFees === 'true')
      }

      const { data, error, count } = await query

      if (error) {
        console.error('Error fetching programmes:', error)
      } else {
        setProgrammes(data as any || [])
        setTotalCount(count || 0)
      }

      setLoading(false)
    }

    fetchProgrammes()
  }, [searchQuery, filters])

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="mb-4">Study Programmes in Germany</h1>
            <p className="text-lg text-muted-foreground">
              {loading ? 'Loading programmes...' : `${totalCount} programmes found`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-3">
              <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                isPremium={false}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search programmes by name..."
                    className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-border bg-card focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Results */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-72 bg-card border border-border rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : programmes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {programmes.map((programme) => (
                    <motion.article
                      key={programme.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-xl p-6 hover:shadow-strong transition-all duration-300 group cursor-pointer"
                    >
                      {/* University Info */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                            {programme.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{programme.university.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{programme.university.city}</span>
                            <span>•</span>
                            <span>{programme.university.type}</span>
                          </div>
                        </div>
                        
                        {/* Degree Badge */}
                        <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full whitespace-nowrap ml-2">
                          {programme.degree_type}
                        </span>
                      </div>

                      {/* Programme Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-foreground/80">{programme.language_of_instruction}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-foreground/80">Starts: {programme.start_semester}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-foreground/80">{programme.study_mode}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          programme.nc_status === 'restricted (NC)' 
                            ? 'bg-red-50 text-red-600' 
                            : 'bg-green-50 text-green-600'
                        }`}>
                          {programme.nc_status}
                        </span>
                        
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          programme.tuition_fee 
                            ? 'bg-orange-50 text-orange-600' 
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          {programme.tuition_fee ? 'Tuition Required' : 'No Tuition'}
                        </span>

                        {programme.ects_required > 0 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600">
                            {programme.ects_required} ECTS
                          </span>
                        )}
                      </div>

                      {/* View Details Button */}
                      <button 
                        onClick={() => navigate(`/programmes/${programme.id}`)}
                        className="w-full py-3 bg-accent/5 text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        View Details
                      </button>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-card border border-border rounded-xl">
                  <p className="text-lg text-muted-foreground mb-2">
                    No programmes found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}