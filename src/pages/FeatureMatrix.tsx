import { useFeatureChecklist } from '../hooks/useFeatureChecklist.ts'
import { useClipboard } from '../hooks/useClipboard.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { EmptyState } from '../components/common/EmptyState.tsx'
import { ChecklistFilterBar } from '../components/checklist/ChecklistFilterBar.tsx'
import { ChecklistSectionGroup } from '../components/checklist/ChecklistSectionGroup.tsx'
import './Pages.css'

export function FeatureMatrix() {
  useDocumentTitle('Feature Checklist Matrix')

  const {
    searchQuery,
    setSearchQuery,
    selectedGroup,
    setSelectedGroup,
    selectedSolidPrinciple,
    setSelectedSolidPrinciple,
    completedIds,
    expandedIds,
    toggleCompleted,
    toggleExpanded,
    expandAll,
    collapseAll,
    resetFilters,
    filteredItems,
    groupedSections,
    totalCount,
    completedCount,
    progressPercentage,
  } = useFeatureChecklist()

  const { copiedId, copyToClipboard } = useClipboard()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Exhaustive Angular to ReactJS Feature Matrix"
        subtitle={
          <>
            Comprehensive architectural mapping covering all 35 framework domains—including modern{' '}
            <code>Signals</code>, built-in control flow (<code>@if</code>, <code>@for</code>),{' '}
            <code>@defer</code> loading, reactive forms, DI, HTTP interceptors, CDK, and SOLID design principles.
          </>
        }
      />

      <div className="lab-section">
        <ChecklistFilterBar
          searchQuery={searchQuery}
          selectedGroup={selectedGroup}
          selectedSolidPrinciple={selectedSolidPrinciple}
          completedCount={completedCount}
          totalCount={totalCount}
          progressPercentage={progressPercentage}
          onSearchChange={setSearchQuery}
          onGroupChange={setSelectedGroup}
          onSolidPrincipleChange={setSelectedSolidPrinciple}
          onExpandAll={expandAll}
          onCollapseAll={collapseAll}
          onReset={resetFilters}
        />

        <div className="matrix-sections-container">
          {filteredItems.length === 0 ? (
            <EmptyState style={{ marginTop: '2rem' }}>
              No features matched your search and filter criteria. Try resetting filters.
            </EmptyState>
          ) : (
            groupedSections.map((sec) => (
              <ChecklistSectionGroup
                key={sec.number}
                sectionNumber={sec.number}
                sectionTitle={sec.title}
                description={sec.description}
                items={sec.items}
                completedIds={completedIds}
                expandedIds={expandedIds}
                copiedId={copiedId}
                onToggleCompleted={toggleCompleted}
                onToggleExpanded={toggleExpanded}
                onCopy={copyToClipboard}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
