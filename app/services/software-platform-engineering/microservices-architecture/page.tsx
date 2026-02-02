import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Microservices Architecture',
  description: 'Design and implement microservices architectures with domain-driven design, service mesh, and distributed systems best practices.',
  openGraph: {
    title: 'Microservices Architecture Services | PalC Networks',
    description: 'Expert microservices architecture design and implementation services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Microservices Architecture',
  tagline: 'Design and build scalable microservices architectures with domain-driven design, service mesh, APIs, and distributed systems expertise.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Microservices Architecture' },
      ],
  overview: 'Microservices architecture enables organizations to build complex applications as a suite of small, independent services. We help you design, implement, and operate microservices architectures that are scalable, maintainable, and resilient.',
  overviewDetails: [
    'Domain-Driven Design: Bounded contexts, domain models, and service boundaries aligned with business capabilities.',
    'Service Communication: REST, gRPC, GraphQL, message queues, and event-driven patterns.',
    'Service Mesh: Istio, Linkerd, or Consul for service discovery, load balancing, and observability.',
    'API Gateway: Centralized API management, rate limiting, authentication, and request routing.',
    'Data Management: Database per service, event sourcing, CQRS, and distributed transactions.',
    'Deployment & Operations: Container orchestration, service discovery, health checks, and automated scaling.',
  ],
  capabilities: [
    'Microservices Design & Architecture',
    'Domain-Driven Design Implementation',
    'Service Mesh Integration',
    'API Gateway Design',
    'Event-Driven Architecture',
    'Distributed Systems Patterns',
    'Microservices Testing Strategies',
    'Service Decomposition & Migration',
  ],
  benefits: [
    'Independent service deployment',
    'Technology diversity and flexibility',
    'Improved fault isolation',
    'Better scalability',
    'Team autonomy and faster development',
    'Easier maintenance and updates',
  ],
  useCases: [
    'Monolith to microservices migration',
    'Large-scale distributed systems',
    'Multi-tenant SaaS platforms',
    'E-commerce and retail platforms',
    'Financial services applications',
    'Real-time data processing systems',
  ],
  imagePlaceholder: 'Microservices Architecture',
}

export default function MicroservicesArchitecturePage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

