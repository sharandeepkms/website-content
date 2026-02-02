import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'Switches',
  description: 'High-performance network switches for data center and enterprise deployments. From 1G to 400G, we offer switches for every need.',
  openGraph: {
    title: 'Network Switches | PalC Networks',
    description: 'Enterprise-grade network switches.',
  },
}

export default function SwitchesPage() {
  return (
    <DetailPageTemplate
      title="Switches"
      subtitle="Open, AI-ready, and cloud-scale switching from 1G to 400G with SONiC compatibility."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Switches' },
      ]}
      overview="Leaf/spine and campus/edge platforms validated for SONiC and traditional NOS. Built for EVPN/VXLAN, SRv6, AI/ML RoCE fabrics, and automated operations with telemetry-rich observability."
      overviewDetails={[
        '25/100/400G portfolios with validated optics/buffer profiles and airflow/power SKUs',
        'SONiC-ready hardware: BGP-EVPN, INT/gNMI/sFlow, RoCE/ECN/RED tuning, and deep buffers',
        'Automation-first: golden configs, pre/post checks, and GitOps modules for rapid turn-ups',
        'Assurance built-in: telemetry to SLO dashboards, conformance, and drift detection',
      ]}
      capabilities={[
        { title: 'Port Speeds', description: '1/10/25/40/100/400G, breakout support, ZR/ZR+ ready optics.', iconKey: 'network' },
        { title: 'Fabrics', description: 'Leaf/spine, super-spine, EVPN/VXLAN, SRv6, anycast GW, MH/MLAG.', iconKey: 'code' },
        { title: 'AI-Ready', description: 'RoCEv2 with ECN/RED/WRED, PFC watchdogs, AQM profiles, and deep buffers.', iconKey: 'cpu' },
        { title: 'SONiC Compatibility', description: 'Validated platforms for open NOS with BGP-EVPN and telemetry.', iconKey: 'shield' },
        { title: 'Automation', description: 'IaC/GitOps modules, pre/post checks, drift tests, and golden configs.', iconKey: 'code' },
        { title: 'Observability', description: 'gNMI/INT/sFlow, microburst detection, SLO dashboards.', iconKey: 'database' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'dc-ai-fabric',
        title: 'Leaf/Spine for AI & Cloud Fabrics',
        description: 'EVPN/VXLAN underlay/overlay with QoS, SRv6, and observability pipelines.',
      }}
      benefits={[
        { title: 'Cloud-Scale Performance', description: 'Deterministic latency and throughput for east-west heavy workloads.' },
        { title: 'Open & Flexible', description: 'SONiC-first readiness plus choice of NOS to avoid lock-in.' },
        { title: 'Ops Speed', description: 'Automation and pre/post validations accelerate deployments safely.' },
        { title: 'Assured Operations', description: 'Telemetry, SLOs, and drift checks keep fabrics compliant.' },
      ]}
      useCases={[
        { title: 'Data Center Leaf/Spine', description: 'EVPN/VXLAN with SRv6 and RoCE tuning for AI/ML clusters.' },
        { title: 'Cloud & Interconnect', description: 'Edge/colocation fabrics, DC gateways, and multi-cloud transit.' },
        { title: 'Enterprise Core/Campus', description: 'Segmented access, QoS, and automation for large campuses.' },
        { title: 'Service Provider Edge', description: 'Peering/aggregation with TE/QoS and telemetry-rich ops.' },
      ]}
      technicalSpecs={{
        title: 'Capabilities Snapshot',
        items: [
          { category: 'Hardware', details: ['Up to 400G ports', 'Deep buffer variants', 'Hot/cold airflow SKUs', 'PSU/ FAN redundancy'] },
          { category: 'Protocols', details: ['EVPN/VXLAN', 'BGP/OSPF/IS-IS', 'SRv6/MPLS', 'PFC/ECN/RED/WRED'] },
          { category: 'Telemetry', details: ['gNMI/INT/sFlow', 'Microburst and queue depth', 'Flow analytics', 'Streaming to observability stacks'] },
          { category: 'Automation', details: ['IaC/GitOps modules', 'Golden configs', 'Pre/post checks', 'Drift and conformance tests'] },
        ],
      }}
      kpis={[
        { metric: 'Latency', value: '<100µs P99 intra-fabric', description: 'Post QoS/ECN tuning on AI fabrics.' },
        { metric: 'Convergence', value: '<150ms', description: 'With BFD + TI-LFA on access/aggregation.' },
        { metric: 'Ops Velocity', value: '90% changes pre/post validated', description: 'Automation-driven change safety.' },
      ]}
      resources={[
        { title: 'AI Fabric Case Study', type: 'case-study', href: '/resources/case-studies/data-center-modernization-fortune-500' },
        { title: 'Open Networking Guide', type: 'whitepaper', href: '/resources/whitepapers/open-networking-complete-guide' },
        { title: 'AI-Ready Infrastructure Blog', type: 'blog', href: '/resources/blog/ai-ready-infrastructure-guide' },
        { title: 'Switch Deployment Runbooks', type: 'documentation', href: '/resources/documentation/products' },
      ]}
      cta={{
        title: 'Plan your next-gen fabric',
        description: 'Get a switching bill of materials and reference configs for your use case.',
        primaryButton: { text: 'Request BOM & Design', href: '/contact' },
        secondaryButton: { text: 'View All Products', href: '/products' },
      }}
      brandSections={[
        {
          title: 'High-quality Brand Switches to Meet Your Needs',
          description: 'We partner with leading switch manufacturers to provide comprehensive solutions across all network tiers—from data center to campus to edge.',
          cards: [
            {
              title: 'Cisco Switches',
              description: 'Cisco switches provide Campus LAN Switches, Industrial Ethernet Switches and other series for networks of all types and sizes, including branch, service providers, SMB, etc.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Cisco Switch Catalyst 9200', href: '/contact' },
                { label: 'Cisco Switch Catalyst 9300', href: '/contact' },
                { label: 'Cisco Switch Catalyst 9400', href: '/contact' },
                { label: 'Cisco Switch Catalyst 9500', href: '/contact' },
              ],
              viewAll: { label: 'All Cisco Switches', href: '/contact' },
            },
            {
              title: 'Huawei Switches',
              description: 'Huawei switches are suitable for a wide variety of applications and network sizes, from cloud data centers to campus networks.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Huawei S1700 Series Switches', href: '/contact' },
                { label: 'Huawei S5700 Series Switches', href: '/contact' },
                { label: 'Huawei S6700 Series Switches', href: '/contact' },
                { label: 'Huawei Data Center Switches', href: '/contact' },
              ],
              viewAll: { label: 'All Huawei Switches', href: '/contact' },
            },
            {
              title: 'Dell Switches',
              description: 'Dell Networking Switches provide various types, including Web-Managed Switches, Managed Campus, Modular Chassis Switches, Data Center Switches, M-Series Blade, etc.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Dell Networking X Series Switches', href: '/contact' },
                { label: 'Dell Networking N3000 Switches', href: '/contact' },
                { label: 'Dell Networking S4048-ON Switches', href: '/contact' },
                { label: 'Dell Networking S4100-ON Switches', href: '/contact' },
              ],
              viewAll: { label: 'All Dell Switches', href: '/contact' },
            },
            {
              title: 'Juniper Switches',
              description: 'Juniper switches improve the economics of networking with cloud-grade, high-density Ethernet switching across your data center, campus, and branch. Hot series are the EX4300 series, EX2300 series, EX4600 series, EX 3400 series and QFX5100 series.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Juniper EX4300 Series Ethernet Switches', href: '/contact' },
                { label: 'Juniper EX2300 Series Ethernet Switches', href: '/contact' },
                { label: 'Juniper EX4600 Series Ethernet Switches', href: '/contact' },
                { label: 'Juniper QFX5100 Series Switches', href: '/contact' },
              ],
              viewAll: { label: 'All Juniper Switches', href: '/contact' },
            },
            {
              title: 'HPE Switches',
              description: 'High-performance HPE network switches offer agile, scalable switching for the mobile-first campus and branch—from edge to core. Various series are provided here, including HPE Aruba OfficeConnect Series, 3810 Series, 2930F Series, 2920 Series, 2530 Series and so forth.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Aruba 3810 Switch Series', href: '/contact' },
                { label: 'Aruba OfficeConnect Switches', href: '/contact' },
                { label: 'Aruba 2530 Switch Series', href: '/contact' },
                { label: 'Aruba 2930F Switch Series', href: '/contact' },
              ],
              viewAll: { label: 'All HPE Switches', href: '/contact' },
            },
            {
              title: 'D-Link Switches',
              description: 'D-Link switches integrate into different verticals at all scales, making it easier for you to scale your network cost-effectively whether you\'re a SMB, large enterprise or even a campus.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'D-Link Smart Switches', href: '/contact' },
                { label: 'D-Link Unmanaged Switches', href: '/contact' },
                { label: 'D-Link Core Switches Series', href: '/contact' },
              ],
              viewAll: { label: 'All D-Link Switches', href: '/contact' },
            },
          ],
        },
        {
          title: 'High-quality Switch Families',
          description: 'Curated families across data center, campus, SMB, and industrial footprints. Pick the profile that best aligns to your environment and NOS preferences.',
          cards: [
            {
              title: 'Cloud & AI Fabrics',
              description: 'High-density 100/400G leaf–spine with deep buffers, RoCE/ECN/PFC tuning, and SRv6/EVPN.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: '32x100G leaf/spine', href: '/contact' },
                { label: '32x400G spine', href: '/contact' },
                { label: 'RoCE-tuned profiles', href: '/contact' },
              ],
              viewAll: { label: 'View AI fabric switches', href: '/contact' },
            },
            {
              title: 'Campus & Access (PoE)',
              description: '1/10G access with PoE/PoE+, secure segmentation, and telemetry for branches and campuses.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: '48x1G + 10G uplinks', href: '/contact' },
                { label: 'mGig/PoE+', href: '/contact' },
                { label: 'Segmentation & NAC ready', href: '/contact' },
              ],
              viewAll: { label: 'View campus switches', href: '/contact' },
            },
            {
              title: 'Industrial & Rugged',
              description: 'Ruggedized DIN-rail options with extended temperature, redundant power, and L2/L3 features.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Rugged access', href: '/contact' },
                { label: 'Fanless/extended temp', href: '/contact' },
                { label: 'Redundant DC power', href: '/contact' },
              ],
              viewAll: { label: 'View industrial switches', href: '/contact' },
            },
            {
              title: 'Aggregation & Distribution',
              description: '25/40/100G aggregation with QoS, multicast, and rich telemetry for metro, campus, and edge.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: '100G aggregation', href: '/contact' },
                { label: 'EVPN/VXLAN gateways', href: '/contact' },
                { label: 'SR/TE ready', href: '/contact' },
              ],
              viewAll: { label: 'View aggregation switches', href: '/contact' },
            },
            {
              title: 'Open NOS / SONiC-ready',
              description: 'Validated hardware for SONiC and open NOS stacks with gNMI/INT/sFlow telemetry and automation.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'SONiC validation', href: '/contact' },
                { label: 'gNMI/INT telemetry', href: '/contact' },
                { label: 'GitOps/Ansible modules', href: '/contact' },
              ],
              viewAll: { label: 'View SONiC-ready switches', href: '/contact' },
            },
            {
              title: 'SMB & Branch',
              description: 'Cost-effective Layer2/Layer3 options for SMB and branch with simplified ops and assured uptime.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Compact fanless', href: '/contact' },
                { label: 'PoE for cameras/Wi‑Fi', href: '/contact' },
                { label: 'Easy day-2 ops', href: '/contact' },
              ],
              viewAll: { label: 'View SMB switches', href: '/contact' },
            },
          ],
        },
      ]}
      categorySections={[
        {
          title: 'Switches by Scenario',
          description: 'Align platforms to the role they serve—access, aggregation, data center, AI fabric, or industrial.',
          cards: [
            {
              title: 'Access Switches',
              description: '1/10G with PoE/PoE+, secure segmentation, NAC-friendly, and quiet/fanless options.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Access with PoE+', href: '/contact' },
                { label: 'mGig for Wi‑Fi 6/6E', href: '/contact' },
              ],
              viewAll: { label: 'View all access switches', href: '/contact' },
            },
            {
              title: 'Core and Distribution',
              description: '25/40/100G aggregation with high availability, QoS, multicast, and SR/EVPN readiness.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: '100G aggregation', href: '/contact' },
                { label: 'EVPN distribution', href: '/contact' },
              ],
              viewAll: { label: 'View core/distribution', href: '/contact' },
            },
            {
              title: 'Data Center & Spine',
              description: 'Leaf/spine for EVPN/VXLAN, SRv6, and AI fabrics with deep buffers and RoCE tuning.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: '100G leaf', href: '/contact' },
                { label: '400G spine', href: '/contact' },
              ],
              viewAll: { label: 'View data center switches', href: '/contact' },
            },
            {
              title: 'Industrial Ethernet',
              description: 'Hardened builds with extended temperature, redundant power, and L2/L3 for OT networks.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Rugged DIN-rail', href: '/contact' },
                { label: 'Fanless/extended temp', href: '/contact' },
              ],
              viewAll: { label: 'View industrial switches', href: '/contact' },
            },
            {
              title: 'Convergence / Uplinks',
              description: 'Higher-performance aggregation for mixed access layers with QoS, policing, and telemetry.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Convergence with QoS', href: '/contact' },
                { label: 'Telemetry-enabled', href: '/contact' },
              ],
              viewAll: { label: 'View convergence switches', href: '/contact' },
            },
            {
              title: 'SMB Switches',
              description: 'Simple Layer2/Layer3, silent options, PoE for cameras/Wi‑Fi, and low-touch operations.',
              image: '/images/placeholder-hero.svg',
              links: [
                { label: 'Smart-managed SMB', href: '/contact' },
                { label: 'Unmanaged/plug-and-play', href: '/contact' },
              ],
              viewAll: { label: 'View SMB switches', href: '/contact' },
            },
          ],
        },
      ]}
      ragContextId="products:switches"
    />
  )
}

