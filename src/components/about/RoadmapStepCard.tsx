import type { MigrationStep } from '../../types/about.ts'

interface RoadmapStepCardProps {
  step: MigrationStep
}

export function RoadmapStepCard({ step }: RoadmapStepCardProps) {
  return (
    <div className="roadmap-card">
      <span className="roadmap-step">{step.step}</span>
      <div className="roadmap-content">
        <h4>{step.title}</h4>
        <p>{step.detail}</p>
      </div>
    </div>
  )
}
