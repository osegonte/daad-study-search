// src/components/programmes/ActiveFilterChips.tsx - NEW FILE
import { X } from 'lucide-react'

type ActiveFilterChipsProps = {
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
  onRemoveFilter: (filterName: string, value: string) => void
}

const filterLabels: Record<string, string> = {
  courseType: 'Course Type',
  language: 'Language',
  subjectArea: 'Subject',
  beginning: 'Semester',
  studyMode: 'Mode',
  admissionType: 'Admission',
  ectsRequired: 'ECTS',
  institutionType: 'Institution',
  tuitionFees: 'Tuition',
  moiLetter: 'MOI Letter',
  motivLetter: 'Motivation Letter',
  testRequired: 'Test',
  interview: 'Interview',
  moduleHandbook: 'Module Handbook'
}

export default function ActiveFilterChips({ filters, onRemoveFilter }: ActiveFilterChipsProps) {
  const activeFilters = Object.entries(filters).flatMap(([key, values]) =>
    values.map(value => ({ key, value }))
  )

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm font-semibold text-muted-foreground">Active filters:</span>
      {activeFilters.map(({ key, value }) => (
        <button
          key={`${key}-${value}`}
          onClick={() => onRemoveFilter(key, value)}
          className="inline-flex items-center gap-2 h-8 px-3 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium hover:bg-accent/20 transition-colors"
        >
          <span>{filterLabels[key]}: {value}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  )
}