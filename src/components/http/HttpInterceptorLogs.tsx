import type { HttpLogEntry } from '../../types/http.ts'
import { Icon } from '../common/Icon.tsx'

interface HttpInterceptorLogsProps {
  logs: HttpLogEntry[]
  onClearLogs: () => void
}

export function HttpInterceptorLogs({ logs, onClearLogs }: HttpInterceptorLogsProps) {
  return (
    <div className="inspector-box http-logs-box">
      <div className="logs-header-row">
        <div className="logs-title-group">
          <Icon name="terminal" size={18} />
          <h3>Interceptor Pipeline Execution Logs ({logs.length})</h3>
        </div>
        <button
          type="button"
          className="clear-logs-btn"
          onClick={onClearLogs}
          disabled={logs.length === 0}
        >
          Clear Logs
        </button>
      </div>

      {logs.length === 0 ? (
        <p className="empty-state">No pipeline events logged yet. Trigger an HTTP request to observe the interceptors.</p>
      ) : (
        <div className="logs-timeline-list">
          {logs.map((log) => (
            <div key={log.id} className={`log-entry-item log-type-${log.type}`}>
              <div className="log-top-row">
                <span className="log-phase-badge">{log.phase}</span>
                <span className="log-time">{log.timestamp}</span>
              </div>
              <p className="log-msg">{log.message}</p>
              {log.details && (
                <pre className="log-details-snippet">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
