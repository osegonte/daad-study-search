import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'
import Layout from './components/layout/Layout'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPrograms from './pages/admin/AdminPrograms'
import AdminUniversities from './pages/admin/AdminUniversities'
import AdminNews from './pages/admin/AdminNews'
import AdminSubjectAreas from './pages/admin/AdminSubjectAreas'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Programmes from './pages/Programmes'
import ProgrammeDetail from './pages/ProgrammeDetail'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'
import Upgrade from './pages/Upgrade'
import News from './pages/News'
import About from './pages/About'
import Requirements from './pages/Requirements'
import Services from './pages/Services'
import ServiceApplication from './pages/ServiceApplication'
import ServiceVisa from './pages/ServiceVisa'
import ServiceCareer from './pages/ServiceCareer'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancelled from './pages/PaymentCancelled'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="universities" element={<AdminUniversities />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="subjects" element={<AdminSubjectAreas />} />
          </Route>

          {/* Public */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="programmes" element={<Programmes />} />
            <Route path="programmes/:id" element={<ProgrammeDetail />} />
            <Route path="news" element={<News />} />
            <Route path="about" element={<About />} />
            <Route path="requirements" element={<Requirements />} />
            <Route path="services" element={<Services />} />
            <Route path="services/application" element={<ServiceApplication />} />
            <Route path="services/visa" element={<ServiceVisa />} />
            <Route path="services/career" element={<ServiceCareer />} />
            <Route path="payment/success" element={<PaymentSuccess />} />
            <Route path="payment/cancelled" element={<PaymentCancelled />} />
            <Route path="watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App