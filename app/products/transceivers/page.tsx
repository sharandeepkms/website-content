import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Transceivers',
  description: 'Optical transceivers from 10G–400G, validated for AI/cloud/DC fabrics with DWDM/CWDM and extended temp options.',
  openGraph: {
    title: 'Optical Transceivers | PalC Networks',
    description: '10G–400G optical transceivers validated for AI and cloud fabrics.',
  },
}

export default function TransceiversPage() {
  return (
    <DetailPageTemplate
      title="Transceivers"
      subtitle="10G–400G optical modules validated for AI, cloud, and DC fabrics, with DWDM/CWDM and extended temperature options."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Transceivers' },
      ]}
      overview="Broad portfolio of SFP/SFP28/QSFP/QSFP-DD modules validated for interoperability, SI/BER, and thermal envelopes. Options include LR/ER/ZR, CWDM/DWDM, and extended temperature for harsh environments."
      overviewDetails={[
        'Speeds & formats: 10G, 25G, 40G, 100G, 200G, 400G across SFP/SFP28/QSFP/QSFP-DD.',
        'Distances: SR/LR/ER/ZR options with reach matched to data center and DCI use cases.',
        'Wavelengths: CWDM/DWDM options for metro/DCI and constrained-fiber environments.',
        'Validation: BER, SI, and thermal validation across leading switches/NICs/DPUs.',
        'Operations: Clear labeling, DOM support, and BOM-ready part numbering.',
        'Environments: Standard and extended temp ranges for campus/industrial/edge.',
      ]}
      capabilities={[
        { title: 'Wide Portfolio', description: '10G–400G across SFP/SFP28/QSFP/QSFP-DD.', iconKey: 'network' },
        { title: 'Reach Options', description: 'SR/LR/ER/ZR to match DC and DCI topologies.', iconKey: 'cloud' },
        { title: 'WDM Choices', description: 'CWDM/DWDM for metro, DCI, and fiber-constrained builds.', iconKey: 'database' },
        { title: 'Interop & SI', description: 'Validated BER/SI/thermal with major switch/NIC/DPU vendors.', iconKey: 'shield' },
        { title: 'Operational Clarity', description: 'DOM support, labeling, and BOM-aligned SKUs.', iconKey: 'code' },
        { title: 'Extended Temp', description: 'Options for harsh or outdoor/edge deployments.', iconKey: 'zap' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'dc-ai-fabric',
        title: 'Optics in AI/Cloud Fabrics',
        description: 'Optics placement for leaf/spine, DCI, and metro with reach and SI considerations.',
      }}
      useCases={[
        { title: 'Leaf/Spine Fabric', description: 'SR/LR optics tuned for AI and cloud data centers.' },
        { title: 'DCI & Metro', description: 'ZR/CWDM/DWDM for metro/DCI with constrained fiber.' },
        { title: 'Edge & Campus', description: 'Extended temp modules for outdoor/industrial sites.' },
        { title: 'High-Speed Servers', description: 'Server/NIC attachments with validated SI/BER.' },
      ]}
      benefits={[
        { title: 'Predictable Links', description: 'Validated SI/BER deliver consistent performance.' },
        { title: 'Interoperable', description: 'Multi-vendor testing reduces integration risk.' },
        { title: 'Right-Fit Reach', description: 'Match SR/LR/ER/ZR and WDM to your topology and fiber plan.' },
        { title: 'Ops Ready', description: 'DOM, labeling, and BOM mapping for smooth rollouts.' },
      ]}
      technicalSpecs={{
        title: 'Portfolio Snapshot',
        items: [
          { category: 'Speeds', details: ['10/25/40/100/200/400G'] },
          { category: 'Form Factors', details: ['SFP/SFP28', 'QSFP/QSFP28', 'QSFP-DD'] },
          { category: 'Reach', details: ['SR/LR/ER/ZR', 'CWDM/DWDM options'] },
          { category: 'Validation', details: ['SI/BER tests', 'Thermal validation', 'Interop with major platforms'] },
          { category: 'Env', details: ['Standard and extended temperature options'] },
        ],
      }}
      kpis={[
        { metric: 'Interoperability', value: 'Multi-vendor', description: 'Validated across leading switches/NICs/DPUs.' },
        { metric: 'Link Stability', value: 'Target BER within spec', description: 'After SI and thermal validation.' },
        { metric: 'Operational Readiness', value: 'DOM + labeling', description: 'Ease of operations and monitoring.' },
      ]}
      resources={[
        { title: 'Optics Deployment Guide', type: 'whitepaper', href: '/resources/whitepapers/open-networking-complete-guide' },
        { title: 'AI Fabric Optics Primer', type: 'blog', href: '/resources/blog/ai-ready-infrastructure-guide' },
      ]}
      cta={{
        title: 'Select the Right Optics Set',
        description: 'Get a curated optics BOM aligned to your fabric reach, thermal, and interoperability requirements.',
        primaryButton: { text: 'Request an Optics BOM', href: '/contact' },
        secondaryButton: { text: 'View All Products', href: '/products' },
      }}
      ragContextId="products:transceivers"
    />
  )
}

