import { Metadata } from 'next'
import { CareersContent } from './CareersContent'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join PalC Networks and build your career with a leading enterprise technology company. Explore open positions in network engineering, cloud, security, and software development.',
  openGraph: {
    title: 'Careers | PalC Networks',
    description: 'Join our team and build your career in enterprise technology.',
  },
}

export default function CareersPage() {
  return <CareersContent />
}

