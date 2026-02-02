"use client"

import React, { useState, useMemo } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface SolutionFiltersProps {
  solutions: Array<{
    id: string
    title: string
    description: string
    slug: string
    useCases?: string[]
    industries?: string[]
  }>
  onFilterChange: (filteredSolutions: typeof solutions) => void
}

const filterCategories = [
  { id: 'all', label: 'All Solutions' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'security', label: 'Security' },
  { id: 'networking', label: 'Networking' },
  { id: 'observability', label: 'Observability' },
]

export function SolutionFilters({ solutions, onFilterChange }: SolutionFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredSolutions = useMemo(() => {
    let filtered = [...solutions]

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((solution) => {
        const searchableText = `${solution.title} ${solution.description} ${solution.useCases?.join(' ') || ''} ${solution.industries?.join(' ') || ''}`.toLowerCase()
        
        switch (selectedCategory) {
          case 'ai-ml':
            return searchableText.includes('ai') || searchableText.includes('ml') || searchableText.includes('machine learning') || searchableText.includes('artificial intelligence')
          case 'cloud':
            return searchableText.includes('cloud') || searchableText.includes('multi-cloud') || searchableText.includes('hybrid')
          case 'security':
            return searchableText.includes('security') || searchableText.includes('zero trust') || searchableText.includes('iam') || searchableText.includes('identity')
          case 'networking':
            return searchableText.includes('network') || searchableText.includes('sonic') || searchableText.includes('evpn') || searchableText.includes('vxlan')
          case 'observability':
            return searchableText.includes('observability') || searchableText.includes('visibility') || searchableText.includes('telemetry') || searchableText.includes('monitoring')
          default:
            return true
        }
      })
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter((solution) => {
        const searchableText = `${solution.title} ${solution.description} ${solution.useCases?.join(' ') || ''} ${solution.industries?.join(' ') || ''}`.toLowerCase()
        return searchableText.includes(query)
      })
    }

    return filtered
  }, [solutions, searchQuery, selectedCategory])

  // Update parent component when filters change
  React.useEffect(() => {
    onFilterChange(filteredSolutions)
  }, [filteredSolutions, onFilterChange])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all'

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search solutions..."
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

      {/* Filter Categories */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter className="w-4 h-4" />
          <span className="font-medium">Filter:</span>
        </div>
        {filterCategories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={cn(
              "cursor-pointer px-4 py-1.5 text-sm font-medium transition-all",
              selectedCategory === category.id
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-white hover:bg-gray-50 hover:border-primary/30"
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label}
          </Badge>
        ))}
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
          Showing <span className="font-semibold text-gray-900">{filteredSolutions.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{solutions.length}</span> solutions
        </div>
      )}
    </div>
  )
}

