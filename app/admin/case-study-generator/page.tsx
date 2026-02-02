import { Metadata } from 'next'
import { CaseStudyGenerator } from './CaseStudyGenerator'

export const metadata: Metadata = {
  title: 'Case Study Generator | PalC Networks Admin',
  description: 'Generate case studies automatically using AI.',
}

export default function CaseStudyGeneratorPage() {
  return <CaseStudyGenerator />
}

