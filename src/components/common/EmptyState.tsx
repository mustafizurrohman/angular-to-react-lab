import type { CSSProperties, ReactNode } from 'react'

interface EmptyStateProps {
  children: ReactNode
  style?: CSSProperties
}

export function EmptyState({ children, style }: EmptyStateProps) {
  return (
    <p className="empty-state" style={style}>
      {children}
    </p>
  )
}
