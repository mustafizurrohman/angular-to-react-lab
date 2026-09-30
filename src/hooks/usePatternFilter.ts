import { useState } from 'react'
import { MIGRATION_PATTERNS } from '../data/migrationPatterns.ts'
import type { ComparisonPattern, PatternCategory } from '../types/migration.ts'

export function usePatternFilter() {
  const [selectedCategory, setSelectedCategory] = useState<PatternCategory | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredPatterns: ComparisonPattern[] = MIGRATION_PATTERNS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.angularSnippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reactSnippet.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    filteredPatterns,
  }
}
