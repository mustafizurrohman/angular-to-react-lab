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
      <div className="step-selector">
        <span className="step-label">Step Size:</span>
        {STEP_OPTIONS.map((s) => (
          <button
            key={s}
            type="button"
            className={`step-btn ${step === s ? 'active' : ''}`}
            onClick={() => onStepChange(s)}
          >
            ±{s}
          </button>
        ))}
      </div>
      <div className="counter-actions">
        <button
          type="button"
          className="counter-btn"
          onClick={() => onUpdateCount(-step)}
        >
          -{step}
        </button>
        <button
          type="button"
          className="counter-btn"
          onClick={() => onUpdateCount(step)}
        >
          +{step}
        </button>
        <button
          type="button"
          className="reset-btn"
          onClick={onReset}
          disabled={count === 0}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
