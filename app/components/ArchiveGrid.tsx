"use client"

import React, { useState, useMemo, memo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Calendar, MapPin, Clock, Download, FileText, ArrowRight, Tag } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ImageSkeleton } from './ui/image-skeleton'
import { getImageSrc } from '@/app/utils/image-path'

const placeholderImage = '/images/placeholder-hero.svg'

// Separate component for archive item card to fix React Hooks rule
export function ArchiveItemCard({ item, index, placeholderImage, type }: { item: ArchiveItem; index: number; placeholderImage: string; type: 'blog' | 'case-studies' | 'whitepapers' | 'events' | 'documentation' }) {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="h-full hover:shadow-hover transition-all duration-200 ease-out group overflow-hidden will-change-shadow">
        {/* Featured Image */}
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 z-10">
              <ImageSkeleton className="h-full w-full" aspectRatio="wide" />
            </div>
          )}
          <Image
            src={getImageSrc(item.featuredImage || placeholderImage, true)}
            alt={item.title}
            fill
            className={cn(
              "object-cover group-hover:scale-105 transition-transform duration-300 ease-out will-change-transform",
              imageLoading && "opacity-0"
            )}
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            unoptimized={true}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              const fallbackSrc = getImageSrc(placeholderImage, true)
              if (!target.src.includes(placeholderImage.replace(/^.*\//, ''))) {
                target.src = fallbackSrc
              }
              setImageLoading(false)
            }}
          />
        </div>

        <CardHeader>
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
            {item.date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
            )}
            {item.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {item.location}
              </div>
            )}
            {item.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.readTime}
              </div>
            )}
            {item.category && (
              <Badge variant="secondary" className="text-xs">
                {item.category}
              </Badge>
            )}
          </div>

          <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {item.summary}
          </CardDescription>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-2 h-2 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Success Metrics Badge (for case studies) */}
          {type === 'case-studies' && item.successMetrics && (
            <div className="mt-3 flex items-center gap-2">
              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs font-semibold">
                ✓ {item.successMetrics}
              </Badge>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {(() => {
            const href = item.slug.startsWith('/') ? item.slug : `/resources/${type}/${item.slug}`
            return type === 'whitepapers' ? (
              <Button variant="outline" className="w-full" asChild>
                <Link href={href}>
                  <Download className="mr-2 w-4 h-4" />
                  Download PDF
                </Link>
              </Button>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center text-primary font-medium hover:underline text-sm"
              >
                {type === 'events' ? 'View Details' : type === 'case-studies' ? 'Read Case Study' : 'Read More'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            )
          })()}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export interface ArchiveItem {
  id: string
  slug: string
  title: string
  summary: string
  featuredImage?: string
  date?: string
  location?: string
  category?: string
  tags?: string[]
  industry?: string
  readTime?: string
  fileSize?: string
  successMetrics?: string // For case studies - e.g., "40% Cost Reduction"
  author?: {
    name: string
    avatar?: string
  }
}

interface ArchiveGridProps {
  items: ArchiveItem[]
  basePath: string
  type: 'blog' | 'case-studies' | 'whitepapers' | 'events' | 'documentation'
  showFilters?: boolean
  showPagination?: boolean
  itemsPerPage?: number
}

function ArchiveGridComponent({
  items,
  basePath,
  type,
  showFilters = true,
  showPagination = true,
  itemsPerPage = 9,
}: ArchiveGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'latest' | 'featured' | 'popular'>('latest')
  const [currentPage, setCurrentPage] = useState(1)

  // Extract unique categories, tags, years, industries
  const categories = useMemo(() => {
    const cats = new Set<string>()
    items.forEach(item => {
      if (item.category) cats.add(item.category)
    })
    return Array.from(cats).sort()
  }, [items])

  const tags = useMemo(() => {
    const tagSet = new Set<string>()
    items.forEach(item => {
      item.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [items])

  const years = useMemo(() => {
    const yearSet = new Set<string>()
    items.forEach(item => {
      if (item.date) {
        const year = new Date(item.date).getFullYear().toString()
        yearSet.add(year)
      }
    })
    return Array.from(yearSet).sort().reverse()
  }, [items])

  const industries = useMemo(() => {
    const indSet = new Set<string>()
    items.forEach(item => {
      if (item.industry) indSet.add(item.industry)
    })
    return Array.from(indSet).sort()
  }, [items])

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = [...items]

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Tag filter
    if (selectedTag !== 'all') {
      filtered = filtered.filter(item => item.tags?.includes(selectedTag))
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(item => {
        if (!item.date) return false
        return new Date(item.date).getFullYear().toString() === selectedYear
      })
    }

    // Industry filter
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(item => item.industry === selectedIndustry)
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'latest') {
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      // For featured/popular, maintain original order for now
      return 0
    })

    return filtered
  }, [items, selectedCategory, selectedTag, selectedYear, selectedIndustry, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredItems.slice(start, start + itemsPerPage)
  }, [filteredItems, currentPage, itemsPerPage])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            {(categories.length > 0 || type === 'blog') && (
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">
                  {type === 'case-studies' ? 'Industry' : type === 'events' ? 'Type' : 'Category'}
                </label>
                <select
                  value={type === 'case-studies' ? selectedIndustry : selectedCategory}
                  onChange={(e) => {
                    if (type === 'case-studies') {
                      setSelectedIndustry(e.target.value)
                    } else {
                      setSelectedCategory(e.target.value)
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All {type === 'case-studies' ? 'Industries' : type === 'events' ? 'Types' : 'Categories'}</option>
                  {(type === 'case-studies' ? industries : categories).map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Tag Filter */}
            {tags.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Tags</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Tags</option>
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Year Filter */}
            {years.length > 0 && (
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort By */}
            {type === 'blog' && (
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'latest' | 'featured' | 'popular')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="latest">Latest</option>
                  <option value="featured">Featured</option>
                  <option value="popular">Popular</option>
                </select>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || selectedTag !== 'all' || selectedYear !== 'all' || selectedIndustry !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedTag('all')
                  setSelectedYear('all')
                  setSelectedIndustry('all')
                }}
                className="text-xs"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {paginatedItems.length} of {filteredItems.length} {type === 'blog' ? 'articles' : type === 'case-studies' ? 'case studies' : type === 'whitepapers' ? 'whitepapers' : type === 'events' ? 'events' : 'items'}
      </div>

      {/* Grid */}
      <div className={cn(
        "grid gap-6",
        type === 'whitepapers' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      )}>
        {paginatedItems.map((item, index) => (
          <ArchiveItemCard key={item.id} item={item} index={index} placeholderImage={placeholderImage} type={type} />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              )
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-2">...</span>
            }
            return null
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export const ArchiveGrid = memo(ArchiveGridComponent)

