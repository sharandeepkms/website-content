import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Data Center Modernization & AI Fabrics',
  description: 'Transform your data center infrastructure with AI-optimized fabrics, high-performance networking, and modern architecture for machine learning workloads.',
  openGraph: {
    title: 'Data Center Modernization & AI Fabrics | PalC Networks',
    description: 'AI-optimized data center fabrics and high-performance networking solutions.',
  },
}

export default function DataCenterModernizationPage() {
  return (
    <DetailPageTemplate
      title="Data Center Modernization & AI Fabrics"
      subtitle="Build next-generation data center infrastructure optimized for AI/ML workloads with high-bandwidth fabrics, GPU cluster networking, and intelligent resource orchestration."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Data Center Modernization & AI Fabrics' },
      ]}
      overview="Modernize your data center infrastructure to support AI and machine learning workloads at scale. Our solutions deliver high-bandwidth, low-latency networking fabrics optimized for GPU clusters, distributed training, and real-time inference. We design and implement data center architectures that enable seamless scaling of AI workloads while maintaining operational efficiency."
      capabilities={[
        'AI-Optimized Network Fabrics',
        'GPU Cluster Networking (RDMA, RoCE, InfiniBand)',
        'High-Performance Switching (400G+)',
        'Storage/Compute Optimization',
        'Network Telemetry & Observability',
        'Automated Resource Orchestration',
        'Multi-tenant Isolation',
        'Energy-Efficient Design',
      ]}
      benefits={[
        'Accelerate AI model training by up to 10x',
        'Reduce infrastructure costs through optimization',
        'Scale AI workloads efficiently',
        'Improve model deployment speed',
        'Enable real-time AI inference',
        'Future-proof infrastructure investments',
      ]}
      useCases={[
        'Large language model (LLM) training infrastructure',
        'Computer vision and image processing pipelines',
        'Real-time ML inference at scale',
        'Scientific computing and HPC workloads',
        'Multi-tenant AI cloud platforms',
        'Edge-to-cloud AI data pipelines',
      ]}
      heroImage="/images/placeholder-hero.svg"
      heroImageAlt="AI Data Center Fabric Architecture"
      customSections={<PartnersSection />}
    />
  )
}

