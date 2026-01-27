import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function ComingSoon() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center py-16"
          >
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Clock className="w-12 h-12 text-accent" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-primary mb-4">
              Coming Soon
            </h1>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8">
              This page is currently under development. We're working hard to bring you this content soon!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Back to Home
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                In the meantime, explore our{' '}
                <button 
                  onClick={() => navigate('/programmes')}
                  className="text-accent font-semibold hover:underline"
                >
                  available programmes
                </button>
                {' '}or contact us if you need assistance.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}