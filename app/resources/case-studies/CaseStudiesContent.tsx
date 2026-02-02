"use client"

import React, { useState } from 'react'
import { ResourceHero } from '@/app/components/ResourceHero'
import { ArchiveGrid } from '@/app/components/ArchiveGrid'
import { caseStudies } from '@/app/data/case-studies'
import type { ArchiveItem } from '@/app/components/ArchiveGrid'
import { Button } from '@/app/components/ui/button'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const archiveItems: ArchiveItem[] = caseStudies.map(study => {
  // Extract top KPI for success metrics badge
  const topKPI = study.results?.kpis?.[0]
  const successMetrics = topKPI ? `${topKPI.value} ${topKPI.metric}` : undefined
  
  return {
    id: study.id,
    slug: study.slug,
    title: study.title,
    summary: study.summary,
    featuredImage: study.featuredImage,
    date: study.date,
    industry: study.industry,
    tags: study.tags,
    successMetrics,
  }
})

export function CaseStudiesContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  return (
    <>
      <ResourceHero
        title="Case Studies"
        subtitle="Real-world success stories showcasing how we've helped organizations transform their technology infrastructure."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Case Studies' },
        ]}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Problem & Constraints', detail: 'Business impact, legacy constraints, SLO/SLA gaps, compliance drivers.' },
              { title: 'Architecture & Implementation', detail: 'EVPN/VXLAN/SRv6/SONiC, cloud interconnects, automation and observability patterns.' },
              { title: 'Results & KPIs', detail: 'Latency/loss improvements, cost/TCO reductions, MTTR/SLO gains, deployment speed.' },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <p className="text-sm font-semibold text-gray-900 mb-2">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button variant="gradient" onClick={() => setIsLeadModalOpen(true)}>
              Discuss Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources/whitepapers">
                Download Architecture Guides
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <ArchiveGrid
            items={archiveItems}
            basePath="/resources/case-studies"
            type="case-studies"
            showFilters={true}
            showPagination={true}
            itemsPerPage={9}
          />
        </div>
      </section>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="case-studies"
        title="Discuss Your Project"
        subtitle="Tell us about your infrastructure challenges and we'll connect you with our experts."
      />
    </>
  )
}
