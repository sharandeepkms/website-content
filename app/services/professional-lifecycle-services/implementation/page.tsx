import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Implementation',
  description: 'Expert implementation services for network, cloud, and security solutions. From planning to deployment, we ensure successful project delivery.',
  openGraph: {
    title: 'Implementation Services | PalC Networks',
    description: 'Expert technology implementation and deployment services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Implementation',
  tagline: 'Turn your technology plans into reality with expert implementation services. From design to deployment, we ensure successful project delivery.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Implementation' },
      ],
  overview: 'Successful implementation requires careful planning, expert execution, and thorough testing. Our implementation services cover the entire project lifecycle, from initial design through deployment and handover.',
  capabilities: [
    'Project Planning & Management',
    'Solution Design & Engineering',
    'Installation & Configuration',
    'Integration & Testing',
    'Migration & Cutover',
    'Documentation & Training',
    'Post-Deployment Support',
    'Performance Optimization',
  ],
  benefits: [
    'Successful project delivery',
    'Reduced implementation risk',
    'Expert execution',
    'Minimal business disruption',
    'Comprehensive documentation',
    'Knowledge transfer',
  ],
  useCases: [
    'Network infrastructure deployment',
    'Cloud migration projects',
    'Security solution implementation',
    'Application deployment',
    'System integration projects',
    'Technology refresh initiatives',
  ],
  imagePlaceholder: 'Implementation Services',
}

export default function ImplementationPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

