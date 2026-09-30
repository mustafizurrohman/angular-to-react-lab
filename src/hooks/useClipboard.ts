import { useState } from 'react'

export function useClipboard(timeoutDuration: number = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), timeoutDuration)
    })
  }

  return {
    copiedId,
    copyToClipboard,
  }
}
