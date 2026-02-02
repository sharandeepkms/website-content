import { Metadata } from 'next'
import { WhitepapersContent } from './WhitepapersContent'

export const metadata: Metadata = {
  title: 'Whitepapers',
  description: 'Download in-depth whitepapers and technical guides on enterprise networking, cloud solutions, and technology best practices.',
  openGraph: {
    title: 'Whitepapers | PalC Networks',
    description: 'Technical whitepapers and guides.',
  },
}

export default function WhitepapersPage() {
  return <WhitepapersContent />
}
