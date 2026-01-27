import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    // Show loading state while checking auth
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}