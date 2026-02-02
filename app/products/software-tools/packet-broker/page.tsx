import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Packet Broker',
  description: 'Software packet broker for traffic aggregation, filtering, load balancing, and tool optimization with automation hooks.',
  openGraph: {
    title: 'Packet Broker - Traffic Analysis | PalC Networks',
    description: 'Software packet brokering with filtering, load balancing, and automation.',
  },
}

export default function PacketBrokerPage() {
  return (
    <DetailPageTemplate
      title="Packet Broker"
      subtitle="Software packet broker that aggregates, filters, and load balances traffic to maximize monitoring and security tool efficiency."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Software Tools', href: '/products/software-tools' },
        { label: 'Packet Broker' },
      ]}
      overview="Software-based packet broker for tapping, aggregating, filtering, and distributing traffic to monitoring/security tools. Supports flow-aware load balancing, de-duplication, masking, and API automation to keep tools efficient and visible."
      overviewDetails={[
        'Acquisition: TAP/SPAN ingestion with de-duplication and timestamp normalization.',
        'Filtering: L2–L7 match/action, header stripping, slicing, masking/tokenization for privacy.',
        'Distribution: Flow-aware load balancing, replication, and health-aware tool selection.',
        'Use cases: SOC visibility, NDR/SIEM feed optimization, APM/perf monitoring, compliance.',
        'Automation: APIs/SDK, templates, and change controls to align with governance.',
      ]}
      capabilities={[
        { title: 'Aggregation & De-dup', description: 'Combine TAP/SPAN feeds, remove duplicates, normalize timestamps.', iconKey: 'network' },
        { title: 'Advanced Filtering', description: 'L2–L7 rules, slicing, masking/tokenization for privacy.', iconKey: 'shield' },
        { title: 'Load Balancing', description: 'Flow-aware distribution with tool health checks.', iconKey: 'zap' },
        { title: 'Replication', description: 'Send relevant copies to multiple tool groups.', iconKey: 'cloud' },
        { title: 'Observability', description: 'Tool health and feed visibility to prevent blind spots.', iconKey: 'database' },
        { title: 'APIs & Automation', description: 'Programmatic control, templates, and change workflows.', iconKey: 'code' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Packet Broker Architecture',
        description: 'Ingest, filter, replicate, and distribute traffic with automation and health checks.',
      }}
      useCases={[
        { title: 'SOC/NDR Feeds', description: 'Optimize traffic for NDR, SIEM, and IDS/IPS tools.' },
        { title: 'Performance Monitoring', description: 'Right-size feeds for APM/perf tools without overload.' },
        { title: 'Compliance/Privacy', description: 'Mask/slice sensitive data while retaining observability.' },
        { title: 'Tool Consolidation', description: 'Load balance and replicate to maximize tool ROI.' },
      ]}
      benefits={[
        { title: 'Tool Efficiency', description: 'Filter and balance feeds to reduce tool overload and cost.' },
        { title: 'Better Visibility', description: 'Reduce blind spots with health-aware distribution.' },
        { title: 'Privacy Controls', description: 'Mask/slice sensitive fields while keeping needed telemetry.' },
        { title: 'Automated Ops', description: 'APIs and templates align broker changes with governance.' },
      ]}
      technicalSpecs={{
        title: 'Platform Snapshot',
        items: [
          { category: 'Ingest', details: ['TAP/SPAN', 'De-dup', 'Timestamp normalization'] },
          { category: 'Filtering', details: ['L2–L7 match/action', 'Header strip/slice', 'Mask/tokenize'] },
          { category: 'Distribution', details: ['Flow-aware LB', 'Replication', 'Tool health checks'] },
          { category: 'Automation', details: ['APIs/SDK', 'Templates', 'Change controls'] },
        ],
      }}
      kpis={[
        { metric: 'Tool Load Reduction', value: 'Up to 30%', description: 'Filtered and balanced feeds.' },
        { metric: 'Coverage', value: '>99% intended feeds', description: 'Health-aware distribution prevents gaps.' },
        { metric: 'Change Velocity', value: 'Minutes', description: 'API-driven rule updates with governance.' },
      ]}
      resources={[
        { title: 'Traffic Visibility Guide', type: 'whitepaper', href: '/resources/whitepapers/open-networking-complete-guide' },
        { title: 'Packet Broker Runbooks', type: 'documentation', href: '/resources/documentation/products' },
      ]}
      cta={{
        title: 'Optimize Your Monitoring Feeds',
        description: 'Shape, balance, and automate traffic delivery to your security and observability tools.',
        primaryButton: { text: 'Request a Demo', href: '/contact' },
        secondaryButton: { text: 'View Software Tools', href: '/products/software-tools' },
      }}
      ragContextId="products:packet-broker"
    />
  )
}

