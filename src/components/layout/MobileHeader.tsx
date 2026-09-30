interface MobileHeaderProps {
  title: string
  isOpen?: boolean
  onOpenMenu: () => void
}

export function MobileHeader({ title, isOpen = false, onOpenMenu }: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <button
        type="button"
        className="menu-button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="main-sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      <span className="mobile-title">{title}</span>
    </header>
  )
}
