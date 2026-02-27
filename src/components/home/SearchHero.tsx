import { motion, AnimatePresence } from 'framer-motion'
import { Search, TrendingUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

// Supabase returns joins as arrays — never null, always []
type SearchSuggestion = { id: string; title: string; universities: { name: string }[] }

export default function SearchHero() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) { setSuggestions([]); return }
      const { data } = await supabase
        .from('programs')
        .select('id, title, universities(name)')
        .ilike('title', `%${searchQuery}%`)
        .limit(8)
      if (data) {
        setSuggestions(data as unknown as SearchSuggestion[])
        setShowSuggestions(true)
      }
    }
    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/programmes?search=${encodeURIComponent(searchQuery)}`)
      setShowSuggestions(false)
    }
  }

  const popularSearches = ['Computer Science', 'Business Administration', 'Mechanical Engineering', 'Medicine', 'Data Science']

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-5xl mx-auto">
          <motion.div variants={fadeInUp} ref={searchRef} className="relative mb-8">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  placeholder="Search programmes, universities, or subjects..."
                  className="w-full h-16 pl-16 pr-6 text-base rounded-xl border-2 border-border bg-card shadow-medium focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-strong overflow-hidden z-50"
                  >
                    {suggestions.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { navigate(`/programmes/${s.id}`); setShowSuggestions(false); setSearchQuery('') }}
                        className="w-full px-6 py-4 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0"
                      >
                        <div className="font-semibold text-foreground mb-1">{s.title}</div>
                        {/* FIX: unwrap array to get first university name */}
                        <div className="text-sm text-muted-foreground">{s.universities?.[0]?.name}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Popular:</span>
            </div>
            {popularSearches.map((search) => (
              <button
                key={search}
                onClick={() => { setSearchQuery(search); navigate(`/programmes?search=${encodeURIComponent(search)}`) }}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-all"
              >
                {search}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}