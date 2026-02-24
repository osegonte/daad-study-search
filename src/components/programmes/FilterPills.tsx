// src/components/programmes/FilterPills.tsx
import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import FilterModal from './FilterModal'

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
        { value: 'Master', label: "Master's Degree" },
      ],
    },
    {
      id: 'language',
      label: 'Language',
      options: [
        { value: 'German', label: 'German Only' },
        { value: 'English', label: 'English Only' },
        { value: 'German & English', label: 'German & English' },
      ],
    },
    {
      id: 'subjectArea',
      label: 'Subject Area',
      hasSearch: true,
      options: [
        'Agriculture', 'Arts', 'Biochemistry', 'Biology', 'Business', 'Chemistry',
        'Communication', 'Computer Science', 'Economics', 'Education', 'Engineering',
        'Environmental Science', 'Food and Beverage', 'Health', 'Literature',
        'Mathematics', 'Medicine', 'Philosophy', 'Physics', 'Psychology', 'Social Science',
      ].map(v => ({ value: v, label: v })),
    },
    {
      id: 'beginning',
      label: 'Semester',
      options: [
        { value: 'Summer', label: 'Summer' },
        { value: 'Winter', label: 'Winter' },
        { value: 'Winter/Summer', label: 'Summer/Winter' },
      ],
    },
    {
      id: 'studyMode',
      label: 'Study Mode',
      options: [
        { value: 'Full-time', label: 'Fully On-site' },
        { value: 'Hybrid', label: 'Hybrid' },
        { value: 'Online', label: 'Fully Online' },
      ],
    },
    {
      id: 'admissionType',
      label: 'Admission',
      options: [
        { value: 'non-restricted (ohne NC)', label: 'Non-restricted (ohne NC)' },
        { value: 'restricted (NC)', label: 'Restricted (NC)' },
      ],
    },
    {
      id: 'tuitionFees',
      label: 'Tuition',
      options: [
        { value: 'false', label: 'No Tuition' },
        { value: 'true', label: 'Has Tuition' },
      ],
    },
    {
      id: 'moiLetter',
      label: 'MOI Letter',
      options: [
        { value: 'Accepted', label: 'Accepted' },
        { value: 'Not Accepted', label: 'Not Accepted' },
      ],
    },
    {
      id: 'motivLetter',
      label: 'Motivation Letter',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
        { value: 'Varied', label: 'Varies' },
      ],
    },
    {
      id: 'testRequired',
      label: 'Entrance Test',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
        { value: 'Varied', label: 'Varies' },
      ],
    },
    {
      id: 'interview',
      label: 'Interview',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
        { value: 'Varied', label: 'Varies' },
      ],
    },
    {
      id: 'moduleHandbook',
      label: 'Module Handbook',
      options: [
        { value: 'No', label: 'Not Required' },
        { value: 'Yes', label: 'Required' },
      ],
    },
  ]

  const getActiveCount = (filterId: string) =>
    filters[filterId as keyof typeof filters]?.length || 0

  return (
    <div className="mb-6">
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

      {/* Modals */}
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
    </div>
  )
}