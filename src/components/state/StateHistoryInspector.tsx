import type { HistoryEntry } from '../../types/state.ts'
import { EmptyState } from '../common/EmptyState.tsx'

interface StateHistoryInspectorProps {
  history: HistoryEntry[]
}

export function StateHistoryInspector({ history }: StateHistoryInspectorProps) {
  return (
    <div className="inspector-box">
      <h3>State History (Recent 10)</h3>
      {history.length === 0 ? (
        <EmptyState>No state transitions recorded yet.</EmptyState>
      ) : (
        <ul className="history-list">
          {history.map((entry) => (
            <li key={entry.id} className="history-item">
              <span className="history-time">{entry.timestamp}</span>
              <span className="history-action">{entry.action}</span>
              <span className="history-value">Result: {entry.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
