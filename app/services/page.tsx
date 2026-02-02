import { Metadata } from 'next'
import { ServicesContent } from './ServicesContent'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our comprehensive professional services including network engineering, cloud & DevOps, software development, security engineering, and managed support services.',
  openGraph: {
    title: 'Services | PalC Networks',
    description: 'Professional services for enterprise network, cloud, and security solutions.',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}

