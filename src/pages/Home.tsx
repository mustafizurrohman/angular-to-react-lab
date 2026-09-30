import { LAB_MODULES } from '../data/labModules.ts'
import { HeroBanner } from '../components/home/HeroBanner.tsx'
import { ModuleCard } from '../components/home/ModuleCard.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import './Pages.css'

export function Home() {
  useDocumentTitle('Home')

  return (
    <div className="page-wrapper">
      <HeroBanner />

      <div className="lab-overview-section">
        <div className="overview-header">
          <SectionHeader
            title="Interactive Lab Modules"
            description="Each navigation path below provides a focused, single-feature lab environment designed to maximize practical comprehension."
          />
        </div>

        <div className="card-grid">
          {LAB_MODULES.map((module) => (
            <ModuleCard key={module.path} module={module} />
          ))}
        </div>
      </div>
    </div>
  )
}
