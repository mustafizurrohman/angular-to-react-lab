import type { DeferTrigger, DeferState } from '../../types/controlFlow.ts'
import { Icon } from '../common/Icon.tsx'

interface DeferredLoadingSimulatorProps {
  deferTrigger: DeferTrigger
  deferState: DeferState
  timerSeconds: number
  onTriggerChange: (trigger: DeferTrigger) => void
  onReset: () => void
}

const DEFER_TRIGGERS: { id: DeferTrigger; label: string; desc: string }[] = [
  { id: 'interaction', label: 'on interaction', desc: 'Simulates loading on user click' },
  { id: 'viewport', label: 'on viewport', desc: 'Simulates entering viewport observer' },
  { id: 'timer', label: 'on timer(3s)', desc: 'Simulates 3-second delay trigger' },
  { id: 'immediate', label: 'on immediate', desc: 'Loads chunk as soon as parent renders' },
  { id: 'error', label: 'Simulate Error', desc: 'Simulates bundle fetch failure (@error)' },
]

export function DeferredLoadingSimulator({
  deferTrigger,
  deferState,
  timerSeconds,
  onTriggerChange,
  onReset,
}: DeferredLoadingSimulatorProps) {
  return (
    <div className="inspector-box defer-simulator-card">
      <div className="defer-header-row">
        <div className="defer-title-group">
          <Icon name="clock-countdown" size={20} color="var(--accent)" />
          <h3>Deferred View Loading Simulator (@defer vs Suspense)</h3>
        </div>
        <button type="button" className="action-link-btn" onClick={onReset}>
          Reset Defer State
        </button>
      </div>

      <div className="defer-triggers-bar">
        <span className="trigger-label">Trigger Mode:</span>
        <div className="trigger-buttons-row">
          {DEFER_TRIGGERS.map((t) => {
            const isActive = deferTrigger === t.id
            return (
              <button
                key={t.id}
                type="button"
                className={`tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => onTriggerChange(t.id)}
                title={t.desc}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="defer-preview-frame">
        {deferState === 'placeholder' && (
          <div className="defer-state-box state-placeholder">
            <span className="state-badge placeholder-badge">@placeholder</span>
            <div className="skeleton-line" style={{ width: '60%' }} />
            <div className="skeleton-line" style={{ width: '85%' }} />
            <div className="skeleton-line" style={{ width: '40%' }} />
            <p className="state-hint">
              {deferTrigger === 'interaction'
                ? 'Click "on interaction" or another trigger button above to hydrate chunk.'
                : 'Waiting for trigger condition to activate...'}
            </p>
          </div>
        )}

        {deferState === 'loading' && (
          <div className="defer-state-box state-loading">
            <span className="state-badge loading-badge">@loading (minimum 500ms)</span>
            <Icon name="spinner" size={32} className="spin-icon" color="var(--accent)" />
            <p>
              {deferTrigger === 'timer'
                ? `Timer countdown: ${timerSeconds}s remaining before resolution...`
                : 'Downloading heavy JavaScript chunk bundle asynchronously...'}
            </p>
          </div>
        )}

        {deferState === 'loaded' && (
          <div className="defer-state-box state-loaded">
            <span className="state-badge loaded-badge">Hydrated View Component</span>
            <div className="loaded-content-widget">
              <Icon name="check-circle" size={36} color="#10b981" />
              <div>
                <h4>Heavy Analytics &amp; Migration Metrics Widget</h4>
                <p>Bundle dynamically imported &amp; rendered with zero initial payload cost.</p>
              </div>
            </div>
          </div>
        )}

        {deferState === 'error' && (
          <div className="defer-state-box state-error">
            <span className="state-badge error-badge">@error block</span>
            <Icon name="warning-circle" size={36} color="#ef4444" />
            <div>
              <h4>Bundle Failed to Load</h4>
              <p>In Angular, caught by <code>@error</code>. In React, caught by <code>&lt;ErrorBoundary&gt;</code>.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
