import { useAuth } from '../../hooks/useAuth.ts'
import { Icon } from '../common/Icon.tsx'

interface MobileHeaderProps {
  title: string
  isOpen?: boolean
  onOpenMenu: () => void
}

export function MobileHeader({ title, isOpen = false, onOpenMenu }: MobileHeaderProps) {
  const { logout } = useAuth()

  return (
    <header className="mobile-header">
      <div className="mobile-header-left">
        <button
          type="button"
          className="menu-button"
          onClick={onOpenMenu}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="main-sidebar"
        >
          <Icon name={isOpen ? 'x' : 'list'} size={24} aria-hidden="true" />
        </button>
        <span className="mobile-title">{title}</span>
      </div>
      <button
        type="button"
        className="mobile-logout-button"
        onClick={logout}
        title="Log out"
        aria-label="Log out"
      >
        Log out
      </button>
    </header>
  )
}
