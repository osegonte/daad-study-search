import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, Crown } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function PaymentCancelled() {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-orange-100 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-orange-600" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-primary mb-4">
              Payment Cancelled
            </h1>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8">
              No charges were made to your account. You can try again whenever you're ready.
            </p>

            {/* Info Box */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
              <h2 className="font-semibold text-primary mb-3">Why upgrade to Premium?</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Access 5 exclusive premium filters to find programmes faster</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Filter by MOI Letter, Motivation Letter, Tests, and more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Enjoy an ad-free browsing experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>One-time payment of €29 for lifetime access</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/upgrade')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <Crown className="w-5 h-5" />
                Try Again
              </button>
              
              <button
                onClick={() => navigate('/programmes')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Browsing
              </button>
            </div>

            {/* Help Text */}
            <p className="text-sm text-muted-foreground mt-8">
              Need help? Contact us at{' '}
              <a href="mailto:support@studygermany.com" className="text-accent hover:underline">
                support@studygermany.com
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}