"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/app/components/SectionHeading'
import { ExpertCard } from '@/app/components/ExpertCard'
import { RelatedContentSection } from '@/app/components/RelatedContentSection'
import { ReadingProgress } from '@/app/components/ReadingProgress'
import { BackToTop } from '@/app/components/BackToTop'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Download, FileText, Calendar, User, ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from '@/app/utils/image-path'
import type { Whitepaper } from '@/app/data/whitepapers'

interface WhitepaperDetailContentProps {
  paper: Whitepaper
  relatedPapers: Whitepaper[]
}

export function WhitepaperDetailContent({ paper, relatedPapers }: WhitepaperDetailContentProps) {
  return (
    <>
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-indigo-900 text-white pt-24 sm:pt-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {paper.cover ? (
                <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={getImageSrc(paper.cover, paper.cover.endsWith('.svg'))}
                    alt={paper.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized={paper.cover.endsWith('.svg')}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent && !parent.querySelector('.bg-white\\/10')) {
                        const fallback = document.createElement('div')
                        fallback.className = 'w-full h-full bg-white/10 flex items-center justify-center absolute inset-0'
                        fallback.innerHTML = '<svg class="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
                        parent.appendChild(fallback)
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-[500px] rounded-2xl bg-white/10 flex items-center justify-center">
                  <FileText className="w-32 h-32 text-white/30" />
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Badge className="bg-white/20 text-white border-white/30">
                {paper.topic}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                {paper.title}
              </h1>
              <p className="text-xl text-white/90">
                {paper.summary}
              </p>

              {/* Authors */}
              {paper.authors && paper.authors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-semibold">Authors:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {paper.authors.map((author, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
                        {author.avatar && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={getImageSrc(author.avatar, author.avatar.endsWith('.svg'))}
                              alt={author.name}
                              fill
                              className="object-cover"
                              unoptimized={author.avatar.endsWith('.svg')}
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold">{author.name}</div>
                          <div className="text-xs text-white/70">{author.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Last Updated: {new Date(paper.lastUpdated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {paper.fileSize}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Download Button */}
              <Button variant="gradient" size="lg" className="w-full md:w-auto" asChild>
                <a href={paper.downloadUrl} download>
                  <Download className="mr-2 w-5 h-5" />
                  Download PDF
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

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
            <Link href="/resources/whitepapers" className="px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              Whitepapers
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="px-2 py-1 text-gray-500 truncate max-w-md">{paper.title}</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading
                  tag="Overview"
                  title="About This Whitepaper"
                  subtitle={paper.overview}
                  centered={false}
                />
              </motion.div>

              {/* Table of Contents */}
              {paper.tableOfContents && paper.tableOfContents.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <SectionHeading
                    tag="Contents"
                    title="Table of Contents"
                    centered={false}
                  />
                  <Card className="mt-6">
                    <CardContent className="p-6">
                      <ol className="space-y-3">
                        {paper.tableOfContents.map((item, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <span className="text-primary font-semibold min-w-[3rem]">
                              {item.page ? `Page ${item.page}` : `${index + 1}.`}
                            </span>
                            <span className="text-gray-700">{item.title}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Key Insights */}
              {paper.keyInsights && paper.keyInsights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SectionHeading
                    tag="Key Insights"
                    title="What You'll Learn"
                    centered={false}
                  />
                  <div className="mt-6 space-y-3">
                    {paper.keyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{insight}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {paper.expert && (
                <ExpertCard
                  name={paper.expert.name}
                  title={paper.expert.title}
                  bio={paper.expert.bio}
                  avatar={paper.expert.avatar}
                  ctaText="Talk to Expert"
                  ctaHref="/contact"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Whitepapers */}
      {relatedPapers.length > 0 && (
        <RelatedContentSection
          title="Related Whitepapers"
          items={relatedPapers.map(relatedPaper => ({
            id: relatedPaper.id,
            slug: relatedPaper.slug,
            title: relatedPaper.title,
            summary: relatedPaper.summary,
            featuredImage: relatedPaper.cover,
            date: relatedPaper.lastUpdated,
            category: relatedPaper.topic,
            tags: relatedPaper.tags,
          }))}
          basePath="/resources/whitepapers"
          type="whitepapers"
        />
      )}
      <BackToTop />
    </>
  )
}

