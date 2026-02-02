import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Wireless',
  description: 'Enterprise wireless engineering: Wi‑Fi 6/7, private LTE/5G, RF design, security, observability, and automation for campus, industrial, and IoT.',
  openGraph: {
    title: 'Wireless Network Services | PalC Networks',
    description: 'Wi‑Fi 6/7, private LTE/5G, RF design, security, and automation.',
  },
}

export default function WirelessPage() {
  return (
    <DetailPageTemplate
      pageType="service"
      title="Wireless"
      subtitle="Wi‑Fi 6/7 and private LTE/5G engineered with RF design, security, QoS, observability, and automation."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Wireless' },
      ]}
      overview="We design and deploy enterprise-grade wireless: Wi‑Fi 6/7 for campus and IoT, and private LTE/5G for industrial and edge. Our designs cover RF planning, QoS, security, observability, and automation so you get predictable performance and assured coverage."
      overviewDetails={[
        'Architecture: Wi‑Fi 6/7 with multi-AP controllers, roaming, QoS/WMM; private LTE/5G with EPC/5GC, RAN, slicing-ready policies.',
        'Deployment models: Campus, branch, industrial/OT, warehouses, healthcare, and outdoor with mesh and backhaul options.',
        'Protocols & integrations: 802.11ax/be, WPA3/802.1X, QoS/WMM, 802.11k/v/r, CBRS/PLTE/5G NR, API/controller integrations.',
        'Performance: Coverage and capacity engineered via surveys, QoS profiles, and RF optimization; SLA/SLO-based design.',
        'Security & compliance: WPA3/802.1X, ZTNA edges, IoT segmentation, policy-as-code, and audit-ready changes.',
        'Automation & operations: ZTP for APs/RAN, template configs, pre/post checks, drift detection, telemetry/SLO dashboards.',
      ]}
      capabilities={[
        { title: 'Wi‑Fi 6/7 Design', description: 'RF planning, capacity modeling, roaming optimization, QoS/WMM.', iconKey: 'network' },
        { title: 'Private LTE/5G', description: 'EPC/5GC, RAN design, CBRS/PLTE, slicing-ready policies.', iconKey: 'cloud' },
        { title: 'Security & Segmentation', description: 'WPA3/802.1X, ZTNA, IoT microsegmentation, guest isolation.', iconKey: 'shield' },
        { title: 'QoS & Performance', description: 'Voice/video priority, RF tuning, interference mitigation, SLO-driven design.', iconKey: 'zap' },
        { title: 'Observability', description: 'Telemetry, SLO dashboards, client experience analytics, RF health.', iconKey: 'database' },
        { title: 'Automation', description: 'ZTP for AP/RAN, templates, pre/post checks, drift detection, APIs.', iconKey: 'code' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Wireless & Private Cellular Architecture',
        description: 'Wi‑Fi 6/7 with controllers, private LTE/5G core/RAN, security and observability layers.',
      }}
      useCases={[
        { title: 'Campus & Branch', description: 'High-density Wi‑Fi 6/7 with seamless roaming and QoS for collaboration/voice.' },
        { title: 'Industrial & OT', description: 'Private LTE/5G for deterministic coverage, IoT/OT segmentation, and reliability.' },
        { title: 'Warehouses & Logistics', description: 'Rugged RF designs for scanners/robots, low-latency roaming.' },
        { title: 'Healthcare & Retail', description: 'Secure patient/guest access, IoT segmentation, and SLA-based coverage.' },
        { title: 'Smart Buildings', description: 'IoT-heavy environments with policy and telemetry for assurance.' },
      ]}
      benefits={[
        { title: 'Predictable Experience', description: 'Engineered RF, QoS, and roaming deliver consistent client performance.' },
        { title: 'Secure by Default', description: 'WPA3/802.1X, ZTNA edges, and segmentation for IoT/guest isolation.' },
        { title: 'Automated Ops', description: 'ZTP, templates, and drift checks reduce MTTR and change risk.' },
        { title: 'Observable Networks', description: 'Telemetry and SLOs surface RF and client health in real time.' },
      ]}
      technicalSpecs={{
        title: 'Protocol & Platform Support',
        items: [
          { category: 'Wi‑Fi', details: ['802.11ax/11be', 'WPA3/802.1X', '802.11k/v/r', 'QoS/WMM', 'RF optimization'] },
          { category: 'Private Cellular', details: ['4G/5G NR', 'EPC/5GC', 'CBRS/PLTE', 'Slicing-ready policy'] },
          { category: 'Security', details: ['WPA3-Enterprise', 'ZTNA/identity integrations', 'IoT segmentation'] },
          { category: 'Automation/Obs', details: ['ZTP for AP/RAN', 'APIs', 'Telemetry/SLO dashboards', 'Drift/conformance'] },
        ],
      }}
      kpis={[
        { metric: 'Roaming Success', value: '>99%', description: 'Optimized 802.11k/v/r with controller tuning.' },
        { metric: 'Voice/Video MOS', value: '>4.0', description: 'QoS and RF optimization for real-time apps.' },
        { metric: 'Availability', value: '99.99%', description: 'Redundant controllers/cores and HA designs.' },
      ]}
      resources={[
        { title: 'Wi‑Fi 6/7 Design Guide', type: 'whitepaper', href: '/resources/whitepapers/open-networking-complete-guide' },
        { title: 'Private LTE/5G Blueprint', type: 'whitepaper', href: '/resources/whitepapers/ai-infrastructure-best-practices' },
        { title: 'Wireless Assurance Patterns', type: 'blog', href: '/resources/blog/observability-int-gnmi' },
      ]}
      cta={{
        title: 'Engineer Your Next Wireless Rollout',
        description: 'Design Wi‑Fi 6/7 and private LTE/5G with security, observability, and automation from day one.',
        primaryButton: { text: 'Schedule a Wireless Design Session', href: '/contact' },
        secondaryButton: { text: 'View Services', href: '/services/networking-engineering' },
      }}
      ragContextId="services:wireless"
      customSections={<PartnersSection />}
    />
  )
}

