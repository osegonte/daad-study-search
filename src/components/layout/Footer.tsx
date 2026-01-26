import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 44 44" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="22" cy="22" r="22" fill="#6B9F7F"/>
                <path 
                  d="M22 12C16.48 12 12 16.48 12 22C12 27.52 16.48 32 22 32C27.52 32 32 27.52 32 22C32 16.48 27.52 12 22 12ZM22 28C18.69 28 16 25.31 16 22C16 18.69 18.69 16 22 16C25.31 16 28 18.69 28 22C28 25.31 25.31 28 22 28Z" 
                  fill="white"
                />
                <circle cx="22" cy="22" r="4" fill="white"/>
              </svg>
              <span className="text-xl font-semibold">StudyGermany</span>
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
                <button 
                  onClick={() => navigate('/programmes')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Browse Programmes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/services')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/news')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Latest News
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
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
                <button 
                  onClick={() => navigate('/faq')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/requirements')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Admission Requirements
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/living')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Living in Germany
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/career')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Career Resources
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms')}
                  className="text-white/70 hover:text-accent transition-colors"
                >
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
                  href="mailto:info@studygermany.com" 
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  info@studygermany.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a 
                  href="tel:+491234567890" 
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  +49 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Hauptstraße 123<br />
                  10115 Berlin<br />
                  Germany
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© {currentYear} StudyGermany. All rights reserved.</p>
            <div className="flex gap-6">
              <button 
                onClick={() => navigate('/privacy')}
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/terms')}
                className="hover:text-accent transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => navigate('/cookies')}
                className="hover:text-accent transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}