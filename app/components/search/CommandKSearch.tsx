"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Briefcase, BookOpen, Calendar, Settings, Users, Sparkles, X, Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { buildSearchIndex, searchIndex, type SearchResult } from '@/app/utils/search-index'

interface CommandKSearchProps {
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

export function CommandKSearch({ open, onOpenChange }: CommandKSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Build search index once
  const index = useMemo(() => buildSearchIndex(), [])

  // Handle search
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      return
    }

    // Use centralized search function
    const filtered = searchIndex(query, index)
    setResults(filtered)
    setSelectedIndex(0)
  }, [query, index])

  const handleSelect = useCallback((result: SearchResult) => {
    router.push(result.href)
    onOpenChange(false)
    setQuery('')
  }, [router, onOpenChange])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelect(results[selectedIndex])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, onOpenChange, handleSelect])

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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
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
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search solutions, services, products, blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 text-lg"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[400px] overflow-y-auto">
            {query.trim().length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Start typing to search...</p>
                <p className="text-gray-400 text-xs mt-2">Press Cmd+K or Ctrl+K to open this search</p>
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No results found</p>
                <p className="text-gray-400 text-xs mt-2">Try different keywords</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result, index) => {
                  const Icon = typeIcons[result.type]
                  return (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelect(result)}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors",
                        index === selectedIndex ? "bg-primary/10" : "hover:bg-gray-50"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                        typeColors[result.type]
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {result.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1">{result.description}</p>
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            {result.tags.map(tag => (
                              <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↑↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↵</kbd>
                <span>Select</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>AI-Powered Search</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

