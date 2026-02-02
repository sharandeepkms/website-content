import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Servers',
  description: 'Cloud/edge servers for AI, networking, storage, and virtualization with acceleration, telemetry, and lifecycle automation.',
  openGraph: {
    title: 'Servers | PalC Networks',
    description: 'Cloud/edge servers with acceleration, observability, and automation.',
  },
}

export default function ServersPage() {
  return (
    <DetailPageTemplate
      title="Servers"
      subtitle="Cloud and edge servers engineered for AI, networking, storage, and virtualization—built with acceleration, observability, and lifecycle automation."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Servers' },
      ]}
      overview="Rack and edge platforms tuned for AI/ML, network services, storage, and virtualized/cloud-native workloads. Built with acceleration options, power/thermal profiles, and lifecycle automation for consistent fleet operations."
      overviewDetails={[
        'Form factors: 1U/2U/4U rack, short-depth edge, GPU/accelerator-ready, NEBS options on request.',
        'Acceleration: GPU/FPGA/SmartNIC/DPU options for AI inference/training, security, and offload.',
        'Networking: Up to 2x100/200/400G NICs, RoCE/IB capable, PTP/1588 options for timing-sensitive workloads.',
        'Storage: NVMe/SAS/SATA mixes with cache/tiering; erasure/ZFS-ready designs for data durability.',
        'Management: BMC/IPMI/Redfish, telemetry hooks, power/thermal tuning, secure boot and attestation.',
        'Operations: Golden images, ZTP, firmware baselining, drift/conformance checks, and fleet observability.',
      ]}
      capabilities={[
        { title: 'AI/Accelerated', description: 'GPU/FPGA/DPU options, high power budgets, tuned thermals.', iconKey: 'cpu' },
        { title: 'Network & Edge', description: 'High-speed NICs, PTP/1588 options, short-depth edge SKUs.', iconKey: 'network' },
        { title: 'Storage-Optimized', description: 'Dense NVMe/SAS, tiering support, cache profiles.', iconKey: 'database' },
        { title: 'Lifecycle Automation', description: 'ZTP, firmware baselines, golden images, drift checks.', iconKey: 'code' },
        { title: 'Security & Trust', description: 'Secure boot, attestation, TPM/secure enclaves, signed firmware.', iconKey: 'shield' },
        { title: 'Observability', description: 'Power/thermal/health telemetry, integration to SLO dashboards.', iconKey: 'cloud' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Server Platform Blueprint',
        description: 'Rack/edge servers with acceleration, secure boot, observability, and automation hooks.',
      }}
      useCases={[
        { title: 'AI/ML Inference & Training', description: 'GPU/DPU-enabled nodes with RoCE and PTP support.' },
        { title: 'NFV/SDN Platforms', description: 'High-NIC density, SR-IOV/offload for VNFs/CNFs.' },
        { title: 'Edge & MEC', description: 'Short-depth, ruggedized options with remote automation.' },
        { title: 'Storage Nodes', description: 'NVMe/SAS mixes for object/block/file with cache/tier tuning.' },
      ]}
      benefits={[
        { title: 'Performance Tuned', description: 'Right-sized CPU/memory/IO plus acceleration for target workloads.' },
        { title: 'Reliable & Secure', description: 'Redundant power/cooling, secure boot/attestation, signed firmware.' },
        { title: 'Operationally Simple', description: 'ZTP, golden images, firmware baselines, drift/conformance.' },
        { title: 'Observable', description: 'Health, power, and thermal telemetry feeding SLO dashboards.' },
      ]}
      technicalSpecs={{
        title: 'Platform Options',
        items: [
          { category: 'Form Factors', details: ['1U/2U/4U rack', 'Short-depth edge', 'GPU/accelerator-ready'] },
          { category: 'Networking', details: ['Up to 2x100/200/400G', 'PTP/1588', 'RoCE/IB capable', 'SR-IOV/virt'] },
          { category: 'Acceleration', details: ['GPU', 'FPGA', 'DPU/SmartNIC', 'Crypto/inline offload options'] },
          { category: 'Security', details: ['Secure boot', 'TPM/attestation', 'Signed firmware', 'RBAC/Redfish/IPMI controls'] },
          { category: 'Ops/Automation', details: ['ZTP', 'Golden images', 'Firmware baselines', 'Drift/conformance checks'] },
        ],
      }}
      kpis={[
        { metric: 'Throughput', value: 'Up to 2x400G', description: 'High-speed IO for AI/NFV/storage workloads.' },
        { metric: 'Boot to Ready', value: '<10 min', description: 'With ZTP, golden images, and baseline config.' },
        { metric: 'Drift Detection', value: '<15 min', description: 'Continuous conformance against desired state.' },
      ]}
      resources={[
        { title: 'AI Server Blueprint', type: 'whitepaper', href: '/resources/whitepapers/ai-infrastructure-best-practices' },
        { title: 'Edge/MEC Reference', type: 'blog', href: '/resources/blog/ai-ready-infrastructure-guide' },
        { title: 'Lifecycle Runbooks', type: 'documentation', href: '/resources/documentation/products' },
      ]}
      cta={{
        title: 'Design Your Server Bill of Materials',
        description: 'Get a tuned configuration for AI, NFV, storage, or edge with validated firmware and automation patterns.',
        primaryButton: { text: 'Request a BOM', href: '/contact' },
        secondaryButton: { text: 'View All Products', href: '/products' },
      }}
      ragContextId="products:servers"
    />
  )
}

