import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { generateSolutionMetadata } from '@/app/utils/solution-metadata'
import { PartnersSection } from '@/app/components/PartnersSection'

// ISR: Revalidate every 7 days
export const revalidate = 604800

export const metadata: Metadata = generateSolutionMetadata({
  title: 'SONiC & Open Networking',
  description: 'Design, deploy, and operate modern data center networks using SONiC-based open networking, enabling flexibility, scale, and long-term control across multi-vendor environments.',
  path: '/solutions/sonic-open-networking',
})

export default function SONiCOpenNetworkingPage() {
  return (
    <DetailPageTemplate
      title="Production-Grade SONiC & Open Networking"
      tagline="PalC helps organizations adopt, extend, and operate SONiC-based open networks across data centers, enterprises, and service provider environments—turning disaggregated platforms into stable, production-ready systems."
      subtitle=""
      heroImage="/images/solutions/sonic-open-networking-banner.png"
      heroImageAlt="SONiC Open Networking Infrastructure"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'SONiC & Open Networking', href: '/solutions/sonic-open-networking' },
      ]}
      overview="SONiC is an open-source network operating system designed to decouple network software from hardware, enabling disaggregated networking at scale. It provides the foundation for building vendor-neutral, programmable, and automation-friendly network fabrics. PalC works across the SONiC lifecycle, from hardware bring-up and feature enablement to performance tuning and long-term operations helping organizations adopt open networking with confidence. Our work focuses on making SONiC operationally viable in enterprise, cloud, AI, and service provider environments. The result is a production-ready, open networking foundation that delivers vendor independence, operational transparency, and long-term architectural flexibility."
      overviewDetails={[
        'Planning & Architecture: Understanding deployment goals, scale expectations, hardware choices, and operational constraints before defining the SONiC architecture.',
        'Engineering & Integration: Customizing SONiC, integrating protocols, applications, and third-party tools, and enabling platforms across hardware ecosystems.',
        'Commissioning & Validation: Validating SONiC deployments against real traffic, topology scale, and failure scenarios.',
        'Deployment & Operations Support: Supporting rollout, upgrades, troubleshooting, and long-term operation through TAC, managed services, and resident engineering.',
        'This approach ensures SONiC platforms move beyond evaluation into reliable, long-term production use.',
      ]}
      capabilities={[
        {
          title: 'SONiC Engineering & Customization',
          description: 'Development and hardening of SONiC beyond community defaults, including feature enhancements, protocol support, and platform-specific optimizations.',
          iconKey: 'code',
        },
        {
          title: 'Multi-Vendor Hardware Enablement',
          description: 'Validation and deployment of SONiC across ODM platforms and merchant silicon ecosystems, enabling consistent behavior across diverse hardware.',
          iconKey: 'server',
        },
        {
          title: 'Protocol & Control Plane Development',
          description: 'Custom development and integration of L2/L3, routing, multicast, and control-plane features to meet real-world deployment requirements.',
          iconKey: 'network',
        },
        {
          title: 'SONiC Applications & Tooling',
          description: 'Development of management, monitoring, security, and observability applications on top of SONiC to improve operational control.',
          iconKey: 'code',
        },
        {
          title: 'Test, Validation & Qualification',
          description: 'Extensive validation across topologies, scale scenarios, and failure cases to ensure production readiness.',
          iconKey: 'zap',
        },
      ]}
      benefits={[
        {
          title: 'Reduced dependency on proprietary network operating systems',
          description: 'Adopt SONiC across multiple hardware platforms without locking into proprietary software stacks.',
        },
        {
          title: 'Greater flexibility in hardware and vendor selection',
          description: 'Disaggregated architectures enable choice of hardware vendors and platforms while maintaining consistent software behavior.',
        },
        {
          title: 'Faster time-to-production for open networking deployments',
          description: 'Structured approach and proven methodologies accelerate deployment timelines compared to traditional proprietary solutions.',
        },
        {
          title: 'Improved operational visibility and control',
          description: 'Open telemetry, tooling, and custom applications provide comprehensive visibility into network behavior and performance.',
        },
        {
          title: 'Lower long-term operational and integration risk',
          description: 'Production-ready engineering and validation reduce operational risk and ensure long-term stability.',
        },
      ]}
      useCases={[
        {
          title: 'Data Center Networks',
          description: 'SONiC-based leaf–spine and fabric deployments for scalable, open data center environments.',
          industry: 'Data Center',
        },
        {
          title: 'Service Provider & Telecom Networks',
          description: 'Access, aggregation, and packet-optical deployments using SONiC in disaggregated architectures.',
          industry: 'Service Provider',
        },
        {
          title: 'Enterprise Networks',
          description: 'Open networking platforms replacing traditional proprietary NOS environments.',
          industry: 'Enterprise',
        },
        {
          title: 'Specialized Platforms',
          description: 'Packet brokers, monitoring systems, and security-focused deployments built on SONiC.',
          industry: 'Specialized',
        },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'sonic-deploy',
        title: 'Architecture Overview',
        description: 'SONiC-based open networks are built as modular systems, separating hardware, NOS, and applications. Key architectural elements include: SONiC running on validated ODM hardware platforms, Integration with merchant silicon SDKs, Modular control and management planes, External monitoring, telemetry, and security integrations, CI/CD-driven validation and lifecycle upgrades. This architecture enables incremental evolution without full platform replacement.',
      }}
      technicalSpecs={{
        title: 'Technical Specifications',
        items: [
          {
            category: 'Supported ASIC Platforms',
            details: [
              'Broadcom Trident / Tomahawk families',
              'Mellanox Spectrum (1/2/3)',
              'Innovium Teralynx',
              'Barefoot Tofino',
            ],
          },
          {
            category: 'Port Speeds',
            details: [
              '1GbE, 10GbE, 25GbE',
              '40GbE, 50GbE, 100GbE',
              '200GbE, 400GbE',
            ],
          },
          {
            category: 'Protocols',
            details: [
              'BGP (IPv4 / IPv6)',
              'EVPN-VXLAN',
              'OSPF, IS-IS',
              'PFC, ECN, DCQCN',
            ],
          },
          {
            category: 'Management & Control',
            details: [
              'gNMI / gNOI',
              'REST APIs',
              'SNMP',
              'CLI (vtysh)',
            ],
          },
        ],
      }}
      configExamples={[
        {
          title: 'EVPN-VXLAN Configuration Example',
          type: 'sonic',
          description: 'EVPN-VXLAN configuration for scalable Layer 2/3 overlay networking',
          code: `{
  "VXLAN_TUNNEL": {
    "vxlan_tunnel_1": {
      "src_ip": "10.1.1.1"
    }
  },
  "VXLAN_TUNNEL_MAP": {
    "vxlan_tunnel_1|map_1000": {
      "vni": "1000",
      "vlan": "Vlan1000"
    }
  },
  "BGP_EVPN": {
    "enabled": "true"
  }
}`,
        },
        {
          title: 'PFC Configuration for Lossless Traffic',
          type: 'sonic',
          description: 'Priority Flow Control configuration for RoCE and latency-sensitive workloads',
          code: `{
  "PORT_QOS_MAP": {
    "Ethernet0": {
      "pfc_enable": "3,4"
    }
  },
  "PFC_WD": {
    "GLOBAL": {
      "POLL_INTERVAL": "200",
      "DETECTION_TIME": "2000",
      "ACTION": "drop"
    }
  }
}`,
        },
      ]}
      resources={[
        {
          title: 'SONiC-Based Data Center Deployment for a National-Scale Digital Payments Platform',
          type: 'case-study',
          href: '/resources/case-studies/sonic-data-center-payments-platform',
        },
        {
          title: 'Development of Whitebox SONiC NOS for Access and Aggregation Networks',
          type: 'case-study',
          href: '/resources/case-studies/sonic-access-aggregation-nos',
        },
        {
          title: 'Packet Optical and Specialized SONiC Deployments',
          type: 'case-study',
          href: '/resources/case-studies/sonic-packet-optical-deployments',
        },
      ]}
      ragContextId="sonic-open-networking"
      ragCustomPrompts={[
        { text: 'How should SONiC be deployed for enterprise data center fabrics?', category: 'SONiC Deployment' },
        { text: 'What are the key operational considerations when running SONiC at scale?', category: 'Operations' },
        { text: 'How does SONiC support multi-vendor hardware environments?', category: 'Multi-Vendor' },
        { text: 'What upgrade and rollback strategies work best for SONiC deployments?', category: 'Upgrades' },
        { text: 'How does PalC harden SONiC for production use?', category: 'Security' },
        { text: 'What telemetry is essential for operating SONiC-based networks?', category: 'Telemetry' },
      ]}
      cta={{
        title: 'Evaluating SONiC or open networking for your environment?',
        description: 'Work with teams who understand open networking in production.',
        primaryButton: {
          text: 'Talk to an Infrastructure Expert',
          href: '/contact',
        },
      }}
      customSections={<PartnersSection />}
    />
  )
}
