export interface SolutionLite {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  benefits: string[]
  useCases: string[]
}

export const solutionsLite: SolutionLite[] = [
  {
    id: '1',
    slug: 'open-disaggregated-networking',
    title: 'Open & Disaggregated Networking',
    shortTitle: 'Open Networking',
    description: 'Build flexible, vendor-agnostic network infrastructure with whitebox solutions and open standards.',
    longDescription: 'Transform your network infrastructure with open, disaggregated solutions that offer flexibility, cost efficiency, and vendor independence. Our expertise in whitebox networking and open standards enables enterprises to build future-ready networks.',
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

export function getSolutionLiteBySlug(slug: string): SolutionLite | undefined {
  return solutionsLite.find((s) => s.slug === slug)
}

