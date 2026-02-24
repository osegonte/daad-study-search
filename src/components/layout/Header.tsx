// src/components/layout/Header.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut, Heart } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../Logo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setProfileMenuOpen(false)
  }

  const navItems = [
    { name: 'Programmes', path: '/programmes' },
    { name: 'News', path: '/news' },
    { name: 'About', path: '/about' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size={30} />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{user.email}</span>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Profile</span>
                      </Link>
                      <Link
                        to="/watchlist"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      >
                        <Heart className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Watchlist</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors border-t border-border"
                      >
                        <LogOut className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Sign Out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-foreground" />
          ) : (
            <Menu className="w-5 h-5 text-foreground" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="border-t border-border my-2 pt-2">
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/watchlist"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      Watchlist
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-border my-2 pt-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-accent text-white rounded-lg text-base font-medium hover:opacity-90 transition-opacity text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}