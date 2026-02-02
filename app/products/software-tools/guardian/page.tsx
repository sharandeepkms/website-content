import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Guardian',
  description: 'Network security analytics with threat detection, NDR, SOAR hooks, and zero-trust visibility.',
  openGraph: {
    title: 'Guardian - Network Security Platform | PalC Networks',
    description: 'Network security analytics with detection, NDR, and SOAR integrations.',
  },
}

export default function GuardianPage() {
  return (
    <DetailPageTemplate
      title="Guardian"
      subtitle="Network detection and response with threat analytics, zero-trust visibility, and SOAR-ready automation."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Software Tools', href: '/products/software-tools' },
        { label: 'Guardian' },
      ]}
      overview="Guardian delivers NDR-style visibility, behavioral analytics, and threat detection with integrations to SIEM/SOAR. It provides zero-trust visibility, microsegmentation insights, and automated response hooks to reduce dwell time and improve SOC efficiency."
      overviewDetails={[
        'Data sources: Flow, packets (select taps), DNS/HTTP metadata, identity/context enrichment.',
        'Detection: ML/behavioral, signature/IOC, anomaly and lateral movement detection, device profiling.',
        'Zero-trust visibility: Segment/microsegment mapping, policy validation, east-west observations.',
        'Response: SOAR-ready playbooks, ticket/chatops hooks, containment actions via network/security controls.',
        'Compliance: Evidence and reporting for audits, retention controls, and role-based access.',
        'Operations: SLO-aware alerting, noise reduction, and case management workflows.',
      ]}
      capabilities={[
        { title: 'NDR & Analytics', description: 'Behavioral + IOC detection across flows/packets/metadata.', iconKey: 'network' },
        { title: 'Zero-Trust Visibility', description: 'Microsegmentation mapping and east-west policy validation.', iconKey: 'shield' },
        { title: 'SOAR Integrations', description: 'Playbooks, containment hooks, ticket/chatops triggers.', iconKey: 'code' },
        { title: 'Threat Intel', description: 'IOC feeds, enrichment, and correlation with identity/context.', iconKey: 'database' },
        { title: 'Compliance & Evidence', description: 'Reporting, RBAC, retention, and audit trails.', iconKey: 'cloud' },
        { title: 'Noise Reduction', description: 'SLO-aware alerting, deduplication, and case workflows.', iconKey: 'zap' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Guardian Architecture',
        description: 'Sensors/flows, analytics, enrichment, and SOAR/ticket integrations for response.',
      }}
      useCases={[
        { title: 'SOC Visibility', description: 'NDR analytics with SOAR hooks to speed investigation and response.' },
        { title: 'Zero-Trust Validation', description: 'Map and validate segmentation/policies with east-west insights.' },
        { title: 'Threat Hunting', description: 'Behavioral detections, queries, and enriched context for hunts.' },
        { title: 'Compliance', description: 'Evidence and reporting for audits, RBAC, and retention controls.' },
      ]}
      benefits={[
        { title: 'Faster Response', description: 'SOAR-ready playbooks and containment reduce MTTR.' },
        { title: 'Better Signal', description: 'Behavioral + IOC + context cut false positives and noise.' },
        { title: 'Zero-Trust Ready', description: 'Visibility and validation for microsegmentation policies.' },
        { title: 'Audit Friendly', description: 'Reporting, RBAC, and evidence for compliance needs.' },
      ]}
      technicalSpecs={{
        title: 'Platform Snapshot',
        items: [
          { category: 'Inputs', details: ['Flow + selective packets', 'DNS/HTTP metadata', 'Identity/context'] },
          { category: 'Detection', details: ['Behavioral/ML', 'IOC/signature', 'Anomaly/lateral movement'] },
          { category: 'Integrations', details: ['SIEM/SOAR', 'Ticket/chatops', 'Network/security controls'] },
          { category: 'Security', details: ['RBAC', 'Retention controls', 'Audit trails', 'Role-scoped views'] },
        ],
      }}
      kpis={[
        { metric: 'MTTR Reduction', value: 'Up to 40%', description: 'With SOAR playbooks and containment hooks.' },
        { metric: 'Alert Noise', value: '-30% to -50%', description: 'Correlation and SLO-aware alerting.' },
        { metric: 'Detection Coverage', value: 'NDR + IOC + behavior', description: 'Layered techniques improve fidelity.' },
      ]}
      resources={[
        { title: 'Zero-Trust Visibility Guide', type: 'whitepaper', href: '/resources/whitepapers/ai-infrastructure-best-practices' },
        { title: 'NDR Playbook', type: 'documentation', href: '/resources/documentation/products' },
      ]}
      cta={{
        title: 'See Guardian in Your SOC',
        description: 'Pilot NDR, zero-trust validation, and SOAR-ready response tailored to your environment.',
        primaryButton: { text: 'Request a Demo', href: '/contact' },
        secondaryButton: { text: 'View Software Tools', href: '/products/software-tools' },
      }}
      ragContextId="products:guardian"
    />
  )
}

