import type { Location } from 'react-router-dom'
import { EmptyState } from '../common/EmptyState.tsx'

interface RouteLocationInspectorProps {
  location: Location
  paramsEntries: [string, string][]
}

export function RouteLocationInspector({ location, paramsEntries }: RouteLocationInspectorProps) {
  return (
    <div className="inspector-box">
      <h3>Route & Location Inspector</h3>
      <div className="location-details">
        <div className="loc-row">
          <span className="loc-key">Pathname:</span>
          <code>{location.pathname}</code>
        </div>
        <div className="loc-row">
          <span className="loc-key">Search String:</span>
          <code>{location.search || '(empty)'}</code>
        </div>
        <div className="loc-row">
          <span className="loc-key">Hash:</span>
          <code>{location.hash || '(none)'}</code>
        </div>
      </div>

      <h4 style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-h)' }}>
        Parsed Query Parameters
      </h4>
      {paramsEntries.length === 0 ? (
        <EmptyState style={{ fontSize: '13px' }}>No active query parameters.</EmptyState>
      ) : (
        <ul className="params-list">
          {paramsEntries.map(([key, value]) => (
            <li key={key} className="param-item">
              <strong>{key}:</strong> <span>&quot;{value}&quot;</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
