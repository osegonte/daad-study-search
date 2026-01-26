import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Programmes from './pages/Programmes'
import ProgrammeDetail from './pages/ProgrammeDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/programmes/:id" element={<ProgrammeDetail />} />
      </Routes>
    </Router>
  )
}

export default App
