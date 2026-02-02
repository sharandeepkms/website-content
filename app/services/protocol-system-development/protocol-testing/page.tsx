import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Protocol Testing',
  description: 'Comprehensive protocol testing services including interoperability testing, performance testing, and conformance validation for network protocols.',
  openGraph: {
    title: 'Protocol Testing Services | PalC Networks',
    description: 'Protocol testing and validation services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Protocol Testing',
  tagline: 'Ensure protocol reliability and interoperability with comprehensive testing services. From conformance testing to performance validation, we deliver thorough protocol verification.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Protocol Testing' },
      ],
  overview: 'Protocol testing is essential for ensuring network protocols work correctly and efficiently. Our protocol testing services include conformance testing, interoperability testing, performance testing, and stress testing to validate protocol implementations.',
  capabilities: [
    'Protocol Conformance Testing',
    'Interoperability Testing',
    'Performance & Load Testing',
    'Stress & Stability Testing',
    'Automated Test Framework Development',
    'Test Case Design & Execution',
    'Protocol Analysis & Debugging',
    'Compliance Validation',
  ],
  benefits: [
    'Ensure protocol reliability',
    'Validate interoperability',
    'Identify performance bottlenecks',
    'Reduce production defects',
    'Improve protocol quality',
    'Accelerate development cycles',
  ],
  useCases: [
    'Protocol implementation validation',
    'Multi-vendor interoperability testing',
    'Performance benchmarking',
    'Protocol compliance verification',
    'Pre-deployment testing',
    'Protocol regression testing',
  ],
  imagePlaceholder: 'Protocol Testing Framework',
}

export default function ProtocolTestingPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

