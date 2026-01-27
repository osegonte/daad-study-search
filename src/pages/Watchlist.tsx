import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Heart, MapPin, Globe, Calendar, GraduationCap, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getWatchlist, removeFromWatchlist } from '../lib/watchlist'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

type WatchlistProgramme = {
  id: string
  added_at: string
  program: {
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
}

export default function Watchlist() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [programmes, setProgrammes] = useState<WatchlistProgramme[]>([])
  const [loading, setLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchWatchlist() {
      if (!user) return

      setLoading(true)
      const { data } = await getWatchlist(user.id)
      setProgrammes(data as any)
      setLoading(false)
    }

    fetchWatchlist()
  }, [user])

  async function handleRemove(watchlistId: string, programmeId: string) {
    if (!user) return

    setRemovingId(programmeId)
    const { success } = await removeFromWatchlist(user.id, programmeId)

    if (success) {
      // Remove from local state
      setProgrammes(prev => prev.filter(item => item.id !== watchlistId))
    }

    setRemovingId(null)
  }

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Bookmark className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-primary">My Watchlist</h1>
                <p className="text-muted-foreground">
                  {user?.email && `Logged in as ${user.email}`}
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              {loading 
                ? 'Loading your saved programmes...'
                : `${programmes.length} programme${programmes.length !== 1 ? 's' : ''} saved`
              }
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-72 bg-card border border-border rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && programmes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Your watchlist is empty
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start exploring programmes and save your favorites to keep track of them here. 
                Click the bookmark icon on any programme to add it to your watchlist.
              </p>

              <button
                onClick={() => navigate('/programmes')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Bookmark className="w-5 h-5" />
                Browse Programmes
              </button>
            </motion.div>
          )}

          {/* Saved Programmes Grid */}
          {!loading && programmes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programmes.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-strong transition-all duration-300 group relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id, item.program.id)}
                    disabled={removingId === item.program.id}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed z-10"
                    title="Remove from watchlist"
                  >
                    {removingId === item.program.id ? (
                      <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>

                  {/* Programme Info */}
                  <div className="flex items-start justify-between mb-4 pr-12">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2 cursor-pointer"
                          onClick={() => navigate(`/programmes/${item.program.id}`)}>
                        {item.program.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.program.university.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{item.program.university.city}</span>
                        <span>•</span>
                        <span>{item.program.university.type}</span>
                      </div>
                    </div>
                    
                    {/* Degree Badge */}
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full whitespace-nowrap ml-2">
                      {item.program.degree_type}
                    </span>
                  </div>

                  {/* Programme Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground/80">{item.program.language_of_instruction}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground/80">Starts: {item.program.start_semester}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-foreground/80">{item.program.study_mode}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.program.nc_status === 'restricted (NC)' 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-green-50 text-green-600'
                    }`}>
                      {item.program.nc_status}
                    </span>
                    
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.program.tuition_fee 
                        ? 'bg-orange-50 text-orange-600' 
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {item.program.tuition_fee ? 'Tuition Required' : 'No Tuition'}
                    </span>

                    {item.program.ects_required > 0 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600">
                        {item.program.ects_required} ECTS
                      </span>
                    )}
                  </div>

                  {/* Saved Date */}
                  <p className="text-xs text-muted-foreground mb-4">
                    Saved {new Date(item.added_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>

                  {/* View Details Button */}
                  <button 
                    onClick={() => navigate(`/programmes/${item.program.id}`)}
                    className="w-full py-3 bg-accent/5 text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    View Details
                  </button>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}