export interface Whitepaper {
  id: string
  slug: string
  title: string
  summary: string
  cover?: string
  authors: Array<{ name: string; title: string; avatar?: string }>
  topic: string
  tags: string[]
  lastUpdated: string
  fileSize: string
  downloadUrl: string
  overview: string
  tableOfContents: Array<{ title: string; page?: number }>
  keyInsights: string[]
  expert?: {
    name: string
    title: string
    avatar?: string
    bio?: string
  }
}

export const whitepapers: Whitepaper[] = [
  {
    id: '1',
    slug: 'open-networking-complete-guide',
    title: 'Open Networking: A Complete Guide',
    summary: 'Comprehensive guide to open networking, SONiC, and disaggregated infrastructure covering architecture, implementation, and best practices.',
    cover: '/images/whitepapers/open-networking-complete-guide.png',
    authors: [
      {
        name: 'John Smith',
        title: 'Chief Technology Officer',
        avatar: '/images/experts/john-smith.svg',
      },
      {
        name: 'Sarah Johnson',
        title: 'Senior Network Architect',
        avatar: '/images/experts/sarah-johnson.svg',
      },
    ],
    topic: 'Networking',
    tags: ['Open Networking', 'SONiC', 'Disaggregated Infrastructure'],
    lastUpdated: '2024-01-15',
    fileSize: '2.5 MB',
    downloadUrl: '/downloads/whitepapers/open-networking-guide.pdf',
    overview: 'This comprehensive whitepaper explores the world of open networking, providing detailed insights into SONiC, disaggregated infrastructure, and how organizations can leverage these technologies to reduce costs, increase flexibility, and accelerate innovation.',
    tableOfContents: [
      { title: 'Introduction', page: 1 },
      { title: 'What is Open Networking?', page: 3 },
      { title: 'SONiC Overview', page: 8 },
      { title: 'Disaggregated Infrastructure', page: 15 },
      { title: 'Implementation Strategies', page: 22 },
      { title: 'Best Practices', page: 30 },
      { title: 'Case Studies', page: 38 },
      { title: 'Conclusion', page: 45 },
    ],
    keyInsights: [
      'Open networking can reduce infrastructure costs by 30-50%',
      'SONiC is the leading open source NOS with broad industry support',
      'Disaggregated models enable vendor flexibility and innovation',
      'Proper planning is critical for successful implementation',
    ],
    expert: {
      name: 'John Smith',
      title: 'Chief Technology Officer',
      avatar: '/images/experts/john-smith.svg',
      bio: 'Expert in open networking with 20+ years of experience.',
    },
  },
  {
    id: '2',
    slug: 'ai-infrastructure-best-practices',
    title: 'AI Infrastructure Best Practices',
    summary: 'Best practices for building AI-ready infrastructure and optimizing for ML workloads, covering hardware, networking, and software considerations.',
    cover: '/images/whitepapers/ai-infrastructure-best-practices.png',
    authors: [
      {
        name: 'Dr. Michael Chen',
        title: 'AI Research Director',
        avatar: '/images/experts/michael-chen.svg',
      },
    ],
    topic: 'AI/ML',
    tags: ['AI', 'Infrastructure', 'Machine Learning'],
    lastUpdated: '2024-01-10',
    fileSize: '3.2 MB',
    downloadUrl: '/downloads/whitepapers/ai-infrastructure-best-practices.pdf',
    overview: 'This whitepaper provides comprehensive guidance on building and optimizing infrastructure for AI and machine learning workloads, covering everything from hardware selection to network design and software optimization.',
    tableOfContents: [
      { title: 'Executive Summary', page: 1 },
      { title: 'AI Workload Characteristics', page: 4 },
      { title: 'Compute Infrastructure', page: 10 },
      { title: 'Networking Requirements', page: 18 },
      { title: 'Storage Solutions', page: 25 },
      { title: 'Software Stack', page: 32 },
      { title: 'Optimization Strategies', page: 40 },
      { title: 'Future Trends', page: 48 },
    ],
    keyInsights: [
      'AI workloads require specialized infrastructure design',
      'High-bandwidth networking is critical for distributed training',
      'Proper storage architecture significantly impacts performance',
      'Software optimization can provide 2-3x performance improvements',
    ],
    expert: {
      name: 'Dr. Michael Chen',
      title: 'AI Research Director',
      avatar: '/images/experts/michael-chen.svg',
      bio: 'Leading researcher in AI infrastructure and optimization.',
    },
  },
  {
    id: '3',
    slug: 'zero-trust-security-architecture',
    title: 'Zero Trust Security Architecture',
    summary: 'Implementing zero trust security in enterprise networks: principles, architecture, and step-by-step implementation guide.',
    cover: '/images/whitepapers/zero-trust-security-architecture.png',
    authors: [
      {
        name: 'Alex Martinez',
        title: 'Security Architect',
        avatar: '/images/experts/alex-martinez.svg',
      },
    ],
    topic: 'Security',
    tags: ['Security', 'Zero Trust', 'Enterprise'],
    lastUpdated: '2024-01-05',
    fileSize: '2.8 MB',
    downloadUrl: '/downloads/whitepapers/zero-trust-security-architecture.pdf',
    overview: 'This whitepaper provides a comprehensive guide to implementing zero trust security architecture in enterprise networks, covering principles, design patterns, and practical implementation strategies.',
    tableOfContents: [
      { title: 'Introduction to Zero Trust', page: 1 },
      { title: 'Core Principles', page: 5 },
      { title: 'Architecture Design', page: 12 },
      { title: 'Identity and Access Management', page: 20 },
      { title: 'Network Segmentation', page: 28 },
      { title: 'Monitoring and Analytics', page: 35 },
      { title: 'Implementation Roadmap', page: 42 },
      { title: 'Best Practices', page: 50 },
    ],
    keyInsights: [
      'Zero trust is essential for modern enterprise security',
      'Identity is the new perimeter',
      'Continuous verification is key',
      'Proper implementation requires cultural change',
    ],
    expert: {
      name: 'Alex Martinez',
      title: 'Security Architect',
      avatar: '/images/experts/alex-martinez.svg',
      bio: 'Expert in zero trust security implementations.',
    },
  },
  {
    id: '4',
    slug: 'evpn-srv6-fabric-blueprint',
    title: 'EVPN & SRv6 Fabric Blueprint',
    summary: 'Reference architectures for EVPN/VXLAN with SRv6 underlays, convergence targets, and QoS/TE profiles.',
    cover: '/images/whitepapers/evpn-srv6-fabric-blueprint.png',
    authors: [{ name: 'Priya Natarajan', title: 'Principal Architect' }],
    topic: 'Data Center',
    tags: ['EVPN', 'SRv6', 'QoS'],
    lastUpdated: '2024-02-20',
    fileSize: '2.9 MB',
    downloadUrl: '/downloads/whitepapers/evpn-srv6-fabric.pdf',
    overview: 'Detailed blueprints for leaf/spine and DC-WAN extensions with SRv6, QoS/TE, and telemetry.',
    tableOfContents: [
      { title: 'Fabric Design' },
      { title: 'SRv6 Underlay' },
      { title: 'EVPN Overlay' },
      { title: 'QoS & TE' },
      { title: 'Telemetry & SLOs' },
    ],
    keyInsights: [
      'SRv6 with EVPN delivers fast convergence and scalable overlays',
      'QoS/ECN design is critical for AI/ML fabrics',
      'Telemetry-first fabrics reduce MTTR',
    ],
    expert: { name: 'Priya Natarajan', title: 'Principal Architect' },
  },
  {
    id: '5',
    slug: 'ai-fabric-design-guide',
    title: 'AI Fabric Design Guide',
    summary: 'RoCEv2/ECN tuning, buffer profiles, and validation steps for GPU-heavy fabrics.',
    cover: '/images/whitepapers/ai-fabric-design-guide.png',
    authors: [{ name: 'Dr. Michael Chen', title: 'AI Research Director' }],
    topic: 'AI/ML',
    tags: ['AI Fabric', 'RoCE', 'ECN'],
    lastUpdated: '2024-03-10',
    fileSize: '3.5 MB',
    downloadUrl: '/downloads/whitepapers/ai-fabric-design.pdf',
    overview: 'How to design, tune, and validate AI fabrics for loss-sensitive workloads.',
    tableOfContents: [
      { title: 'AI Workload Profiles' },
      { title: 'Buffer & Queue Design' },
      { title: 'ECN/RED/WRED Tuning' },
      { title: 'RoCE Validation' },
      { title: 'Telemetry & SLOs' },
    ],
    keyInsights: [
      'ECN thresholds and AQM matter for GPU traffic',
      'Validation must include microburst scenarios',
      'Telemetry plus SLOs ensures ongoing performance',
    ],
    expert: { name: 'Dr. Michael Chen', title: 'AI Research Director' },
  },
  {
    id: '6',
    slug: 'netdevops-automation-guide',
    title: 'NetDevOps Automation Guide',
    summary: 'IaC/GitOps modules, golden configs, pre/post checks, and conformance testing for networks.',
    cover: '/images/whitepapers/netdevops-automation-guide.png',
    authors: [{ name: 'Alex Martinez', title: 'Security Architect' }],
    topic: 'Automation',
    tags: ['NetDevOps', 'GitOps', 'Automation'],
    lastUpdated: '2024-03-25',
    fileSize: '2.2 MB',
    downloadUrl: '/downloads/whitepapers/netdevops-automation.pdf',
    overview: 'Patterns to safely automate networking with pipelines, tests, and drift detection.',
    tableOfContents: [
      { title: 'Pipeline Design' },
      { title: 'Golden Configs' },
      { title: 'Pre/Post Checks' },
      { title: 'Drift & Conformance' },
      { title: 'Change Windows' },
    ],
    keyInsights: [
      'Pre/post checks reduce change risk significantly',
      'Drift detection is essential for long-lived environments',
      'GitOps + tests enable reliable, repeatable changes',
    ],
    expert: { name: 'Alex Martinez', title: 'Security Architect' },
  },
  {
    id: '7',
    slug: 'multi-cloud-networking-strategy',
    title: 'Multi-Cloud Networking Strategy',
    summary: 'Transit architectures, policy-as-code, identity, DNS/PKI, and shared services design.',
    cover: '/images/whitepapers/multi-cloud-networking-strategy.png',
    authors: [{ name: 'Emily Davis', title: 'Cloud Solutions Architect' }],
    topic: 'Cloud',
    tags: ['Cloud', 'Transit', 'Security'],
    lastUpdated: '2024-04-05',
    fileSize: '3.0 MB',
    downloadUrl: '/downloads/whitepapers/multi-cloud-networking.pdf',
    overview: 'Guidance for hub/spoke vs mesh, segmentation, identity, and guardrails across clouds.',
    tableOfContents: [
      { title: 'Transit Patterns' },
      { title: 'Policy & Identity' },
      { title: 'DNS/PKI Strategy' },
      { title: 'Guardrails & Drift' },
      { title: 'Operations & SRE' },
    ],
    keyInsights: [
      'Policy-as-code enforces consistency across clouds',
      'Identity, DNS, and PKI must be first-class citizens',
      'SRE runbooks and SLOs reduce MTTR',
    ],
    expert: { name: 'Emily Davis', title: 'Cloud Solutions Architect' },
  },
  {
    id: '8',
    slug: 'observability-slo-handbook',
    title: 'Observability & SLO Handbook',
    summary: 'Building telemetry pipelines, SLOs, burn-rate alerts, and runbook automation.',
    cover: '/images/whitepapers/observability-slo-handbook.png',
    authors: [{ name: 'Sarah Johnson', title: 'Senior Network Architect' }],
    topic: 'Observability',
    tags: ['Telemetry', 'SLO', 'INT'],
    lastUpdated: '2024-04-18',
    fileSize: '2.6 MB',
    downloadUrl: '/downloads/whitepapers/observability-slo.pdf',
    overview: 'End-to-end approach to telemetry, SLOs, alert hygiene, and runbooks for networking.',
    tableOfContents: [
      { title: 'Telemetry Sources' },
      { title: 'Data Pipeline' },
      { title: 'SLO Design' },
      { title: 'Alert Hygiene' },
      { title: 'Runbooks & Automation' },
    ],
    keyInsights: [
      'SLOs anchor observability to user outcomes',
      'Alert hygiene reduces noise and MTTR',
      'Automation plus chatops accelerates response',
    ],
    expert: { name: 'Sarah Johnson', title: 'Senior Network Architect' },
  },
]

export function getWhitepaperBySlug(slug: string): Whitepaper | undefined {
  return whitepapers.find(paper => paper.slug === slug)
}

export function getRelatedWhitepapers(currentSlug: string, limit: number = 3): Whitepaper[] {
  return whitepapers
    .filter(paper => paper.slug !== currentSlug)
    .slice(0, limit)
}

