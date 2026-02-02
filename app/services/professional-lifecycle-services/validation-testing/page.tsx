import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Validation & Testing',
  description: 'Comprehensive validation and testing services including functional testing, performance testing, and acceptance testing for technology solutions.',
  openGraph: {
    title: 'Validation & Testing Services | PalC Networks',
    description: 'Comprehensive testing and validation services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Validation & Testing',
  tagline: 'Ensure quality and reliability with comprehensive validation and testing services. From functional testing to performance validation, we deliver thorough verification.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Validation & Testing' },
      ],
  overview: 'Validation and testing are critical for ensuring technology solutions meet requirements and perform as expected. Our services include functional testing, performance testing, security testing, and acceptance testing.',
  capabilities: [
    'Functional Testing',
    'Performance & Load Testing',
    'Security Testing',
    'Interoperability Testing',
    'Acceptance Testing',
    'Regression Testing',
    'Test Automation',
    'Test Planning & Strategy',
  ],
  benefits: [
    'Reduced production defects',
    'Improved quality assurance',
    'Validated performance',
    'Enhanced reliability',
    'Risk mitigation',
    'Faster release cycles',
  ],
  useCases: [
    'Pre-deployment validation',
    'Network acceptance testing',
    'Application testing',
    'Security assessment',
    'Performance benchmarking',
    'Compliance validation',
  ],
  imagePlaceholder: 'Validation & Testing Services',
}

export default function ValidationTestingPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

