'use client'

import { useState } from 'react'
import Image from 'next/image'
import { blogPosts } from '@/app/data/blog'
import { caseStudies } from '@/app/data/case-studies'
import { whitepapers } from '@/app/data/whitepapers'
import { events } from '@/app/data/events'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { cn } from '@/lib/utils'
import { Search, Download, ImageIcon } from 'lucide-react'
import { Input } from '@/app/components/ui/input'
import { getImageSrc } from '@/app/utils/image-path'

type ImageItem = {
  id: string
  title: string
  category: string
  image: string
  type: 'blog' | 'case-study' | 'whitepaper' | 'event'
  slug: string
}

export default function ImagesGalleryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Collect all images
  const allImages: ImageItem[] = [
    ...blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      category: post.category,
      image: post.featuredImage || '/images/placeholder-hero.svg',
      type: 'blog' as const,
      slug: `/resources/blog/${post.slug}`,
    })),
    ...caseStudies.map(study => ({
      id: study.id,
      title: study.title,
      category: study.industry,
      image: study.featuredImage || '/images/placeholder-hero.svg',
      type: 'case-study' as const,
      slug: `/resources/case-studies/${study.slug}`,
    })),
    ...whitepapers.map(paper => ({
      id: paper.id,
      title: paper.title,
      category: paper.topic,
      image: paper.cover || '/images/placeholder-hero.svg',
      type: 'whitepaper' as const,
      slug: `/resources/whitepapers/${paper.slug}`,
    })),
    ...events
      .filter(event => event.featuredImage && event.featuredImage.endsWith('.png'))
      .map(event => ({
        id: event.id,
        title: event.title,
        category: event.category,
        image: event.featuredImage || '/images/placeholder-hero.svg',
        type: 'event' as const,
        slug: `/resources/events/${event.slug}`,
      })),
  ]

  // Filter images
  const filteredImages = allImages.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory
    return matchesSearch && matchesCategory && item.image !== '/images/placeholder-hero.svg'
  })

  const categories = [
    { value: 'all', label: 'All Images', count: allImages.filter(i => i.image !== '/images/placeholder-hero.svg').length },
    { value: 'blog', label: 'Blog Images', count: blogPosts.filter(p => p.featuredImage).length },
    { value: 'case-study', label: 'Case Studies', count: caseStudies.filter(c => c.featuredImage).length },
    { value: 'whitepaper', label: 'Whitepapers', count: whitepapers.filter(w => w.cover).length },
    { value: 'event', label: 'Events', count: events.filter(e => e.featuredImage && e.featuredImage.endsWith('.png')).length },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'case-study':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'whitepaper':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'event':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resource Images Gallery</h1>
            <p className="text-xl text-white/90">
              Browse all featured images for blogs, case studies, whitepapers, and events
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                <span>{allImages.filter(i => i.image !== '/images/placeholder-hero.svg').length} Images</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                <span>Click to Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search images by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all",
                    selectedCategory === cat.value
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  {cat.label}
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "ml-2 text-xs",
                      selectedCategory === cat.value ? "bg-white/20 text-white" : ""
                    )}
                  >
                    {cat.count}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Images Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No images found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredImages.length} of {allImages.filter(i => i.image !== '/images/placeholder-hero.svg').length} images
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div className="relative w-full aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={getImageSrc(item.image, true)}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        unoptimized={true}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Badge className={getTypeColor(item.type)}>
                          {item.type.replace('-', ' ')}
                        </Badge>
                      </div>
                      <button
                        onClick={() => downloadImage(item.image, `${item.slug.split('/').pop()}.png`)}
                        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Download image"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-sm line-clamp-2 mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-xs">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(1).map(cat => (
              <div key={cat.value} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{cat.count}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

