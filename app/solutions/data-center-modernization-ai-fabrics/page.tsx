import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { HowWeWorkSection } from '@/app/components/HowWeWorkSection'
import { PartnersSection } from '@/app/components/PartnersSection'
import { getCanonicalUrl } from '@/app/utils/canonical'

// ISR: Revalidate every 7 days (solution pages change less frequently)
export const revalidate = 604800

const canonicalUrl = getCanonicalUrl('/solutions/data-center-modernization-ai-fabrics')

export const metadata: Metadata = {
  title: 'Data Center Modernization & AI Fabrics | PalC Networks',
  description: 'Design, deploy, and operate high-performance AI data center fabrics using open networking, SONiC, and production-proven engineering. Trusted by enterprises modernizing data centers for AI, cloud, and high-scale networking.',
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Data Center Modernization & AI Fabrics | PalC Networks',
    description: 'AI-optimized data center fabrics and high-performance networking solutions.',
    url: canonicalUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Center Modernization & AI Fabrics | PalC Networks',
    description: 'AI-optimized data center fabrics and high-performance networking solutions.',
  },
}

export default function DataCenterModernizationAIFabricsPage() {
  return (
    <DetailPageTemplate
      title="Modern Data Center Networks for AI-Driven and High-Growth Environments"
      tagline="PalC helps organizations modernize data center networks to support AI workloads, high-bandwidth applications, and rapid scale using open architectures designed for performance, visibility, and long-term operations."
      subtitle=""
      heroImage="/images/solutions/data-center-modernization-ai-fabrics-banner.png"
      heroImageAlt="AI Data Center Fabric Architecture"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Data Center Modernization & AI Fabrics', href: '/solutions/data-center-modernization-ai-fabrics' },
      ]}
      overview="Modernize your data center infrastructure to reliably support AI and machine learning workloads at scale. PalC designs and delivers AI-optimized data center fabrics that enable high-throughput GPU communication, predictable latency, and operational stability across training and inference environments. Our approach focuses on aligning network and storage behavior with AI workload requirements through scalable leaf-spine architectures, RoCE-enabled Ethernet fabrics, lossless transport, high-performance storage access, and built-in telemetry. The result is an open, production-ready infrastructure foundation designed to deliver consistent AI performance, efficient GPU utilization, and long-term operational flexibility."
      overviewDetails={[
        'Planning & Architecture: Understanding business needs, workload behavior, and scale requirements, and translating them into clear network and fabric designs.',
        'Engineering & Build: Engineering open, scalable network fabrics and integrating platforms, hardware, and tooling for deployment.',
        'Commissioning & Validation: Validating networks against real traffic, scale limits, and failure scenarios before production rollout.',
        'Deployment & Operations Support: Deploying validated designs and supporting environments through operations, upgrades, and controlled change.',
        'This approach ensures data center networks remain reliable, observable, and adaptable as environments evolve.',
      ]}
      capabilities={[
        {
          title: 'Data Center Fabric Architecture',
          description: 'Design of scalable leaf–spine and fabric architectures aligned with workload behavior, growth expectations, and operational constraints.',
          iconKey: 'network',
        },
        {
          title: 'AI-Aware Network Design',
          description: 'Network designs that account for east–west traffic, high data movement, and performance sensitivity typical of AI training and inference platforms.',
          iconKey: 'cpu',
        },
        {
          title: 'Open & Disaggregated Networking',
          description: 'Use of open networking platforms and multi-vendor hardware to avoid lock-in while retaining operational control.',
          iconKey: 'server',
        },
        {
          title: 'Observability-First Design',
          description: 'Embedding telemetry, monitoring, and diagnostics into fabric design to ensure ongoing visibility and debuggability.',
          iconKey: 'network',
        },
        {
          title: 'Production Validation & Readiness',
          description: 'Testing architectures against real traffic, scale limits, and failure scenarios before production rollout.',
          iconKey: 'zap',
        },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'dc-ai-fabric',
        title: 'Architecture Overview',
        description: 'At a technical level, this solution is built around a modular and scalable fabric architecture. Key architectural elements include: Leaf–spine or fabric-based network designs for predictable scale, High-bandwidth links to support data-intensive workloads, Separation of control, data, and management planes, Built-in telemetry and monitoring hooks, Support for open networking platforms and automation. The architecture is designed to evolve over time, allowing incremental expansion, upgrades, and integration with cloud or edge environments.',
      }}
      benefits={[
        {
          title: 'Faster readiness for AI and data-intensive workloads',
          description: 'Modernized data center networks enable rapid deployment and scaling of AI workloads without infrastructure bottlenecks.',
        },
        {
          title: 'Improved network performance and predictability',
          description: 'Well-designed fabrics deliver consistent performance, predictable latency, and reliable behavior under varying load conditions.',
        },
        {
          title: 'Reduced operational complexity as environments scale',
          description: 'Open architectures and observability-first design reduce the operational burden as networks grow and evolve.',
        },
        {
          title: 'Better visibility into network behavior and issues',
          description: 'Built-in telemetry and monitoring provide real-time insight into network performance, enabling proactive issue resolution.',
        },
        {
          title: 'Greater flexibility to adopt future platforms and technologies',
          description: 'Open, disaggregated designs provide a foundation that can evolve with changing requirements and new technologies.',
        },
      ]}
      useCases={[
        {
          title: 'AI & Machine Learning Platforms',
          description: 'Data center networks supporting large-scale training, inference pipelines, and GPU-dense environments.',
          industry: 'AI/ML',
        },
        {
          title: 'BFSI & Regulated Enterprises',
          description: 'Highly available and observable data center networks for transaction systems, analytics platforms, and compliance-driven environments.',
          industry: 'Financial Services',
        },
        {
          title: 'Cloud-Adjacent & Hybrid Data Centers',
          description: 'Modern data centers designed to integrate cleanly with public cloud and hybrid networking models.',
          industry: 'Cloud',
        },
        {
          title: 'High-Growth Digital Platforms',
          description: 'Environments where rapid scale and frequent change demand stable, predictable network behavior.',
          industry: 'Technology',
        },
      ]}
      technicalSpecs={{
        title: 'Technical Specifications',
        items: [
          {
            category: 'Network Speeds',
            details: [
              'Spine: 400GbE',
              'Leaf: 100GbE / 200GbE',
              'Server: 100GbE / 200GbE',
            ],
          },
          {
            category: 'Protocols',
            details: [
              'RoCEv2',
              'PFC, ECN, DCQCN',
              'EVPN-VXLAN (where applicable)',
            ],
          },
          {
            category: 'Storage',
            details: [
              'NVMe-oF (TCP / RDMA)',
              'Tiered storage architectures',
            ],
          },
          {
            category: 'GPU Support',
            details: [
              'NVIDIA A100 / H100 class',
              'Multi-GPU servers',
              'NVLink (intra-node), RoCE (inter-node)',
            ],
          },
        ],
      }}
      configExamples={[
        {
          title: 'PFC Configuration for RoCE Traffic (SONiC)',
          type: 'sonic',
          description: 'Priority Flow Control configuration for lossless RoCE transport',
          code: `{
  "PORT_QOS_MAP": {
    "Ethernet0": {
      "pfc_enable": "3,4"
    }
  },
  "BUFFER_POOL": {
    "ingress_lossless_pool": {
      "type": "ingress",
      "size": "139458560",
      "xoff": "20971520"
    }
  }
}`,
        },
        {
          title: 'NVMe-oF Target Setup',
          type: 'kubernetes',
          description: 'Kubernetes StorageClass for NVMe-oF',
          code: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nvmeof
provisioner: nvmeof.csi.openebs.io
parameters:
  replicas: "3"
  poolType: "striped"
allowVolumeExpansion: true`,
        },
      ]}
      kpis={[
        {
          metric: 'Inter-GPU Latency',
          value: '< 1μs',
          description: 'Network latency between GPUs',
        },
        {
          metric: 'Bandwidth Utilization',
          value: '> 80%',
          description: 'During training workloads',
        },
        {
          metric: 'Storage IOPS',
          value: '> 1M',
          description: 'Per GPU pod',
        },
        {
          metric: 'GPU Utilization',
          value: '> 90%',
          description: 'During training',
        },
      ]}
      resources={[
        {
          title: 'Data Center Network Deployment for NPCI',
          type: 'case-study',
          href: '/resources/case-studies/npci-data-center-deployment',
        },
        {
          title: 'Modernization of Enterprise Data Center Network',
          type: 'case-study',
          href: '/resources/case-studies/enterprise-data-center-modernization',
        },
      ]}
      ragContextId="data-center-modernization-ai-fabrics"
      ragCustomPrompts={[
        { text: 'How should data center architectures evolve to support large-scale AI workloads?', category: 'Architecture' },
        { text: 'What network design considerations are critical for GPU-based AI clusters?', category: 'Network Design' },
        { text: 'How do AI traffic patterns impact fabric scalability and performance?', category: 'Performance' },
        { text: 'What role does lossless networking play in AI data center environments?', category: 'Networking' },
        { text: 'How can observability be built into AI fabrics from Day 0?', category: 'Observability' },
        { text: 'What are common challenges when modernizing existing data centers for AI?', category: 'Modernization' },
        { text: 'How does PalC approach designing AI-ready fabrics that remain operationally manageable?', category: 'Operations' },
      ]}
      cta={{
        title: 'Planning to modernize your data center or prepare for AI workloads?',
        description: 'Work with engineers who understand AI workloads, open networking, and real operations.',
        primaryButton: {
          text: 'Talk to an Infrastructure Expert',
          href: '/contact',
        },
      }}
      customSections={<><PartnersSection /><HowWeWorkSection /></>}
    />
  )
}
