// src/components/programmes/FilterPills.tsx - COMPLETE FILE
import { useState } from 'react'
import { Crown, X, ChevronDown } from 'lucide-react'
import FilterModal from './FilterModal'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

type FilterPillsProps = {
  filters: {
    courseType: string[]
    language: string[]
    subjectArea: string[]
    beginning: string[]
    studyMode: string[]
    admissionType: string[]
    ectsRequired: string[]
    institutionType: string[]
    tuitionFees: string[]
    // Premium filters
    moiLetter: string[]
    motivLetter: string[]
    testRequired: string[]
    interview: string[]
    moduleHandbook: string[]
  }
  onFilterChange: (filterName: string, values: string[]) => void
  onClearAll: () => void
}

export default function FilterPills({ filters, onFilterChange, onClearAll }: FilterPillsProps) {
  const { isPremium } = useAuth()
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0)

  const filterConfigs = [
    {
      id: 'courseType',
      label: 'Course Type',
      options: [
        { value: 'Preparatory', label: 'Preparatory Course' },
        { value: 'Bachelor', label: "Bachelor's Degree" },
        { value: 'Master', label: "Master's Degree" }
      ]
    },
    {
      id: 'language',
      label: 'Language',
      options: [
        { value: 'German', label: 'German Only' },
        { value: 'English', label: 'English Only' },
        { value: 'German & English', label: 'German & English' }
      ]
    },
    {
      id: 'subjectArea',
      label: 'Subject Area',
      hasSearch: true,
      options: [
        { value: 'Agriculture', label: 'Agriculture' },
        { value: 'Arts', label: 'Arts' },
        { value: 'Biochemistry', label: 'Biochemistry' },
        { value: 'Biology', label: 'Biology' },
        { value: 'Business', label: 'Business' },
        { value: 'Chemistry', label: 'Chemistry' },
        { value: 'Communication', label: 'Communication' },
        { value: 'Computer Science', label: 'Computer Science' },
        { value: 'Economics', label: 'Economics' },
        { value: 'Education', label: 'Education' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Environmental Science', label: 'Environmental Science' },
        { value: 'Food and Beverage', label: 'Food and Beverage' },
        { value: 'Health', label: 'Health' },
        { value: 'Literature', label: 'Literature' },
        { value: 'Medicine', label: 'Medicine' },
        { value: 'Philosophy', label: 'Philosophy' },
        { value: 'Physics', label: 'Physics' },
        { value: 'Psychology', label: 'Psychology' },
        { value: 'Social Science', label: 'Social Science' },
        { value: 'Mathematics', label: 'Mathematics' }
      ]
    },
    {
      id: 'beginning',
      label: 'Semester',
      options: [
        { value: 'Summer', label: 'Summer' },
        { value: 'Winter', label: 'Winter' },
        { value: 'Winter/Summer', label: 'Summer/Winter' }
      ]
    },
    {
      id: 'studyMode',
      label: 'Study Mode',
      options: [
        { value: 'Full-time', label: 'Fully On-site' },
        { value: 'Hybrid', label: 'Hybrid' },
        { value: 'Online', label: 'Fully Online' }
      ]
    },
    {
      id: 'admissionType',
      label: 'Admission',
      options: [
        { value: 'non-restricted (ohne NC)', label: 'Non-restricted (ohne NC)' },
        { value: 'restricted (NC)', label: 'Restricted (NC)' }
      ]
    },
    {
      id: 'tuitionFees',
      label: 'Tuition',
      options: [
        { value: 'false', label: 'No Tuition' },
        { value: 'true', label: 'Has Tuition' }
      ]
    }
  ]

  const premiumFilters = [
    {
      id: 'moiLetter',
      label: 'MOI Letter',
      options: [
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Not Accepted', label: 'Not Accepted' }
      ]
    },
    {
      id: 'motivLetter',
      label: 'Motivation Letter',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
        { value: 'Varied', label: 'Varies' }
      ]
    },
    {
      id: 'testRequired',
      label: 'Entrance Test',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
        { value: 'Varied', label: 'Varies' }
      ]
    },
    {
      id: 'interview',
      label: 'Interview',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
        { value: 'Varied', label: 'Varies' }
      ]
    },
    {
      id: 'moduleHandbook',
      label: 'Module Handbook',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' }
      ]
    }
  ]

  const getActiveCount = (filterId: string) => {
    return filters[filterId as keyof typeof filters]?.length || 0
  }

  const isPremiumActive = premiumFilters.some(f => getActiveCount(f.id) > 0)

  return (
    <div className="mb-6">
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-3">
        {filterConfigs.map(config => {
          const count = getActiveCount(config.id)
          return (
            <button
              key={config.id}
              onClick={(e) => {
                setAnchorElement(e.currentTarget)
                setActiveModal(config.id)
              }}
              className={`h-10 px-4 rounded-full border-2 font-semibold text-sm transition-all flex items-center gap-2 ${
                count > 0
                  ? 'bg-accent text-white border-accent'
                  : 'bg-card text-foreground border-border hover:border-accent'
              }`}
            >
              {config.label}
              {count > 0 && (
                <span className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full text-xs">
                  {count}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>
          )
        })}

        {/* Premium Pill */}
        <button
          onClick={(e) => {
            if (!isPremium) {
              navigate('/upgrade')
            } else {
              setAnchorElement(e.currentTarget)
              setActiveModal('premium')
            }
          }}
          className={`h-10 px-4 rounded-full border-2 font-semibold text-sm transition-all flex items-center gap-2 ${
            isPremiumActive
              ? 'bg-accent text-white border-accent'
              : isPremium
              ? 'bg-card text-foreground border-border hover:border-accent'
              : 'bg-accent/10 text-accent border-accent/30 hover:bg-accent/20'
          }`}
        >
          <Crown className="w-4 h-4" />
          Premium
          {isPremiumActive && (
            <span className="flex items-center justify-center w-5 h-5 bg-white/20 rounded-full text-xs">
              {premiumFilters.reduce((sum, f) => sum + getActiveCount(f.id), 0)}
            </span>
          )}
          {isPremium && <ChevronDown className="w-4 h-4" />}
        </button>

        {/* Clear All */}
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="h-10 px-4 rounded-full border-2 border-border text-foreground/70 font-semibold text-sm hover:bg-muted transition-all flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Filter Modals */}
      {filterConfigs.map(config => (
        <FilterModal
          key={config.id}
          isOpen={activeModal === config.id}
          onClose={() => setActiveModal(null)}
          title={config.label}
          options={config.options}
          selectedValues={filters[config.id as keyof typeof filters] || []}
          onApply={(values) => {
            onFilterChange(config.id, values)
            setActiveModal(null)
          }}
          hasSearch={config.hasSearch}
          anchorElement={anchorElement}
        />
      ))}

      {/* Premium Modal */}
      {isPremium && (
        <FilterModal
          isOpen={activeModal === 'premium'}
          onClose={() => setActiveModal(null)}
          title="Premium Filters"
          options={premiumFilters.flatMap(f => 
            f.options.map(opt => ({ 
              value: `${f.id}:${opt.value}`, 
              label: `${f.label}: ${opt.label}` 
            }))
          )}
          selectedValues={premiumFilters.flatMap(f => 
            (filters[f.id as keyof typeof filters] || []).map(v => `${f.id}:${v}`)
          )}
          onApply={(values) => {
            premiumFilters.forEach(f => {
              const relevantValues = values
                .filter(v => v.startsWith(`${f.id}:`))
                .map(v => v.split(':')[1])
              onFilterChange(f.id, relevantValues)
            })
            setActiveModal(null)
          }}
          anchorElement={anchorElement}
        />
      )}
    </div>
  )
}