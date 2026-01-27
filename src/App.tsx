import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Programmes from './pages/Programmes'
import ProgrammeDetail from './pages/ProgrammeDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Watchlist from './pages/Watchlist'
import Upgrade from './pages/Upgrade'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancelled from './pages/PaymentCancelled'
import Services from './pages/Services'
import ServiceApplication from './pages/ServiceApplication'
import ServiceVisa from './pages/ServiceVisa'
import ServiceCareer from './pages/ServiceCareer'
import News from './pages/News'
import ComingSoon from './pages/ComingSoon'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/programmes/:id" element={<ProgrammeDetail />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Premium & Payment Pages */}
          <Route path="/upgrade" element={<Upgrade />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancelled" element={<PaymentCancelled />} />
          
          {/* Service Pages */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/application" element={<ServiceApplication />} />
          <Route path="/services/visa" element={<ServiceVisa />} />
          <Route path="/services/career" element={<ServiceCareer />} />
          
          {/* Protected Pages - Require Login */}
          <Route 
            path="/watchlist" 
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            } 
          />
          
          {/* News Pages */}
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<ComingSoon />} />
          
          {/* Coming Soon Pages - Information */}
          <Route path="/requirements" element={<ComingSoon />} />
          <Route path="/living" element={<ComingSoon />} />
          <Route path="/career" element={<ComingSoon />} />
          <Route path="/about" element={<ComingSoon />} />
          <Route path="/faq" element={<ComingSoon />} />
          
          {/* Coming Soon Pages - Legal */}
          <Route path="/privacy" element={<ComingSoon />} />
          <Route path="/terms" element={<ComingSoon />} />
          <Route path="/cookies" element={<ComingSoon />} />
          <Route path="/contact" element={<ComingSoon />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App