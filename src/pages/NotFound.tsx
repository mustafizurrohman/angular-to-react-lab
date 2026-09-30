import { Link } from 'react-router-dom'
import './Pages.css'

export function NotFound() {
  return (
    <div className="page-wrapper text-center">
      <h1 className="page-title">404</h1>
      <p className="page-subtitle">The requested lab module or route could not be found.</p>
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          to="/"
          className="counter-btn"
          style={{ textDecoration: 'none' }}
        >
          Return to Hub
        </Link>
        <Link
          to="/state"
          className="reset-btn"
          style={{ textDecoration: 'none' }}
        >
          State Lab
        </Link>
        <Link
          to="/routing"
          className="reset-btn"
          style={{ textDecoration: 'none' }}
        >
          Routing Lab
        </Link>
      </div>
    </div>
  )
}
