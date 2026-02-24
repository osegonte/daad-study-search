// src/components/layout/Footer.tsx
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from '../Logo'

export default function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              {/* Logo in white on dark bg */}
              <span className="inline-flex items-center gap-2 text-white">
                <Logo size={30} variant="mark" className="text-white" />
                <span className="text-xl font-bold">Studymetaverse</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Your trusted partner in finding the perfect study programme in Germany.
              We connect international students with opportunities across German universities.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigate('/programmes')} className="text-white/70 hover:text-accent transition-colors">
                  Browse Programmes
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/match-report')} className="text-white/70 hover:text-accent transition-colors">
                  Match Report
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/news')} className="text-white/70 hover:text-accent transition-colors">
                  Latest News
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="text-white/70 hover:text-accent transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigate('/requirements')} className="text-white/70 hover:text-accent transition-colors">
                  Admission Requirements
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/watchlist')} className="text-white/70 hover:text-accent transition-colors">
                  My Watchlist
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/privacy')} className="text-white/70 hover:text-accent transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/terms')} className="text-white/70 hover:text-accent transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hello@studymetaverse.com"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  hello@studymetaverse.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Germany
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {currentYear} Studymetaverse. All rights reserved.</p>
            <div className="flex gap-6">
              <button onClick={() => navigate('/privacy')} className="hover:text-accent transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => navigate('/terms')} className="hover:text-accent transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}