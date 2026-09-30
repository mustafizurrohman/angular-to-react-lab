import type { ComparisonPattern } from '../../types/migration.ts'
import { CodePane } from './CodePane.tsx'

interface PatternCardProps {
  pattern: ComparisonPattern
  copiedId: string | null
  onCopy: (code: string, id: string) => void
}

export function PatternCard({ pattern, copiedId, onCopy }: PatternCardProps) {
  return (
    <div className="pattern-card">
      <div className="pattern-card-header">
        <div className="pattern-title-group">
          <h3>{pattern.title}</h3>
          <span className="category-pill">{pattern.category}</span>
        </div>
      </div>

      <p className="pattern-explanation">{pattern.explanation}</p>

      <div className="code-comparison-grid">
        <CodePane
          label="🅰️ Angular Pattern"
          labelClass="angular-label"
          code={pattern.angularSnippet}
          copyId={`${pattern.id}-angular`}
          isCopied={copiedId === `${pattern.id}-angular`}
          onCopy={onCopy}
        />

        <CodePane
          label="⚛️ React Equivalent"
          labelClass="react-label"
          code={pattern.reactSnippet}
          copyId={`${pattern.id}-react`}
          isCopied={copiedId === `${pattern.id}-react`}
          onCopy={onCopy}
        />
      </div>
    </div>
  )
}
