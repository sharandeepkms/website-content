"use client"

import React, { useState, useMemo } from 'react'
import { Search, X, Filter, TrendingUp, Award, Target, Zap } from 'lucide-react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import type { CaseStudy } from '@/app/data/case-studies'

interface CaseStudyFiltersProps {
  caseStudies: CaseStudy[]
  onFilterChange: (filteredStudies: CaseStudy[]) => void
}

export function CaseStudyFilters({ caseStudies, onFilterChange }: CaseStudyFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Extract unique industries and tags
  const industries = useMemo(() => {
    const unique = new Set<string>()
    caseStudies.forEach(study => unique.add(study.industry))
    return Array.from(unique).sort()
  }, [caseStudies])

  const tags = useMemo(() => {
    const unique = new Set<string>()
    caseStudies.forEach(study => study.tags.forEach(tag => unique.add(tag)))
    return Array.from(unique).sort()
  }, [caseStudies])

  const filteredStudies = useMemo(() => {
    let filtered = [...caseStudies]

    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(study => study.industry === selectedIndustry)
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(study => study.tags.includes(selectedTag))
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(study => {
        const searchableText = `${study.title} ${study.summary} ${study.industry} ${study.tags.join(' ')} ${study.background} ${study.solution}`.toLowerCase()
        return searchableText.includes(query)
      })
    }

    return filtered
  }, [caseStudies, searchQuery, selectedIndustry, selectedTag])

  // Update parent component when filters change
  React.useEffect(() => {
    onFilterChange(filteredStudies)
  }, [filteredStudies, onFilterChange])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedIndustry('all')
    setSelectedTag('all')
  }

  const hasActiveFilters = searchQuery.trim() !== '' || selectedIndustry !== 'all' || selectedTag !== 'all'

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search case studies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 pr-10 h-12 text-base"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filters:</span>
        </div>

        {/* Industry Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Industry:</span>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Tag:</span>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-600 hover:text-gray-900"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Results Count */}
      {hasActiveFilters && (
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredStudies.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{caseStudies.length}</span> case studies
        </div>
      )}
    </div>
  )
}

