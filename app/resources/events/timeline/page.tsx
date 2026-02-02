import { Metadata } from 'next'
import { EventTimeline } from './EventTimeline'

export const metadata: Metadata = {
  title: 'Event Timeline | PalC Networks',
  description: 'View upcoming, live, and archived events from PalC Networks.',
}

export default function EventTimelinePage() {
  return <EventTimeline />
}

