import {
  Network,
  BarChart3,
  Cloud,
  Shield,
  Radio,
  Cpu,
  Building2,
  Server,
  Activity,
  Globe,
  Lock,
  Wifi,
  Zap,
  Settings,
  LucideIcon,
} from 'lucide-react'

export interface InnerSolution {
  title: string
  description: string
}

export interface Solution {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: LucideIcon
  innerSolutions: InnerSolution[]
  benefits: string[]
  useCases: string[]
}

export const solutions: Solution[] = [
  {
    id: '1',
    slug: 'open-disaggregated-networking',
    title: 'Open & Disaggregated Networking',
    shortTitle: 'Open Networking',
    description: 'Build flexible, vendor-agnostic network infrastructure with whitebox solutions and open standards.',
    longDescription: 'Transform your network infrastructure with open, disaggregated solutions that offer unprecedented flexibility, cost efficiency, and vendor independence. Our expertise in whitebox networking and open standards enables enterprises to build future-ready networks.',
    icon: Network,
    innerSolutions: [
      {
        title: 'Whitebox Networking',
        description: 'Deploy cost-effective, flexible whitebox switches and routers with commercial off-the-shelf hardware and open-source network operating systems.',
      },
      {
        title: 'Open Networking (ONF-based)',
        description: 'Leverage ONF-based solutions including ONOS, Stratum, and other open-source platforms for carrier-grade networking.',
      },
      {
        title: 'TIP / OpenRAN',
        description: 'Implement Telecom Infra Project and OpenRAN specifications for modern, interoperable telecom infrastructure.',
      },
      {
        title: 'Disaggregated Routers & Switches',
        description: 'Design and deploy disaggregated routing and switching solutions that separate hardware from software for maximum flexibility.',
      },
      {
        title: 'Network Automation for Disaggregated Infra',
        description: 'Automate provisioning, configuration, and management of disaggregated network infrastructure at scale.',
      },
    ],
    benefits: [
      'Reduce vendor lock-in and increase flexibility',
      'Lower total cost of ownership by 40-60%',
      'Accelerate innovation with open-source software',
      'Enable rapid deployment and scaling',
      'Future-proof your network investments',
    ],
    useCases: [
      'Data center network modernization',
      'Service provider network transformation',
      'Enterprise campus network upgrades',
      '5G transport network deployment',
    ],
  },
  {
    id: '2',
    slug: 'data-network-analytics',
    title: 'Data & Network Analytics',
    shortTitle: 'Network Analytics',
    description: 'Gain deep visibility into network performance with advanced analytics, telemetry, and observability solutions.',
    longDescription: 'Unlock the power of your network data with comprehensive analytics solutions. From real-time telemetry to predictive analytics, we help you understand, optimize, and secure your network infrastructure.',
    icon: BarChart3,
    innerSolutions: [
      {
        title: 'Network Observability',
        description: 'Achieve complete visibility into network behavior with distributed tracing, metrics, and log correlation.',
      },
      {
        title: 'Telemetry & Monitoring',
        description: 'Implement streaming telemetry solutions for real-time network monitoring and performance tracking.',
      },
      {
        title: 'Logging & Event Processing',
        description: 'Deploy scalable logging infrastructure with real-time event processing and correlation.',
      },
      {
        title: 'Performance Analytics',
        description: 'Analyze network performance metrics to identify bottlenecks and optimize application delivery.',
      },
      {
        title: 'Security Analytics',
        description: 'Detect threats and anomalies through advanced security analytics and behavioral analysis.',
      },
      {
        title: 'Anomaly Detection',
        description: 'Leverage machine learning for automated anomaly detection and predictive maintenance.',
      },
    ],
    benefits: [
      'Reduce mean time to resolution by 70%',
      'Proactive issue detection before impact',
      'Data-driven capacity planning',
      'Enhanced security posture',
      'Improved application performance',
    ],
    useCases: [
      'Network operations center modernization',
      'Application performance monitoring',
      'Security operations center enhancement',
      'Capacity planning and optimization',
    ],
  },
  {
    id: '3',
    slug: 'cloud-modern-applications',
    title: 'Cloud & Modern Applications',
    shortTitle: 'Cloud Solutions',
    description: 'Accelerate your cloud journey with expert migration services, cloud-native development, and multi-cloud strategies.',
    longDescription: 'Navigate the complexities of cloud transformation with our comprehensive cloud services. From lift-and-shift migrations to building cloud-native applications, we deliver scalable, resilient solutions.',
    icon: Cloud,
    innerSolutions: [
      {
        title: 'Cloud Migration',
        description: 'Strategic planning and execution of cloud migrations with minimal disruption to business operations.',
      },
      {
        title: 'Cloud-native App Development',
        description: 'Build modern applications designed for cloud scalability, resilience, and agility from the ground up.',
      },
      {
        title: 'Microservices Architecture',
        description: 'Design and implement microservices architectures that enable independent deployment and scaling.',
      },
      {
        title: 'Kubernetes Deployments',
        description: 'Deploy and manage containerized applications at scale with enterprise Kubernetes solutions.',
      },
      {
        title: 'Hybrid & Multi-cloud Solutions',
        description: 'Design and implement hybrid and multi-cloud architectures for optimal workload placement.',
      },
    ],
    benefits: [
      'Accelerate time to market',
      'Improve scalability and resilience',
      'Optimize cloud spending',
      'Enable DevOps transformation',
      'Increase development velocity',
    ],
    useCases: [
      'Legacy application modernization',
      'Digital transformation initiatives',
      'Disaster recovery solutions',
      'Global application deployment',
    ],
  },
  {
    id: '4',
    slug: 'cybersecurity-iam',
    title: 'Cybersecurity & IAM',
    shortTitle: 'Cybersecurity',
    description: 'Protect your enterprise with comprehensive security solutions, zero trust architecture, and identity management.',
    longDescription: 'Build a robust security posture with our comprehensive cybersecurity services. From identity and access management to zero trust implementation, we help protect your critical assets.',
    icon: Shield,
    innerSolutions: [
      {
        title: 'Identity & Access Management (IAM)',
        description: 'Implement enterprise IAM solutions for secure, seamless access across applications and resources.',
      },
      {
        title: 'Zero Trust Security',
        description: 'Design and deploy zero trust architectures that verify every access request regardless of source.',
      },
      {
        title: 'Authentication & Authorization',
        description: 'Implement modern authentication methods including MFA, SSO, and adaptive authentication.',
      },
      {
        title: 'Policy & Governance',
        description: 'Establish security policies and governance frameworks aligned with industry standards.',
      },
      {
        title: 'Compliance Automation',
        description: 'Automate compliance monitoring and reporting for regulatory requirements like SOC2, GDPR, and HIPAA.',
      },
    ],
    benefits: [
      'Reduce security breach risk',
      'Streamline user access management',
      'Achieve regulatory compliance',
      'Enable secure remote work',
      'Improve audit readiness',
    ],
    useCases: [
      'Enterprise security transformation',
      'Regulatory compliance initiatives',
      'Cloud security implementation',
      'Workforce identity management',
    ],
  },
  {
    id: '5',
    slug: 'telecom-edge-infrastructure',
    title: 'Telecom & Edge Infrastructure',
    shortTitle: 'Telecom & Edge',
    description: 'Deploy next-generation telecom and edge solutions for 5G, OpenRAN, and distributed computing.',
    longDescription: 'Enable next-generation connectivity with our telecom and edge infrastructure solutions. From OpenRAN deployments to edge computing platforms, we deliver the foundation for 5G and beyond.',
    icon: Radio,
    innerSolutions: [
      {
        title: 'Edge Computing',
        description: 'Deploy edge computing infrastructure for low-latency processing at the network edge.',
      },
      {
        title: 'OpenRAN Integration',
        description: 'Implement and integrate OpenRAN solutions for flexible, cost-effective radio access networks.',
      },
      {
        title: 'VNF/CNF Virtualized Networks',
        description: 'Deploy virtualized and containerized network functions for agile service delivery.',
      },
      {
        title: 'Wireless Access Solutions',
        description: 'Design and deploy enterprise wireless solutions including Wi-Fi 6/7 and private LTE/5G.',
      },
      {
        title: '5G Network Enablement',
        description: 'Enable 5G services with core network, transport, and RAN integration expertise.',
      },
    ],
    benefits: [
      'Enable ultra-low latency applications',
      'Reduce backhaul costs',
      'Accelerate 5G deployment',
      'Improve network economics',
      'Enable new service offerings',
    ],
    useCases: [
      '5G network rollouts',
      'Industrial IoT deployments',
      'Smart city infrastructure',
      'Enterprise private networks',
    ],
  },
  {
    id: '6',
    slug: 'ai-ready-infrastructure',
    title: 'AI-Ready Infrastructure',
    shortTitle: 'AI Infrastructure',
    description: 'Build high-performance infrastructure optimized for AI/ML workloads with GPU clusters and HPC solutions.',
    longDescription: 'Power your AI initiatives with infrastructure designed for machine learning and high-performance computing. From GPU cluster networking to storage optimization, we deliver the foundation for AI at scale.',
    icon: Cpu,
    innerSolutions: [
      {
        title: 'AI Data Center Fabric',
        description: 'Design and deploy high-bandwidth, low-latency data center fabrics optimized for AI workloads.',
      },
      {
        title: 'GPU Cluster Networking',
        description: 'Implement specialized networking for GPU clusters with RDMA, RoCE, and InfiniBand solutions.',
      },
      {
        title: 'HPC & High-speed Switching',
        description: 'Deploy high-performance computing infrastructure with 400G+ switching capabilities.',
      },
      {
        title: 'Storage/Compute Optimization',
        description: 'Optimize storage and compute resources for maximum throughput and efficiency.',
      },
      {
        title: 'AI Deployment Pipelines',
        description: 'Build MLOps pipelines for streamlined model training, validation, and deployment.',
      },
    ],
    benefits: [
      'Accelerate AI model training',
      'Reduce infrastructure costs',
      'Scale AI workloads efficiently',
      'Improve model deployment speed',
      'Enable real-time AI inference',
    ],
    useCases: [
      'Large language model training',
      'Computer vision applications',
      'Real-time ML inference',
      'Scientific computing',
    ],
  },
  {
    id: '7',
    slug: 'enterprise-it-modernization',
    title: 'Enterprise IT Modernization',
    shortTitle: 'IT Modernization',
    description: 'Transform your IT infrastructure with SDN, automation, and modern network architectures.',
    longDescription: 'Modernize your enterprise IT with software-defined solutions, infrastructure automation, and optimized network designs. We help organizations transform legacy infrastructure into agile, efficient platforms.',
    icon: Building2,
    innerSolutions: [
      {
        title: 'SDN Transformation',
        description: 'Implement software-defined networking for centralized control and programmable infrastructure.',
      },
      {
        title: 'Network Architecture Modernization',
        description: 'Redesign network architectures for improved performance, security, and manageability.',
      },
      {
        title: 'Infrastructure Automation',
        description: 'Automate infrastructure provisioning and management with IaC and CI/CD pipelines.',
      },
      {
        title: 'Technology Refresh',
        description: 'Plan and execute technology refresh cycles with minimal business disruption.',
      },
      {
        title: 'Enterprise Network Design',
        description: 'Design enterprise networks optimized for modern applications and hybrid work.',
      },
    ],
    benefits: [
      'Reduce operational complexity',
      'Improve agility and speed',
      'Lower operational costs',
      'Enable self-service IT',
      'Improve reliability',
    ],
    useCases: [
      'Legacy infrastructure modernization',
      'Data center consolidation',
      'Branch office transformation',
      'Hybrid work enablement',
    ],
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}

