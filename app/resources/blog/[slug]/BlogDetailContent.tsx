"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/app/components/PageHero'
import { ExpertCard } from '@/app/components/ExpertCard'
import { ResourceSidebar } from '@/app/components/ResourceSidebar'
import { RelatedContentSection } from '@/app/components/RelatedContentSection'
import { ReadingProgress } from '@/app/components/ReadingProgress'
import { BackToTop } from '@/app/components/BackToTop'
import { Badge } from '@/app/components/ui/badge'
import { MarkdownRenderer } from '@/app/components/MarkdownRenderer'
import { Calendar, Clock, ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from '@/app/utils/image-path'
import type { BlogPost } from '@/app/data/blog'

interface BlogDetailContentProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogDetailContent({ post, relatedPosts }: BlogDetailContentProps) {
  return (
    <>
      <ReadingProgress />
      {/* Hero with Featured Image */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] overflow-hidden bg-gray-900 pt-20 sm:pt-24 md:pt-0">
        {post.featuredImage ? (
          <Image
            src={getImageSrc(post.featuredImage, post.featuredImage.endsWith('.svg'))}
            alt={post.title}
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
            unoptimized={post.featuredImage.endsWith('.svg')}
            onError={(e) => {
              // Fallback to gradient if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent && !parent.querySelector('.bg-gradient-primary')) {
                const fallback = document.createElement('div')
                fallback.className = 'w-full h-full bg-gradient-primary absolute inset-0'
                parent.appendChild(fallback)
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
        <div className="container-custom relative z-10 min-h-[400px] md:min-h-[500px] flex flex-col justify-end pb-12 pt-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary text-white">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl text-white/90 mb-4">
                {post.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              )}
              <div className="text-white/90">
                By {post.author.name}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs Below Banner */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1.5 px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/resources" className="px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              Resources
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/resources/blog" className="px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="px-2 py-1 text-gray-500 truncate max-w-md">{post.title}</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MarkdownRenderer content={post.content} />
              </motion.div>

              {/* Author Info Widget - Below Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <ExpertCard
                  name={post.author.name}
                  title={post.author.title}
                  bio={post.author.bio}
                  avatar={post.author.avatar}
                  ctaText="Talk to Expert"
                  ctaHref="/contact"
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ResourceSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <RelatedContentSection
          title="Related Articles"
          items={relatedPosts.map(relatedPost => ({
            id: relatedPost.id,
            slug: relatedPost.slug,
            title: relatedPost.title,
            summary: relatedPost.summary,
            featuredImage: relatedPost.featuredImage,
            date: relatedPost.date,
            category: relatedPost.category,
            tags: relatedPost.tags,
          }))}
          basePath="/resources/blog"
          type="blog"
        />
      )}
      <BackToTop />
    </>
  )
}

