import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Support & Maintenance',
  description: 'Comprehensive support and maintenance services including technical support, software updates, and ongoing maintenance for your technology infrastructure.',
  openGraph: {
    title: 'Support & Maintenance Services | PalC Networks',
    description: 'Technical support and maintenance services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Support & Maintenance',
  tagline: 'Ensure ongoing reliability and performance with comprehensive support and maintenance services. From technical support to software updates, we keep your infrastructure running smoothly.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Support & Maintenance' },
      ],
  overview: 'Ongoing support and maintenance are essential for keeping technology infrastructure reliable and up-to-date. Our services include technical support, software updates, patch management, and preventive maintenance.',
  capabilities: [
    'Technical Support',
    'Software Updates & Patches',
    'Preventive Maintenance',
    'Performance Tuning',
    'Troubleshooting & Resolution',
    'Configuration Management',
    'Documentation Updates',
    'Health Checks & Assessments',
  ],
  benefits: [
    'Improved system reliability',
    'Reduced downtime',
    'Up-to-date software',
    'Proactive issue resolution',
    'Extended system lifespan',
    'Better performance',
  ],
  useCases: [
    'Ongoing technical support',
    'Software maintenance',
    'System health monitoring',
    'Performance optimization',
    'Issue resolution',
    'Infrastructure maintenance',
  ],
  imagePlaceholder: 'Support & Maintenance Services',
}

export default function SupportMaintenancePage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

