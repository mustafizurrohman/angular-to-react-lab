import { useControlFlowLab } from '../hooks/useControlFlowLab.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { SectionHeader } from '../components/common/SectionHeader.tsx'
import { ControlFlowPlayground } from '../components/controlflow/ControlFlowPlayground.tsx'
import { DeferredLoadingSimulator } from '../components/controlflow/DeferredLoadingSimulator.tsx'
import { ControlFlowComparison } from '../components/controlflow/ControlFlowComparison.tsx'
import './Pages.css'

export function ControlFlowLab() {
  useDocumentTitle('Control Flow & Defer')

  const {
    tasks,
    filteredTasks,
    filterPriority,
    setFilterPriority,
    searchQuery,
    setSearchQuery,
    showCompletedOnly,
    setShowCompletedOnly,
    toggleTask,
    addTask,
    removeTask,
    clearAllTasks,
    resetDefaultTasks,
    deferTrigger,
    deferState,
    timerSeconds,
    executeDeferTrigger,
    resetDeferSimulation,
  } = useControlFlowLab()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Control Flow & Deferred Loading Lab"
        subtitle={
          <>
            Explore modern iteration variables (<code>$index</code>, <code>$count</code>, <code>$first</code>, <code>$last</code>), empty state blocks (<code>@empty</code>), conditional branching, and lazy chunk deferred loading (<code>@defer</code> vs React <code>Suspense</code> / <code>lazy</code>).
          </>
        }
      />

      <div className="lab-section">
        <SectionHeader
          title="1. Modern Control Flow & Iteration Inspector"
          description="Filter or clear tasks to observe contextual loop variables and empty state fallbacks in action."
        />

        <ControlFlowPlayground
          tasks={tasks}
          filteredTasks={filteredTasks}
          filterPriority={filterPriority}
          searchQuery={searchQuery}
          showCompletedOnly={showCompletedOnly}
          onPriorityChange={setFilterPriority}
          onSearchChange={setSearchQuery}
          onToggleCompletedOnly={setShowCompletedOnly}
          onToggleTask={toggleTask}
          onAddTask={addTask}
          onRemoveTask={removeTask}
          onClearAll={clearAllTasks}
          onResetDefault={resetDefaultTasks}
        />
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="2. Deferred View Hydration Simulator (@defer vs React Suspense)"
          description="Test various trigger models (viewport, user interaction, timer, immediate, error recovery) and see how chunks transition from placeholder to loading to fully hydrated view."
        />

        <DeferredLoadingSimulator
          deferTrigger={deferTrigger}
          deferState={deferState}
          timerSeconds={timerSeconds}
          onTriggerChange={executeDeferTrigger}
          onReset={resetDeferSimulation}
        />
      </div>

      <div className="lab-section" style={{ marginTop: '2.5rem' }}>
        <SectionHeader
          title="3. Architectural Comparison: Control Flow & SOLID Principles"
          description="Review code-level mapping between Angular v17+ control blocks and React 19 JSX idioms."
        />

        <ControlFlowComparison />
      </div>
    </div>
  )
}
