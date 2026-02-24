import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { GraduationCap, Building2, Newspaper, BookOpen, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Stats = {
  programs: number
  universities: number
  news: number
  subjects: number
  users: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ programs: 0, universities: 0, news: 0, subjects: 0, users: 0 })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchStats() {
      const [programs, universities, news, subjects, users] = await Promise.all([
        supabase.from('programs').select('*', { count: 'exact', head: true }),
        supabase.from('universities').select('*', { count: 'exact', head: true }),
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase.from('subject_areas').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('*', { count: 'exact', head: true }),
      ])
      setStats({
        programs: programs.count || 0,
        universities: universities.count || 0,
        news: news.count || 0,
        subjects: subjects.count || 0,
        users: users.count || 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Programs', value: stats.programs, icon: GraduationCap, path: '/admin/programs', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Universities', value: stats.universities, icon: Building2, path: '/admin/universities', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'News Articles', value: stats.news, icon: Newspaper, path: '/admin/news', color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Subject Areas', value: stats.subjects, icon: BookOpen, path: '/admin/subjects', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Registered Users', value: stats.users, icon: Users, path: '#', color: 'text-accent', bg: 'bg-accent/10' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">Overview of your Studymetaverse platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {cards.map(card => (
          <button
            key={card.label}
            onClick={() => card.path !== '#' && navigate(card.path)}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-left hover:border-gray-700 transition-colors group"
          >
            <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center mb-4`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className={`text-3xl font-bold text-white mb-1 ${loading ? 'opacity-0' : ''}`}>
              {card.value}
            </div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{card.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}