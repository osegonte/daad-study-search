import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, GraduationCap, Building2, Newspaper, BookOpen, LogOut, ExternalLink, Menu, X } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/programs', label: 'Programs', icon: GraduationCap, end: false },
  { to: '/admin/universities', label: 'Universities', icon: Building2, end: false },
  { to: '/admin/news', label: 'News', icon: Newspaper, end: false },
  { to: '/admin/subjects', label: 'Subject Areas', icon: BookOpen, end: false },
]

export default function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const NavItems = () => (
    <>
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive ? 'bg-accent text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`
          }
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          {item.label}
        </NavLink>
      ))}
    </>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-gray-900 border-r border-gray-800 z-50
        flex flex-col transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="px-4 py-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">SG</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-none">Study Germany</p>
              <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          <NavItems />
        </nav>

        <div className="px-3 py-3 border-t border-gray-800 space-y-0.5">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ExternalLink className="w-4 h-4" />View Site
          </a>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-gray-800 transition-colors">
            <LogOut className="w-4 h-4" />Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-60 w-full">
        {/* Mobile topbar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-gray-800">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">SG</span>
            </div>
            <span className="text-white font-semibold text-sm">Admin</span>
          </div>
        </div>

        <main className="flex-1 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}