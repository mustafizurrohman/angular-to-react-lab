import { CodePane } from '../migration/CodePane.tsx'
import { useClipboard } from '../../hooks/useClipboard.ts'

const ANGULAR_CONTROL_FLOW_SNIPPET = `@if (tasks().length > 0) {
  @let criticalTasks = getCriticalTasks();
  @let criticalCount = criticalTasks.length;

  <div class="metrics-bar">
    <p>Critical Tasks: <strong>{{ criticalCount }}</strong></p>
  </div>

  @switch (filterMode()) {
    @case ('priority') {
      <div class="task-grid">
        @for (task of tasks(); 
              track task.id; 
              let idx = $index; 
              let isFirst = $first; 
              let isLast = $last; 
              let total = $count) {
          <div class="task-card" [class.first-card]="isFirst" [class.last-card]="isLast">
            <span class="index-pill">#{{ idx + 1 }} / {{ total }}</span>
            <h4>{{ task.title }}</h4>
            <span class="badge" [class]="task.priority">{{ task.priority | uppercase }}</span>
          </div>
        } @empty {
          <p class="empty-notice">No tasks matching the selected priority.</p>
        }
      </div>
    }
    @default {
      <app-task-table [tasks]="tasks()" />
    }
  }
} @else {
  <div class="zero-state">
    <p>Collection is completely empty. Create your first task above.</p>
  </div>
}

<!-- Deferred Chunk Loading with Viewport Trigger & Skeleton Shimmer -->
@defer (on viewport; on hover(infoBtn); prefetch on idle) {
  <app-heavy-metrics-chart [data]="metricsData()" />
} @placeholder (minimum 300ms) {
  <div class="skeleton-chart">
    <div class="shimmer-line"></div>
    <span>Loading Chart Preview...</span>
  </div>
} @loading (after 100ms; minimum 500ms) {
  <div class="spinner-container">
    <app-spinner />
    <span>Loading heavy module bundle...</span>
  </div>
} @error {
  <div class="error-notice">
    <p>Failed to load heavy chart module.</p>
    <button (click)="retryLoad()">Retry</button>
  </div>
}

<button #infoBtn type="button">Hover to Prefetch Chart</button>`

const REACT_CONTROL_FLOW_SNIPPET = `import { lazy, Suspense, useMemo, useState, useTransition } from 'react';
import { ErrorBoundary } from '../common/ErrorBoundary';

// React Code-Splitting Chunk
const HeavyMetricsChart = lazy(() => import('./HeavyMetricsChart'));

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'critical';
}

export function TaskOverview({ tasks }: { tasks: Task[] }) {
  const [filterMode, setFilterMode] = useState<'priority' | 'table'>('priority');
  const [isPending, startTransition] = useTransition();

  // Pure derived state calculation (SRP)
  const criticalTasks = useMemo(
    () => tasks.filter(t => t.priority === 'critical'),
    [tasks]
  );

  if (tasks.length === 0) {
    return (
      <div className="zero-state">
        <p>Collection is completely empty. Create your first task above.</p>
      </div>
    );
  }

  return (
    <div className="task-overview">
      <div className="metrics-bar">
        <p>Critical Tasks: <strong>{criticalTasks.length}</strong></p>
      </div>

      {/* Declarative Switch / Multi-branch Display */}
      {filterMode === 'priority' ? (
        <div className="task-grid">
          {tasks.length === 0 ? (
            <p className="empty-notice">No tasks matching the selected priority.</p>
          ) : (
            tasks.map((task, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === tasks.length - 1;

              return (
                <div
                  key={task.id} // Stable identity key for virtual DOM diffing
                  className={\`task-card \${isFirst ? 'first-card' : ''} \${isLast ? 'last-card' : ''}\`.trim()}
                >
                  <span className="index-pill">#{idx + 1} / {tasks.length}</span>
                  <h4>{task.title}</h4>
                  <span className={\`badge \${task.priority}\`}>{task.priority.toUpperCase()}</span>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <TaskTable tasks={tasks} />
      )}

      {/* Deferred Loading with Suspense & Error Boundary */}
      <ErrorBoundary fallback={<p className="error-notice">Failed to load heavy chart module.</p>}>
        <Suspense fallback={<div className="skeleton-chart">Loading Chart Preview...</div>}>
          <HeavyMetricsChart data={criticalTasks} />
        </Suspense>
      </ErrorBoundary>
    </div>
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
