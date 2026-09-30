import { useSearchParams, useLocation } from 'react-router-dom'
import { ROUTING_DEMO_ITEMS } from '../data/routingData.ts'
import type { RouteCategory, RouteDemoItem, SortOrder } from '../types/routing.ts'

export function useRoutingLab() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const currentCategory = (searchParams.get('category') || 'all') as RouteCategory | 'all'
  const searchQuery = searchParams.get('q') || ''
  const sortBy = (searchParams.get('sort') || 'name-asc') as SortOrder

  const updateParam = (key: string, value: string) => {
    const nextParams = new URLSearchParams(searchParams)
    if (value && value !== 'all') {
      nextParams.set(key, value)
    } else {
      nextParams.delete(key)
    }
    setSearchParams(nextParams)
  }

  const clearAllParams = () => {
    setSearchParams(new URLSearchParams())
  }

  const filteredItems: RouteDemoItem[] = ROUTING_DEMO_ITEMS.filter((item) => {
    const matchesCategory = currentCategory === 'all' || item.category === currentCategory
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesQuery
  }).sort((a, b) => {
    if (sortBy === 'name-desc') return b.title.localeCompare(a.title)
    return a.title.localeCompare(b.title)
  })

  const paramsEntries = Array.from(searchParams.entries())

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
