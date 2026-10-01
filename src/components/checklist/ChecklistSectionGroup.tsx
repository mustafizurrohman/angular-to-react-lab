import type { FeatureChecklistItem } from '../../types/features.ts'
import { ChecklistItemCard } from './ChecklistItemCard.tsx'

interface ChecklistSectionGroupProps {
  sectionNumber: number
  sectionTitle: string
  description: string
  items: FeatureChecklistItem[]
  completedIds: Set<string>
  expandedIds: Set<string>
  copiedId: string | null
  onToggleCompleted: (id: string) => void
  onToggleExpanded: (id: string) => void
  onCopy: (code: string, id: string) => void
}

export function ChecklistSectionGroup({
  sectionNumber,
  sectionTitle,
  description,
  items,
  completedIds,
  expandedIds,
  copiedId,
  onToggleCompleted,
  onToggleExpanded,
  onCopy,
}: ChecklistSectionGroupProps) {
  const completedCount = items.filter((item) => completedIds.has(item.id)).length
  const totalCount = items.length

  return (
    <section className="checklist-section-group" aria-labelledby={`sec-heading-${sectionNumber}`}>
      <div className="section-group-header">
        <div className="section-title-wrapper">
          <span className="section-num-badge">#{sectionNumber}</span>
          <div>
            <h3 id={`sec-heading-${sectionNumber}`} className="section-main-title">
              {sectionTitle}
            </h3>
            <p className="section-main-desc">{description}</p>
          </div>
        </div>

        <div className="section-status-badge">
          {completedCount} / {totalCount} completed
        </div>
      </div>

      <div className="section-items-container">
        {items.map((item) => (
          <ChecklistItemCard
            key={item.id}
            item={item}
            isCompleted={completedIds.has(item.id)}
            isExpanded={expandedIds.has(item.id)}
            copiedId={copiedId}
            onToggleCompleted={onToggleCompleted}
            onToggleExpanded={onToggleExpanded}
            onCopy={onCopy}
          />
        ))}
      </div>
    </section>
  )
}
