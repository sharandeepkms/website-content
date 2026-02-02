import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Support Overview | PalC Networks',
  description: 'Comprehensive support services including Technical Assistance Center (TAC), managed services, and lifecycle support for your infrastructure.',
  openGraph: {
    title: 'Support Overview | PalC Networks',
    description: 'Expert technical support and managed services for your infrastructure.',
  },
}

export default function SupportOverviewPage() {
  return (
    <DetailPageTemplate
      pageType="service"
      title="Support Overview"
      subtitle="Comprehensive support services to keep your infrastructure running smoothly. From Technical Assistance Center (TAC) to managed services, we provide end-to-end support throughout your infrastructure lifecycle."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Support', href: '/support' },
      ]}
      overview="PalC provides comprehensive support services designed to ensure your infrastructure remains reliable, secure, and optimized. Our support offerings cover everything from technical assistance and troubleshooting to managed services and lifecycle support."
      overviewDetails={[
        'Technical Assistance Center (TAC): Expert technical support for troubleshooting, issue resolution, and guidance on infrastructure challenges.',
        'Managed Services: Full lifecycle management including monitoring, maintenance, updates, and proactive issue prevention.',
        'Support & Maintenance: Ongoing support for deployed systems including patches, upgrades, and optimization.',
        '24/7 Availability: Round-the-clock support for critical infrastructure with defined SLAs and response times.',
        'Proactive Monitoring: Continuous monitoring and alerting to identify and resolve issues before they impact operations.',
      ]}
      capabilities={[
        {
          title: 'Technical Assistance Center (TAC)',
          description: 'Expert technical support with defined SLAs, troubleshooting, and issue resolution.',
          iconKey: 'network',
        },
        {
          title: 'Managed Services',
          description: 'Full lifecycle management including monitoring, maintenance, and proactive support.',
          iconKey: 'server',
        },
        {
          title: 'Support & Maintenance',
          description: 'Ongoing support for patches, upgrades, and system optimization.',
          iconKey: 'settings',
        },
        {
          title: '24/7 Support',
          description: 'Round-the-clock support for critical infrastructure with rapid response times.',
          iconKey: 'zap',
        },
        {
          title: 'Proactive Monitoring',
          description: 'Continuous monitoring and alerting to prevent issues before they occur.',
          iconKey: 'cloud',
        },
      ]}
      benefits={[
        {
          title: 'Reduced downtime',
          description: 'Expert support and proactive monitoring minimize infrastructure downtime and service disruptions.',
        },
        {
          title: 'Faster issue resolution',
          description: 'Rapid response times and expert troubleshooting ensure quick resolution of technical issues.',
        },
        {
          title: 'Improved system reliability',
          description: 'Proactive monitoring and maintenance keep your infrastructure running at peak performance.',
        },
        {
          title: 'Cost-effective operations',
          description: 'Managed services and support reduce the need for in-house expertise and infrastructure management overhead.',
        },
        {
          title: 'Peace of mind',
          description: '24/7 support and defined SLAs provide confidence that your infrastructure is in expert hands.',
        },
      ]}
      useCases={[
        {
          title: 'Enterprise Infrastructure Support',
          description: 'Comprehensive support for enterprise networking and data center infrastructure.',
          industry: 'Enterprise',
        },
        {
          title: 'AI/ML Platform Support',
          description: 'Specialized support for AI/ML infrastructure including GPU clusters and training environments.',
          industry: 'AI/ML',
        },
        {
          title: 'Cloud Infrastructure Support',
          description: 'Support for hybrid and multi-cloud infrastructure deployments.',
          industry: 'Cloud',
        },
        {
          title: 'Critical System Support',
          description: '24/7 support for mission-critical systems with strict uptime requirements.',
          industry: 'Critical Systems',
        },
      ]}
      resources={[
        {
          title: 'Managed Services (NOC/SOC)',
          type: 'case-study',
          href: '/services/professional-lifecycle-services/managed-services',
        },
        {
          title: 'Support & Maintenance',
          type: 'case-study',
          href: '/services/professional-lifecycle-services/support-maintenance',
        },
      ]}
      ragContextId="support-overview"
      cta={{
        title: 'Need Support for Your Infrastructure?',
        description: 'Contact our support team to discuss how we can help keep your infrastructure running smoothly.',
        primaryButton: {
          text: 'Contact Support',
          href: '/contact',
        },
        secondaryButton: {
          text: 'View TAC Services',
          href: '/support/tac',
        },
      }}
    />
  )
}

