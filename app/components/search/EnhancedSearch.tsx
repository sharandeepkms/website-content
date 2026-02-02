"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Briefcase, BookOpen, Calendar, Settings, Users, Sparkles, X, Network, Clock, Filter, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { buildSearchIndex, searchIndex, type SearchResult } from '@/app/utils/search-index'

interface EnhancedSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const typeIcons = {
  solution: Settings,
  service: Briefcase,
  product: Network,
  blog: FileText,
  'case-study': Briefcase,
  whitepaper: BookOpen,
  event: Calendar,
  documentation: FileText,
  page: FileText,
}

const typeColors = {
  solution: 'bg-blue-100 text-blue-700',
  service: 'bg-purple-100 text-purple-700',
  product: 'bg-green-100 text-green-700',
  blog: 'bg-orange-100 text-orange-700',
  'case-study': 'bg-indigo-100 text-indigo-700',
  whitepaper: 'bg-pink-100 text-pink-700',
  event: 'bg-cyan-100 text-cyan-700',
  documentation: 'bg-gray-100 text-gray-700',
  page: 'bg-slate-100 text-slate-700',
}

const STORAGE_KEY_RECENT = 'search_recent_queries'
const STORAGE_KEY_SUGGESTIONS = 'search_suggestions'

export function EnhancedSearch({ open, onOpenChange }: EnhancedSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  // Build search index once
  const index = useMemo(() => buildSearchIndex(), [])

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY_RECENT)
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored))
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [])

  // Get popular suggestions (based on common queries)
  const popularSuggestions = useMemo(() => [
    'SONiC networking',
    'data center modernization',
    'AI fabrics',
    'cloud migration',
    'network automation',
    'zero trust security',
    'multi-cloud',
    'observability',
  ], [])

  // Handle search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setShowSuggestions(true)
      return
    }

    // Use centralized search function
    let filtered = searchIndex(query, index)

    // Apply type filter
    if (selectedTypeFilter) {
      filtered = filtered.filter((result) => result.type === selectedTypeFilter)
    }

    setResults(filtered)
    setSelectedIndex(0)
    setShowSuggestions(false)
  }, [query, index, selectedTypeFilter])

  // Save recent search
  const saveRecentSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5)
    setRecentSearches(updated)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(updated))
    }
  }, [recentSearches])

  const handleSelect = useCallback((result: SearchResult) => {
    saveRecentSearch(query)
    router.push(result.href)
    onOpenChange(false)
    setQuery('')
  }, [router, onOpenChange, query, saveRecentSearch])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion)
    setShowSuggestions(false)
  }, [])

  const handleRecentSearchClick = useCallback((recent: string) => {
    setQuery(recent)
    setShowSuggestions(false)
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_RECENT)
    }
  }, [])

  // Get unique types from results for filtering
  const availableTypes = useMemo(() => {
    const types = new Set<string>()
    if (query.trim()) {
      const allResults = searchIndex(query, index)
      allResults.forEach(result => types.add(result.type))
    }
    return Array.from(types)
  }, [query, index])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const maxIndex = showSuggestions 
          ? recentSearches.length + popularSuggestions.length - 1
          : results.length - 1
        setSelectedIndex(prev => Math.min(prev + 1, maxIndex))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (showSuggestions && selectedIndex < recentSearches.length) {
          handleRecentSearchClick(recentSearches[selectedIndex])
        } else if (showSuggestions && selectedIndex < recentSearches.length + popularSuggestions.length) {
          handleSuggestionClick(popularSuggestions[selectedIndex - recentSearches.length])
        } else if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, onOpenChange, handleSelect, showSuggestions, recentSearches, popularSuggestions, handleRecentSearchClick, handleSuggestionClick])

  // Global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Search Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search solutions, services, products, resources..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowSuggestions(e.target.value.trim().length === 0)
              }}
              className="flex-1 border-0 focus-visible:ring-0 text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('')
                  setShowSuggestions(true)
                }}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-300 bg-gray-50 text-xs text-gray-500">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </div>

          {/* Filters */}
          {query.trim() && availableTypes.length > 0 && (
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">Filter:</span>
              <button
                onClick={() => setSelectedTypeFilter(null)}
                className={cn(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all",
                  selectedTypeFilter === null
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                All
              </button>
              {availableTypes.map((type) => {
                const Icon = typeIcons[type as keyof typeof typeIcons] || FileText
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedTypeFilter(type)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                      selectedTypeFilter === type
                        ? "bg-primary text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="w-3 h-3" />
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </button>
                )
              })}
            </div>
          )}

          {/* Results / Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto">
            {showSuggestions && query.trim().length === 0 ? (
              <div className="p-4 space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Recent Searches</span>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((recent, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRecentSearchClick(recent)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2",
                            selectedIndex === idx && "bg-gray-100"
                          )}
                        >
                          <Clock className="w-4 h-4 text-gray-400" />
                          {recent}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Suggestions */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Popular Searches</span>
                  </div>
                  <div className="space-y-1">
                    {popularSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2",
                          selectedIndex === recentSearches.length + idx && "bg-gray-100"
                        )}
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="p-2">
                <div className="text-xs text-gray-500 px-3 py-2">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </div>
                {results.map((result, idx) => {
                  const Icon = typeIcons[result.type] || FileText
                  return (
                    <button
                      key={`${result.type}-${result.href}-${idx}`}
                      onClick={() => handleSelect(result)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg transition-all flex items-start gap-3 group",
                        selectedIndex === idx
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-gray-50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                        typeColors[result.type] || "bg-gray-100 text-gray-700"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                            {result.title}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {result.type}
                          </Badge>
                        </div>
                        {result.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">{result.href}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : query.trim() ? (
              <div className="p-8 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-medium mb-1">No results found</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

