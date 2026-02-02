import { Metadata } from 'next'
import { AboutContent } from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about PalC Networks - our mission, vision, leadership team, and commitment to delivering exceptional enterprise technology solutions.',
  openGraph: {
    title: 'About Us | PalC Networks',
    description: 'Learn about our mission, vision, and commitment to enterprise technology excellence.',
  },
}

export default function AboutPage() {
  return <AboutContent />
}

