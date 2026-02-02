"use client"

import React, { useState } from 'react'
import { ResourceHero } from '@/app/components/ResourceHero'
import { ArchiveGrid } from '@/app/components/ArchiveGrid'
import { whitepapers } from '@/app/data/whitepapers'
import type { ArchiveItem } from '@/app/components/ArchiveGrid'
import { Button } from '@/app/components/ui/button'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import Link from 'next/link'
import { ArrowRight, FileDown, ShieldCheck, Cpu } from 'lucide-react'

const archiveItems: ArchiveItem[] = whitepapers.map(paper => ({
  id: paper.id,
  slug: paper.slug,
  title: paper.title,
  summary: paper.summary,
  featuredImage: paper.cover,
  category: paper.topic,
  tags: paper.tags,
  date: paper.lastUpdated,
  fileSize: paper.fileSize,
}))

export function WhitepapersContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  return (
    <>
      <ResourceHero
        title="Whitepapers"
        subtitle="In-depth technical guides and whitepapers on enterprise technology, best practices, and industry insights."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Whitepapers' },
        ]}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'SONiC Enterprise Architecture', detail: 'Disaggregated NOS, EVPN/VXLAN control-plane, optics/buffer profiles, and lifecycle guidance.', icon: ShieldCheck },
              { title: 'AI Fabric Design', detail: 'RoCE/ECN tuning, congestion control, GPU/accelerator topologies, and SLO-driven observability.', icon: Cpu },
              { title: 'Cloud Networking Strategy', detail: 'Multi-cloud transit, policy-as-code, zero-trust ingress/egress, and NetDevOps pipelines.', icon: FileDown },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button variant="gradient" asChild>
              <Link href="/downloads/whitepapers/open-networking-guide.pdf">
                Download Open Networking Guide
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" onClick={() => setIsLeadModalOpen(true)}>
              Request a Briefing
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <ArchiveGrid
            items={archiveItems}
            basePath="/resources/whitepapers"
            type="whitepapers"
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
        context="whitepapers"
        title="Request a Briefing"
        subtitle="Connect with our team to discuss how our solutions can help your organization."
      />
    </>
  )
}
