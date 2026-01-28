// src/pages/Profile.tsx - COMPLETE CORRECTED FILE
import { useAuth } from '../contexts/AuthContext'
import { User, Mail, Crown, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user, isPremium } = useAuth()

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-foreground mb-8">Profile</h1>

        <div className="bg-card border border-border rounded-xl p-8">
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-semibold text-foreground">{user?.email}</p>
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="text-lg font-mono text-foreground">{user?.id}</p>
              </div>
            </div>

            {/* Membership Status */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Membership</p>
                <p className="text-lg font-semibold text-foreground">
                  {isPremium ? 'Premium' : 'Free'}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-lg font-semibold text-foreground">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {!isPremium && (
            <div className="mt-8 pt-8 border-t border-border">
              <div className="bg-accent/5 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Crown className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Upgrade to Premium</h3>
                    <p className="text-muted-foreground mb-4">
                      Unlock advanced filters and detailed programme requirements to find your perfect match.
                    </p>
                    <Link
                      to="/upgrade"
                      className="inline-block px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}