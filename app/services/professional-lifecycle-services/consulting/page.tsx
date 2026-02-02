import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Consulting',
  description: 'Expert technology consulting services for network architecture, cloud strategy, security, and digital transformation initiatives.',
  openGraph: {
    title: 'Technology Consulting Services | PalC Networks',
    description: 'Expert technology consulting and advisory services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Consulting',
  tagline: 'Get expert guidance on technology strategy, architecture, and implementation. Our consulting services help you make informed decisions and achieve your technology objectives.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Consulting' },
      ],
  overview: 'Technology consulting helps organizations navigate complex decisions and develop effective strategies. Our consulting services provide expert guidance on architecture, technology selection, implementation planning, and digital transformation.',
  capabilities: [
    'Technology Strategy & Planning',
    'Architecture Design & Review',
    'Technology Assessment',
    'Vendor Evaluation & Selection',
    'Implementation Roadmap Development',
    'Risk Assessment & Mitigation',
    'Best Practices Advisory',
    'Technology Transformation Planning',
  ],
  benefits: [
    'Informed decision-making',
    'Reduced project risk',
    'Optimized technology investments',
    'Expert guidance',
    'Strategic alignment',
    'Faster time to value',
  ],
  useCases: [
    'Technology strategy development',
    'Architecture design and review',
    'Digital transformation planning',
    'Cloud migration strategy',
    'Network modernization planning',
    'Security assessment and planning',
  ],
  imagePlaceholder: 'Consulting Services',
}

export default function ConsultingPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

