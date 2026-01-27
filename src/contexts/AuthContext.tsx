import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  isPremium: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      checkPremiumStatus(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      checkPremiumStatus(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function checkPremiumStatus(user: User | null) {
    if (!user) {
      setIsPremium(false)
      return
    }

    // Check if user has active premium subscription
    const { data, error } = await supabase
      .from('users')
      .select('is_premium, subscription_end_date')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error checking premium status:', error)
      setIsPremium(false)
      return
    }

    if (data?.is_premium) {
      // Check if subscription is still valid
      const endDate = new Date(data.subscription_end_date)
      const now = new Date()
      setIsPremium(endDate > now)
    } else {
      setIsPremium(false)
    }
  }

  async function signUp(email: string, password: string, username: string) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      // Create user profile in users table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              username,
              email,
              is_premium: false,
              created_at: new Date().toISOString()
            }
          ])

        if (profileError) {
          console.error('Error creating user profile:', profileError)
          // Auth user was created but profile failed - not critical
        }
      }

      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    isPremium
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}