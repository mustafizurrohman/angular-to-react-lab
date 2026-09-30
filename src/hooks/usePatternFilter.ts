import { useState, useMemo } from 'react'
import { MIGRATION_PATTERNS } from '../data/migrationPatterns.ts'
import type { ComparisonPattern, PatternCategory } from '../types/migration.ts'

export function usePatternFilter() {
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredPatterns: ComparisonPattern[] = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return MIGRATION_PATTERNS.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
      if (!matchesCategory) return false

      if (!query) return true

      return (
        p.title.toLowerCase().includes(query) ||
        p.explanation.toLowerCase().includes(query) ||
        p.angularSnippet.toLowerCase().includes(query) ||
        p.reactSnippet.toLowerCase().includes(query)
      )
    })
  }, [selectedCategory, searchTerm])

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    filteredPatterns,
  }
}
