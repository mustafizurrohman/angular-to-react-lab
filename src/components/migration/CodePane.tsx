interface CodePaneProps {
  label: string
  labelClass: string
  code: string
  copyId: string
  isCopied: boolean
  onCopy: (code: string, id: string) => void
}

export function CodePane({
  label,
  labelClass,
  code,
  copyId,
  isCopied,
  onCopy,
}: CodePaneProps) {
  return (
    <div className="code-pane">
      <div className="code-header">
        <span className={`fw-label ${labelClass}`}>{label}</span>
        <button
          type="button"
          className="copy-btn"
          onClick={() => onCopy(code, copyId)}
          aria-label={`Copy ${label} code`}
          aria-live="polite"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-block" tabIndex={0} aria-label={`${label} code snippet`}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
