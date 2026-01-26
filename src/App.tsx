import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programmes" element={
              <div className="container-custom pt-32 py-24">
                <h1 className="mb-4">Programme Search Results</h1>
                <p className="text-muted-foreground">
                  Search results page - coming soon!
                </p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App