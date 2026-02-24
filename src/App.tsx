// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Public pages
import Home from './pages/Home'
import Programmes from './pages/Programmes'
import ProgrammeDetail from './pages/ProgrammeDetail'
import News from './pages/News'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Requirements from './pages/Requirements'
import Services from './pages/Services'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'

// Match Report pages
import MatchReport from './pages/MatchReport'
import MatchReportApply from './pages/MatchReportApply'
import MatchReportSuccess from './pages/MatchReportSuccess'
import MatchReportCancelled from './pages/MatchReportCancelled'

// Admin pages
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPrograms from './pages/admin/AdminPrograms'
import AdminUniversities from './pages/admin/AdminUniversities'
import AdminNews from './pages/admin/AdminNews'
import AdminSubjectAreas from './pages/admin/AdminSubjectAreas'
import AdminMatchReports from './pages/admin/AdminMatchReports'

// ─── Route Guards ─────────────────────────────────────────────────────────────

/** Redirects unauthenticated users to /login */
function PrivateRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

/** Redirects non-admin users to /login (uses email allowlist or similar) */
function AdminRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  // Adjust this check to match your admin detection logic
  const isAdmin = user?.email?.endsWith('@studymetaverse.com') || user?.user_metadata?.role === 'admin'
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}

/** Public layout — header + footer */
function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* ── Public routes with Header + Footer ── */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/programmes" element={<Programmes />} />
            <Route path="/programmes/:id" element={<ProgrammeDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/about" element={<About />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/services" element={<Services />} />

            {/* Match Report */}
            <Route path="/match-report" element={<MatchReport />} />
            <Route path="/match-report/apply" element={<MatchReportApply />} />
            <Route path="/match-report/success" element={<MatchReportSuccess />} />
            <Route path="/match-report/cancelled" element={<MatchReportCancelled />} />
          </Route>

          {/* ── Auth pages ── */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ── Authenticated user routes ── */}
          <Route element={<PrivateRoute />}>
            <Route element={<PublicLayout />}>
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* ── Admin routes ── */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="programs" element={<AdminPrograms />} />
              <Route path="universities" element={<AdminUniversities />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="subjects" element={<AdminSubjectAreas />} />
              <Route path="match-reports" element={<AdminMatchReports />} />
            </Route>
          </Route>

          {/* ── 404 fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}