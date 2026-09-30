import { useRoutingLab } from '../hooks/useRoutingLab.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { RoutingControls } from '../components/routing/RoutingControls.tsx'
import { RoutingResultsList } from '../components/routing/RoutingResultsList.tsx'
import { RouteLocationInspector } from '../components/routing/RouteLocationInspector.tsx'
import { ProgrammaticNavActions } from '../components/routing/ProgrammaticNavActions.tsx'
import './Pages.css'

export function RoutingLab() {
  const {
    currentCategory,
    searchQuery,
    sortBy,
    filteredItems,
    paramsEntries,
    location,
    updateParam,
    clearAllParams,
  } = useRoutingLab()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Client-Side Routing"
        subtitle={
          <>
            Explore declarative client-side navigation with React Router—contrasting hooks like{' '}
            <code>useNavigate</code> and <code>useSearchParams</code> with Angular&apos;s{' '}
            <code>RouterModule</code> and <code>ActivatedRoute</code>.
          </>
        }
      />

      <div className="lab-section">
        <SectionHeader
          title="1. Live URL Search Params Synchronizer"
          description="Use the controls below. Notice how the URL query parameters automatically synchronize with the state without page reloads."
        />

        <RoutingControls
          searchQuery={searchQuery}
          currentCategory={currentCategory}
          sortBy={sortBy}
          hasActiveParams={paramsEntries.length > 0}
          onUpdateParam={updateParam}
          onClearAll={clearAllParams}
        />

        <div className="routing-results-grid">
          <RoutingResultsList items={filteredItems} />
          <RouteLocationInspector location={location} paramsEntries={paramsEntries} />
        </div>
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title={
            <>
              2. Programmatic Navigation with <code>useNavigate</code>
            </>
          }
          description={
            <>
              In React Router, navigation is triggered imperatively with the <code>useNavigate</code> hook, replacing Angular&apos;s injected <code>Router.navigate()</code>.
            </>
          }
        />

        <ProgrammaticNavActions />
      </div>
    </div>
  )
}
