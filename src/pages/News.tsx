import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

type NewsItem = {
  id: string
  title: string
  excerpt: string
  category: string
  published_at: string
  author: string
}

const categories = [
  { id: 'all', label: 'All News' },
  { id: 'Scholarships', label: 'Scholarships' },
  { id: 'Visa Updates', label: 'Visa Updates' },
  { id: 'Applications', label: 'Applications' },
  { id: 'Student Life', label: 'Student Life' },
  { id: 'Announcements', label: 'Announcements' },
]

const categoryGradients: Record<string, string> = {
  'Scholarships': 'from-blue-500 to-blue-600',
  'Visa Updates': 'from-green-500 to-green-600',
  'Applications': 'from-purple-500 to-purple-600',
  'Student Life': 'from-orange-500 to-orange-600',
  'Announcements': 'from-accent to-accent/80',
}

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [articles, setArticles] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      setLoading(true)
      let query = supabase
        .from('news')
        .select('id, title, excerpt, category, published_at, author')
        .order('published_at', { ascending: false })
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory)
      }
      const { data } = await query
      setArticles(data || [])
      setLoading(false)
    }
    fetchNews()
  }, [selectedCategory])

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <main className="pt-32 pb-20 bg-background min-h-screen">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-6">Latest News</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest information about studying in Germany
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-accent text-white shadow-medium'
                  : 'bg-card border border-border text-foreground/80 hover:border-accent hover:text-accent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-80 bg-card border border-border rounded-2xl animate-pulse" />)}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No articles found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer"
              >
                <div className={`h-40 bg-gradient-to-br ${categoryGradients[article.category] || 'from-accent to-accent/80'} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="relative z-10 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">{article.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{formatDate(article.published_at)}</span></div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>By {article.author}</span></div>
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>
                  <button className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Read More</span><ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}