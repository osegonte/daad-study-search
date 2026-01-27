import { motion } from 'framer-motion'
import { Lock, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

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

  const FilterSelect = ({ 
    label, 
    name, 
    value, 
    options, 
    isPremiumFilter = false 
  }: { 
    label: string
    name: string
    value: string
    options: { value: string; label: string }[]
    isPremiumFilter?: boolean
  }) => {
    const isLocked = isPremiumFilter && !isPremium

    return (
      <div className="mb-4">
        <label className="flex items-center justify-between text-sm font-semibold text-primary mb-2">
          <span>{label}</span>
          {isLocked && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              Premium
            </span>
          )}
        </label>
        <select
          value={value}
          onChange={(e) => onFilterChange(name, e.target.value)}
          disabled={isLocked}
          className={`w-full h-11 px-4 rounded-lg border text-sm appearance-none transition-all ${
            isLocked
              ? 'bg-muted/50 border-border cursor-not-allowed opacity-60'
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

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-xl p-6 sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto"
    >
      <h2 className="text-xl font-semibold text-primary mb-6">Filters</h2>

      {/* FREE FILTERS */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
          Basic Filters
        </h3>

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
          options={[
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
          ]}
        />

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
      </div>

      {/* PREMIUM FILTERS */}
      <div className="pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">
            Premium Filters
          </h3>
          {isPremium ? (
            <span className="flex items-center gap-1 text-xs text-accent font-semibold">
              <Crown className="w-3 h-3" />
              Unlocked
            </span>
          ) : (
            <button 
              onClick={() => navigate('/upgrade')}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Upgrade
            </button>
          )}
        </div>

        {!isPremium && (
          <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <p className="text-xs text-foreground/70 mb-2">
              Unlock advanced filters to find your perfect programme faster
            </p>
            <button
              onClick={() => navigate('/upgrade')}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Learn more →
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
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          Object.keys(filters).forEach(key => onFilterChange(key, ''))
        }}
        className="w-full mt-6 py-3 border border-border text-foreground/70 font-semibold rounded-lg hover:bg-muted transition-colors"
      >
        Clear All Filters
      </button>
    </motion.aside>
  )
}