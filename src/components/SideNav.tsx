import { NavLink } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../data/navigationData.ts'
import { NavIcon } from './navigation/NavIcon.tsx'
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
          <div className="version-info">
            <span className="badge">v1.0.0</span>
            <span className="muted-text">React 19 + Vite</span>
          </div>
        </div>
      </aside>
    </>
  )
}
