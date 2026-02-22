// src/pages/Programmes.tsx - FIXED: Removed duplicate Header/Footer, fixed search param name
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { Search, MapPin, GraduationCap, Globe, Calendar, Bookmark, BookmarkCheck, ArrowUpDown } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { toggleWatchlist, isInWatchlist } from '../lib/watchlist'
import FilterPills from '../components/programmes/FilterPills'
import ActiveFilterChips from '../components/programmes/ActiveFilterChips'

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

type SortOption = 'latest' | 'name' | 'city' | 'university'

export default function Programmes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [programmes, setProgrammes] = useState<Programme[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  // FIX: Read both 'search' and 'query' params for compatibility
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || searchParams.get('query') || '')
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [watchlistStatus, setWatchlistStatus] = useState<Record<string, boolean>>({})
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const [filters, setFilters] = useState({
    courseType: [] as string[],
    language: [] as string[],
    subjectArea: [] as string[],
    admissionType: [] as string[],
    beginning: [] as string[],
    studyMode: [] as string[],
    ectsRequired: [] as string[],
    institutionType: [] as string[],
    tuitionFees: [] as string[],
    moiLetter: [] as string[],
    motivLetter: [] as string[],
    testRequired: [] as string[],
    interview: [] as string[],
    moduleHandbook: [] as string[]
  })

  const handleFilterChange = (filterName: string, values: string[]) => {
    setFilters(prev => ({ ...prev, [filterName]: values }))
  }

  const handleRemoveFilter = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName as keyof typeof prev].filter(v => v !== value)
    }))
  }

  const handleClearAll = () => {
    setFilters({
      courseType: [],
      language: [],
      subjectArea: [],
      admissionType: [],
      beginning: [],
      studyMode: [],
      ectsRequired: [],
      institutionType: [],
      tuitionFees: [],
      moiLetter: [],
      motivLetter: [],
      testRequired: [],
      interview: [],
      moduleHandbook: []
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('search', searchQuery)
    setSearchParams(params)
  }

  useEffect(() => {
    async function checkWatchlistStatus() {
      if (!user || programmes.length === 0) return

      const statusMap: Record<string, boolean> = {}
      
      for (const programme of programmes) {
        const inList = await isInWatchlist(user.id, programme.id)
        statusMap[programme.id] = inList
      }

      setWatchlistStatus(statusMap)
    }

    checkWatchlistStatus()
  }, [user, programmes])

  async function handleToggleWatchlist(e: React.MouseEvent, programmeId: string) {
    e.stopPropagation()

    if (!user) {
      navigate('/login')
      return
    }

    setTogglingId(programmeId)

    const { success } = await toggleWatchlist(user.id, programmeId)

    if (success) {
      setWatchlistStatus(prev => ({
        ...prev,
        [programmeId]: !prev[programmeId]
      }))
    }

    setTogglingId(null)
  }

  function sortProgrammes(programmes: Programme[], sortBy: SortOption): Programme[] {
    const sorted = [...programmes]
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'city':
        return sorted.sort((a, b) => a.university.city.localeCompare(b.university.city))
      case 'university':
        return sorted.sort((a, b) => a.university.name.localeCompare(b.university.name))
      case 'latest':
      default:
        return sorted
    }
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

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`)
      }

      if (filters.courseType.length > 0) {
        query = query.in('degree_type', filters.courseType)
      }
      if (filters.language.length > 0) {
        query = query.in('language_of_instruction', filters.language)
      }
      if (filters.subjectArea.length > 0) {
        query = query.in('subject_area.name', filters.subjectArea)
      }
      if (filters.admissionType.length > 0) {
        query = query.in('nc_status', filters.admissionType)
      }
      if (filters.beginning.length > 0) {
        query = query.in('start_semester', filters.beginning)
      }
      if (filters.studyMode.length > 0) {
        query = query.in('study_mode', filters.studyMode)
      }
      if (filters.ectsRequired.length > 0) {
        const ectsValues = filters.ectsRequired.map(v => parseInt(v))
        query = query.in('ects_required', ectsValues)
      }
      if (filters.tuitionFees.length > 0) {
        const tuitionValues = filters.tuitionFees.map(v => v === 'true')
        query = query.in('tuition_fee', tuitionValues)
      }

      const { data, error, count } = await query

      if (error) {
        console.error('Error fetching programmes:', error)
      } else {
        const sortedData = sortProgrammes(data as Programme[] || [], sortBy)
        setProgrammes(sortedData)
        setTotalCount(count || 0)
      }

      setLoading(false)
    }

    fetchProgrammes()
  }, [searchQuery, filters, sortBy])

  return (
    <main className="pt-32 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="mb-4">Study Programmes in Germany</h1>
          <p className="text-lg text-muted-foreground">
            {loading ? 'Loading programmes...' : `${totalCount} programmes found`}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
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

        {/* Filter Pills */}
        <FilterPills 
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
        />

        {/* Active Filter Chips */}
        <ActiveFilterChips 
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
        />

        {/* Sort Options */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm font-semibold text-foreground/80">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 px-4 rounded-lg border border-border bg-card text-sm font-medium text-foreground/80 hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all cursor-pointer appearance-none"
            style={{ backgroundImage: 'none', paddingRight: '1rem' }}
          >
            <option value="latest">Latest</option>
            <option value="name">Programme Name (A-Z)</option>
            <option value="city">City (A-Z)</option>
            <option value="university">University (A-Z)</option>
          </select>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-card border border-border rounded-xl animate-pulse" />
            ))}
          </div>
        ) : programmes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((programme) => (
              <motion.article
                key={programme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-strong transition-all duration-300 group cursor-pointer relative"
                onClick={() => navigate(`/programmes/${programme.id}`)}
              >
                {/* Bookmark Button */}
                <button
                  onClick={(e) => handleToggleWatchlist(e, programme.id)}
                  disabled={togglingId === programme.id}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${
                    watchlistStatus[programme.id]
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'bg-muted hover:bg-accent/10 text-foreground/60 hover:text-accent'
                  }`}
                  title={watchlistStatus[programme.id] ? 'Remove from watchlist' : 'Add to watchlist'}
                >
                  {togglingId === programme.id ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : watchlistStatus[programme.id] ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>

                {/* University Info */}
                <div className="flex items-start justify-between mb-4 pr-12">
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
    </main>
  )
}