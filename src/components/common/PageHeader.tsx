import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle: ReactNode
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </div>
  )
}
