import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const categoryGradients: Record<string, string> = {
  'Scholarships': 'from-blue-500 to-blue-600',
  'Visa Updates': 'from-green-500 to-green-600',
  'Applications': 'from-purple-500 to-purple-600',
  'Student Life': 'from-orange-500 to-orange-600',
  'Announcements': 'from-accent to-accent/80',
}

type NewsItem = { id: string; title: string; excerpt: string; published_at: string; category: string }

export default function LatestNews() {
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    supabase
      .from('news')
      .select('id, title, excerpt, published_at, category')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data) setNews(data) })
  }, [])

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  if (news.length === 0) return null

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} variants={fadeInUp} className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-primary mb-2">Latest News</h2>
            <p className="text-muted-foreground">Stay updated with the latest in German higher education</p>
          </div>
          <button onClick={() => navigate('/news')} className="hidden md:flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
            <span>View All</span><ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }} variants={fadeInUp}
              onClick={() => navigate('/news')}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer"
            >
              <div className={`h-32 bg-gradient-to-br ${categoryGradients[item.category] || 'from-accent to-accent/80'} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <span className="relative z-10 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">{item.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" /><span>{formatDate(item.published_at)}</span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{item.excerpt}</p>
                <button className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Read More</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} variants={fadeInUp} className="mt-8 text-center md:hidden">
          <button onClick={() => navigate('/news')} className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
            <span>View All News</span><ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}