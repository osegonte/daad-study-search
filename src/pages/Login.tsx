import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <Header />
      
      <main className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-2xl p-8 shadow-strong"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-accent" />
                </div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground">
                  Sign in to access your account
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-border bg-background focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-12 pl-12 pr-4 rounded-lg border-2 border-border bg-background focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-accent hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-accent text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="text-accent font-semibold hover:underline"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="text-accent hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}