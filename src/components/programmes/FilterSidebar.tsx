// src/components/programmes/FilterSidebar.tsx - COMPLETE FILE
import { motion } from 'framer-motion'
import { Lock, Crown, ChevronDown, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

type FilterSidebarProps = {
  filters: {
    courseType: string
    language: string
    subjectArea: string
    admissionType: string
    beginning: string
    studyMode: string
    ectsRequired: string
    institutionType: string
    tuitionFees: string
  }
  onFilterChange: (filterName: string, value: string) => void
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const navigate = useNavigate()
  const { isPremium } = useAuth()
  const [subjectSearch, setSubjectSearch] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    programmeType: true,
    details: true,
    requirements: true,
    premium: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const subjectOptions = [
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

  const filteredSubjects = subjectOptions.filter(opt => 
    opt.label.toLowerCase().includes(subjectSearch.toLowerCase())
  )

  const FilterSelect = ({ 
    label, 
    name, 
    value, 
    options, 
    isPremiumFilter = false,
    hasSearch = false
  }: { 
    label: string
    name: string
    value: string
    options: { value: string; label: string }[]
    isPremiumFilter?: boolean
    hasSearch?: boolean
  }) => {
    const isLocked = isPremiumFilter && !isPremium

    if (hasSearch) {
      return (
        <div className="mb-5">
          <label className="flex items-center justify-between text-sm font-semibold text-primary mb-2">
            <span>{label}</span>
          </label>
          
          {/* Search Box */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={subjectSearch}
              onChange={(e) => setSubjectSearch(e.target.value)}
              placeholder="Search subjects..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-background text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all"
            />
          </div>

          <select
            value={value}
            onChange={(e) => onFilterChange(name, e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-border bg-card text-sm hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 cursor-pointer transition-all appearance-none"
            style={{ backgroundImage: 'none', paddingRight: '1rem' }}
          >
            <option value="">All {label}</option>
            {filteredSubjects.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <div className="mb-5">
        <label className="flex items-center justify-between text-sm font-semibold text-primary mb-2">
          <span>{label}</span>
          {isLocked && (
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </label>
        <select
          value={value}
          onChange={(e) => onFilterChange(name, e.target.value)}
          disabled={isLocked}
          className={`w-full h-11 px-4 rounded-lg border text-sm transition-all appearance-none ${
            isLocked
              ? 'bg-muted/50 border-border cursor-not-allowed opacity-50'
              : 'bg-card border-border hover:border-accent focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10 cursor-pointer'
          }`}
          style={{ backgroundImage: 'none', paddingRight: '1rem' }}
        >
          <option value="">All {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  const CollapsibleSection = ({ 
    title, 
    sectionKey, 
    children 
  }: { 
    title: string
    sectionKey: keyof typeof expandedSections
    children: React.ReactNode 
  }) => {
    const isExpanded = expandedSections[sectionKey]

    return (
      <div className="mb-6">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full text-sm font-semibold text-primary uppercase tracking-wide mb-4 hover:text-accent transition-colors"
        >
          <span>{title}</span>
          <ChevronDown 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
        
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-xl p-6 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide"
    >
      <h2 className="text-xl font-semibold text-primary mb-6">Filters</h2>

      {/* Programme Type Section */}
      <CollapsibleSection title="Programme Type" sectionKey="programmeType">
        <FilterSelect
          label="Course Type"
          name="courseType"
          value={filters.courseType}
          options={[
            { value: 'Preparatory', label: 'Preparatory Course' },
            { value: 'Bachelor', label: "Bachelor's Degree" },
            { value: 'Master', label: "Master's Degree" }
          ]}
        />

        <FilterSelect
          label="Course Language"
          name="language"
          value={filters.language}
          options={[
            { value: 'German', label: 'German Only' },
            { value: 'English', label: 'English Only' },
            { value: 'German & English', label: 'German & English' }
          ]}
        />

        <FilterSelect
          label="Subject Area"
          name="subjectArea"
          value={filters.subjectArea}
          options={subjectOptions}
          hasSearch={true}
        />
      </CollapsibleSection>

      {/* Divider */}
      <div className="h-px bg-border mb-6" />

      {/* Programme Details Section */}
      <CollapsibleSection title="Programme Details" sectionKey="details">
        <FilterSelect
          label="Beginning Semester"
          name="beginning"
          value={filters.beginning}
          options={[
            { value: 'Summer', label: 'Summer' },
            { value: 'Winter', label: 'Winter' },
            { value: 'Winter/Summer', label: 'Summer/Winter' }
          ]}
        />

        <FilterSelect
          label="Mode of Study"
          name="studyMode"
          value={filters.studyMode}
          options={[
            { value: 'Full-time', label: 'Fully On-site' },
            { value: 'Hybrid', label: 'Hybrid' },
            { value: 'Online', label: 'Fully Online' }
          ]}
        />
      </CollapsibleSection>

      {/* Divider */}
      <div className="h-px bg-border mb-6" />

      {/* Requirements & Costs Section */}
      <CollapsibleSection title="Requirements & Costs" sectionKey="requirements">
        <FilterSelect
          label="Admission Type"
          name="admissionType"
          value={filters.admissionType}
          options={[
            { value: 'non-restricted (ohne NC)', label: 'Non-restricted (ohne NC)' },
            { value: 'restricted (NC)', label: 'Restricted (NC)' }
          ]}
        />

        <FilterSelect
          label="ECTS Required"
          name="ectsRequired"
          value={filters.ectsRequired}
          options={[
            { value: '0', label: '0' },
            { value: '180', label: '180' },
            { value: '210', label: '210' }
          ]}
        />

        <FilterSelect
          label="Type of Institution"
          name="institutionType"
          value={filters.institutionType}
          options={[
            { value: 'Public', label: 'Public' },
            { value: 'Private', label: 'Private' }
          ]}
        />

        <FilterSelect
          label="Tuition Fees"
          name="tuitionFees"
          value={filters.tuitionFees}
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' }
          ]}
        />
      </CollapsibleSection>

      {/* Divider */}
      <div className="h-px bg-border mb-6" />

      {/* Premium Section */}
      <CollapsibleSection title="Premium Filters" sectionKey="premium">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-accent" />
            {isPremium && (
              <span className="text-xs font-semibold text-accent">
                Unlocked
              </span>
            )}
          </div>
        </div>

        {!isPremium && (
          <div className="mb-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-xs text-foreground/70 leading-relaxed mb-3">
              Unlock advanced filters to find your perfect programme faster
            </p>
            <button
              onClick={() => navigate('/upgrade')}
              className="w-full h-9 bg-accent text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Upgrade to Premium
            </button>
          </div>
        )}

        <FilterSelect
          label="MOI Letter"
          name="moiLetter"
          value=""
          options={[
            { value: 'Accepted', label: 'Accepted' },
            { value: 'Not Accepted', label: 'Not Accepted' }
          ]}
          isPremiumFilter
        />

        <FilterSelect
          label="Motivation Letter Required"
          name="motivLetter"
          value=""
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'Varied', label: 'Varied' }
          ]}
          isPremiumFilter
        />

        <FilterSelect
          label="Test Required"
          name="testRequired"
          value=""
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'Varied', label: 'Varied' }
          ]}
          isPremiumFilter
        />

        <FilterSelect
          label="Interview Required"
          name="interview"
          value=""
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            { value: 'Varied', label: 'Varied' }
          ]}
          isPremiumFilter
        />

        <FilterSelect
          label="Module Handbook Required"
          name="moduleHandbook"
          value=""
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' }
          ]}
          isPremiumFilter
        />
      </CollapsibleSection>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          Object.keys(filters).forEach(key => onFilterChange(key, ''))
          setSubjectSearch('')
        }}
        className="w-full mt-6 py-3 border border-border text-foreground/70 font-semibold rounded-lg hover:bg-muted hover:border-accent/30 transition-all"
      >
        Clear All Filters
      </button>
    </motion.aside>
  )
}