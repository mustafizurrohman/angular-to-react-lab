import type { HttpResponseData } from '../../types/http.ts'
import { Icon } from '../common/Icon.tsx'

interface HttpPlaygroundProps {
  isLoading: boolean
  latencyMs: number
  lastResponse: HttpResponseData<unknown> | null
  errorMessage: string | null
  onLatencyChange: (ms: number) => void
  onFetchUsers: () => void
  onCreateUser: () => void
  onTriggerError: (status: 404 | 500) => void
  onCancelRequest: () => void
}

export function HttpPlayground({
  isLoading,
  latencyMs,
  lastResponse,
  errorMessage,
  onLatencyChange,
  onFetchUsers,
  onCreateUser,
  onTriggerError,
  onCancelRequest,
}: HttpPlaygroundProps) {
  return (
    <div className="http-playground-card">
      <div className="playground-controls-section">
        <div className="latency-control-row">
          <label htmlFor="latency-range" className="control-label">
            Simulated Network Latency: <strong>{latencyMs}ms</strong>
          </label>
          <input
            id="latency-range"
            type="range"
            min="200"
            max="3000"
            step="100"
            value={latencyMs}
            onChange={(e) => onLatencyChange(Number(e.target.value))}
            className="range-input"
          />
        </div>

        <div className="http-actions-grid">
          <button
            type="button"
            className="counter-btn"
            onClick={onFetchUsers}
            disabled={isLoading}
          >
            <Icon name="arrow-down" size={16} />
            GET /api/users
          </button>

          <button
            type="button"
            className="counter-btn"
            onClick={onCreateUser}
            disabled={isLoading}
          >
            <Icon name="plus-circle" size={16} />
            POST /api/users
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={() => onTriggerError(404)}
            disabled={isLoading}
          >
            Trigger 404 Not Found
          </button>

          <button
            type="button"
            className="reset-btn"
            onClick={() => onTriggerError(500)}
            disabled={isLoading}
          >
            Trigger 500 Server Error
          </button>

          {isLoading && (
            <button
              type="button"
              className="abort-btn"
              onClick={onCancelRequest}
            >
              <Icon name="x-circle" size={16} />
              Abort In-Flight Request
            </button>
          )}
        </div>
      </div>

      <div className="response-display-section">
        <div className="response-header">
          <h4>Last Response Payload</h4>
          {lastResponse && (
            <span className={`status-pill ${lastResponse.status < 400 ? 'valid' : 'invalid'}`}>
              Status: {lastResponse.status} {lastResponse.statusText} ({lastResponse.durationMs}ms)
            </span>
          )}
        </div>

        {errorMessage && (
          <div className="http-error-alert" role="alert">
            <Icon name="warning-circle" size={18} color="#ef4444" />
            <span>{errorMessage}</span>
          </div>
        )}

        <pre className="json-inspector http-json-viewer">
          {lastResponse ? JSON.stringify(lastResponse, null, 2) : '// Click an action above to dispatch a request'}
        </pre>
      </div>
    </div>
  )
}
