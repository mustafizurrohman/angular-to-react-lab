import { MIGRATION_CATEGORY_TABS } from '../../data/migrationPatterns.ts'
import type { PatternCategory } from '../../types/migration.ts'

interface PatternFilterBarProps {
  searchTerm: string
  selectedCategory: PatternCategory | 'all'
  onSearchChange: (term: string) => void
  onCategoryChange: (category: PatternCategory | 'all') => void
}

export function PatternFilterBar({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
}: PatternFilterBarProps) {
  return (
    <div className="filter-controls-bar">
      <input
        type="text"
        placeholder="Search patterns (*ngIf, Signals, DI, Lifecycle...)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="text-input"
        style={{ maxWidth: '400px' }}
        aria-label="Search migration patterns"
      />

      <div
        className="category-tabs"
        role="group"
        aria-label="Filter patterns by category"
      >
        {MIGRATION_CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange(tab.id)}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
