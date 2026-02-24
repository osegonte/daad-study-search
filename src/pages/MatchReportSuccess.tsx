// src/pages/MatchReportSuccess.tsx
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Clock, ArrowRight } from 'lucide-react'

export default function MatchReportSuccess() {
  const [params] = useSearchParams()
  const requestId = params.get('request_id')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-green-500/10 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </motion.div>

        <h1 className="text-3xl font-black text-foreground mb-3">
          Payment confirmed!
        </h1>
        <p className="text-foreground/60 leading-relaxed mb-8">
          Your Match Report request has been received. We'll get to work on your
          personalised programme shortlist and deliver it to your email inbox within
          3–5 business days.
        </p>

        <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Check your inbox</p>
              <p className="text-xs text-foreground/50 mt-0.5">
                You'll receive a payment confirmation email shortly. Your report will
                arrive at the same address.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Delivery time</p>
              <p className="text-xs text-foreground/50 mt-0.5">
                3–5 business days. If you have questions, email us at{' '}
                <a href="mailto:hello@studymetaverse.com" className="text-accent hover:underline">
                  hello@studymetaverse.com
                </a>{' '}
                with your request ID: <code className="text-xs">{requestId || 'N/A'}</code>
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/programmes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/60 hover:text-foreground transition-colors"
        >
          Browse programmes while you wait
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}