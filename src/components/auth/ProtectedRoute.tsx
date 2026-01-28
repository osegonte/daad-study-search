// src/components/auth/ProtectedRoute.tsx - NEW FILE (CREATE THIS)
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

type ProtectedRouteProps = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}