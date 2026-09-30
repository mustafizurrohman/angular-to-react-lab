import { ARCHITECTURAL_PRINCIPLES, MIGRATION_STEPS } from '../data/aboutData.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { PrincipleCard } from '../components/about/PrincipleCard.tsx'
import { RoadmapStepCard } from '../components/about/RoadmapStepCard.tsx'
import './Pages.css'

export function About() {
  return (
    <div className="page-wrapper">
      <PageHeader
        title="Architectural Foundations"
        subtitle="Core paradigms, design patterns, and migration strategies for engineers transitioning from Angular to React."
      />

      <div className="lab-section">
        <SectionHeader
          title="Core React Paradigms"
          description="Understanding the core mental model differences ensures productive code organization and clean component architecture."
        />

        <div className="card-grid">
          {ARCHITECTURAL_PRINCIPLES.map((item, index) => (
            <PrincipleCard key={index} principle={item} />
          ))}
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="Recommended Migration Roadmap"
          description="A battle-tested incremental migration pathway for Angular engineering teams transitioning to React."
        />

        <div className="roadmap-grid">
          {MIGRATION_STEPS.map((step) => (
            <RoadmapStepCard key={step.step} step={step} />
          ))}
        </div>
      </div>
    </div>
  )
}
