import { NavLink } from 'react-router-dom'
import './SideNav.css'

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  return (
    <>
      {isOpen && (
        <div
          className="sidenav-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside className={`sidenav ${isOpen ? 'open' : ''}`}>
        <div className="sidenav-header">
          <div className="logo-badge">⚛️</div>
          <div className="brand-text">
            <h2>React Lab</h2>
            <span className="brand-sub">Angular to React</span>
          </div>
        </div>

        <nav className="sidenav-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
            onClick={onClose}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/state"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
            onClick={onClose}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <span>Interactive State</span>
          </NavLink>

          <NavLink
            to="/routing"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
            onClick={onClose}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>Client-Side Routing</span>
          </NavLink>

          <NavLink
            to="/angular-to-react"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
            onClick={onClose}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Angular to React</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : ''}`
            }
            onClick={onClose}
          >
            <svg
              className="nav-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>About</span>
          </NavLink>
        </nav>

        <div className="sidenav-footer">
          <div className="version-info">
            <span className="badge">v1.0.0</span>
            <span className="muted-text">React 19 + Vite</span>
          </div>
        </div>
      </aside>
    </>
  )
}
