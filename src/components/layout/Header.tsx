import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, User, Search } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      navigate(href)
      window.scrollTo(0, 0)
    }
  }

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundColor: isScrolled 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(255, 255, 255, 1)'
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50"
        style={{ backdropFilter: isScrolled ? 'blur(12px)' : 'none' }}
      >
        <div className="container-custom h-24 flex items-center justify-between">
          {/* Logo - Left */}
          <button 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 group"
          >
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 44 44" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover:scale-105"
            >
              <circle cx="22" cy="22" r="22" fill="#6B9F7F"/>
              <path 
                d="M22 12C16.48 12 12 16.48 12 22C12 27.52 16.48 32 22 32C27.52 32 32 27.52 32 22C32 16.48 27.52 12 22 12ZM22 28C18.69 28 16 25.31 16 22C16 18.69 18.69 16 22 16C25.31 16 28 18.69 28 22C28 25.31 25.31 28 22 28Z" 
                fill="white"
              />
              <circle cx="22" cy="22" r="4" fill="white"/>
            </svg>
            
            <span className="text-2xl font-semibold text-primary group-hover:text-accent transition-colors tracking-tight">
              StudyGermany
            </span>
          </button>
          
          {/* Desktop Navigation - CENTERED */}
          <nav className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            <button 
              onClick={() => handleNavClick('/programmes')}
              className="text-[15px] font-semibold text-foreground/80 hover:text-accent transition-colors relative group"
            >
              Programmes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
            
            <button 
              onClick={() => handleNavClick('/services')}
              className="text-[15px] font-semibold text-foreground/80 hover:text-accent transition-colors relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
            
            <button 
              onClick={() => handleNavClick('/news')}
              className="text-[15px] font-semibold text-foreground/80 hover:text-accent transition-colors relative group"
            >
              News
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Side - Search Icon + Login Icon */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <button 
              onClick={() => handleNavClick('/programmes')}
              className="hidden lg:flex w-11 h-11 items-center justify-center rounded-full hover:bg-accent/10 text-foreground/70 hover:text-accent transition-all group"
              aria-label="Search"
            >
              <Search className="w-5 h-5 transition-transform group-hover:scale-110" />
            </button>

            {/* Login Icon */}
            <button 
              onClick={() => handleNavClick('/login')}
              className="hidden lg:flex w-11 h-11 items-center justify-center rounded-full hover:bg-accent/10 text-foreground/70 hover:text-accent transition-all group"
              aria-label="Login"
            >
              <User className="w-5 h-5 transition-transform group-hover:scale-110" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full hover:bg-muted text-foreground/70 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[320px] bg-card shadow-strong z-50 lg:hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <span className="font-semibold text-lg text-primary">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>
            </div>

            <nav className="flex flex-col p-6 space-y-2">
              <button
                onClick={() => handleNavClick('/programmes')}
                className="px-5 py-4 text-left text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-xl transition-all font-semibold"
              >
                Programmes
              </button>
              <button
                onClick={() => handleNavClick('/services')}
                className="px-5 py-4 text-left text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-xl transition-all font-semibold"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick('/news')}
                className="px-5 py-4 text-left text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-xl transition-all font-semibold"
              >
                News
              </button>
              
              <div className="h-px bg-border/50 my-4" />
              
              <button
                onClick={() => handleNavClick('/programmes')}
                className="px-5 py-4 flex items-center gap-3 text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-xl transition-all font-semibold"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
              
              <button
                onClick={() => handleNavClick('/login')}
                className="px-5 py-4 flex items-center gap-3 text-accent hover:bg-accent/5 rounded-xl transition-all font-semibold"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </>
  )
}
