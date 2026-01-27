import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

type NewsCategory = 'all' | 'scholarships' | 'visa' | 'applications' | 'student-life'

const newsArticles = [
  {
    id: 1,
    title: 'New DAAD Scholarships for 2026',
    excerpt: 'Applications now open for DAAD scholarships covering tuition, living expenses, and health insurance for international students studying in Germany.',
    category: 'scholarships',
    date: '2026-01-15',
    readTime: '5 min read',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    title: 'Germany Extends Post-Study Work Visa to 18 Months',
    excerpt: 'International graduates can now stay up to 18 months to find work related to their field of study, up from the previous 12-month limit.',
    category: 'visa',
    date: '2026-01-10',
    readTime: '4 min read',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 3,
    title: 'Winter 2026 Application Deadlines Approaching',
    excerpt: 'Learn about the Winter 2026 application deadlines and requirements for Germany\'s leading universities. Key dates you cannot miss.',
    category: 'applications',
    date: '2026-01-05',
    readTime: '6 min read',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 4,
    title: 'Student Housing Guide: Finding Accommodation in German Cities',
    excerpt: 'Complete guide to finding student accommodation in major German cities including Munich, Berlin, Hamburg, and Frankfurt.',
    category: 'student-life',
    date: '2025-12-28',
    readTime: '8 min read',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 5,
    title: 'Erasmus+ Programme Increases Funding for 2026',
    excerpt: 'The Erasmus+ programme announces increased monthly allowances for students participating in exchange programmes across Europe.',
    category: 'scholarships',
    date: '2025-12-20',
    readTime: '3 min read',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 6,
    title: 'Changes to German Student Visa Requirements',
    excerpt: 'New documentation requirements for German student visa applications effective January 2026. What you need to know before applying.',
    category: 'visa',
    date: '2025-12-15',
    readTime: '7 min read',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 7,
    title: 'Top 10 Engineering Universities in Germany 2026',
    excerpt: 'Comprehensive ranking of Germany\'s best engineering universities based on research output, industry connections, and graduate employment.',
    category: 'applications',
    date: '2025-12-10',
    readTime: '10 min read',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 8,
    title: 'Part-Time Work Rules for International Students',
    excerpt: 'Understanding the regulations for part-time work as an international student in Germany, including hour limits and work permit requirements.',
    category: 'student-life',
    date: '2025-12-05',
    readTime: '5 min read',
    gradient: 'from-orange-500 to-orange-600'
  }
]

const categories = [
  { id: 'all', label: 'All News' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'visa', label: 'Visa Updates' },
  { id: 'applications', label: 'Applications' },
  { id: 'student-life', label: 'Student Life' }
]

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all')

  const filteredArticles = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory)

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-primary mb-6">
              Latest News
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest information about studying in Germany, scholarships, visa updates, and student life
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as NewsCategory)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-accent text-white shadow-medium'
                    : 'bg-card border border-border text-foreground/80 hover:border-accent hover:text-accent'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer"
              >
                {/* Category Badge on Gradient */}
                <div className={`h-40 bg-gradient-to-br ${article.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="relative z-10 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full capitalize">
                    {article.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <button className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No articles found in this category
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}