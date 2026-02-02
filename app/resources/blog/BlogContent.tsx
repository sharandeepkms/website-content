"use client"

import React, { useState } from 'react'
import { ResourceHero } from '@/app/components/ResourceHero'
import { ArchiveGrid, ArchiveItemCard } from '@/app/components/ArchiveGrid'
import { blogPosts } from '@/app/data/blog'
import type { ArchiveItem } from '@/app/components/ArchiveGrid'
import { Button } from '@/app/components/ui/button'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import Link from 'next/link'
import { ArrowRight, Lightbulb, Sparkles, BookOpen } from 'lucide-react'

const archiveItems: ArchiveItem[] = blogPosts.map(post => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  summary: post.summary,
  featuredImage: post.featuredImage,
  date: post.date,
  category: post.category,
  tags: post.tags,
  readTime: post.readTime,
  author: post.author,
}))

export function BlogContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  return (
    <>
      <ResourceHero
        title="Blog"
        subtitle="Insights, news, and articles on enterprise networking, cloud solutions, and technology trends."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Blog' },
        ]}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'SONiC & Open Networking',
                body: 'Control-plane designs, EVPN/VXLAN, SRv6, and operational playbooks for disaggregated fabrics.',
                icon: Lightbulb,
              },
              {
                title: 'AI-Ready Infrastructure',
                body: 'RoCE/ECN tuning guides, buffer/queue design, and telemetry for GPU/accelerator fabrics.',
                icon: Sparkles,
              },
              {
                title: 'Cloud & NetDevOps',
                body: 'Landing zones, policy-as-code, GitOps for networking, and SRE-grade runbooks.',
                icon: BookOpen,
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                </div>
                <p className="text-sm text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button variant="gradient" onClick={() => setIsLeadModalOpen(true)}>
              Talk to an Architect
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources/whitepapers">
                Download Whitepapers
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Posts</h2>
            <p className="text-gray-600">Handpicked articles from our experts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {archiveItems
              .filter(item => item.featuredImage) // Featured posts have images
              .slice(0, 3)
              .map((item, index) => (
                <ArchiveItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  placeholderImage="/images/placeholder-hero.svg"
                  type="blog"
                />
              ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <ArchiveGrid
            items={archiveItems}
            basePath="/resources/blog"
            type="blog"
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
        context="blog"
        title="Talk to an Architect"
        subtitle="Connect with our solution architects to discuss your infrastructure needs."
      />
    </>
  )
}
