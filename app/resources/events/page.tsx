import { Metadata } from 'next'
import { EventsContent } from './EventsContent'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join our webinars, conferences, workshops, and meetups to learn about the latest trends in enterprise networking, cloud solutions, and technology.',
  openGraph: {
    title: 'Events | PalC Networks',
    description: 'Upcoming and past events on enterprise technology.',
  },
}

export default function EventsPage() {
  return <EventsContent />
}

