export type PatternCategory =
  | 'architecture'
  | 'templates'
  | 'control-flow'
  | 'defer'
  | 'directives'
  | 'reactivity'
  | 'lifecycle'
  | 'di'
  | 'forms'
  | 'routing'
  | 'http'
  | 'rxjs-async'
  | 'security-a11y'
  | 'performance'
  | 'cdk-material'
  | 'testing'

export interface ComparisonPattern {
  id: string
  title: string
  category: PatternCategory
  angularSnippet: string
  reactSnippet: string
  explanation: string
  solidPrinciple?: string
  bestPractices?: string[]
}
