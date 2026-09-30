import { usePatternFilter } from '../hooks/usePatternFilter.ts'
import { useClipboard } from '../hooks/useClipboard.ts'
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts'
import { PageHeader } from '../components/common/PageHeader.tsx'
import { EmptyState } from '../components/common/EmptyState.tsx'
import { PatternFilterBar } from '../components/migration/PatternFilterBar.tsx'
import { PatternCard } from '../components/migration/PatternCard.tsx'
import './Pages.css'

export function AngularToReact() {
  useDocumentTitle('Angular to React Migration')

  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    filteredPatterns,
  } = usePatternFilter()
  const { copiedId, copyToClipboard } = useClipboard()

  return (
    <div className="page-wrapper">
      <PageHeader
        title="Angular to React Migration Guide"
        subtitle="Interactive concept converter mapping Angular decorators, templates, and services directly to React functional components and hooks."
      />

      <div className="lab-section">
        <PatternFilterBar
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />

        <div className="patterns-container">
          {filteredPatterns.length === 0 ? (
            <EmptyState style={{ marginTop: '2rem' }}>
              No patterns matched your search criteria.
            </EmptyState>
          ) : (
            filteredPatterns.map((pattern) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                copiedId={copiedId}
                onCopy={copyToClipboard}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
