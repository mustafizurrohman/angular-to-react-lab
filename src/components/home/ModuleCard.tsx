import { Link } from 'react-router-dom'
import type { LabModule } from '../../types/home.ts'
import { Icon } from '../common/Icon.tsx'

interface ModuleCardProps {
  module: LabModule
}

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <div className="feature-card hub-card">
      <div className="card-top">
        <span className="badge">{module.badge}</span>
      </div>
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      <div className="card-footer-action">
        <Link
          to={module.path}
          className="counter-btn hub-btn"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <span>{module.actionText}</span>
          <Icon name="arrow-right" size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
