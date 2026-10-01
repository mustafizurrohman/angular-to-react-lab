import { CATEGORY_GROUPS } from '../../data/featureChecklistData.ts'
import type { CategoryGroup, SolidPrincipleName } from '../../types/features.ts'
import { Icon } from '../common/Icon.tsx'

interface ChecklistFilterBarProps {
  searchQuery: string
  selectedGroup: CategoryGroup | 'all'
  selectedSolidPrinciple: SolidPrincipleName | 'all'
  completedCount: number
  totalCount: number
  progressPercentage: number
  onSearchChange: (query: string) => void
  onGroupChange: (group: CategoryGroup | 'all') => void
  onSolidPrincipleChange: (principle: SolidPrincipleName | 'all') => void
  onExpandAll: () => void
  onCollapseAll: () => void
  onReset: () => void
}

const SOLID_PRINCIPLES: { id: SolidPrincipleName | 'all'; label: string; name: string }[] = [
  { id: 'all', label: 'All Principles', name: 'Show all items' },
  { id: 'SRP', label: 'SRP', name: 'Single Responsibility Principle' },
  { id: 'OCP', label: 'OCP', name: 'Open/Closed Principle' },
  { id: 'LSP', label: 'LSP', name: 'Liskov Substitution Principle' },
  { id: 'ISP', label: 'ISP', name: 'Interface Segregation Principle' },
  { id: 'DIP', label: 'DIP', name: 'Dependency Inversion Principle' },
]

export function ChecklistFilterBar({
  searchQuery,
  selectedGroup,
  selectedSolidPrinciple,
  completedCount,
  totalCount,
  progressPercentage,
  onSearchChange,
  onGroupChange,
  onSolidPrincipleChange,
  onExpandAll,
  onCollapseAll,
  onReset,
}: ChecklistFilterBarProps) {
  return (
    <div className="checklist-filter-bar">
      {/* Progress banner */}
      <div className="checklist-progress-panel">
        <div className="progress-info-row">
          <div className="progress-title-group">
            <Icon name="check-circle" size={22} color="var(--accent)" />
            <span className="progress-headline">
              Feature Inventory Progress: <strong>{completedCount}</strong> of <strong>{totalCount}</strong> items evaluated
            </span>
          </div>
          <span className="progress-badge">{progressPercentage}% Complete</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      {/* Category group pills */}
      <div className="category-group-nav">
        {CATEGORY_GROUPS.map((group) => {
          const isActive = selectedGroup === group.id
          return (
            <button
              key={group.id}
              type="button"
              className={`group-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => onGroupChange(group.id)}
            >
              <Icon name={group.icon} size={16} />
              <span>{group.label}</span>
            </button>
          )
        })}
      </div>

      {/* Search and Secondary Filters */}
      <div className="search-and-solid-row">
        <div className="search-box-wrapper">
          <Icon name="magnifying-glass" size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Filter by feature, keyword (e.g. Signals, Defer, FormArray, Zoneless)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="solid-filter-group" role="group" aria-label="Filter by SOLID principle">
          <span className="filter-label-inline">SOLID Focus:</span>
          {SOLID_PRINCIPLES.map((sp) => {
            const isActive = selectedSolidPrinciple === sp.id
            return (
              <button
                key={sp.id}
                type="button"
                className={`solid-filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSolidPrincipleChange(sp.id)}
                title={sp.name}
              >
                {sp.label}
              </button>
            )
          })}
        </div>

        <div className="action-buttons-group">
          <button type="button" className="action-link-btn" onClick={onExpandAll}>
            Expand All
          </button>
          <span className="divider-dot">•</span>
          <button type="button" className="action-link-btn" onClick={onCollapseAll}>
            Collapse All
          </button>
          <span className="divider-dot">•</span>
          <button type="button" className="action-link-btn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
