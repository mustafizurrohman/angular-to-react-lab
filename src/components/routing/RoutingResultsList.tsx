import type { RouteDemoItem } from '../../types/routing.ts'
import { EmptyState } from '../common/EmptyState.tsx'

interface RoutingResultsListProps {
  items: RouteDemoItem[]
}

export function RoutingResultsList({ items }: RoutingResultsListProps) {
  return (
    <div className="results-list-container">
      <h3>Filtered Concepts ({items.length})</h3>
      {items.length === 0 ? (
        <EmptyState>No matching concepts found for the current query.</EmptyState>
      ) : (
        <div className="items-list">
          {items.map((item) => (
            <div key={item.id} className="concept-result-card">
              <div className="card-top">
                <h4>{item.title}</h4>
                <span className="category-pill">{item.category}</span>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
