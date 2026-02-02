import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Technical Assistance Center (TAC) | PalC Networks',
  description: 'Expert Technical Assistance Center services with defined SLAs, rapid response times, and comprehensive troubleshooting support.',
  openGraph: {
    title: 'Technical Assistance Center (TAC) | PalC Networks',
    description: 'Expert technical support and troubleshooting services.',
  },
}

export default function TACPage() {
  return (
    <DetailPageTemplate
      pageType="service"
      title="Technical Assistance Center (TAC)"
      subtitle="Expert technical support with defined SLAs, rapid response times, and comprehensive troubleshooting for your infrastructure challenges."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Support', href: '/support' },
        { label: 'Technical Assistance Center (TAC)' },
      ]}
      overview="Our Technical Assistance Center (TAC) provides expert technical support for your infrastructure. With defined SLAs, rapid response times, and deep expertise across networking, compute, and cloud platforms, we help you resolve issues quickly and keep your systems running smoothly."
      overviewDetails={[
        'Rapid Response: Defined SLAs with response times based on issue severity, ensuring critical issues are addressed immediately.',
        'Expert Troubleshooting: Deep technical expertise across networking, SONiC, cloud platforms, and infrastructure technologies.',
        'Remote & On-Site Support: Flexible support options including remote diagnostics and on-site assistance when needed.',
        '24/7 Availability: Round-the-clock support for critical infrastructure with dedicated escalation paths.',
        'Root Cause Analysis: Comprehensive investigation to identify root causes and prevent recurrence.',
        'Documentation & Knowledge Base: Access to technical documentation, best practices, and knowledge base articles.',
      ]}
      capabilities={[
        {
          title: 'Issue Resolution',
          description: 'Rapid diagnosis and resolution of technical issues across infrastructure components.',
          iconKey: 'zap',
        },
        {
          title: 'Troubleshooting',
          description: 'Expert troubleshooting for networking, compute, storage, and cloud platform issues.',
          iconKey: 'network',
        },
        {
          title: 'Performance Optimization',
          description: 'Analysis and optimization of infrastructure performance and resource utilization.',
          iconKey: 'cpu',
        },
        {
          title: 'Configuration Support',
          description: 'Guidance on configuration, best practices, and infrastructure design decisions.',
          iconKey: 'settings',
        },
        {
          title: 'Escalation Management',
          description: 'Structured escalation paths for complex issues requiring specialized expertise.',
          iconKey: 'server',
        },
      ]}
      benefits={[
        {
          title: 'Faster issue resolution',
          description: 'Expert support and defined SLAs ensure rapid resolution of technical issues.',
        },
        {
          title: 'Reduced downtime',
          description: 'Quick response times and expert troubleshooting minimize infrastructure downtime.',
        },
        {
          title: 'Access to expertise',
          description: 'Tap into deep technical expertise without maintaining large in-house teams.',
        },
        {
          title: 'Proactive guidance',
          description: 'Get expert guidance on configuration, optimization, and best practices.',
        },
        {
          title: 'Peace of mind',
          description: '24/7 support with defined SLAs provides confidence in infrastructure reliability.',
        },
      ]}
      useCases={[
        {
          title: 'Network Troubleshooting',
          description: 'Expert support for network issues including connectivity, performance, and configuration problems.',
          industry: 'Networking',
        },
        {
          title: 'SONiC Platform Support',
          description: 'Specialized support for SONiC-based platforms and open networking deployments.',
          industry: 'Open Networking',
        },
        {
          title: 'Cloud Infrastructure Support',
          description: 'Support for cloud platform issues, integration challenges, and hybrid infrastructure.',
          industry: 'Cloud',
        },
        {
          title: 'Critical System Support',
          description: '24/7 support for mission-critical systems with strict uptime and performance requirements.',
          industry: 'Critical Systems',
        },
      ]}
      technicalSpecs={{
        title: 'Support Tiers & SLAs',
        items: [
          {
            category: 'Severity Levels',
            details: [
              'Critical (P1): System down or major service impact - Response: 1 hour',
              'High (P2): Significant service degradation - Response: 4 hours',
              'Medium (P3): Minor service impact - Response: 8 hours',
              'Low (P4): General inquiries - Response: 24 hours',
            ],
          },
          {
            category: 'Support Channels',
            details: [
              'Email support with ticket tracking',
              'Phone support for critical issues',
              'Remote access for diagnostics',
              'On-site support when required',
            ],
          },
          {
            category: 'Coverage Areas',
            details: [
              'Network infrastructure troubleshooting',
              'SONiC and open networking support',
              'Cloud platform integration',
              'Performance optimization',
              'Configuration guidance',
            ],
          },
        ],
      }}
      resources={[
        {
          title: 'Support Overview',
          type: 'documentation',
          href: '/support',
        },
        {
          title: 'Managed Services',
          type: 'case-study',
          href: '/services/professional-lifecycle-services/managed-services',
        },
      ]}
      ragContextId="support-tac"
      cta={{
        title: 'Need Technical Support?',
        description: 'Contact our Technical Assistance Center for expert support with defined SLAs and rapid response times.',
        primaryButton: {
          text: 'Contact TAC',
          href: '/contact',
        },
        secondaryButton: {
          text: 'View Support Overview',
          href: '/support',
        },
      }}
    />
  )
}

