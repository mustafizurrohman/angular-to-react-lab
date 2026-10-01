import {
  ARCHITECTURAL_PRINCIPLES,
  SOLID_PRINCIPLES_LIST,
  MIGRATION_STEPS,
} from '../data/aboutData.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { PrincipleCard } from '../components/about/PrincipleCard.tsx'
import { RoadmapStepCard } from '../components/about/RoadmapStepCard.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import './Pages.css'

export function About() {
  useDocumentTitle('Architectural Foundations & SOLID')

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Architectural Foundations & SOLID Principles"
        subtitle="Core paradigms, design patterns, and SOLID engineering principles for teams transitioning between Angular and React."
      />

      <div className="lab-section">
        <SectionHeader
          title="1. Core React & Modern Frontend Paradigms"
          description="Understanding mental model differences ensures productive code organization, clean component boundaries, and high performance."
        />

        <div className="card-grid">
          {ARCHITECTURAL_PRINCIPLES.map((item) => (
            <PrincipleCard key={item.title} principle={item} />
          ))}
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="2. SOLID Principles in Angular vs React Architecture"
          description="A breakdown of how classic Object-Oriented SOLID principles translate into modern Angular (Signals, DI, Decorators) and React (Hooks, Composition, Context)."
        />

        <div className="solid-principles-about-grid">
          {SOLID_PRINCIPLES_LIST.map((sp) => (
            <div key={sp.principle} className="solid-about-card">
              <div className="solid-about-header">
                <span className="solid-tag">{sp.principle}</span>
                <h3>{sp.title}</h3>
              </div>
              <p className="solid-about-desc">{sp.description}</p>

              <div className="solid-framework-comparison">
                <div className="solid-fw-col">
                  <strong>🅰️ In Angular:</strong>
                  <span>{sp.angularApproach}</span>
                </div>
                <div className="solid-fw-col">
                  <strong>⚛️ In React:</strong>
                  <span>{sp.reactApproach}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="3. Recommended Migration Roadmap"
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
