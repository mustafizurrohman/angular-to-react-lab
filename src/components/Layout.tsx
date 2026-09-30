import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SideNav } from './SideNav.tsx'
import { MobileHeader } from './layout/MobileHeader.tsx'
import './Layout.css'

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <SideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="layout-main">
        <MobileHeader
          title="Angular to React Lab"
          onOpenMenu={() => setIsSidebarOpen(true)}
        />

        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
