import { useState, useEffect, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.ts'
import { LoginMask } from './auth/LoginMask.tsx'
import { SideNav } from './SideNav.tsx'
import { MobileHeader } from './layout/MobileHeader.tsx'
import { ErrorBoundary } from './common/ErrorBoundary.tsx'
import { ScrollToTop } from './common/ScrollToTop.tsx'
import './Layout.css'

export function Layout() {
  const { isAuthenticated } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false)
  }, [])

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarOpen])

  if (!isAuthenticated) {
    return <LoginMask />
  }

  return (
    <div className="app-layout">
      <ScrollToTop />

      <SideNav
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="layout-main">
        <MobileHeader
          title="Angular to React Lab"
          isOpen={isSidebarOpen}
          onOpenMenu={handleOpenSidebar}
        />

        <main className="content-container">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
