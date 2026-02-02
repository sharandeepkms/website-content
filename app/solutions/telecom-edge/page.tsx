import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Telecom & Edge (TIP / O-RAN / 5G)',
  description: 'Deploy next-generation telecom and edge infrastructure with TIP, O-RAN, and 5G solutions for flexible, cost-effective network deployments.',
  openGraph: {
    title: 'Telecom & Edge (TIP / O-RAN / 5G) | PalC Networks',
    description: 'Next-generation telecom and edge infrastructure solutions.',
  },
}

export default function TelecomEdgePage() {
  return (
    <DetailPageTemplate
      title="Telecom & Edge (TIP / O-RAN / 5G)"
      subtitle="Enable next-generation connectivity with open telecom infrastructure. From O-RAN deployments to edge computing platforms, we deliver the foundation for 5G and beyond."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Telecom & Edge (TIP / O-RAN / 5G)' },
      ]}
      overview="Transform your telecom infrastructure with open, disaggregated solutions based on TIP (Telecom Infra Project) and O-RAN (Open Radio Access Network) specifications. Our solutions enable service providers to deploy flexible, cost-effective 5G networks while maintaining carrier-grade performance and reliability."
      capabilities={[
        'O-RAN Architecture & Deployment',
        'TIP-Based Infrastructure',
        '5G Core Network Integration',
        'Edge Computing Platforms',
        'VNF/CNF Virtualized Networks',
        'Wireless Access Solutions',
        'Network Slicing',
        'Multi-access Edge Computing (MEC)',
      ]}
      benefits={[
        'Enable ultra-low latency applications',
        'Reduce backhaul costs',
        'Accelerate 5G deployment',
        'Improve network economics',
        'Enable new service offerings',
        'Vendor-agnostic infrastructure',
      ]}
      useCases={[
        '5G network rollouts and deployments',
        'Industrial IoT and private networks',
        'Smart city infrastructure',
        'Enterprise private 5G networks',
        'Edge computing platforms',
        'Fixed wireless access (FWA)',
      ]}
      heroImage="/images/solutions/telecom-edge-banner.png"
      heroImageAlt="O-RAN / 5G Network Architecture"
      customSections={<PartnersSection />}
    />
  )
}

