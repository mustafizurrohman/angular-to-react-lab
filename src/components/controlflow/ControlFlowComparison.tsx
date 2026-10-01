import { CodePane } from '../migration/CodePane.tsx'
import { useClipboard } from '../../hooks/useClipboard.ts'

const ANGULAR_CONTROL_FLOW_SNIPPET = `@if (tasks.length > 0) {
  @let criticalCount = getCriticalCount();
  <p>Critical: {{ criticalCount }}</p>

  @for (task of tasks; track task.id; let idx = $index; let first = $first; let count = $count) {
    <div [class.first-row]="first">
      #{{ idx + 1 }} / {{ count }}: {{ task.title }}
    </div>
  } @empty {
    <p>No tasks remaining.</p>
  }
} @else {
  <p>Collection is completely empty.</p>
}

<!-- Deferred Chunk Loading -->
@defer (on viewport; prefetch on idle) {
  <app-heavy-metrics-chart />
} @placeholder (minimum 300ms) {
  <div class="skeleton-chart" />
} @loading (minimum 500ms) {
  <app-spinner />
} @error {
  <p>Failed to load heavy chart module.</p>
}`

const REACT_CONTROL_FLOW_SNIPPET = `// React JSX Control Flow & Suspense
const HeavyMetricsChart = lazy(() => import('./HeavyMetricsChart'));

export function TaskOverview({ tasks }: { tasks: Task[] }) {
  const criticalCount = tasks.filter(t => t.priority === 'critical').length;

  return (
    <>
      {tasks.length === 0 ? (
        <p>No tasks remaining (Angular @empty equivalent).</p>
      ) : (
        <>
          <p>Critical: {criticalCount}</p>
          {tasks.map((task, idx) => (
            <div key={task.id} className={idx === 0 ? 'first-row' : ''}>
              #{idx + 1} / {tasks.length}: {task.title}
            </div>
          ))}
        </>
      )}

      {/* Deferred Loading with Suspense & ErrorBoundary */}
      <ErrorBoundary fallback={<p>Failed to load heavy chart module.</p>}>
        <Suspense fallback={<div className="skeleton-chart" />}>
          <HeavyMetricsChart />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}`

export function ControlFlowComparison() {
  const { copiedId, copyToClipboard } = useClipboard()

  return (
    <div className="architecture-comparison-card">
      <div className="code-comparison-grid">
        <CodePane
          label="🅰️ Angular Modern Control Flow & @defer"
          labelClass="angular-label"
          code={ANGULAR_CONTROL_FLOW_SNIPPET}
          copyId="controlflow-arch-angular"
          isCopied={copiedId === 'controlflow-arch-angular'}
          onCopy={copyToClipboard}
        />
        <CodePane
          label="⚛️ React JSX & Suspense Lazy Chunking"
          labelClass="react-label"
          code={REACT_CONTROL_FLOW_SNIPPET}
          copyId="controlflow-arch-react"
          isCopied={copiedId === 'controlflow-arch-react'}
          onCopy={copyToClipboard}
        />
      </div>

      <div className="solid-notes-grid" style={{ marginTop: '1.25rem' }}>
        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">SRP</span>
            <span className="solid-title">Single Responsibility Principle</span>
          </div>
          <p className="solid-desc">
            Display mapping and async lazy-chunk boundaries are cleanly separated, keeping parent components unaware of chunk transport internals.
          </p>
        </div>

        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">LSP</span>
            <span className="solid-title">Liskov Substitution Principle</span>
          </div>
          <p className="solid-desc">
            Any list item satisfying the identity key contract (`task.id`) can be rendered or replaced during reconciliation without breaking list ordering.
          </p>
        </div>

        <div className="solid-card">
          <div className="solid-card-header">
            <span className="solid-badge">OCP</span>
            <span className="solid-title">Open/Closed Principle</span>
          </div>
          <p className="solid-desc">
            Suspense and @defer allow wrapping heavy view components without altering internal rendering logic.
          </p>
        </div>
      </div>
    </div>
  )
}
