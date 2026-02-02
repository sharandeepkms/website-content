import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'High-Speed Cables',
  description: 'DAC/AOC and breakout assemblies validated for AI, cloud, and data center fabrics with thermal and reach profiles.',
  openGraph: {
    title: 'High-Speed Cables | PalC Networks',
    description: 'DAC/AOC and breakouts validated for AI and cloud fabrics.',
  },
}

export default function HighSpeedCablesPage() {
  return (
    <DetailPageTemplate
      title="High-Speed Cables"
      subtitle="DAC/AOC and breakout cables tuned for AI, cloud, and data center fabrics—validated for reach, thermals, and interoperability."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'High-Speed Cables' },
      ]}
      overview="Cabling portfolio covering DAC, AOC, breakouts, and extended-reach options. Each SKU is validated for interoperability, reach, thermal envelope, and signal integrity across AI/ML, cloud, and HPC fabrics."
      overviewDetails={[
        'Types: Passive/active DAC, AOC, breakouts (4x/2x), QSFP-DD, OSFP options by request.',
        'Speeds: 25/50/100/200/400G options with appropriate reach and latency profiles.',
        'Validation: Interop tested with leading switches/NICs/DPUs; thermal and bend-radius checks.',
        'Use in AI fabrics: Profiles aligned to RoCE/PFC tuning requirements for predictable latency.',
        'Labeling & ops: Clear labeling, color-coding options, and BOM-ready part numbers.',
      ]}
      capabilities={[
        { title: 'DAC Portfolio', description: 'Passive/active DAC for short-reach, low-latency links.', iconKey: 'network' },
        { title: 'AOC Portfolio', description: 'Active optical for longer reach with low power and weight.', iconKey: 'cloud' },
        { title: 'Breakouts', description: '4x/2x breakouts (e.g., 1x400G to 4x100G) for flexible topologies.', iconKey: 'code' },
        { title: 'Validation', description: 'Interop and SI testing with major switch/NIC/DPU vendors.', iconKey: 'shield' },
        { title: 'AI/ML Ready', description: 'Latency-aware selections for RoCE/PFC tuned fabrics.', iconKey: 'zap' },
        { title: 'Ops Friendly', description: 'Labeling, BOM consistency, and clear part number mapping.', iconKey: 'database' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'dc-ai-fabric',
        title: 'Cabling in AI/Cloud Fabrics',
        description: 'DAC/AOC/breakout placement across leaf/spine/host links with SI and thermal constraints.',
      }}
      useCases={[
        { title: 'Leaf-Spine Links', description: 'Short-reach DAC for ToR-to-spine connections.' },
        { title: 'AI/ML Clusters', description: 'Latency-aware DAC/AOC aligned to RoCE/PFC profiles.' },
        { title: 'Server/Storage Attach', description: 'Breakouts for flexible host connectivity and port utilization.' },
        { title: 'Longer-Reach DC Links', description: 'AOC for extended runs with low power and weight.' },
      ]}
      benefits={[
        { title: 'Predictable Performance', description: 'Validated SI/thermal for consistent latency and reach.' },
        { title: 'Interoperability', description: 'Tested with leading switches, NICs, and DPUs.' },
        { title: 'Operational Clarity', description: 'Labeling and BOM-ready part numbers simplify rollouts.' },
        { title: 'Cost/Power Efficiency', description: 'Right-fit DAC vs AOC to balance cost, power, and reach.' },
      ]}
      technicalSpecs={{
        title: 'Portfolio Snapshot',
        items: [
          { category: 'Speeds', details: ['25/50/100/200/400G'] },
          { category: 'Types', details: ['Passive/Active DAC', 'AOC', 'Breakouts (4x/2x)', 'QSFP-DD/OSFP options'] },
          { category: 'Validation', details: ['Interoperability tests', 'Signal integrity checks', 'Thermal envelope validation'] },
          { category: 'Ops', details: ['Labeling/color options', 'BOM part mapping', 'Field-ready packaging'] },
        ],
      }}
      kpis={[
        { metric: 'Latency', value: 'As low as copper-permitted', description: 'Minimized for short-reach DAC.' },
        { metric: 'Reach', value: 'Up to spec per speed', description: 'Matched to speed and type (DAC/AOC).' },
        { metric: 'Interoperability', value: 'Multi-vendor validated', description: 'Across major switches/NICs/DPUs.' },
      ]}
      resources={[
        { title: 'AI Fabric Cabling Guide', type: 'whitepaper', href: '/resources/whitepapers/ai-infrastructure-best-practices' },
        { title: 'Cabling BOM Checklist', type: 'documentation', href: '/resources/documentation/products' },
      ]}
      cta={{
        title: 'Pick the Right Cable Set',
        description: 'Get a cabling BOM matched to your fabric topology, reach, and latency targets.',
        primaryButton: { text: 'Request a Cabling BOM', href: '/contact' },
        secondaryButton: { text: 'View All Products', href: '/products' },
      }}
      ragContextId="products:high-speed-cables"
    />
  )
}

