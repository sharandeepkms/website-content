import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'P4 / eBPF Workloads',
  description: 'P4 and eBPF programming services for data plane acceleration, network function offloading, and programmable networking workloads.',
  openGraph: {
    title: 'P4 / eBPF Workloads | PalC Networks',
    description: 'P4 and eBPF programming and development services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'P4 / eBPF Workloads',
  tagline: 'Leverage P4 and eBPF for programmable networking and data plane acceleration. Build custom network functions and optimize packet processing with advanced programming techniques.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'P4 / eBPF Workloads' },
      ],
  overview: 'P4 and eBPF enable programmable networking and data plane acceleration. Our P4/eBPF services help organizations build custom network functions, optimize packet processing, and implement advanced networking features at the data plane level.',
  capabilities: [
    'P4 Program Development',
    'eBPF Program Development',
    'Data Plane Acceleration',
    'Network Function Offloading',
    'Packet Processing Optimization',
    'Custom Match-Action Pipelines',
    'Hardware Target Compilation',
    'Performance Optimization',
  ],
  benefits: [
    'Hardware-accelerated processing',
    'Custom network functions',
    'Reduced CPU utilization',
    'Lower latency',
    'Higher throughput',
    'Programmable data plane',
  ],
  useCases: [
    'Data plane acceleration',
    'Network function offloading',
    'Custom packet processing',
    'Load balancing optimization',
    'Security function implementation',
    'Traffic engineering',
  ],
  imagePlaceholder: 'P4 / eBPF Architecture',
}

export default function P4EBPFWorkloadsPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

