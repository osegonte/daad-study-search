// src/pages/MatchReportCancelled.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, ArrowRight } from 'lucide-react'

export default function MatchReportCancelled() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-foreground/5 border-2 border-border rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-foreground/30" />
        </div>

        <h1 className="text-3xl font-black text-foreground mb-3">Payment cancelled</h1>
        <p className="text-foreground/60 leading-relaxed mb-8">
          No worries — your request details have been saved. Come back when you're
          ready to complete your Match Report.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/match-report/apply"
            className="flex items-center justify-center gap-2 bg-accent text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-accent/90 transition-all"
          >
            Try again
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/match-report"
            className="flex items-center justify-center gap-2 bg-card border border-border text-foreground font-semibold px-6 py-3 rounded-xl text-sm hover:border-accent/40 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Match Report
          </Link>
        </div>

        <p className="text-xs text-foreground/30 mt-8">
          Questions? Email us at{' '}
          <a href="mailto:hello@studymetaverse.com" className="text-accent hover:underline">
            hello@studymetaverse.com
          </a>
        </p>
      </motion.div>
    </div>
  )
}