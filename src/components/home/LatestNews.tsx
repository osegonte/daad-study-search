import { motion } from 'framer-motion'
import { Calendar, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Mock news data - will come from backend later
const newsItems = [
  {
    id: 1,
    category: 'Education',
    date: '2025-01-15',
    title: 'New Scholarship Opportunities for International Students',
    excerpt: 'German universities announce expanded scholarship programs for the upcoming academic year, offering more support for international students.',
    image: '/images/news-1.jpg',
    slug: 'new-scholarship-opportunities'
  },
  {
    id: 2,
    category: 'Visa & Immigration',
    date: '2025-01-10',
    title: 'Updated Student Visa Requirements for 2025',
    excerpt: 'Recent changes to German student visa regulations make the application process more streamlined for international applicants.',
    image: '/images/news-2.jpg',
    slug: 'updated-visa-requirements'
  },
  {
    id: 3,
    category: 'Campus Life',
    date: '2025-01-05',
    title: 'Student Housing Guide: Finding Your Home in Germany',
    excerpt: 'Essential tips and resources for international students searching for accommodation in major German university cities.',
    image: '/images/news-3.jpg',
    slug: 'student-housing-guide'
  }
]

export default function LatestNews() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-semibold text-primary mb-4">
            Latest News
          </h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest information about studying in Germany
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              variants={fadeInUp}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-strong transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url(${news.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{news.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(news.date).toLocaleDateString('en-GB', { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {news.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => navigate(`/news/${news.slug}`)}
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}