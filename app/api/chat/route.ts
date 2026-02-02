import { NextRequest, NextResponse } from 'next/server'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

// Knowledge base with specific answers and links
const knowledgeBase: Record<string, { answer: string; links: Array<{ title: string; href: string }> }> = {
  'sonic': {
    answer: `**SONiC-First Networking** is our core expertise! We specialize in open-source networking solutions using SONiC (Software for Open Networking in the Cloud).

**Key Capabilities:**
• **EVPN-VXLAN Fabrics**: Build scalable, multi-tenant data center networks with BGP-EVPN control plane
• **PFC/ECN Tuning**: Optimize for lossless transport and congestion management
• **Buffer Tuning**: Fine-tune switch buffers for AI/ML workloads and high east-west traffic
• **Disaggregated Infrastructure**: Vendor-independent hardware with open NOS
• **Telemetry & Observability**: Streaming telemetry with gNMI, INT, and sFlow

We help enterprises migrate from proprietary switches to open, disaggregated SONiC-based solutions, reducing costs by 40-60% while gaining flexibility and vendor independence.`,
    links: [
      { title: 'SONiC & Open Networking Solution', href: '/solutions/sonic-open-networking' },
      { title: 'Network Engineering Services', href: '/services/networking-engineering' },
      { title: 'Packet Optical NOS', href: '/services/networking-engineering/packet-optical-nos' },
    ]
  },
  'ai fabric': {
    answer: `**AI-Ready Data Center Fabrics** are critical for modern ML workloads. We design and deploy high-performance fabrics optimized for GPU clusters and AI training.

**What We Deliver:**
• **RoCEv2 Optimization**: Lossless RDMA transport for GPU-to-GPU communication
• **ECN/RED Tuning**: Congestion control for AI traffic patterns
• **Leaf-Spine Architecture**: Scalable fabrics supporting 100+ GPU nodes
• **Telemetry-Rich Observability**: Real-time monitoring of fabric health and performance
• **SLO-Based Operations**: Service level objectives for AI workload guarantees

Our AI fabric designs reduce training time by 30-50% through optimized network paths and buffer management.`,
    links: [
      { title: 'AI Fabrics Solution', href: '/solutions/data-center-modernization-ai-fabrics' },
      { title: 'Data Center Modernization', href: '/solutions/data-center-modernization' },
      { title: 'AI/ML Engineering Services', href: '/services/ai-ml-engineering' },
    ]
  },
  'roce': {
    answer: `**RoCE (RDMA over Converged Ethernet) Optimization** is essential for high-performance AI/ML workloads requiring low-latency GPU-to-GPU communication.

**How PalC Optimizes RoCE:**

**1. PFC (Priority Flow Control) Configuration**
• Enable PFC on specific priority queues (typically 3-4) for lossless transport
• Configure PFC watchdogs to detect and prevent head-of-line blocking
• Set appropriate pause thresholds and resume thresholds

**2. Buffer Tuning**
• **Deep Buffer Allocation**: Allocate sufficient buffer space for RoCE traffic
• **Ingress Lossless Pools**: Configure dedicated buffer pools for lossless traffic classes
• **XOFF/XON Thresholds**: Set buffer thresholds to prevent packet drops
• **Buffer Profile Optimization**: Tune buffer profiles based on traffic patterns and workload requirements

**3. ECN/RED/WRED Tuning**
• **ECN (Explicit Congestion Notification)**: Enable ECN marking for congestion signaling
• **RED (Random Early Detection)**: Configure RED parameters for early congestion detection
• **DCQCN (Data Center Quantized Congestion Notification)**: Implement DCQCN for end-to-end congestion control
• **AQM (Active Queue Management)**: Fine-tune queue management algorithms

**4. Network Path Optimization**
• **Shortest Path Routing**: Optimize routing for minimal hop count
• **ECMP (Equal-Cost Multi-Path)**: Balance traffic across multiple paths
• **Traffic Engineering**: Route RoCE traffic through optimized paths

**5. Performance Validation**
• **Latency Testing**: Measure end-to-end latency between GPU nodes
• **Throughput Validation**: Verify line-rate performance under load
• **Packet Loss Monitoring**: Ensure zero packet loss for lossless traffic classes

**Results:**
Our RoCE optimization typically achieves:
• **Sub-microsecond latency** for inter-GPU communication
• **Zero packet loss** for lossless traffic classes
• **>80% bandwidth utilization** during AI training workloads
• **30-50% reduction** in AI model training time

We provide comprehensive RoCE tuning services including configuration, validation, and ongoing optimization.`,
    links: [
      { title: 'AI Fabrics Solution', href: '/solutions/data-center-modernization-ai-fabrics' },
      { title: 'Data Center Modernization', href: '/solutions/data-center-modernization' },
      { title: 'Network Engineering Services', href: '/services/networking-engineering' },
    ]
  },
  'buffer tuning': {
    answer: `**Buffer Tuning** is critical for optimizing network performance, especially for AI/ML workloads and high east-west traffic patterns.

**How PalC Optimizes Buffer Tuning:**

**1. Buffer Pool Configuration**
• **Ingress Lossless Pools**: Dedicated pools for PFC-enabled traffic classes
• **Egress Pools**: Configure egress buffer pools for different traffic priorities
• **Shared vs. Dedicated**: Balance between shared and dedicated buffer allocation
• **Pool Sizing**: Size pools based on traffic patterns and workload requirements

**2. Buffer Profile Tuning**
• **Profile Assignment**: Assign appropriate buffer profiles to ports and queues
• **Threshold Configuration**: Set XOFF (pause) and XON (resume) thresholds
• **Dynamic Thresholds**: Adjust thresholds based on real-time traffic patterns
• **Per-Port Profiles**: Customize profiles for different port types and speeds

**3. Queue Management**
• **Queue Depth**: Optimize queue depths for different traffic classes
• **Priority Queues**: Allocate buffers to priority queues for lossless traffic
• **WRED Configuration**: Configure Weighted Random Early Detection parameters
• **Tail Drop Prevention**: Ensure sufficient buffers to prevent tail drops

**4. Traffic Pattern Analysis**
• **Burst Analysis**: Analyze traffic bursts and configure buffers accordingly
• **Microburst Detection**: Identify and handle microbursts with appropriate buffering
• **East-West Traffic**: Optimize for high east-west traffic in data centers
• **AI Workload Patterns**: Tune buffers specifically for AI/ML traffic characteristics

**5. Hardware-Specific Optimization**
• **ASIC Buffer Characteristics**: Leverage ASIC-specific buffer capabilities
• **Buffer Sharing**: Optimize buffer sharing across ports and queues
• **Memory Allocation**: Balance buffer memory allocation across different traffic types

**Results:**
Our buffer tuning typically achieves:
• **Zero packet loss** for lossless traffic classes
• **Optimal latency** for time-sensitive applications
• **Maximum throughput** utilization
• **Reduced jitter** and improved performance predictability

We provide comprehensive buffer tuning services including analysis, configuration, and validation.`,
    links: [
      { title: 'AI Fabrics Solution', href: '/solutions/data-center-modernization-ai-fabrics' },
      { title: 'Network Engineering Services', href: '/services/networking-engineering' },
      { title: 'AI/ML Engineering Services', href: '/services/ai-ml-engineering' },
    ]
  },
  'cloud': {
    answer: `**Cloud & Hybrid Cloud Solutions** help you build modern, multi-cloud infrastructure with consistent operations.

**Our Expertise:**
• **Multi-Cloud Landing Zones**: AWS, Azure, GCP with consistent networking and security
• **Kubernetes & Container Orchestration**: CNI plugins, service mesh, and ingress controllers
• **Infrastructure as Code**: Terraform, Helm charts, and GitOps workflows
• **Cloud Networking**: VPC peering, transit gateways, and SD-WAN integration
• **Zero-Trust Security**: Identity-driven policy enforcement across clouds

We help organizations achieve cloud-native transformation with automation-first approaches, reducing deployment time by 70%.`,
    links: [
      { title: 'Cloud & Hybrid Cloud Solution', href: '/solutions/cloud-hybrid-cloud' },
      { title: 'Cloud Infrastructure Engineering', href: '/services/cloud-infrastructure-engineering' },
      { title: 'CI/CD Automation', href: '/services/automation-tooling/cicd-automation' },
    ]
  },
  'observability': {
    answer: `**Network Observability & Visibility** provides complete insight into your network's behavior and performance.

**What We Offer:**
• **Streaming Telemetry**: gNMI, OpenConfig, and INT for real-time data collection
• **Packet Broker Solutions**: Network TAPs and packet capture for deep analysis
• **Analytics & Dashboards**: SLO burn-rate views, anomaly detection, and capacity planning
• **Distributed Tracing**: End-to-end visibility across network paths
• **Automated Runbooks**: Closed-loop remediation based on telemetry

Our observability solutions reduce MTTR by 60% and enable proactive issue detection before users are impacted.`,
    links: [
      { title: 'Network Observability Solution', href: '/solutions/network-observability-visibility' },
      { title: 'Network Engineering Services', href: '/services/networking-engineering' },
    ]
  },
  'automation': {
    answer: `**Automation & Tooling** transforms network operations from manual to code-driven workflows.

**Our Automation Stack:**
• **CI/CD Pipelines**: GitOps workflows for network configuration management
• **Infrastructure as Code**: Terraform and Ansible modules for network provisioning
• **Network Automation**: Python scripts, Nornir, and custom tools for device management
• **Golden Configs**: Policy-as-code with drift detection and remediation
• **Pre/Post Checks**: Automated validation before and after changes

We help teams achieve NetDevOps maturity, reducing change windows by 80% and eliminating configuration drift.`,
    links: [
      { title: 'Automation & Tooling Services', href: '/services/automation-tooling' },
      { title: 'CI/CD Automation', href: '/services/automation-tooling/cicd-automation' },
      { title: 'Infrastructure Automation', href: '/services/automation-tooling/infra-automation' },
      { title: 'Network Automation', href: '/services/automation-tooling/network-automation' },
    ]
  },
  'data center modernization': {
    answer: `**Data Center Modernization** transforms legacy infrastructure into modern, AI-ready, and cloud-scale platforms.

**How PalC Supports Data Center Modernization:**

**1. AI-Ready Infrastructure**
• **High-Performance Fabrics**: Leaf-spine architectures with 400G+ switching for GPU clusters
• **RoCE Optimization**: Lossless RDMA transport for AI/ML workloads
• **Network Tuning**: ECN/RED/WRED and buffer optimization for east-west traffic

**2. Open Networking Migration**
• **SONiC Deployment**: Migrate from proprietary switches to open-source SONiC NOS
• **Disaggregated Systems**: Vendor-independent hardware and software
• **Cost Reduction**: 40-60% lower TCO compared to proprietary solutions

**3. Modern Architecture**
• **EVPN/VXLAN Overlays**: Scalable multi-tenant networking
• **SRv6 Support**: Next-generation routing protocols
• **Cloud Integration**: Hybrid cloud connectivity and Kubernetes networking

**4. Automation & Operations**
• **Infrastructure as Code**: Terraform and GitOps for rapid deployment
• **Telemetry & Observability**: Streaming telemetry with gNMI, INT, and sFlow
• **SLO-Based Operations**: Service level objectives for reliability

**5. Security & Compliance**
• **Zero Trust Architecture**: Identity-driven policy enforcement
• **Microsegmentation**: Network isolation and security zones
• **Compliance Automation**: SOC2, GDPR, HIPAA compliance support

We help organizations modernize their data centers with open networking, AI optimization, and automation-first approaches, reducing costs while improving performance and agility.`,
    links: [
      { title: 'Data Center Modernization & AI Fabrics', href: '/solutions/data-center-modernization-ai-fabrics' },
      { title: 'SONiC & Open Networking', href: '/solutions/sonic-open-networking' },
      { title: 'Network Engineering Services', href: '/services/networking-engineering' },
      { title: 'AI/ML Engineering Services', href: '/services/ai-ml-engineering' },
    ]
  },
  'modernization': {
    answer: `**Data Center Modernization** transforms legacy infrastructure into modern, AI-ready platforms. We help organizations migrate from proprietary systems to open networking solutions, optimize for AI/ML workloads, and implement automation-first operations.

**Key Modernization Areas:**
• **Open Networking**: SONiC-based disaggregated infrastructure
• **AI Optimization**: High-performance fabrics for GPU clusters
• **Cloud Integration**: Hybrid cloud and multi-cloud connectivity
• **Automation**: Infrastructure as Code and GitOps workflows
• **Observability**: Real-time telemetry and SLO-based operations

Learn more about our [Data Center Modernization & AI Fabrics](/solutions/data-center-modernization-ai-fabrics) solution.`,
    links: [
      { title: 'Data Center Modernization & AI Fabrics', href: '/solutions/data-center-modernization-ai-fabrics' },
      { title: 'SONiC & Open Networking', href: '/solutions/sonic-open-networking' },
      { title: 'Cloud & Hybrid Cloud', href: '/solutions/cloud-hybrid-cloud' },
    ]
  },
}

const quickLinks = [
  { title: 'SONiC & Open Networking', href: '/solutions/sonic-open-networking' },
  { title: 'AI Fabrics', href: '/solutions/data-center-modernization-ai-fabrics' },
  { title: 'Cloud & Hybrid', href: '/solutions/cloud-hybrid-cloud' },
  { title: 'Services', href: '/services' },
  { title: 'Contact', href: '/contact' },
]

// Enhanced keyword detection with intent understanding
function detectTopic(normalized: string): string | null {
  // Intent keywords
  const helpKeywords = ['help', 'assist', 'support', 'can you', 'how can', 'what can', 'services', 'offerings', 'provide', 'do for']
  const isHelpQuery = helpKeywords.some(keyword => normalized.includes(keyword))
  
  // Topic detection - check longer phrases first for specificity
  const topicKeywords: Record<string, string> = {
    'data center modernization': 'data center modernization',
    'data center': 'data center modernization',
    'datacenter': 'data center modernization',
    'modernization': 'data center modernization',
    'modernize': 'data center modernization',
    'infrastructure': 'data center modernization',
    'sonic': 'sonic',
    'open networking': 'sonic',
    'disaggregated': 'sonic',
    'ai fabric': 'ai fabric',
    'ai workload': 'ai fabric',
    'gpu': 'ai fabric',
    'ml': 'ai fabric',
    'machine learning': 'ai fabric',
    'roce': 'roce',
    'buffer tuning': 'buffer tuning',
    'cloud': 'cloud',
    'hybrid cloud': 'cloud',
    'multi-cloud': 'cloud',
    'observability': 'observability',
    'visibility': 'observability',
    'telemetry': 'observability',
    'automation': 'automation',
    'cicd': 'automation',
    'iac': 'automation',
    'terraform': 'automation',
    'ansible': 'automation'
  }
  
  // Sort by length (longest first) for better matching
  const sortedKeywords = Object.keys(topicKeywords).sort((a, b) => b.length - a.length)
  
  for (const keyword of sortedKeywords) {
    if (normalized.includes(keyword)) {
      return topicKeywords[keyword]
    }
  }
  
  // Special handling: if it's a "help" query with data center context but no specific topic
  if (isHelpQuery && (normalized.includes('data center') || normalized.includes('datacenter') || normalized.includes('infrastructure'))) {
    return 'data center modernization'
  }
  
  // Special handling: general "how PalC can help" queries
  if (isHelpQuery && normalized.includes('palc')) {
    return 'data center modernization' // Default to most common use case
  }
  
  return null
}

function buildAnswer(message: string): string {
  if (!message || typeof message !== 'string') {
    return 'I can help you with PalC Networks\' solutions and services. What would you like to know?'
  }
  
  const normalized = message.toLowerCase().trim()
  if (normalized.length === 0) {
    return 'I can help you with PalC Networks\' solutions and services. What would you like to know?'
  }
  
  // Check for specific topics in knowledge base (check longer phrases first)
  try {
    const sortedKeys = Object.keys(knowledgeBase).sort((a, b) => b.length - a.length)
    
    for (const key of sortedKeys) {
      if (normalized.includes(key)) {
        const data = knowledgeBase[key]
        if (data && data.answer && data.links && Array.isArray(data.links)) {
          const linkText = data.links.map(link => `[${link.title}](${link.href})`).join(' | ')
          return `${data.answer}\n\n**Learn More:** ${linkText}\n\nWould you like more details on any specific aspect?`
        }
      }
    }
  } catch (error) {
    console.error('Error in knowledge base lookup:', error)
    // Continue to fallback logic
  }
  
  // Use enhanced topic detection
  const detectedTopic = detectTopic(normalized)
  if (detectedTopic && knowledgeBase[detectedTopic]) {
    const data = knowledgeBase[detectedTopic]
    if (data && data.answer && data.links && Array.isArray(data.links)) {
      const linkText = data.links.map(link => `[${link.title}](${link.href})`).join(' | ')
      return `${data.answer}\n\n**Learn More:** ${linkText}\n\nWould you like more details on any specific aspect?`
    }
  }
  
  // Fallback to general response with topic suggestions
  const picks: string[] = []
  if (normalized.includes('data center') || normalized.includes('datacenter') || normalized.includes('modernization') || normalized.includes('modernize') || normalized.includes('infrastructure')) {
    picks.push('Data center modernization')
  }
  if (normalized.includes('sonic') || normalized.includes('evpn') || normalized.includes('vxlan') || normalized.includes('open networking')) {
    picks.push('SONiC-first networking')
  }
  if (normalized.includes('roce') || normalized.includes('buffer tuning') || normalized.includes('buffer optimization') || normalized.includes('pfc') || normalized.includes('ecn')) {
    picks.push('RoCE and buffer tuning')
  }
  if (normalized.includes('ai') || normalized.includes('gpu') || normalized.includes('fabric') || normalized.includes('ml')) {
    picks.push('AI fabrics')
  }
  if (normalized.includes('cloud') || normalized.includes('kubernetes') || normalized.includes('helm') || normalized.includes('terraform') || normalized.includes('multi-cloud')) {
    picks.push('Cloud & hybrid cloud')
  }
  if (normalized.includes('observability') || normalized.includes('visibility') || normalized.includes('telemetry') || normalized.includes('monitoring')) {
    picks.push('Network observability')
  }
  if (normalized.includes('automation') || normalized.includes('cicd') || normalized.includes('iac') || normalized.includes('devops')) {
    picks.push('Automation & tooling')
  }
  
  if (picks.length > 0) {
    const relevantLinks = quickLinks.filter(link => 
      picks.some(pick => link.title.toLowerCase().includes(pick.toLowerCase().split(' ')[0]))
    )
    const linkText = relevantLinks.length > 0 
      ? relevantLinks.map(link => `[${link.title}](${link.href})`).join(' | ')
      : quickLinks.slice(0, 3).map(link => `[${link.title}](${link.href})`).join(' | ')
    
    return `I can help you with **${picks.join('**, **')}**!\n\n${linkText}\n\nWould you like specific details on any of these topics?`
  }
  
  // Default response
  const linkText = quickLinks.slice(0, 3).map(link => `[${link.title}](${link.href})`).join(' | ')
  return `Hello! I'm here to help you learn about PalC Networks' solutions and services.\n\n**Popular Topics:**\n${linkText}\n\nWhat would you like to know more about?`
}

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { message, history = [], sessionId, prompt } = body as {
      message: string
      history?: ChatMessage[]
      sessionId?: string
      prompt?: string
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Build answer using the message
    let answer: string
    try {
      answer = buildAnswer(message.trim())
      if (!answer || answer.trim().length === 0) {
        // Fallback answer if buildAnswer returns empty
        answer = `I can help you with PalC Networks' solutions and services. Here are some popular topics:\n\n[SONiC & Open Networking](/solutions/sonic-open-networking) | [AI Fabrics](/solutions/data-center-modernization-ai-fabrics) | [Cloud & Hybrid Cloud](/solutions/cloud-hybrid-cloud)\n\nWhat specific area would you like to learn more about?`
      }
    } catch (buildError) {
      console.error('Error building answer:', buildError)
      // Fallback answer if buildAnswer fails
      answer = `I can help you with PalC Networks' solutions and services. Here are some popular topics:\n\n[SONiC & Open Networking](/solutions/sonic-open-networking) | [AI Fabrics](/solutions/data-center-modernization-ai-fabrics) | [Cloud & Hybrid Cloud](/solutions/cloud-hybrid-cloud)\n\nWhat specific area would you like to learn more about?`
    }

    // Ensure answer is always a valid string
    if (!answer || typeof answer !== 'string') {
      answer = `I can help you with PalC Networks' solutions and services. Here are some popular topics:\n\n[SONiC & Open Networking](/solutions/sonic-open-networking) | [AI Fabrics](/solutions/data-center-modernization-ai-fabrics) | [Cloud & Hybrid Cloud](/solutions/cloud-hybrid-cloud)\n\nWhat specific area would you like to learn more about?`
    }

    const response = {
      message: answer,
      answer: answer, // Also include as 'answer' for compatibility
      text: answer, // Also include as 'text' for compatibility
      sessionId: sessionId || `session-${Date.now()}`,
      citations: [],
      history: [...(Array.isArray(history) ? history : []), { role: 'user' as const, content: message }, { role: 'assistant' as const, content: answer }],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    
    // Return a user-friendly error message with fallback answer
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error processing your request. Please try again.',
        message: `I can help you with PalC Networks' solutions and services. Here are some popular topics:\n\n[SONiC & Open Networking](/solutions/sonic-open-networking) | [AI Fabrics](/solutions/data-center-modernization-ai-fabrics) | [Cloud & Hybrid Cloud](/solutions/cloud-hybrid-cloud)\n\nWhat specific area would you like to learn more about?`,
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

