import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: ReactNode
  description: ReactNode
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="lab-header">
      <h2>{title}</h2>
      <p className="section-desc">{description}</p>
    </div>
  )
}
