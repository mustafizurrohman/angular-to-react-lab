import { Link } from 'react-router-dom'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import './Pages.css'

export function NotFound() {
  useDocumentTitle('404 Not Found')

  return (
    <div className="page-wrapper text-center">
      <PageHeader
        title="404"
        subtitle="The requested lab module or route could not be found."
      />
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="counter-btn" style={{ textDecoration: 'none' }}>
          Return to Hub
        </Link>
        <Link to="/state" className="reset-btn" style={{ textDecoration: 'none' }}>
          State Lab
        </Link>
        <Link to="/routing" className="reset-btn" style={{ textDecoration: 'none' }}>
          Routing Lab
        </Link>
      </div>
    </div>
  )
}
