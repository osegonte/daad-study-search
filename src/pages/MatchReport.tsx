// src/pages/MatchReport.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileSearch, CheckCircle2, Clock, Globe, Star,
  GraduationCap, FileText, MessageSquare, ArrowRight, Sparkles
} from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
}

const deliverables = [
  {
    icon: FileSearch,
    title: 'Personalised Programme Shortlist',
    desc: 'Up to 8 curated programmes matched to your grades, background, and goals — including ones not easily found through search alone.',
  },
  {
    icon: CheckCircle2,
    title: 'Admission Likelihood Assessment',
    desc: 'For each programme, we assess how competitive your profile is and flag any risk factors before you apply.',
  },
  {
    icon: FileText,
    title: 'Document Requirements Breakdown',
    desc: 'Exactly what each programme needs: MOI letter, motivation letter, transcripts, language scores — no surprises.',
  },
  {
    icon: Clock,
    title: 'Deadline Timeline',
    desc: 'Application deadlines for Summer and Winter semesters for every programme on your list.',
  },
  {
    icon: Globe,
    title: 'Language of Instruction Guide',
    desc: 'We match you to programmes taught in your preferred language and flag German proficiency requirements where relevant.',
  },
  {
    icon: MessageSquare,
    title: 'One Follow-Up Q&A',
    desc: 'After delivery, you get one round of follow-up questions answered by the team — by email within 48 hours.',
  },
]

const steps = [
  { num: '01', title: 'Submit your profile', desc: 'Fill in your academic background, target degree, and preferences. Upload your transcript (optional but helpful).' },
  { num: '02', title: 'Secure payment', desc: 'One-time payment of €29 via Stripe. No subscription, no hidden fees.' },
  { num: '03', title: 'Expert review', desc: 'Our team analyses your profile against 1,400+ programmes in our database.' },
  { num: '04', title: 'Report delivered', desc: 'Receive your personalised PDF report by email within 3–5 business days.' },
]

const faqs = [
  {
    q: 'How is this different from using the free search?',
    a: "The free search is great for exploring. The Match Report is for when you're serious about applying — we do the analysis for you, considering factors like GPA compatibility, language requirements, and document demands that are hard to cross-reference manually.",
  },
  {
    q: 'How long does it take to get my report?',
    a: "Within 3–5 business days of payment confirmation. We'll email you when it's ready.",
  },
  {
    q: 'Do I need to upload a transcript?',
    a: "No, it's optional. But a transcript helps us assess your GPA accurately and increases the quality of the shortlist.",
  },
  {
    q: "What if I'm not happy with the report?",
    a: "We stand behind our work. If your report doesn't meet the scope described, contact us at hello@studymetaverse.com and we'll make it right.",
  },
  {
    q: 'Can I request a specific university or city?',
    a: "Yes — there's a notes field in the form. Let us know any preferences and we'll do our best to include them.",
  },
]

export default function MatchReport() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 bg-accent/10 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-accent/20"
          >
            <Sparkles className="w-4 h-4" />
            Expert Match Report — €29
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-5xl md:text-6xl font-black text-foreground leading-tight mb-6"
          >
            Stop guessing.<br />
            <span className="text-accent">Know where to apply.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We analyse your academic profile against 1,400+ German study programmes
            and deliver a personalised shortlist with admission assessments — so you
            apply with confidence, not guesswork.
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/match-report/apply"
              className="flex items-center gap-2 bg-accent text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02]"
            >
              Get My Match Report
              <ArrowRight className="w-5 h-5" />
            </Link>
            <span className="text-foreground/40 text-sm">One-time payment · No subscription</span>
          </motion.div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-4 bg-card/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">What's included</h2>
            <p className="text-foreground/60 text-lg">
              A single payment of <strong className="text-foreground">€29</strong> gets you everything below.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.05} viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-colors"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{item.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">How it works</h2>
          </motion.div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.1} viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-black text-sm">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="py-10 px-4 bg-accent/5 border-y border-accent/10">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          {[
            { icon: GraduationCap, stat: '1,400+', label: 'programmes analysed' },
            { icon: Star, stat: '€29', label: 'one-time, no subscription' },
            { icon: Clock, stat: '3–5 days', label: 'delivery time' },
          ].map(item => (
            <div key={item.stat} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-black text-foreground text-lg leading-none">{item.stat}</p>
                <p className="text-foreground/50 text-xs mt-0.5">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-foreground">Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={faq.q}
                variants={fadeUp} initial="hidden" whileInView="show" custom={i * 0.07} viewport={{ once: true }}
                className="bg-card border border-border rounded-xl group"
              >
                <summary className="p-5 font-semibold text-foreground text-sm cursor-pointer list-none flex items-center justify-between hover:text-accent transition-colors">
                  {faq.q}
                  <span className="text-foreground/30 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="px-5 pb-5 text-foreground/60 text-sm leading-relaxed border-t border-border pt-4">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center bg-card border border-border rounded-3xl p-10"
        >
          <h2 className="text-3xl font-black text-foreground mb-4">Ready to find your programmes?</h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">
            One-time payment of €29. Your report in 3–5 business days.
            No subscriptions, no upsells.
          </p>
          <Link
            to="/match-report/apply"
            className="inline-flex items-center gap-2 bg-accent text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:scale-[1.02]"
          >
            Get My Match Report — €29
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}