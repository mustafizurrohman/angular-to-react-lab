import { useNavigate } from 'react-router-dom'
import { Icon } from '../common/Icon.tsx'

export function ProgrammaticNavActions() {
  const navigate = useNavigate()

  return (
    <div className="nav-actions-grid">
      <button
        type="button"
        className="counter-btn"
        onClick={() => navigate('/state')}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        <span>Navigate to Interactive State Lab</span>
        <Icon name="arrow-right" size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="counter-btn"
        onClick={() => navigate('/angular-to-react')}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        <span>Navigate to Comparison Guide</span>
        <Icon name="arrow-right" size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="reset-btn"
        onClick={() => navigate(-1)}
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
      >
        <Icon name="arrow-left" size={16} aria-hidden="true" />
        <span>Go Back (History -1)</span>
      </button>
    </div>
  )
}
