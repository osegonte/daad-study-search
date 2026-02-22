import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || ''

type Props = { children: React.ReactNode }

export default function AdminRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
