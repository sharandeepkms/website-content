import { Metadata } from 'next'
import { CaseStudiesContent } from './CaseStudiesContent'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore real-world case studies showcasing how PalC Networks has helped organizations transform their technology infrastructure.',
  openGraph: {
    title: 'Case Studies | PalC Networks',
    description: 'Real-world success stories and case studies.',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesContent />
}
