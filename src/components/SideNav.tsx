import { NavLink } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../data/navigationData.ts'
import { NavIcon } from './navigation/NavIcon.tsx'
import { Icon } from './common/Icon.tsx'
import { useAuth } from '../hooks/useAuth.ts'
import './SideNav.css'

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const { user, logout } = useAuth()

  return (
    <>
      {isOpen && (
        <div
          className="sidenav-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        id="main-sidebar"
        className={`sidenav ${isOpen ? 'open' : ''}`}
        aria-label="Navigation sidebar"
      >
        <div className="sidenav-header">
          <div className="logo-badge" aria-hidden="true">
            <Icon name="atom" size={28} weight="bold" color="var(--accent)" />
          </div>
          <div className="brand-text">
            <h2>React Lab</h2>
            <span className="brand-sub">Angular to React</span>
          </div>
        </div>

        <nav className="sidenav-nav" aria-label="Main navigation">
          {NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
              onClick={onClose}
            >
              <NavIcon icon={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidenav-footer">
          {user && (
            <div className="sidenav-user-card">
              <div className="user-info">
                <Icon name="user" size={16} weight="bold" className="user-icon" aria-hidden="true" />
                <span className="user-name">{user.username}</span>
              </div>
              <button
                type="button"
                className="logout-btn"
                onClick={logout}
                title="Log out"
                aria-label="Log out"
              >
                Log out
              </button>
            </div>
          )}
          <div className="version-info">
            <span className="badge">v1.0.0</span>
            <span className="muted-text">React 19 + Vite</span>
          </div>
        </div>
      </aside>
    </>
  )
}
