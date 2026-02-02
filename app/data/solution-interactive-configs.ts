import {
  Server,
  Network,
  Database,
  Cloud,
  Code,
  BarChart3,
  Settings,
  Shield,
  Radio,
  Zap,
  Cpu,
  HardDrive,
  Router,
  Activity,
  Lock,
  Users,
  Globe,
  Layers,
  GitBranch,
  Monitor,
  Wifi,
  Satellite,
  Building2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface InteractiveComponent {
  icon: LucideIcon
  label: string
  id: string
  color: string
  top?: string
  bottom?: string
  left?: string
  right?: string
  transform?: string
  size: string // Legacy - kept for compatibility
  // Mobile-specific position overrides (optional)
  // If not provided, desktop positions will be used on mobile
  topMobile?: string
  bottomMobile?: string
  leftMobile?: string
  rightMobile?: string
  transformMobile?: string
  // Point customization options
  pointSize?: 'small' | 'medium' | 'large' | string // 'small' (8px), 'medium' (12px), 'large' (16px), or custom like '10px'
  pointSizeMobile?: 'small' | 'medium' | 'large' | string // Mobile-specific point size. If not provided, desktop pointSize will be used
  pointShape?: 'circle' | 'square' | 'diamond' | 'rectangle' // Shape of the point: 'circle', 'square', 'diamond', or 'rectangle'
  pointWidth?: string // Custom width for rectangles (e.g., '120px', '30px'). Only used when pointShape is 'rectangle'
  pointWidthMobile?: string // Mobile-specific width for rectangles. If not provided, desktop pointWidth will be used
  pointHeight?: string // Custom height for rectangles (e.g., '80px', '5px'). Only used when pointShape is 'rectangle'
  pointHeightMobile?: string // Mobile-specific height for rectangles. If not provided, desktop pointHeight will be used
}

export interface AccordionStep {
  id: string
  title: string
  icon: LucideIcon
  description: string
  details: string
}

export interface SolutionInteractiveConfig {
  solutionId: string
  components: InteractiveComponent[]
  accordionSteps: AccordionStep[]
}

export const solutionInteractiveConfigs: SolutionInteractiveConfig[] = [
  {
    solutionId: 'data-center-modernization-ai-fabrics',
    components: [
      // Position Configuration Guide:
      // - Use 'top', 'bottom', 'left', 'right' with percentage values (e.g., '15%', '50%')
      // - Use 'transform' for centering (e.g., 'translateY(-50%)' for vertical centering)
      // - Points are small dots that show tooltips on hover
      // - Adjust these values to match your architecture image layout
      //
      // Mobile Position Overrides (optional):
      // - Add 'topMobile', 'bottomMobile', 'leftMobile', 'rightMobile', 'transformMobile' properties
      // - These will be used on screens < 768px (mobile)
      // - If not provided, desktop positions will be used on mobile
      // - Example: { top: '27%', left: '12%', topMobile: '20%', leftMobile: '8%' }
      //
      // Point Customization:
      // - pointSize: 'small' (8px), 'medium' (12px), 'large' (16px), or custom like '10px', '14px', '72px'
      // - pointSizeMobile: Mobile-specific point size. If not provided, desktop pointSize will be used
      //   Example: { pointSize: '72px', pointSizeMobile: '28px' }
      // - pointShape: 'circle' (default), 'square', 'diamond', or 'rectangle'
      // - For rectangles: pointWidth, pointHeight (desktop) and pointWidthMobile, pointHeightMobile (mobile)
      {
        icon: Code,
        label: 'SONiC',
        id: 'sonic',
        color: 'from-blue-500/40 to-blue-600/30',
        top: '27%',
        left: '12%',
        topMobile: '30%', // Mobile position override
        leftMobile: '12.4%', // Mobile position override
        size: 'w-100 h-100', // Legacy - kept for compatibility
        pointSize: '72px', // Desktop size
        pointSizeMobile: '30px', // Mobile size (optional - will use desktop size if not provided) // 'small' | 'medium' | 'large' | custom like '10px'
        pointShape: 'circle', // 'circle' | 'square' | 'diamond'
      },
      {
        icon: Network,
        label: 'RoCE',
        id: 'roce',
        color: 'from-primary/40 to-primary/30',
        top: '41%',
        left: '12%',
        topMobile: '42%', // Mobile position override
        leftMobile: '12.4%', // Mobile position override
        transform: 'translateY(-50%)',
        transformMobile: 'translateY(-50%)', // Mobile transform override
        size: 'w-100 h-100', // Legacy - kept for compatibility
        pointSize: '72px', // 'small' | 'medium' | 'large' | custom like '10px'
        pointSizeMobile: '30px', // Mobile size
        pointShape: 'circle',
      },
      {
        icon: Database,
        label: 'Storage',
        id: 'storage',
        color: 'from-cyan/40 to-cyan/30',
        top: '55%',
        left: '12%',
        topMobile: '55%', // Mobile position override
        leftMobile: '12.4%', // Mobile position override
        transform: 'translateY(-50%)',
        transformMobile: 'translateY(-50%)', // Mobile transform override
        size: 'w-100 h-100', // Legacy - kept for compatibility
        pointSize: '72px', // 'small' | 'medium' | 'large' | custom like '10px'
        pointSizeMobile: '30px', // Mobile size
        pointShape: 'circle',
      },
      {
        icon: Zap,
        label: 'Accelerated AI Networking',
        id: 'accelerated',
        color: 'from-green-500/40 to-green-600/30',
        top: '30%',
        right: '30%',
        topMobile: '32%', // Mobile position override
        rightMobile: '30%', // Mobile position override
        size: 'w-200 h-2',
        pointSize: '120px',
        pointSizeMobile: '40px',
        pointShape: 'rectangle',
        pointWidth: '220px',        // Desktop width
        pointWidthMobile: '98px',   // Mobile width
        pointHeight: '60px',        // Desktop height
        pointHeightMobile: '25px',       // Mobile height
      },
      {
        icon: Network,
        label: 'Scalable & Open Network Fabrics',
        id: 'scalable',
        color: 'from-purple-500/40 to-purple-600/30',
        top: '43%',
        right: '30%',
        topMobile: '44%', // Mobile position override
        rightMobile: '30%', // Mobile position override
        size: 'w-200 h-2',
        pointSize: '120px',
        pointSizeMobile: '40px', // Mobile size
        pointShape: 'rectangle',
        pointWidth: '220px',  // Desktop width
        pointWidthMobile: '98px', // Mobile width
        pointHeight: '60px', // Desktop height
        pointHeightMobile: '25px', // Mobile height
      },
      {
        icon: Monitor,
        label: 'End-to-End AI Infrastructure Monitoring',
        id: 'monitoring',
        color: 'from-orange-500/40 to-orange-600/30',
        top: '57.5%',
        right: '30%',
        topMobile: '56%', // Mobile position override
        rightMobile: '30%', // Mobile position override
        size: 'w-200 h-2',
        pointSize: '120px',
        pointSizeMobile: '40px', // Mobile size
        pointShape: 'rectangle',
        pointWidth: '220px',  // Desktop width
        pointWidthMobile: '98px', // Mobile width
        pointHeight: '65px', // Desktop height
        pointHeightMobile: '30px', // Mobile height
      },
    ],
    accordionSteps: [
      {
        id: 'sonic',
        title: 'SONiC Open Networking',
        icon: Code,
        description: 'Open-source network operating system for disaggregated infrastructure',
        details: 'Deploy SONiC (Software for Open Networking in the Cloud) to enable vendor-agnostic, open networking infrastructure. SONiC provides a standardized platform for network switches, enabling disaggregation of hardware and software. This approach reduces costs by 40-60% compared to proprietary solutions while providing flexibility and customization capabilities for AI workloads.',
      },
      {
        id: 'roce',
        title: 'RoCE Optimization',
        icon: Network,
        description: 'RDMA over Converged Ethernet for lossless GPU-to-GPU communication',
        details: 'Implement and optimize RoCE (RDMA over Converged Ethernet) to enable high-performance, low-latency communication between GPU nodes. Configure Priority Flow Control (PFC), Explicit Congestion Notification (ECN), and buffer tuning to achieve lossless transport. This optimization typically delivers sub-microsecond latency for inter-GPU communication and enables zero packet loss for critical AI traffic, resulting in 30-50% reduction in AI model training time.',
      },
      {
        id: 'storage',
        title: 'Storage & Data Management',
        icon: Database,
        description: 'High-performance storage fabric with NVMe-oF for AI workloads',
        details: 'Design integrated storage and network architectures that ensure consistent, high-throughput data delivery for AI training and inference. Implement NVMe-oF (NVMe over Fabrics) to enable direct GPU-to-storage communication with minimal latency. Configure tiered storage architectures that support both hot data for active training and cold data for archival, optimizing cost and performance.',
      },
      {
        id: 'accelerated',
        title: 'Accelerated AI Networking',
        icon: Zap,
        description: 'High-performance network fabrics optimized for AI/ML workloads',
        details: 'Engineer accelerated networking solutions specifically designed for AI and machine learning workloads. Implement leaf-spine architectures with 100GbE and 400GbE connectivity, optimized buffer management, and intelligent traffic engineering. These fabrics support efficient GPU cluster communication, enabling distributed training across multiple nodes while maintaining predictable latency and high throughput.',
      },
      {
        id: 'scalable',
        title: 'Scalable & Open Network Fabrics',
        icon: Network,
        description: 'Flexible, vendor-neutral network architectures that scale with your needs',
        details: 'Build scalable and open network fabrics using open technologies that support multi-vendor environments and long-term flexibility. Design architectures that scale from initial AI deployments to large multi-rack GPU clusters without requiring fundamental redesign. Leverage EVPN-VXLAN overlays for secure, scalable multi-tenant environments and implement automation-first approaches for consistent operations at scale.',
      },
      {
        id: 'monitoring',
        title: 'End-to-End AI Infrastructure Monitoring',
        icon: Monitor,
        description: 'Comprehensive observability for AI infrastructure health and performance',
        details: 'Implement end-to-end monitoring and observability solutions that provide real-time insight into AI infrastructure health and performance. Deploy streaming telemetry with gNMI, INT (In-band Network Telemetry), and sFlow for comprehensive network visibility. Monitor GPU utilization, network performance, storage IOPS, and end-to-end latency to ensure optimal AI workload performance and enable proactive issue detection and resolution.',
      },
    ],
  },
  {
    solutionId: 'sonic-open-networking',
    components: [
      {
        icon: Code,
        label: 'SONiC OS',
        id: 'sonic',
        color: 'from-blue-500/30 to-blue-600/20',
        top: '8%',
        left: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Network,
        label: 'Open Hardware',
        id: 'hardware',
        color: 'from-primary/30 to-primary/20',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: GitBranch,
        label: 'Open Source',
        id: 'opensource',
        color: 'from-cyan/30 to-cyan/20',
        top: '8%',
        right: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Settings,
        label: 'Automation',
        id: 'automation',
        color: 'from-purple-500/30 to-purple-600/20',
        bottom: '12%',
        left: '8%',
        size: 'w-24 h-24',
      },
      {
        icon: Zap,
        label: 'Performance',
        id: 'performance',
        color: 'from-green-500/30 to-green-600/20',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Shield,
        label: 'Security',
        id: 'security',
        color: 'from-orange-500/30 to-orange-600/20',
        bottom: '12%',
        right: '8%',
        size: 'w-24 h-24',
      },
    ],
    accordionSteps: [
      {
        id: 'sonic',
        title: 'SONiC Operating System',
        icon: Code,
        description: 'Open-source network operating system for disaggregated switches',
        details: 'Deploy and manage SONiC (Software for Open Networking in the Cloud), a Linux-based network operating system that runs on switches from multiple vendors. Leverage open-source networking to reduce vendor lock-in, improve flexibility, and enable rapid innovation.',
      },
      {
        id: 'hardware',
        title: 'Open Hardware Platforms',
        icon: Network,
        description: 'Disaggregated hardware with open-source software',
        details: 'Implement open networking hardware platforms that separate hardware from software, enabling you to choose the best components for your needs. Support multiple switch ASICs and form factors while maintaining consistent software functionality.',
      },
      {
        id: 'opensource',
        title: 'Open Source Ecosystem',
        icon: GitBranch,
        description: 'Community-driven development and innovation',
        details: 'Leverage the vibrant open-source networking ecosystem with active community contributions, regular updates, and extensive documentation. Benefit from rapid feature development, security patches, and community support.',
      },
      {
        id: 'automation',
        title: 'Network Automation',
        icon: Settings,
        description: 'Infrastructure as Code and GitOps workflows',
        details: 'Automate network configuration, deployment, and management using Infrastructure as Code (IaC) principles. Implement GitOps workflows for version-controlled network configurations, automated testing, and consistent deployments across environments.',
      },
      {
        id: 'performance',
        title: 'Performance Optimization',
        icon: Zap,
        description: 'Tuned for high-performance networking',
        details: 'Optimize SONiC-based networks for maximum performance, including low latency, high throughput, and efficient resource utilization. Fine-tune buffer management, routing protocols, and forwarding tables for your specific workload requirements.',
      },
      {
        id: 'security',
        title: 'Security & Compliance',
        icon: Shield,
        description: 'Enterprise-grade security features',
        details: 'Implement comprehensive security controls including access management, encryption, threat detection, and compliance monitoring. Leverage open-source security tools and best practices to maintain a secure network infrastructure.',
      },
    ],
  },
  {
    solutionId: 'network-observability-visibility',
    components: [
      {
        icon: BarChart3,
        label: 'Telemetry',
        id: 'telemetry',
        color: 'from-blue-500/30 to-blue-600/20',
        top: '8%',
        left: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Activity,
        label: 'Monitoring',
        id: 'monitoring',
        color: 'from-primary/30 to-primary/20',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Monitor,
        label: 'Dashboards',
        id: 'dashboards',
        color: 'from-cyan/30 to-cyan/20',
        top: '8%',
        right: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Zap,
        label: 'Real-time',
        id: 'realtime',
        color: 'from-purple-500/30 to-purple-600/20',
        bottom: '12%',
        left: '8%',
        size: 'w-24 h-24',
      },
      {
        icon: AlertTriangle,
        label: 'Alerting',
        id: 'alerting',
        color: 'from-green-500/30 to-green-600/20',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Database,
        label: 'Analytics',
        id: 'analytics',
        color: 'from-orange-500/30 to-orange-600/20',
        bottom: '12%',
        right: '8%',
        size: 'w-24 h-24',
      },
    ],
    accordionSteps: [
      {
        id: 'telemetry',
        title: 'Streaming Telemetry',
        icon: BarChart3,
        description: 'Real-time network data collection and streaming',
        details: 'Implement streaming telemetry using gNMI, OpenConfig, and sFlow to collect real-time network metrics, counters, and state information. Enable continuous monitoring without polling overhead, providing instant visibility into network behavior and performance.',
      },
      {
        id: 'monitoring',
        title: 'Network Monitoring',
        icon: Activity,
        description: 'Comprehensive network health and performance monitoring',
        details: 'Monitor network health, performance metrics, and availability across all network devices. Track bandwidth utilization, packet loss, latency, error rates, and device health indicators to proactively identify and resolve issues.',
      },
      {
        id: 'dashboards',
        title: 'Visualization & Dashboards',
        icon: Monitor,
        description: 'Customizable dashboards and network visualization',
        details: 'Create intuitive dashboards and visualizations to understand network topology, traffic flows, and performance trends. Customize views for different stakeholders, from network operators to executives, with role-based access and tailored metrics.',
      },
      {
        id: 'realtime',
        title: 'Real-time Insights',
        icon: Zap,
        description: 'Instant visibility into network events and changes',
        details: 'Get real-time insights into network events, configuration changes, and performance anomalies. Enable rapid troubleshooting with instant notifications and detailed event logs that help identify root causes quickly.',
      },
      {
        id: 'alerting',
        title: 'Intelligent Alerting',
        icon: AlertTriangle,
        description: 'Proactive alerting and anomaly detection',
        details: 'Implement intelligent alerting systems that reduce noise and focus on actionable events. Use machine learning and statistical analysis to detect anomalies, predict potential issues, and prioritize alerts based on business impact.',
      },
      {
        id: 'analytics',
        title: 'Network Analytics',
        icon: Database,
        description: 'Advanced analytics and historical trend analysis',
        details: 'Leverage historical network data to identify trends, optimize capacity planning, and make data-driven decisions. Analyze traffic patterns, predict future requirements, and optimize network resources based on actual usage patterns.',
      },
    ],
  },
  {
    solutionId: 'telecom-edge',
    components: [
      {
        icon: Radio,
        label: '5G Core',
        id: '5gcore',
        color: 'from-blue-500/30 to-blue-600/20',
        top: '8%',
        left: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Satellite,
        label: 'O-RAN',
        id: 'oran',
        color: 'from-primary/30 to-primary/20',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Wifi,
        label: 'Edge',
        id: 'edge',
        color: 'from-cyan/30 to-cyan/20',
        top: '8%',
        right: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Network,
        label: 'TIP',
        id: 'tip',
        color: 'from-purple-500/30 to-purple-600/20',
        bottom: '12%',
        left: '8%',
        size: 'w-24 h-24',
      },
      {
        icon: Zap,
        label: 'Low Latency',
        id: 'latency',
        color: 'from-green-500/30 to-green-600/20',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Globe,
        label: 'Multi-Access',
        id: 'multiaccess',
        color: 'from-orange-500/30 to-orange-600/20',
        bottom: '12%',
        right: '8%',
        size: 'w-24 h-24',
      },
    ],
    accordionSteps: [
      {
        id: '5gcore',
        title: '5G Core Networks',
        icon: Radio,
        description: 'Cloud-native 5G core infrastructure',
        details: 'Deploy and manage cloud-native 5G core networks with network function virtualization (NFV) and software-defined networking (SDN). Implement 5G core functions including AMF, SMF, UPF, and NRF for scalable, flexible mobile network infrastructure.',
      },
      {
        id: 'oran',
        title: 'O-RAN Architecture',
        icon: Satellite,
        description: 'Open Radio Access Network implementation',
        details: 'Implement O-RAN (Open Radio Access Network) architecture with open interfaces and disaggregated components. Enable multi-vendor interoperability, reduce costs, and accelerate innovation in radio access networks through open standards.',
      },
      {
        id: 'edge',
        title: 'Edge Computing',
        icon: Wifi,
        description: 'Distributed edge infrastructure for low-latency services',
        details: 'Deploy edge computing infrastructure to bring compute, storage, and networking closer to end users. Enable ultra-low latency applications, reduce backhaul traffic, and support emerging use cases like autonomous vehicles, AR/VR, and industrial IoT.',
      },
      {
        id: 'tip',
        title: 'TIP Integration',
        icon: Network,
        description: 'Telecom Infra Project compliant solutions',
        details: 'Implement Telecom Infra Project (TIP) compliant solutions for open, disaggregated telecom infrastructure. Leverage TIP community innovations and validated solutions to accelerate deployment and reduce costs.',
      },
      {
        id: 'latency',
        title: 'Ultra-Low Latency',
        icon: Zap,
        description: 'Optimized for real-time applications',
        details: 'Design and optimize networks for ultra-low latency requirements, critical for 5G use cases like autonomous vehicles, remote surgery, and real-time gaming. Implement edge computing, optimized routing, and traffic prioritization.',
      },
      {
        id: 'multiaccess',
        title: 'Multi-Access Edge',
        icon: Globe,
        description: 'Unified access across multiple technologies',
        details: 'Enable seamless connectivity across 5G, Wi-Fi, fixed broadband, and other access technologies. Implement multi-access edge computing (MEC) to provide consistent, low-latency services regardless of access method.',
      },
    ],
  },
  {
    solutionId: 'cloud-hybrid-cloud',
    components: [
      {
        icon: Cloud,
        label: 'Multi-Cloud',
        id: 'multicloud',
        color: 'from-blue-500/30 to-blue-600/20',
        top: '8%',
        left: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Layers,
        label: 'Hybrid',
        id: 'hybrid',
        color: 'from-primary/30 to-primary/20',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Network,
        label: 'Connectivity',
        id: 'connectivity',
        color: 'from-cyan/30 to-cyan/20',
        top: '8%',
        right: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Shield,
        label: 'Security',
        id: 'security',
        color: 'from-purple-500/30 to-purple-600/20',
        bottom: '12%',
        left: '8%',
        size: 'w-24 h-24',
      },
      {
        icon: Zap,
        label: 'Performance',
        id: 'performance',
        color: 'from-green-500/30 to-green-600/20',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Settings,
        label: 'Management',
        id: 'management',
        color: 'from-orange-500/30 to-orange-600/20',
        bottom: '12%',
        right: '8%',
        size: 'w-24 h-24',
      },
    ],
    accordionSteps: [
      {
        id: 'multicloud',
        title: 'Multi-Cloud Strategy',
        icon: Cloud,
        description: 'Seamless operations across AWS, Azure, GCP, and more',
        details: 'Design and implement multi-cloud architectures that enable workload portability, avoid vendor lock-in, and optimize costs. Connect and manage resources across public cloud providers while maintaining consistent networking, security, and operations.',
      },
      {
        id: 'hybrid',
        title: 'Hybrid Cloud',
        icon: Layers,
        description: 'Bridging on-premises and cloud environments',
        details: 'Create seamless hybrid cloud environments that connect on-premises data centers with public and private clouds. Implement consistent networking, security policies, and management across all environments for unified operations.',
      },
      {
        id: 'connectivity',
        title: 'Cloud Connectivity',
        icon: Network,
        description: 'High-performance cloud network connections',
        details: 'Establish high-performance, secure connections between on-premises infrastructure and cloud providers. Implement direct cloud interconnects, VPNs, and SD-WAN solutions to optimize performance and reduce latency.',
      },
      {
        id: 'security',
        title: 'Cloud Security',
        icon: Shield,
        description: 'Unified security across cloud environments',
        details: 'Implement consistent security policies and controls across all cloud environments. Enable zero-trust networking, encryption, identity management, and compliance monitoring to protect data and applications wherever they reside.',
      },
      {
        id: 'performance',
        title: 'Cloud Performance',
        icon: Zap,
        description: 'Optimized performance for cloud workloads',
        details: 'Optimize network performance for cloud-native applications and services. Implement traffic optimization, caching, CDN integration, and load balancing to ensure optimal user experience and application performance.',
      },
      {
        id: 'management',
        title: 'Cloud Management',
        icon: Settings,
        description: 'Unified cloud infrastructure management',
        details: 'Manage and monitor multi-cloud and hybrid cloud infrastructure from a single pane of glass. Implement automation, orchestration, and policy management to simplify operations and ensure consistency across all environments.',
      },
    ],
  },
  {
    solutionId: 'identity-access-management',
    components: [
      {
        icon: Shield,
        label: 'Zero Trust',
        id: 'zerotrust',
        color: 'from-blue-500/30 to-blue-600/20',
        top: '8%',
        left: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: Users,
        label: 'Identity',
        id: 'identity',
        color: 'from-primary/30 to-primary/20',
        top: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Lock,
        label: 'Access',
        id: 'access',
        color: 'from-cyan/30 to-cyan/20',
        top: '8%',
        right: '5%',
        size: 'w-24 h-24',
      },
      {
        icon: CheckCircle2,
        label: 'Compliance',
        id: 'compliance',
        color: 'from-purple-500/30 to-purple-600/20',
        bottom: '12%',
        left: '8%',
        size: 'w-24 h-24',
      },
      {
        icon: Activity,
        label: 'Monitoring',
        id: 'monitoring',
        color: 'from-green-500/30 to-green-600/20',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        size: 'w-28 h-28',
      },
      {
        icon: Settings,
        label: 'Governance',
        id: 'governance',
        color: 'from-orange-500/30 to-orange-600/20',
        bottom: '12%',
        right: '8%',
        size: 'w-24 h-24',
      },
    ],
    accordionSteps: [
      {
        id: 'zerotrust',
        title: 'Zero Trust Security',
        icon: Shield,
        description: 'Never trust, always verify security model',
        details: 'Implement zero trust security architecture that requires verification for every access request, regardless of location. Eliminate implicit trust and continuously validate user identity, device security, and access permissions.',
      },
      {
        id: 'identity',
        title: 'Identity Management',
        icon: Users,
        description: 'Centralized identity and user lifecycle management',
        details: 'Manage user identities, authentication, and authorization across all systems and applications. Implement single sign-on (SSO), multi-factor authentication (MFA), and automated user provisioning and deprovisioning.',
      },
      {
        id: 'access',
        title: 'Access Control',
        icon: Lock,
        description: 'Granular access control and permissions',
        details: 'Implement fine-grained access control policies that grant users and applications only the minimum permissions needed. Use role-based access control (RBAC), attribute-based access control (ABAC), and policy-based access management.',
      },
      {
        id: 'compliance',
        title: 'Compliance & Audit',
        icon: CheckCircle2,
        description: 'Regulatory compliance and audit trails',
        details: 'Ensure compliance with regulatory requirements including GDPR, HIPAA, SOC 2, and industry-specific standards. Maintain comprehensive audit logs, access reports, and compliance dashboards for regulatory audits.',
      },
      {
        id: 'monitoring',
        title: 'Access Monitoring',
        icon: Activity,
        description: 'Real-time access monitoring and threat detection',
        details: 'Monitor all access attempts, authentication events, and privilege escalations in real-time. Detect suspicious activities, unauthorized access attempts, and security threats with automated alerting and response.',
      },
      {
        id: 'governance',
        title: 'Identity Governance',
        icon: Settings,
        description: 'Identity lifecycle and governance policies',
        details: 'Implement identity governance processes including access certification, role management, and segregation of duties. Automate identity lifecycle management, access reviews, and policy enforcement to maintain security and compliance.',
      },
    ],
  },
]

export function getSolutionInteractiveConfig(solutionId: string): SolutionInteractiveConfig | undefined {
  return solutionInteractiveConfigs.find(config => config.solutionId === solutionId)
}

