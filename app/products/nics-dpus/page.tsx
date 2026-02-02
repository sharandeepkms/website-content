import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'NICs / DPUs',
  description: 'SmartNICs and DPUs for offload, RoCE/RDMA, inline security, and virtualization acceleration.',
  openGraph: {
    title: 'NICs / DPUs | PalC Networks',
    description: 'SmartNICs and DPUs for offload, RDMA, security, and virtualization.',
  },
}

export default function NICsDPUsPage() {
  return (
    <DetailPageTemplate
      title="NICs / DPUs"
      subtitle="SmartNICs and DPUs delivering line-rate offload, RoCE/RDMA, inline security, and virtualization acceleration."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'NICs / DPUs' },
      ]}
      overview="Programmable SmartNICs and DPUs that offload networking, security, and storage pipelines from host CPUs. Designed for AI clusters, cloud, NFV, and secure multi-tenant environments with strong QoS and telemetry."
      overviewDetails={[
        'Speeds & form factors: 10/25/50/100/200/400G with single/dual-port options and PCIe Gen4/Gen5.',
        'Offloads: L4/L7 load balancing, IPsec/TLS, storage offload, virtIO/SR-IOV, VXLAN/GRE/GTP encapsulation.',
        'RDMA & AI fabrics: RoCEv2/IB with PFC/ECN tuning, congestion management, and GPU-direct readiness.',
        'Virtualization: SR-IOV, virtIO, overlay offload, vSwitch acceleration, multi-tenant isolation.',
        'Security: Inline crypto (IPsec/TLS), ACLs, microsegmentation, per-tenant QoS and rate limiting.',
        'Observability: Line-rate telemetry, flow records, hardware counters, and integration to SLO dashboards.',
      ]}
      capabilities={[
        { title: 'Programmable Offload', description: 'L4/L7, overlay, crypto, and storage pipelines offloaded.', iconKey: 'cpu' },
        { title: 'RDMA & AI', description: 'RoCE/IB with congestion control, GPU-direct friendly.', iconKey: 'zap' },
        { title: 'Virtualization', description: 'SR-IOV/virtIO, vSwitch acceleration, overlay termination.', iconKey: 'network' },
        { title: 'Security Inline', description: 'IPsec/TLS, ACL/microsegmentation, per-tenant QoS.', iconKey: 'shield' },
        { title: 'Telemetry', description: 'Flow stats, congestion visibility, hardware counters.', iconKey: 'database' },
        { title: 'APIs & Control', description: 'Programmable pipelines with SDK/APIs and automation hooks.', iconKey: 'code' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'dc-ai-fabric',
        title: 'Accelerated IO Architecture',
        description: 'SmartNIC/DPU offload for networking, security, storage, and virtualization in AI/cloud fabrics.',
      }}
      useCases={[
        { title: 'AI/ML Fabrics', description: 'RoCE/IB with congestion controls and GPU-direct support.' },
        { title: 'NFV Offload', description: 'vSwitch acceleration, overlay termination, and SR-IOV isolation.' },
        { title: 'Secure Multi-Tenant Cloud', description: 'Inline IPsec/TLS, ACLs, and per-tenant QoS.' },
        { title: 'Storage & Database', description: 'Storage offload and low-latency IO for data platforms.' },
      ]}
      benefits={[
        { title: 'Lower CPU Burn', description: 'Offload heavy packet, crypto, and storage paths to the NIC/DPU.' },
        { title: 'Deterministic Latency', description: 'Hardware pipelines with congestion controls keep tail latency down.' },
        { title: 'Secure by Default', description: 'Inline encryption and segmentation without host overhead.' },
        { title: 'Operate at Scale', description: 'Telemetry and automation hooks for large AI/cloud deployments.' },
      ]}
      technicalSpecs={{
        title: 'Platform Snapshot',
        items: [
          { category: 'Speeds', details: ['10/25/50/100/200/400G', 'PCIe Gen4/Gen5', 'Single/Dual port'] },
          { category: 'Offloads', details: ['VXLAN/GRE/GTP', 'IPsec/TLS', 'L4/L7 LB', 'Storage offload'] },
          { category: 'Virtualization', details: ['SR-IOV/virtIO', 'vSwitch acceleration', 'Overlay termination'] },
          { category: 'RDMA', details: ['RoCEv2/IB', 'PFC/ECN', 'GPU-direct friendly'] },
          { category: 'Telemetry', details: ['Flow/hardware counters', 'Congestion visibility', 'SLO dashboard integration'] },
        ],
      }}
      kpis={[
        { metric: 'Host CPU Savings', value: 'Up to 40%', description: 'From offloading network/crypto/storage paths.' },
        { metric: 'Latency', value: '<30µs (target)', description: 'With tuned RoCE/IB and congestion controls.' },
        { metric: 'Throughput', value: 'Line rate', description: 'Full-rate with offloads enabled.' },
      ]}
      resources={[
        { title: 'DPU Architecture Brief', type: 'whitepaper', href: '/resources/whitepapers/ai-infrastructure-best-practices' },
        { title: 'RoCE Tuning Guide', type: 'blog', href: '/resources/blog/ai-ready-infrastructure-guide' },
      ]}
      cta={{
        title: 'Choose Your SmartNIC/DPU Profile',
        description: 'Get a recommended SKU and tuning profile for your AI, cloud, or NFV workloads.',
        primaryButton: { text: 'Request a Recommendation', href: '/contact' },
        secondaryButton: { text: 'View All Products', href: '/products' },
      }}
      ragContextId="products:nics-dpus"
    />
  )
}

