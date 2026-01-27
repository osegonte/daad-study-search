import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Crown, Check, Sparkles, Filter, TrendingUp, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { STRIPE_PRICE_ID } from '../lib/stripe'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Upgrade() {
  const navigate = useNavigate()
  const { user, isPremium } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // If already premium, redirect
  if (isPremium) {
    navigate('/')
  }

  const premiumFeatures = [
    {
      icon: Filter,
      title: 'Advanced Filters',
      description: 'Access 5 exclusive premium filters to find your perfect programme faster'
    },
    {
      icon: Check,
      title: 'MOI Letter Filter',
      description: 'Filter programmes by Medium of Instruction letter acceptance'
    },
    {
      icon: Check,
      title: 'Motivation Letter Filter',
      description: 'See which programmes require motivation letters'
    },
    {
      icon: Check,
      title: 'Test & Interview Filters',
      description: 'Filter by entrance test and interview requirements'
    },
    {
      icon: Check,
      title: 'Module Handbook Filter',
      description: 'Find programmes based on module handbook requirements'
    },
    {
      icon: Sparkles,
      title: 'Ad-Free Experience',
      description: 'Enjoy browsing without any advertisements'
    },
    {
      icon: TrendingUp,
      title: 'Priority Support',
      description: 'Get faster responses from our support team'
    }
  ]

  async function handleUpgrade() {
    if (!user) {
      navigate('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create Stripe Checkout Session via Supabase Edge Function
      const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          priceId: STRIPE_PRICE_ID,
          userId: user.id,
          userEmail: user.email,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancelled`,
        }
      })

      if (functionError) {
        // Fallback: Direct Stripe Checkout (requires Stripe.js)
        console.error('Edge function error:', functionError)
        
        // Import Stripe dynamically
        const { loadStripe } = await import('@stripe/stripe-js')
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
        
        if (!stripe) {
          throw new Error('Failed to load Stripe')
        }

        // Create checkout session directly (requires Payment Links or Checkout)
        // For now, redirect to Stripe Payment Link
        window.location.href = `https://buy.stripe.com/test_XXXX?client_reference_id=${user.id}`
        return
      }

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err) {
      console.error('Upgrade error:', err)
      setError('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-gradient-to-b from-background to-muted/30 min-h-screen">
        <div className="container-custom">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Go Back</span>
          </button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
              <Crown className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl font-bold text-primary mb-4">
              Upgrade to Premium
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock advanced filters and find your perfect study programme faster
            </p>
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-card border-2 border-accent rounded-2xl p-8 shadow-strong relative overflow-hidden">
              {/* Premium Badge */}
              <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-semibold">
                Best Value
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Premium Membership
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    One-time payment, lifetime access
                  </p>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-bold text-accent">€29</span>
                    <span className="text-lg text-muted-foreground">one-time</span>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleUpgrade}
                    disabled={loading}
                    className="w-full h-14 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5" />
                        <span>Upgrade Now</span>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Secure payment powered by Stripe
                  </p>
                </div>

                {/* Quick Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-foreground/80">5 Premium Filters</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-foreground/80">Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-foreground/80">Ad-Free Experience</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-foreground/80">Priority Support</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-primary text-center mb-12">
              What's Included
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-medium transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  )
}