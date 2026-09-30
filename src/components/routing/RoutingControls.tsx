import { ROUTING_CATEGORIES, SORT_OPTIONS } from '../../data/routingData.ts'
import type { RouteCategory, SortOrder } from '../../types/routing.ts'

interface RoutingControlsProps {
  searchQuery: string
  currentCategory: RouteCategory | 'all'
  sortBy: SortOrder
  hasActiveParams: boolean
  onUpdateParam: (key: string, value: string) => void
  onClearAll: () => void
}

export function RoutingControls({
  searchQuery,
  currentCategory,
  sortBy,
  hasActiveParams,
  onUpdateParam,
  onClearAll,
}: RoutingControlsProps) {
  return (
    <div className="routing-controls-panel">
      <div className="control-group">
        <label htmlFor="search-input" className="control-label">
          Search Query (<code>q</code>):
        </label>
        <input
          id="search-input"
          type="text"
          className="text-input"
          placeholder="Filter topics..."
          value={searchQuery}
          onChange={(e) => onUpdateParam('q', e.target.value)}
        />
      </div>

      <div className="control-group">
        <span className="control-label">
          Category (<code>category</code>):
        </span>
        <div className="filter-buttons">
          {ROUTING_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-btn ${currentCategory === cat.id ? 'active' : ''}`}
              onClick={() => onUpdateParam('category', cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label htmlFor="sort-select" className="control-label">
          Sort Order (<code>sort</code>):
        </label>
        <select
          id="sort-select"
          className="select-input"
          value={sortBy}
          onChange={(e) => onUpdateParam('sort', e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hasActiveParams && (
        <button
          type="button"
          className="reset-btn"
          onClick={onClearAll}
          style={{ alignSelf: 'flex-start' }}
        >
          Clear Query Params
        </button>
      )}
    </div>
  )
}
