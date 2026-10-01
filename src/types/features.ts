export type CategoryGroup =
  | 'core'
  | 'templates'
  | 'reactivity'
  | 'forms-routing'
  | 'network-async'
  | 'performance-tooling'
  | 'ecosystem'

export type SolidPrincipleName = 'SRP' | 'OCP' | 'LSP' | 'ISP' | 'DIP'

export interface SolidPrincipleNote {
  principle: SolidPrincipleName
  title: string
  description: string
}

export interface FeatureChecklistItem {
  id: string
  sectionNumber: number
  sectionTitle: string
  group: CategoryGroup
  name: string
  angularConcept: string
  reactConcept: string
  angularSnippet: string
  reactSnippet: string
  solidNotes: SolidPrincipleNote[]
  keyDifferences: string[]
  tags: string[]
}

export interface ChecklistSectionSummary {
  number: number
  title: string
  group: CategoryGroup
  description: string
  itemCount: number
}

export interface FeatureFilterState {
  searchQuery: string
  selectedGroup: CategoryGroup | 'all'
  selectedSectionNumber: number | null
  selectedSolidPrinciple: SolidPrincipleName | 'all'
  statusFilter: 'all' | 'completed' | 'pending'
}
