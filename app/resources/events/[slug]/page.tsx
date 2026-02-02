import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getEventBySlug, getRelatedEvents } from '@/app/data/events'
import { EventDetailContent } from './EventDetailContent'
import { getCanonicalUrl } from '@/app/utils/canonical'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

// ISR: Revalidate every 12 hours (events change more frequently)
export const revalidate = 43200

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  const canonicalUrl = getCanonicalUrl(`/resources/events/${slug}`)

  return {
    title: `${event.title} | PalC Networks`,
    description: event.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: event.title,
      description: event.summary,
      images: event.featuredImage ? [event.featuredImage] : [],
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.summary,
      images: event.featuredImage ? [event.featuredImage] : [],
    },
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const relatedEvents = getRelatedEvents(slug, 3)

  return <EventDetailContent event={event} relatedEvents={relatedEvents} />
}

