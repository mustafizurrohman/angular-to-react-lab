export type PatternCategory = 'templates' | 'reactivity' | 'lifecycle' | 'di' | 'routing'

export interface ComparisonPattern {
  id: string
  title: string
  category: PatternCategory
  angularSnippet: string
  reactSnippet: string
  explanation: string
}
