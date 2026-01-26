import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export default function SearchHero() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [courseType, setCourseType] = useState('')
  const [language, setLanguage] = useState('')
  const [subject, setSubject] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('query', searchQuery)
    if (courseType) params.set('type', courseType)
    if (language) params.set('language', language)
    if (subject) params.set('subject', subject)
    
    navigate(`/programmes?${params.toString()}`)
  }

  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <h1 className="mb-4">
              Study & Research in Germany
            </h1>
            <p className="text-xl text-muted-foreground">
              Find your perfect study programme
            </p>
          </motion.div>
          
          {/* Search Bar */}
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSearch}
            className="mb-6"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programmes (e.g., Computer Science, Business, Engineering...)"
                className="w-full h-16 pl-6 pr-32 text-base rounded-xl border-2 border-border bg-card shadow-medium focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-muted-foreground/50"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-8 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </motion.form>

          {/* Quick Filters - NO ARROWS */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <select
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              className="h-11 px-4 rounded-lg border border-border bg-card text-sm font-medium text-foreground/80 hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all cursor-pointer appearance-none"
              style={{ 
                backgroundImage: 'none',
                paddingRight: '1rem'
              }}
            >
              <option value="">Course Type</option>
              <option value="preparatory">Preparatory Course</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-11 px-4 rounded-lg border border-border bg-card text-sm font-medium text-foreground/80 hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all cursor-pointer appearance-none"
              style={{ 
                backgroundImage: 'none',
                paddingRight: '1rem'
              }}
            >
              <option value="">Language</option>
              <option value="german">German Only</option>
              <option value="english">English Only</option>
              <option value="both">German & English</option>
            </select>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="h-11 px-4 rounded-lg border border-border bg-card text-sm font-medium text-foreground/80 hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all cursor-pointer appearance-none"
              style={{ 
                backgroundImage: 'none',
                paddingRight: '1rem'
              }}
            >
              <option value="">Subject Area</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="computer">Computer Science</option>
              <option value="medicine">Medicine</option>
              <option value="arts">Arts</option>
            </select>

            <button
              onClick={() => navigate('/programmes')}
              className="h-11 px-6 rounded-lg border border-accent/30 bg-accent/5 text-accent text-sm font-semibold hover:bg-accent/10 transition-all"
            >
              More Filters →
            </button>
          </motion.div>

          {/* Programme Count */}
          <motion.div
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-lg font-semibold text-accent">
              1,400+ programmes available
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}