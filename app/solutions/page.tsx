import { Metadata } from 'next'
import { SolutionsContent } from './SolutionsContent'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Explore our comprehensive technology solutions including open networking, cloud services, cybersecurity, AI infrastructure, and enterprise IT modernization.',
  openGraph: {
    title: 'Solutions | PalC Networks',
    description: 'Explore our comprehensive technology solutions for enterprise digital transformation.',
  },
}

export default function SolutionsPage() {
  return <SolutionsContent />
}

