"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { ResourceSidebar } from '@/app/components/ResourceSidebar'
import { RelatedContentSection } from '@/app/components/RelatedContentSection'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Calendar, MapPin, Clock, Download, Video, ExternalLink, ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageSrc } from '@/app/utils/image-path'
import type { Event } from '@/app/data/events'
import { ReadingProgress } from '@/app/components/ReadingProgress'
import { BackToTop } from '@/app/components/BackToTop'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'

interface EventDetailContentProps {
  event: Event
  relatedEvents: Event[]
}

export function EventDetailContent({ event, relatedEvents }: EventDetailContentProps) {
  const isPastEvent = new Date(event.date) < new Date()
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

  return (
    <>
      <ReadingProgress />
      {/* Hero with Featured Image */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] overflow-hidden bg-gray-900 pt-20 sm:pt-24 md:pt-0">
        {event.featuredImage ? (
          <Image
            src={getImageSrc(event.featuredImage, event.featuredImage.endsWith('.svg'))}
            alt={event.title}
            fill
            className="object-cover opacity-80"
            sizes="100vw"
            priority
            unoptimized={event.featuredImage.endsWith('.svg')}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container-custom relative z-10 min-h-[400px] md:min-h-[500px] flex flex-col justify-end pb-12 pt-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary text-white">
              {event.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons - Only show for upcoming events */}
      {!isPastEvent && (
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="gradient"
                size="lg"
                onClick={() => setIsRegistrationModalOpen(true)}
              >
                <ExternalLink className="mr-2 w-5 h-5" />
                Register Now
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Past Event CTA - Show recording if available */}
      {isPastEvent && event.recordingUrl && (
        <div className="bg-white border-b border-gray-200">
          <div className="container-custom py-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="gradient" size="lg" asChild>
                <a href={event.recordingUrl} target="_blank" rel="noopener noreferrer">
                  <Video className="mr-2 w-5 h-5" />
                  Watch Recording
                </a>
              </Button>
            </div>
          </div>
        </div>
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
            <Link href="/resources/events" className="px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
              Events
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="px-2 py-1 text-gray-500 truncate max-w-md">{event.title}</span>
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
                  title="About This Event"
                  subtitle={event.overview}
                  align="left"
                />
              </motion.div>

              {/* Agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <SectionHeading
                    tag="Agenda"
                    title="Event Schedule"
                    align="left"
                  />
                  <div className="mt-6 space-y-4">
                    {event.agenda.map((item, index) => (
                      <Card key={index} className="border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              {item.speaker && (
                                <p className="text-sm text-gray-600 mt-1">Speaker: {item.speaker}</p>
                              )}
                            </div>
                            <Badge variant="outline" className="ml-4">
                              {item.time}
                            </Badge>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SectionHeading
                    tag="Speakers"
                    title="Meet Our Experts"
                    align="left"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {event.speakers.map((speaker, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <div className="flex items-start gap-4">
                            {speaker.avatar ? (
                              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={getImageSrc(speaker.avatar, speaker.avatar.endsWith('.svg'))}
                                  alt={speaker.name}
                                  fill
                                  className="object-cover"
                                  unoptimized={speaker.avatar.endsWith('.svg')}
                                  onError={(e) => {
                                    // Fallback to initials if avatar fails to load
                                    const target = e.target as HTMLImageElement
                                    const parent = target.parentElement
                                    if (parent) {
                                      target.style.display = 'none'
                                      const fallback = document.createElement('div')
                                      fallback.className = 'w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 absolute inset-0'
                                      fallback.innerHTML = `<span class="text-white font-bold text-xl">${speaker.name.charAt(0).toUpperCase()}</span>`
                                      parent.appendChild(fallback)
                                    }
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-xl">
                                  {speaker.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="flex-1">
                              <CardTitle className="text-lg">{speaker.name}</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">{speaker.title}</p>
                              {speaker.bio && (
                                <p className="text-sm text-gray-600 mt-2">{speaker.bio}</p>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Key Takeaways */}
              {event.keyTakeaways && event.keyTakeaways.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <SectionHeading
                    tag="Key Takeaways"
                    title="What You'll Learn"
                    align="left"
                  />
                  <div className="mt-6 space-y-3">
                    {event.keyTakeaways.map((takeaway, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 flex-1">{takeaway}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Downloads */}
              {event.downloads && event.downloads.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <SectionHeading
                    tag="Downloads"
                    title="Event Materials"
                    align="left"
                  />
                  <div className="mt-6 space-y-3">
                    {event.downloads.map((download, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Download className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{download.title}</p>
                                <p className="text-sm text-gray-600">{download.type}</p>
                              </div>
                            </div>
                            <Button variant="outline" asChild>
                              <a href={download.url} download>
                                <Download className="mr-2 w-4 h-4" />
                                Download
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ResourceSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <RelatedContentSection
          title="Related Events"
          items={relatedEvents.map(event => ({
            id: event.id,
            slug: event.slug,
            title: event.title,
            summary: event.summary,
            featuredImage: event.featuredImage,
            date: event.date,
            category: event.category,
            tags: event.tags,
          }))}
          basePath="/resources/events"
          type="events"
        />
      )}
      <BackToTop />
      
      {/* Event Registration Modal */}
      <LeadCaptureModal
        open={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        context={`event-registration:${event.id}`}
        title={`Register for ${event.title}`}
        subtitle={`Join us on ${new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}${event.location ? ` at ${event.location}` : ''}. Fill out the form below to register.`}
      />
    </>
  )
}

