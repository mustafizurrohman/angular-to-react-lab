import { useMemo } from 'react'
import { Icon } from '../common/Icon.tsx'
import {
  detectFileType,
  tokenizeCode,
  formatCode,
} from '../../utils/codeHighlighter.ts'
import './CodePane.css'

export interface CodePaneProps {
  label: string
  labelClass?: string
  code: string
  copyId: string
  isCopied: boolean
  onCopy: (code: string, id: string) => void
  fileName?: string
  fileType?: string
  language?: 'typescript' | 'tsx' | 'html' | 'javascript' | 'css' | 'json' | 'auto'
  showLineNumbers?: boolean
  maxHeight?: string | number
}

export function CodePane({
  label,
  labelClass = '',
  code,
  copyId,
  isCopied,
  onCopy,
  fileName,
  fileType,
  language,
  showLineNumbers = true,
  maxHeight,
}: CodePaneProps) {
  const formattedCode = useMemo(() => formatCode(code), [code])

  const fileTypeInfo = useMemo(
    () => detectFileType(code, label, labelClass, fileType, fileName, language),
    [code, label, labelClass, fileType, fileName, language]
  )

  const codeLines = useMemo(() => tokenizeCode(formattedCode), [formattedCode])

  return (
    <div
      className={`code-pane filetype-${fileTypeInfo.type} framework-${fileTypeInfo.framework}`}
    >
      <div className="code-header">
        <div className="code-header-left">
          <span className={`fw-label ${labelClass}`}>{label}</span>
          <span
            className={`file-badge ${fileTypeInfo.badgeClass}`}
            title={`File: ${fileTypeInfo.name} (${fileTypeInfo.label})`}
          >
            <Icon name={fileTypeInfo.iconName} size={13} aria-hidden="true" />
            <span>{fileTypeInfo.name}</span>
          </span>
          <span className="file-line-count">
            {codeLines.length} {codeLines.length === 1 ? 'line' : 'lines'}
          </span>
        </div>

        <div className="code-header-right">
          <button
            type="button"
            className={`copy-btn ${isCopied ? 'copied' : ''}`}
            onClick={() => onCopy(formattedCode, copyId)}
            aria-label={`Copy ${label} code (${fileTypeInfo.name})`}
            aria-live="polite"
          >
            <Icon name={isCopied ? 'check' : 'copy'} size={13} aria-hidden="true" />
            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      <pre
        className="code-block"
        tabIndex={0}
        aria-label={`${label} (${fileTypeInfo.name}) code snippet`}
        style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
      >
        <code>
          {codeLines.map((line) => (
            <div key={line.lineNumber} className="code-line">
              {showLineNumbers && (
                <span className="line-number" aria-hidden="true">
                  {line.lineNumber}
                </span>
              )}
              <span className="line-content">
                {line.tokens.map((token, tokenIdx) => (
                  <span
                    key={tokenIdx}
                    className={`tok tok-${token.type}`}
                  >
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
