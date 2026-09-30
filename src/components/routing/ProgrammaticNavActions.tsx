import { useNavigate } from 'react-router-dom'

export function ProgrammaticNavActions() {
  const navigate = useNavigate()

  return (
    <div className="nav-actions-grid">
      <button
        type="button"
        className="counter-btn"
        onClick={() => navigate('/state')}
      >
        Navigate to Interactive State Lab &rarr;
      </button>
      <button
        type="button"
        className="counter-btn"
        onClick={() => navigate('/angular-to-react')}
      >
        Navigate to Comparison Guide &rarr;
      </button>
      <button
        type="button"
        className="reset-btn"
        onClick={() => navigate(-1)}
      >
        &larr; Go Back (History -1)
      </button>
    </div>
  )
}
