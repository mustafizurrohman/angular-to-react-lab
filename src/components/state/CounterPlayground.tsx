import { STEP_OPTIONS } from '../../data/stateData.ts'

interface CounterPlaygroundProps {
  count: number
  step: number
  onStepChange: (step: number) => void
  onUpdateCount: (delta: number) => void
  onReset: () => void
}

export function CounterPlayground({
  count,
  step,
  onStepChange,
  onUpdateCount,
  onReset,
}: CounterPlaygroundProps) {
  return (
    <div className="counter-display-box">
      <span className="counter-label">Current Value</span>
      <span className="counter-large">{count}</span>
      <div className="step-selector" role="group" aria-label="Step size selector">
        <span className="step-label">Step Size:</span>
        {STEP_OPTIONS.map((s) => {
          const isActive = step === s
          return (
            <button
              key={s}
              type="button"
              className={`step-btn ${isActive ? 'active' : ''}`}
              onClick={() => onStepChange(s)}
              aria-pressed={isActive}
              aria-label={`Set step size to ${s}`}
            >
              ±{s}
            </button>
          )
        })}
      </div>
      <div className="counter-actions" role="group" aria-label="Counter actions">
        <button
          type="button"
          className="counter-btn"
          onClick={() => onUpdateCount(-step)}
          aria-label={`Decrease count by ${step}`}
        >
          -{step}
        </button>
        <button
          type="button"
          className="counter-btn"
          onClick={() => onUpdateCount(step)}
          aria-label={`Increase count by ${step}`}
        >
          +{step}
        </button>
        <button
          type="button"
          className="reset-btn"
          onClick={onReset}
          disabled={count === 0}
          aria-label="Reset counter to zero"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
