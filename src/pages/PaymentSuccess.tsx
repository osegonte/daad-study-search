import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Crown, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const { user, isPremium } = useAuth()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Give webhook time to update user status
    const timer = setTimeout(() => {
      setChecking(false)
      // Refresh the page to get updated premium status
      window.location.reload()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/30 min-h-screen">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative w-32 h-32 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
              <div className="relative w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-primary mb-4"
            >
              Payment Successful!
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              {checking ? (
                <>Activating your premium membership...</>
              ) : isPremium ? (
                <>Welcome to Premium! Your account has been upgraded.</>
              ) : (
                <>Your payment was successful. Your premium features will be activated shortly.</>
              )}
            </motion.p>

            {/* Premium Badge */}
            {!checking && isPremium && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full mb-8"
              >
                <Crown className="w-5 h-5" />
                <span className="font-semibold">Premium Member</span>
                <Sparkles className="w-5 h-5" />
              </motion.div>
            )}

            {/* Features Unlocked */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card border border-border rounded-xl p-8 mb-8"
            >
              <h2 className="text-xl font-semibold text-primary mb-6">
                You now have access to:
              </h2>
              
              <div className="grid gap-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">5 Premium Filters</p>
                    <p className="text-sm text-muted-foreground">MOI Letter, Motivation Letter, Test, Interview, Module Handbook</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Ad-Free Experience</p>
                    <p className="text-sm text-muted-foreground">Browse without any advertisements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Lifetime Access</p>
                    <p className="text-sm text-muted-foreground">Your premium features never expire</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => navigate('/programmes')}
                className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Searching with Premium Filters
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 border-2 border-border rounded-lg font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Back to Home
              </button>
            </motion.div>

            {/* Receipt Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-muted-foreground mt-8"
            >
              A receipt has been sent to {user?.email}
            </motion.p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}