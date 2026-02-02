"use client"

import React, { useState, useMemo } from 'react'
import { ResourceHero } from '@/app/components/ResourceHero'
import { ArchiveGrid } from '@/app/components/ArchiveGrid'
import { events } from '@/app/data/events'
import type { ArchiveItem } from '@/app/components/ArchiveGrid'
import { Button } from '@/app/components/ui/button'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { SectionHeading } from '@/app/components/SectionHeading'
import Link from 'next/link'
import { ArrowRight, CalendarDays, PlayCircle, Clock, History } from 'lucide-react'

export function EventsContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Separate events into upcoming and past
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date()
    const upcoming: ArchiveItem[] = []
    const past: ArchiveItem[] = []
    
    events.forEach(event => {
      const eventDate = new Date(event.date)
      const archiveItem: ArchiveItem = {
        id: event.id,
        slug: event.slug,
        title: event.title,
        summary: event.summary,
        featuredImage: event.featuredImage,
        date: event.date,
        location: event.location,
        category: event.category,
        tags: event.tags,
      }
      
      if (eventDate >= now) {
        upcoming.push(archiveItem)
      } else {
        past.push(archiveItem)
      }
    })
    
    // Sort upcoming events by date (earliest first)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    // Sort past events by date (most recent first)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return { upcomingEvents: upcoming, pastEvents: past }
  }, [])
  
  return (
    <>
      <ResourceHero
        title="Events"
        subtitle="Join our webinars, conferences, workshops, and meetups to learn about the latest trends in enterprise networking, cloud solutions, and technology."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Events' },
        ]}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-start gap-3">
              <CalendarDays className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Upcoming Webinars & Workshops</p>
                <p className="text-sm text-gray-600">AI fabrics, SONiC adoption, multi-cloud networking, and zero-trust deep-dives.</p>
              </div>
            </div>
            <div className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm flex items-start gap-3">
              <PlayCircle className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-900">On-Demand Recordings</p>
                <p className="text-sm text-gray-600">Access past sessions with slides and Q&A transcripts.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button variant="gradient" onClick={() => setIsLeadModalOpen(true)}>
              Request a Private Briefing
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources/whitepapers">
                Download Event Materials
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <SectionHeading
                tag="Upcoming Events"
                title="Join Us at These Events"
                subtitle={`${upcomingEvents.length} upcoming event${upcomingEvents.length !== 1 ? 's' : ''} - Register now to secure your spot`}
                align="left"
              />
            </div>
            <ArchiveGrid
              items={upcomingEvents}
              basePath="/resources/events"
              type="events"
              showFilters={false}
              showPagination={true}
              itemsPerPage={6}
            />
          </div>
        </section>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-gray-600" />
              <SectionHeading
                tag="Past Events"
                title="Event Archive"
                subtitle={`${pastEvents.length} past event${pastEvents.length !== 1 ? 's' : ''} - Watch recordings and access materials`}
                align="left"
              />
            </div>
            <ArchiveGrid
              items={pastEvents}
              basePath="/resources/events"
              type="events"
              showFilters={false}
              showPagination={true}
              itemsPerPage={9}
            />
          </div>
        </section>
      )}

      {/* Empty State */}
      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center py-12">
              <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Scheduled</h3>
              <p className="text-gray-600 mb-6">Check back soon for upcoming events and webinars.</p>
              <Button variant="gradient" onClick={() => setIsLeadModalOpen(true)}>
                Request a Private Briefing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="events"
        title="Request a Private Briefing"
        subtitle="Schedule a private session with our team to discuss your infrastructure needs."
      />
    </>
  )
}

