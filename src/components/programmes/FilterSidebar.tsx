// src/components/programmes/FilterSidebar.tsx
import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

type Filters = {
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

type FilterSidebarProps = {
  filters: Filters
  onFilterChange: (filterName: string, values: string[]) => void
  onClearAll: () => void
}

const filterGroups = [
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
    label: 'Language of Instruction',
    options: [
      { value: 'German', label: 'German Only' },
      { value: 'English', label: 'English Only' },
      { value: 'German & English', label: 'German & English' },
    ],
  },
  {
    id: 'subjectArea',
    label: 'Subject Area',
    options: [
      'Agriculture', 'Arts', 'Biochemistry', 'Biology', 'Business', 'Chemistry',
      'Communication', 'Computer Science', 'Economics', 'Education', 'Engineering',
      'Environmental Science', 'Food and Beverage', 'Health', 'Literature',
      'Mathematics', 'Medicine', 'Philosophy', 'Physics', 'Psychology', 'Social Science',
    ].map(v => ({ value: v, label: v })),
  },
  {
    id: 'beginning',
    label: 'Semester Start',
    options: [
      { value: 'Summer', label: 'Summer Semester' },
      { value: 'Winter', label: 'Winter Semester' },
      { value: 'Winter/Summer', label: 'Both Semesters' },
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
    label: 'Admission Type',
    options: [
      { value: 'non-restricted (ohne NC)', label: 'Non-restricted (ohne NC)' },
      { value: 'restricted (NC)', label: 'Restricted (NC)' },
    ],
  },
  {
    id: 'tuitionFees',
    label: 'Tuition Fees',
    options: [
      { value: 'false', label: 'No Tuition Fees' },
      { value: 'true', label: 'Has Tuition Fees' },
    ],
  },
  {
    id: 'moiLetter',
    label: 'MOI Letter Required',
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
      { value: 'Varied', label: 'Varies by Programme' },
    ],
  },
  {
    id: 'testRequired',
    label: 'Entrance Test',
    options: [
      { value: 'No', label: 'Not Required' },
      { value: 'Yes', label: 'Required' },
      { value: 'Varied', label: 'Varies by Programme' },
    ],
  },
  {
    id: 'interview',
    label: 'Interview Required',
    options: [
      { value: 'No', label: 'Not Required' },
      { value: 'Yes', label: 'Required' },
      { value: 'Varied', label: 'Varies by Programme' },
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

function FilterGroup({
  group,
  selected,
  onChange,
}: {
  group: typeof filterGroups[number]
  selected: string[]
  onChange: (values: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3 text-sm font-semibold text-foreground hover:text-accent transition-colors"
      >
        <span>
          {group.label}
          {selected.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-accent text-white text-xs rounded-full">
              {selected.length}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-foreground/50 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="pb-3 space-y-2">
          {group.options.map(opt => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected.includes(opt.value)
                    ? 'bg-accent border-accent'
                    : 'border-border group-hover:border-accent'
                }`}
              >
                {selected.includes(opt.value) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                    <path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={selected.includes(opt.value)}
                onChange={() => toggle(opt.value)}
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FilterSidebar({ filters, onFilterChange, onClearAll }: FilterSidebarProps) {
  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 text-sm font-normal text-foreground/50">
              ({activeFilterCount} active)
            </span>
          )}
        </h3>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1 text-xs text-foreground/50 hover:text-accent transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Groups */}
      <div>
        {filterGroups.map(group => (
          <FilterGroup
            key={group.id}
            group={group}
            selected={filters[group.id as keyof Filters] || []}
            onChange={(values) => onFilterChange(group.id, values)}
          />
        ))}
      </div>
    </div>
  )
}