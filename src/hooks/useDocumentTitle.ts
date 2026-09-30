import { useEffect, useRef } from 'react'

const DEFAULT_TITLE = 'Angular to React Lab'

export function useDocumentTitle(title?: string, retainOnUnmount: boolean = false) {
  const defaultTitle = useRef<string>(document.title || DEFAULT_TITLE)

  useEffect(() => {
    if (title) {
      document.title = `${title} | ${DEFAULT_TITLE}`
    } else {
      document.title = DEFAULT_TITLE
    }
  }, [title])

  useEffect(() => {
    const originalTitle = defaultTitle.current
    return () => {
      if (!retainOnUnmount) {
        document.title = originalTitle
      }
    }
  }, [retainOnUnmount])
}
