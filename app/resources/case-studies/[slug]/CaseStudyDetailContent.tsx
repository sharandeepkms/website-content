"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { ExpertCard } from '@/app/components/ExpertCard'
import { ResourceSidebar } from '@/app/components/ResourceSidebar'
import { RelatedContentSection } from '@/app/components/RelatedContentSection'
import { ReadingProgress } from '@/app/components/ReadingProgress'
import { BackToTop } from '@/app/components/BackToTop'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Check, TrendingUp, Calendar, Download, ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc, withBasePath } from '@/app/utils/image-path'
import type { CaseStudy } from '@/app/data/case-studies'
import { Button } from '@/app/components/ui/button'

interface CaseStudyDetailContentProps {
  study: CaseStudy
  relatedStudies: CaseStudy[]
}

export function CaseStudyDetailContent({ study, relatedStudies }: CaseStudyDetailContentProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)

  return (
    <>
      <ReadingProgress />
      {/* PDF Download Modal */}
      {study.pdfUrl && (
        <LeadCaptureModal
          open={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          context="case-study-download"
          title={`Download ${study.title}`}
          subtitle="Please provide your details to download the case study PDF."
          downloadUrl={withBasePath(study.pdfUrl)}
        />
      )}
      {/* Hero with Featured Image */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] overflow-hidden bg-gray-900 pt-20 sm:pt-24 md:pt-0">
        {study.featuredImage ? (
          <Image
            src={getImageSrc(study.featuredImage, true)}
            alt={study.title}
            fill
            className="object-cover opacity-60"
            sizes="100vw"
            priority
            unoptimized={true}
            onError={(e) => {
              // Fallback to gradient if image fails to load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent && !parent.querySelector('.bg-gradient-primary')) {
                const fallback = document.createElement('div')
                fallback.className = 'w-full h-full bg-gradient-primary'
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
              {study.industry}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {study.title}
            </h1>
            <p className="text-xl text-white/90 mb-4">
              {study.summary}
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {study.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
              {study.pdfUrl && (
                <Button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="ml-auto bg-white text-primary hover:bg-white/90 border border-white/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Get Case Study PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics */}
      {study.results.kpis && study.results.kpis.length > 0 && (
        <section className="bg-gradient-primary text-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {study.results.kpis.map((kpi, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold mb-2">{kpi.value}</div>
                  <div className="text-sm text-white/90 mb-1">{kpi.metric}</div>
                  {kpi.improvement && (
                    <div className="text-xs text-white/70">{kpi.improvement}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            <Link href="/resources/case-studies" className="px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              Case Studies
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="px-2 py-1 text-gray-500 truncate max-w-md">{study.title}</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SectionHeading
                  tag="Background"
                  title="The Challenge"
                  subtitle={study.background}
                  centered={false}
                />
              </motion.div>

              {/* Challenges */}
              {study.challenges && study.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <SectionHeading
                    tag="Challenges"
                    title="Key Challenges"
                    centered={false}
                  />
                  <div className="mt-6 space-y-3">
                    {study.challenges.map((challenge, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 flex-1">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SectionHeading
                  tag="Solution"
                  title="Our Approach"
                  subtitle={study.solution}
                  centered={false}
                />
              </motion.div>

              {/* Implementation */}
              {study.implementation && study.implementation.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <SectionHeading
                    tag="Implementation"
                    title="Implementation Steps"
                    centered={false}
                  />
                  <div className="mt-6 space-y-4">
                    {study.implementation.map((step, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-2">{step.step}</CardTitle>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <SectionHeading
                  tag="Results"
                  title="Outcomes"
                  subtitle={study.results.description}
                  centered={false}
                />
              </motion.div>

              {/* Technologies */}
              {study.technologies && study.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <SectionHeading
                    tag="Technologies"
                    title="Technologies Used"
                    centered={false}
                  />
                  <div className="mt-6 flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-sm py-2 px-4">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Get Case Study PDF CTA - Below Content */}
              {study.pdfUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-200"
                >
                  <Card className="bg-gradient-primary text-white border-0">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">Want to dive deeper?</h3>
                          <p className="text-white/90">
                            Download the complete case study PDF to explore detailed insights, technical specifications, and implementation strategies.
                          </p>
                        </div>
                        <Button
                          onClick={() => setIsDownloadModalOpen(true)}
                          variant="secondary"
                          size="lg"
                          className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg whitespace-nowrap"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get Case Study PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {study.expert && (
                <ExpertCard
                  name={study.expert.name}
                  title={study.expert.title}
                  bio={study.expert.bio}
                  avatar={study.expert.avatar}
                  ctaText="Talk to Expert"
                  ctaHref="/contact"
                />
              )}
              <ResourceSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <RelatedContentSection
          title="Related Case Studies"
          items={relatedStudies.map(relatedStudy => ({
            id: relatedStudy.id,
            slug: relatedStudy.slug,
            title: relatedStudy.title,
            summary: relatedStudy.summary,
            featuredImage: relatedStudy.featuredImage,
            date: relatedStudy.date,
            industry: relatedStudy.industry,
            tags: relatedStudy.tags,
          }))}
          basePath="/resources/case-studies"
          type="case-studies"
        />
      )}
      <BackToTop />
    </>
  )
}

