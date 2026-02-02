import { Metadata } from 'next'
import { PlatformsContent } from './PlatformsContent'

export const metadata: Metadata = {
  title: 'Infrastructure Platforms | PalC Networks',
  description: 'Explore our comprehensive infrastructure platform portfolio including switching, compute, network interface, and connectivity platforms.',
  openGraph: {
    title: 'Infrastructure Platforms | PalC Networks',
    description: 'Hardware and software platforms for enterprise networking and AI infrastructure.',
  },
}

export default function PlatformsPage() {
  return <PlatformsContent />
}

