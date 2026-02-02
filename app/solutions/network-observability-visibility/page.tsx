import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'
import { getCanonicalUrl } from '@/app/utils/canonical'

const canonicalUrl = getCanonicalUrl('/solutions/network-observability-visibility')

export const metadata: Metadata = {
  title: 'Network Visibility and Monitoring for Open and High-Scale Networks | PalC Networks',
  description: 'PalC designs and deploys network visibility and monitoring solutions that provide full-fidelity traffic access, real-time observability, and scalable monitoring architectures for SONiC-based and open networks.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Network Visibility and Monitoring for Open and High-Scale Networks | PalC Networks',
    description: 'Full-fidelity traffic visibility and scalable monitoring architectures for SONiC-based and open networks.',
    url: canonicalUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Network Visibility and Monitoring for Open and High-Scale Networks | PalC Networks',
    description: 'Full-fidelity traffic visibility and scalable monitoring architectures for SONiC-based and open networks.',
  },
}

const pageConfig = {
  title: 'Network Visibility and Monitoring for Open and High-Scale Networks',
  tagline: 'PalC designs and deploys network visibility and monitoring solutions that provide full-fidelity traffic access, real-time observability, and scalable monitoring architectures for SONiC-based and open networks.',
  subtitle: '',
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Network Visibility & Monitoring' },
  ],
  overview: 'Network visibility is essential for modern network operations, security, and compliance. PalC delivers comprehensive visibility solutions that provide access to 100% of network traffic at line rate without impacting network performance. Our disaggregated packet broker architecture enables organizations to scale monitoring infrastructure, support multiple tools, and maintain operational flexibility while reducing total cost of ownership.',
  overviewDetails: [
    'Planning & Monitoring Architecture: Understanding traffic sources, monitoring requirements, compliance needs, and tool ecosystems before defining the visibility architecture.',
    'Engineering & Integration: Integrating packet brokers, taps, SONiC-based platforms, and monitoring tools into a cohesive visibility fabric.',
    'Commissioning & Validation: Validating traffic access, processing accuracy, and tool performance under real traffic and scale conditions.',
    'Deployment & Operational Support: Supporting rollout, tuning, upgrades, and lifecycle operations to ensure continuous visibility as networks evolve.',
    'This approach ensures monitoring systems remain accurate, scalable, and operationally sustainable.',
  ],
  capabilities: [
    {
      title: 'Full-Fidelity Traffic Visibility',
      description: 'Access to 100% of network traffic at line rate without introducing points of failure or impacting network performance.',
      iconKey: 'network',
    },
    {
      title: 'Disaggregated Packet Broker Architecture',
      description: 'Software-defined packet broker solutions built on open networking principles, decoupling hardware from software for flexibility and longevity.',
      iconKey: 'server',
    },
    {
      title: 'Advanced Traffic Processing',
      description: 'Support for de-duplication, slicing, reassembly, masking, filtering, and selective traffic replication to optimize monitoring tools.',
      iconKey: 'code',
    },
    {
      title: 'Multi-Tool Monitoring Enablement',
      description: 'Ability to scale monitoring infrastructure and support multiple tools without increasing architectural complexity or vendor lock-in.',
      iconKey: 'zap',
    },
    {
      title: 'Observability for SONiC Deployments',
      description: 'Visibility solutions designed specifically for operational challenges in SONiC-based environments, including telemetry and flow-based insights.',
      iconKey: 'network',
    },
  ],
  architectureDiagram: {
    type: 'reactflow',
    preset: 'network-visibility',
    title: 'Architecture Overview',
    description: 'PalC\'s visibility solutions are built using a disaggregated packet broker architecture. Key architectural elements include: Network taps and SPAN sources for traffic acquisition, Disaggregated packet broker software based on SONiC NOS architecture, Hardware-agnostic deployment on open, OCP-compliant platforms, Advanced data processing for traffic optimization, Seamless integration with monitoring, security, and analytics tools. This architecture enables long-term flexibility, vendor independence, and scalable growth without redesign.',
  },
  benefits: [
    {
      title: 'Full network visibility without impacting performance',
      description: 'Access to 100% of network traffic at line rate without introducing points of failure or performance degradation.',
    },
    {
      title: 'Reduced monitoring blind spots in open and SONiC-based networks',
      description: 'Comprehensive visibility solutions designed specifically for disaggregated and open networking environments.',
    },
    {
      title: 'Lower total cost of ownership through disaggregated architectures',
      description: 'Open, flexible design reduces vendor lock-in and enables pay-as-you-grow scalability.',
    },
    {
      title: 'Improved efficiency of monitoring and security tools',
      description: 'Advanced filtering, load balancing, and traffic optimization maximize tool effectiveness.',
    },
    {
      title: 'Enhanced compliance, security, and operational confidence',
      description: 'Full traffic visibility enables better compliance reporting, security monitoring, and operational troubleshooting.',
    },
  ],
  useCases: [
    {
      title: 'BFSI & Fintech Data Centers',
      description: 'Full traffic visibility for transaction platforms requiring performance assurance, compliance, and security monitoring.',
      industry: 'Financial Services',
    },
    {
      title: 'Telecom & Service Provider Networks',
      description: 'Packet-level visibility for access, aggregation, and core environments, including tunnel and signaling analysis.',
      industry: 'Telecommunications',
    },
    {
      title: 'Enterprise & Utility Networks',
      description: 'Traffic monitoring and analysis for compliance, capacity planning, and operational troubleshooting.',
      industry: 'Enterprise & Utilities',
    },
    {
      title: 'SONiC-Based Open Networks',
      description: 'Monitoring architectures purpose-built for disaggregated and open networking environments.',
      industry: 'Open Networking',
    },
  ],
  resources: [
    {
      title: 'Network Visibility Deployment for a Middle East Utility Provider',
      type: 'case-study',
      href: '/resources/case-studies/network-visibility-utility-provider',
    },
  ],
  technicalSpecs: {
    title: 'Architecture Overview',
    items: [
      {
        category: 'Traffic Acquisition',
        details: [
          'Network taps and SPAN sources for traffic acquisition',
          'Support for multiple traffic sources and protocols',
        ],
      },
      {
        category: 'Packet Broker Software',
        details: [
          'Disaggregated packet broker software based on SONiC NOS architecture',
          'Hardware-agnostic deployment on open, OCP-compliant platforms',
        ],
      },
      {
        category: 'Traffic Processing',
        details: [
          'Advanced data processing for traffic optimization',
          'De-duplication, slicing, reassembly, masking, and filtering',
          'Selective traffic replication capabilities',
        ],
      },
      {
        category: 'Tool Integration',
        details: [
          'Seamless integration with monitoring, security, and analytics tools',
          'Multi-tool support without architectural complexity',
        ],
      },
    ],
  },
  cta: {
    title: 'Looking to improve visibility across your network without adding risk or complexity?',
    description: 'Talk to an Infrastructure Expert to discuss how PalC can help you design and deploy comprehensive network visibility solutions.',
    primaryButton: {
      text: 'Talk to an Infrastructure Expert',
      href: '/contact',
    },
    secondaryButton: {
      text: 'Explore Case Studies',
      href: '/resources/case-studies',
    },
  },
  heroImage: '/images/solutions/network-observability-visibility-banner.png',
  heroImageAlt: 'Network Visibility and Monitoring Architecture',
  ragContextId: 'network-observability-visibility',
  customSections: <PartnersSection />,
}

export default function NetworkObservabilityVisibilityPage() {
  return <DetailPageTemplate {...pageConfig} />
}

