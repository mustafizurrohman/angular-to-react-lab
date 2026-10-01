import { useState, useMemo, useCallback } from 'react'
import { CHECKLIST_ITEMS, CHECKLIST_SECTIONS } from '../data/featureChecklistData.ts'
import type {
  CategoryGroup,
  FeatureChecklistItem,
  SolidPrincipleName,
} from '../types/features.ts'

export function useFeatureChecklist() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<CategoryGroup | 'all'>('all')
  const [selectedSectionNumber, setSelectedSectionNumber] = useState<number | null>(null)
  const [selectedSolidPrinciple, setSelectedSolidPrinciple] = useState<SolidPrincipleName | 'all'>('all')
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set(['sec1-standalone-components', 'sec2-template-binding', 'sec8-signals-reactivity']))
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(['sec1-standalone-components', 'sec3-control-flow', 'sec8-signals-reactivity']))

  const toggleCompleted = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const toggleExpanded = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  const expandAll = useCallback(() => {
    setExpandedIds(new Set(CHECKLIST_ITEMS.map((item) => item.id)))
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedIds(new Set())
  }, [])

  const resetFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedGroup('all')
    setSelectedSectionNumber(null)
    setSelectedSolidPrinciple('all')
  }, [])

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    return CHECKLIST_ITEMS.filter((item) => {
      if (selectedGroup !== 'all' && item.group !== selectedGroup) return false
      if (selectedSectionNumber !== null && item.sectionNumber !== selectedSectionNumber) return false
      if (
        selectedSolidPrinciple !== 'all' &&
        !item.solidNotes.some((n) => n.principle === selectedSolidPrinciple)
      ) {
        return false
      }

      if (!q) return true

      return (
        item.name.toLowerCase().includes(q) ||
        item.sectionTitle.toLowerCase().includes(q) ||
        item.angularConcept.toLowerCase().includes(q) ||
        item.reactConcept.toLowerCase().includes(q) ||
        item.angularSnippet.toLowerCase().includes(q) ||
        item.reactSnippet.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [searchQuery, selectedGroup, selectedSectionNumber, selectedSolidPrinciple])

  const totalCount = CHECKLIST_ITEMS.length
  const completedCount = useMemo(() => {
    let count = 0
    for (const id of completedIds) {
      if (CHECKLIST_ITEMS.some((item) => item.id === id)) {
        count++
      }
    }
    return count
  }, [completedIds])

  const progressPercentage = Math.round((completedCount / (totalCount || 1)) * 100)

  // Group filtered items by section number
  const groupedSections = useMemo(() => {
    const sectionMap = new Map<number, FeatureChecklistItem[]>()

    for (const item of filteredItems) {
      const list = sectionMap.get(item.sectionNumber) ?? []
      list.push(item)
      sectionMap.set(item.sectionNumber, list)
    }

    return CHECKLIST_SECTIONS.filter((sec) => sectionMap.has(sec.number)).map((sec) => ({
      ...sec,
      items: sectionMap.get(sec.number) ?? [],
    }))
  }, [filteredItems])

  return {
    searchQuery,
    setSearchQuery,
    selectedGroup,
    setSelectedGroup,
    selectedSectionNumber,
    setSelectedSectionNumber,
    selectedSolidPrinciple,
    setSelectedSolidPrinciple,
    completedIds,
    expandedIds,
    toggleCompleted,
    toggleExpanded,
    expandAll,
    collapseAll,
    resetFilters,
    filteredItems,
    groupedSections,
    totalCount,
    completedCount,
    progressPercentage,
  }
}
