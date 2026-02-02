"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionHeading } from './SectionHeading'
import { getImageSrc } from '@/app/utils/image-path'

interface RelatedItem {
  id: string
  slug: string
  title: string
  summary: string
  featuredImage?: string
  date?: string
  category?: string
  tags?: string[]
}

interface RelatedContentSectionProps {
  title: string
  subtitle?: string
  items: RelatedItem[]
  basePath: string
  type: 'blog' | 'case-studies' | 'whitepapers' | 'events'
}

export function RelatedContentSection({
  title,
  subtitle,
  items,
  basePath,
  type,
}: RelatedContentSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeading
          tag="Related"
          title={title}
          subtitle={subtitle || `Explore more ${type === 'blog' ? 'articles' : type === 'case-studies' ? 'case studies' : type === 'whitepapers' ? 'whitepapers' : 'events'}`}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-hover transition-all duration-200 group overflow-hidden">
                {/* Featured Image */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={getImageSrc(item.featuredImage || '/images/placeholder-hero.svg', true)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized={true}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      const placeholderSrc = getImageSrc('/images/placeholder-hero.svg', true)
                      if (!target.src.includes('placeholder-hero')) {
                        target.src = placeholderSrc
                      }
                    }}
                  />
                </div>

                <CardHeader>
                  {item.date && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  )}

                  {item.category && (
                    <Badge variant="outline" className="w-fit mb-2">
                      {item.category}
                    </Badge>
                  )}

                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.summary}
                  </CardDescription>

                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <Link
                    href={`${basePath}/${item.slug}`}
                    className="inline-flex items-center text-primary font-medium hover:underline text-sm"
                  >
                    {type === 'events' ? 'View Details' : type === 'case-studies' ? 'Read Case Study' : type === 'whitepapers' ? 'Download' : 'Read More'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

