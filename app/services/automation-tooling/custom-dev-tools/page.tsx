import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Custom Developer Tools',
  description: 'Custom developer tools and automation solutions tailored to your specific development workflows and requirements.',
  openGraph: {
    title: 'Custom Developer Tools | PalC Networks',
    description: 'Custom development tools and automation solutions.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Custom Developer Tools',
  tagline: 'Build custom developer tools and automation solutions tailored to your specific workflows. Enhance developer productivity with purpose-built tools and integrations.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Custom Developer Tools' },
      ],
  overview: 'Custom developer tools can significantly improve productivity and streamline workflows. Our services help organizations build, integrate, and maintain custom tools that fit their specific development processes and requirements.',
  capabilities: [
    'Custom CLI Tools Development',
    'IDE Plugins & Extensions',
    'Development Workflow Automation',
    'Code Generation Tools',
    'Testing Framework Development',
    'Build System Customization',
    'Developer Portal Development',
    'Tool Integration & APIs',
  ],
  benefits: [
    'Improved developer productivity',
    'Streamlined workflows',
    'Reduced manual effort',
    'Better tool integration',
    'Customized solutions',
    'Enhanced developer experience',
  ],
  useCases: [
    'Development workflow automation',
    'Custom build systems',
    'IDE tooling',
    'Code quality tools',
    'Testing automation',
    'Developer self-service portals',
  ],
  imagePlaceholder: 'Custom Developer Tools Architecture',
}

export default function CustomDevToolsPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

