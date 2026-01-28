// src/components/programmes/FilterModal.tsx - COMPLETE FILE
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, ChevronRight } from 'lucide-react'

type FilterModalProps = {
  isOpen: boolean
  onClose: () => void
  title: string
  options: { value: string; label: string; count?: number }[]
  selectedValues: string[]
  onApply: (values: string[]) => void
  hasSearch?: boolean
  isPremium?: boolean
  anchorElement?: HTMLElement | null
}

export default function FilterModal({
  isOpen,
  onClose,
  title,
  options,
  selectedValues,
  onApply,
  hasSearch = false,
  isPremium = false,
  anchorElement
}: FilterModalProps) {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedValues)
  const [searchQuery, setSearchQuery] = useState('')
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTempSelected(selectedValues)
  }, [selectedValues, isOpen])

  useEffect(() => {
    if (isOpen && anchorElement) {
      const rect = anchorElement.getBoundingClientRect()
      setPosition({
        top: rect.bottom + 8,
        left: rect.left
      })
    }
  }, [isOpen, anchorElement])

  const filteredOptions = hasSearch
    ? options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  const toggleOption = (value: string) => {
    setTempSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleApply = () => {
    onApply(tempSelected)
    setSearchQuery('')
  }

  const handleClear = () => {
    setTempSelected([])
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
            className="w-[480px] bg-white backdrop-blur-md border border-border shadow-strong z-50 max-h-[600px] overflow-hidden rounded-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <h3 className="text-base font-bold text-foreground uppercase tracking-wide">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Search */}
            {hasSearch && (
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search options..."
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:bg-background focus:border-accent focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Options */}
            <div className="px-4 py-2 max-h-[400px] overflow-y-auto scrollbar-hide bg-background">
              <div className="space-y-1">
                {filteredOptions.map(option => {
                  const isChecked = tempSelected.includes(option.value)
                  return (
                    <button
                      key={option.value}
                      onClick={() => toggleOption(option.value)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isChecked 
                          ? 'bg-accent/10 border border-accent' 
                          : 'bg-card border border-border hover:bg-muted hover:border-accent/50'
                      }`}
                    >
                      {/* Chevron */}
                      <ChevronRight 
                        className={`w-4 h-4 flex-shrink-0 transition-transform ${
                          isChecked ? 'rotate-90 text-accent' : 'text-muted-foreground'
                        }`} 
                      />
                      
                      {/* Checkbox */}
                      <div className={`w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                        isChecked 
                          ? 'bg-accent border-accent' 
                          : 'bg-background border-border'
                      }`}>
                        {isChecked && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Label */}
                      <span className="flex-1 text-left text-sm font-semibold text-foreground">
                        {option.label}
                      </span>
                      
                      {/* Count Badge */}
                      {option.count !== undefined && (
                        <span className="text-xs font-bold text-muted-foreground">
                          ({option.count})
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
                Remove filter
              </button>
              <button
                onClick={handleApply}
                className="px-8 py-2.5 bg-accent text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
              >
                OK {tempSelected.length > 0 && `(${tempSelected.length})`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}