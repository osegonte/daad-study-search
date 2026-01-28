// src/App.tsx - COMPLETE FILE
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="programmes" element={<Programmes />} />
            <Route path="programmes/:id" element={<ProgrammeDetail />} />
            <Route path="news" element={<News />} />
            <Route path="about" element={<About />} />
            <Route path="requirements" element={<Requirements />} />
            <Route
              path="watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="upgrade"
              element={
                <ProtectedRoute>
                  <Upgrade />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App