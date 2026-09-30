import { useState, useRef, useEffect, useCallback } from 'react'

export function useClipboard(timeoutDuration: number = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      clearTimer()
    }
  }, [clearTimer])

  const copyToClipboard = useCallback(
    async (text: string, id: string): Promise<boolean> => {
      clearTimer()

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for older browsers or restricted contexts
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.left = '-9999px'
          textarea.style.top = '-9999px'
          document.body.appendChild(textarea)
          textarea.focus()
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
        }

        setCopiedId(id)
        timeoutRef.current = setTimeout(() => {
          setCopiedId(null)
          timeoutRef.current = null
        }, timeoutDuration)

        return true
      } catch (err) {
        console.error('Failed to copy text to clipboard:', err)
        setCopiedId(null)
        return false
      }
    },
    [clearTimer, timeoutDuration],
  )

  return {
    copiedId,
    copyToClipboard,
  }
}
