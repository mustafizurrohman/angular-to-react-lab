import { useMemo, useCallback } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { ROUTING_DEMO_ITEMS } from '../data/routingData.ts'
import type { RouteCategory, RouteDemoItem, SortOrder } from '../types/routing.ts'

export function useRoutingLab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const currentCategory = (searchParams.get('category') || 'all') as RouteCategory | 'all'
  const searchQuery = searchParams.get('q') || ''
  const sortBy = (searchParams.get('sort') || 'name-asc') as SortOrder

  const updateParam = useCallback(
    (key: string, value: string) => {
      const nextParams = new URLSearchParams(searchParams)
      if (value && value !== 'all') {
        nextParams.set(key, value)
      } else {
        nextParams.delete(key)
      }
      setSearchParams(nextParams)
    },
    [searchParams, setSearchParams],
  )

  const clearAllParams = useCallback(() => {
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  const filteredItems: RouteDemoItem[] = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return ROUTING_DEMO_ITEMS.filter((item) => {
      const matchesCategory = currentCategory === 'all' || item.category === currentCategory
      if (!matchesCategory) return false

      if (!query) return true

      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      )
    }).sort((a, b) => {
      if (sortBy === 'name-desc') return b.title.localeCompare(a.title)
      return a.title.localeCompare(b.title)
    })
  }, [currentCategory, searchQuery, sortBy])

  const paramsEntries = useMemo(() => Array.from(searchParams.entries()), [searchParams])

  return {
    currentCategory,
    searchQuery,
    sortBy,
    filteredItems,
    paramsEntries,
    location,
    updateParam,
    clearAllParams,
  }
}
