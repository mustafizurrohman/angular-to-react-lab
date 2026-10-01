import type { FeatureChecklistItem } from '../../types/features.ts'
import { CodePane } from '../migration/CodePane.tsx'
import { Icon } from '../common/Icon.tsx'

interface ChecklistItemCardProps {
  item: FeatureChecklistItem
  isCompleted: boolean
  isExpanded: boolean
  copiedId: string | null
  onToggleCompleted: (id: string) => void
  onToggleExpanded: (id: string) => void
  onCopy: (code: string, id: string) => void
}

export function ChecklistItemCard({
  item,
  isCompleted,
  isExpanded,
  copiedId,
  onToggleCompleted,
  onToggleExpanded,
  onCopy,
}: ChecklistItemCardProps) {
  return (
    <div className={`checklist-item-card ${isCompleted ? 'completed' : ''} ${isExpanded ? 'expanded' : ''}`}>
      <div className="checklist-item-header">
        <label className="checkbox-container" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleCompleted(item.id)}
            aria-label={`Mark ${item.name} as completed`}
          />
          <span className="checkmark" />
        </label>

        <div className="item-title-section" onClick={() => onToggleExpanded(item.id)}>
          <div className="item-title-row">
            <h4 className="item-name">{item.name}</h4>
            <div className="item-badges">
              {item.solidNotes.map((note) => (
                <span key={note.principle} className="solid-pill" title={`${note.title}: ${note.description}`}>
                  {note.principle}
                </span>
              ))}
            </div>
          </div>
          <div className="item-concepts-brief">
            <span className="concept-brief-angular">
              <strong>🅰️ Angular:</strong> {item.angularConcept}
            </span>
            <span className="concept-brief-react">
              <strong>⚛️ React:</strong> {item.reactConcept}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="expand-btn"
          onClick={() => onToggleExpanded(item.id)}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse feature details' : 'Expand feature details'}
        >
          <Icon name={isExpanded ? 'caret-up' : 'caret-down'} size={18} />
        </button>
      </div>

      {isExpanded && (
        <div className="checklist-item-body">
          <div className="code-comparison-grid">
            <CodePane
              label="🅰️ Modern Angular Implementation"
              labelClass="angular-label"
              code={item.angularSnippet}
              copyId={`${item.id}-angular`}
              isCopied={copiedId === `${item.id}-angular`}
              onCopy={onCopy}
            />
            <CodePane
              label="⚛️ Modern ReactJS Implementation"
              labelClass="react-label"
              code={item.reactSnippet}
              copyId={`${item.id}-react`}
              isCopied={copiedId === `${item.id}-react`}
              onCopy={onCopy}
            />
          </div>

          <div className="solid-notes-grid">
            {item.solidNotes.map((note) => (
              <div key={note.principle} className="solid-card">
                <div className="solid-card-header">
                  <span className="solid-badge">{note.principle}</span>
                  <span className="solid-title">{note.title}</span>
                </div>
                <p className="solid-desc">{note.description}</p>
              </div>
            ))}
          </div>

          {item.keyDifferences && item.keyDifferences.length > 0 && (
            <div className="differences-box">
              <h5>Architectural Differentiators:</h5>
              <ul>
                {item.keyDifferences.map((diff, idx) => (
                  <li key={idx}>{diff}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="item-tags-row">
            {item.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
