import type { ArchitecturalPrinciple } from '../../types/about.ts'
import { Icon } from '../common/Icon.tsx'

interface PrincipleCardProps {
  principle: ArchitecturalPrinciple
}

export function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <div className="feature-card">
      <div className="principle-icon" aria-hidden="true">
        <Icon name={principle.icon} size={32} weight="duotone" color="var(--accent)" />
      </div>
      <h3>{principle.title}</h3>
      <p>{principle.description}</p>
    </div>
  )
}
