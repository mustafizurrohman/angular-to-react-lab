import type { ArchitecturalPrinciple } from '../../types/about.ts'

interface PrincipleCardProps {
  principle: ArchitecturalPrinciple
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <div className="feature-card">
      <div className="principle-icon" aria-hidden="true">
        {principle.icon}
      </div>
      <h3>{principle.title}</h3>
      <p>{principle.description}</p>
    </div>
  )
}
