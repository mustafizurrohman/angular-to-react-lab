export type RouteCategory = 'core' | 'routing' | 'state' | 'lifecycle'

export interface RouteDemoItem {
  id: string
  title: string
  category: RouteCategory
  description: string
}

export type SortOrder = 'name-asc' | 'name-desc'
