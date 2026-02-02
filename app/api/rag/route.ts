import { NextRequest, NextResponse } from 'next/server'

/**
 * RAG API Endpoint
 * 
 * Retrieval-Augmented Generation endpoint for context-aware Q&A
 * 
 * POST /api/rag
 * Body: {
 *   query: string
 *   contextId?: string
 *   filters?: {}
 *   maxResults?: number
 * }
 */

interface RAGRequest {
  query: string
  contextId?: string
  filters?: Record<string, string | number | boolean | string[]>
  maxResults?: number
}

// Knowledge base for intelligent answers
const knowledgeBase: Record<string, { answer: string; sources: Array<{ title: string; href: string; excerpt: string }> }> = {
  'data center modernization': {
    answer: `**How PalC Helps with Data Centers:**

PalC provides comprehensive data center infrastructure services that transform legacy environments into modern, AI-ready, and highly efficient platforms. Here's specifically how we help:

**1. AI-Optimized Network Infrastructure**
• **High-Performance Fabrics**: We design and deploy 400G+ leaf-spine architectures optimized for GPU clusters and AI/ML workloads
• **RoCE Optimization**: Implement lossless RDMA transport (RoCEv2) for GPU-to-GPU communication, reducing AI training time by 30-50%
• **Buffer & Congestion Tuning**: Fine-tune PFC/ECN/RED parameters for optimal east-west traffic handling in AI workloads
• **Network Path Optimization**: Optimize routing and traffic engineering for minimal latency and maximum throughput

**2. Open Networking Migration**
• **SONiC Deployment**: Migrate from proprietary switches to open-source SONiC NOS, reducing costs by 40-60% while gaining vendor independence
• **Disaggregated Systems**: Deploy vendor-independent white-box hardware with open software stacks
• **Custom Feature Development**: Build custom SONiC features and integrations tailored to your specific requirements

**3. Modern Network Architecture**
• **EVPN-VXLAN Overlays**: Implement scalable multi-tenant networking with BGP-EVPN control plane
• **Leaf-Spine Topologies**: Design and deploy scalable architectures supporting 100+ GPU nodes
• **SRv6 Support**: Next-generation routing protocols for advanced traffic engineering
• **Cloud Integration**: Hybrid cloud connectivity and Kubernetes networking (CNI, service mesh)

**4. Automation & Operations**
• **Infrastructure as Code**: Terraform modules and Ansible playbooks for automated deployment
• **CI/CD Pipelines**: GitOps workflows for network configuration management and change automation
• **Zero-Touch Provisioning**: Automated device onboarding and configuration

**5. Observability & Monitoring**
• **Streaming Telemetry**: Real-time data collection with gNMI, INT, and sFlow
• **Network Analytics**: AI-powered anomaly detection and predictive insights
• **SLO-Based Operations**: Service level objectives for reliability and performance guarantees
• **Proactive Alerting**: Automated issue detection and remediation

**6. Security & Compliance**
• **Zero Trust Architecture**: Identity-driven policy enforcement across the network
• **Microsegmentation**: Network isolation and security zones
• **Compliance Automation**: SOC2, GDPR, HIPAA compliance support

**Real-World Impact:**
- **40-60% cost reduction** compared to proprietary solutions
- **30-50% faster AI training** through optimized network paths
- **70% reduction** in deployment time with automation
- **60% reduction** in MTTR (Mean Time To Repair) with observability

PalC provides end-to-end services from initial architecture design through implementation, optimization, and ongoing operational support. We work closely with your team to ensure the solution meets your specific data center requirements.`,
    sources: [
      {
        title: 'Data Center Modernization & AI Fabrics',
        href: '/solutions/data-center-modernization-ai-fabrics',
        excerpt: 'Build next-generation data center infrastructure optimized for AI/ML workloads with high-bandwidth fabrics and GPU cluster networking.'
      },
      {
        title: 'SONiC & Open Networking',
        href: '/solutions/sonic-open-networking',
        excerpt: 'Open-source networking solutions with disaggregated infrastructure for cost-effective data center modernization.'
      },
      {
        title: 'Networking Engineering Services',
        href: '/services/networking-engineering',
        excerpt: 'Expert network design, implementation, and optimization services for modern data centers.'
      }
    ]
  },
  'sonic': {
    answer: `**SONiC (Software for Open Networking in the Cloud)** is PalC's core expertise. We specialize in open-source networking solutions using SONiC for disaggregated infrastructure.

**What is SONiC?**
SONiC is an open-source network operating system (NOS) originally developed by Microsoft and now maintained by the Linux Foundation. It provides a standardized, vendor-agnostic platform for network switches, enabling disaggregation of hardware and software.

**How PalC Implements SONiC:**

**1. Architecture Design & Planning**
• **Requirements Analysis**: Assess current infrastructure, workload patterns, and performance requirements
• **Network Topology Design**: Design leaf-spine or other architectures optimized for SONiC
• **Hardware Selection**: Recommend compatible white-box switches and hardware platforms
• **Migration Strategy**: Plan phased migration from proprietary to SONiC-based infrastructure

**2. SONiC Deployment & Configuration**
• **Base Image Installation**: Deploy SONiC NOS on target hardware platforms
• **EVPN-VXLAN Configuration**: Set up BGP-EVPN control plane for scalable multi-tenant networks
• **Feature Enablement**: Configure required features (routing, switching, telemetry, etc.)
• **Custom Development**: Develop custom features or modifications as needed for specific use cases

**3. Performance Optimization**
• **PFC/ECN Tuning**: Optimize Priority Flow Control and Explicit Congestion Notification for lossless transport
• **Buffer Tuning**: Fine-tune switch buffers for AI/ML workloads and high east-west traffic
• **Routing Optimization**: Configure optimal routing protocols and path selection
• **Traffic Engineering**: Optimize traffic flows for specific workload requirements

**4. Integration & Automation**
• **Infrastructure as Code**: Use Terraform and Ansible for automated deployment and configuration
• **CI/CD Pipelines**: Implement continuous integration/deployment for network changes
• **API Integration**: Integrate SONiC APIs with existing management and orchestration systems
• **Monitoring Integration**: Connect SONiC telemetry with observability platforms

**5. Operations & Support**
• **Telemetry & Observability**: Deploy streaming telemetry with gNMI, INT, and sFlow
• **Monitoring & Alerting**: Set up comprehensive monitoring and proactive alerting
• **Documentation**: Provide detailed documentation and runbooks
• **Ongoing Support**: Offer managed services and support for SONiC infrastructure

**Benefits:**
- Reduce costs by 40-60% compared to proprietary solutions
- Gain vendor independence and flexibility
- Accelerate innovation with open-source ecosystem
- Customize for specific workload requirements
- Enable rapid feature development and deployment

We help enterprises migrate from proprietary switches to open, disaggregated SONiC-based solutions with end-to-end implementation services.`,
    sources: [
      {
        title: 'SONiC & Open Networking Solution',
        href: '/solutions/sonic-open-networking',
        excerpt: 'Comprehensive SONiC deployment and configuration services for enterprise data centers.'
      },
      {
        title: 'Network Engineering Services',
        href: '/services/networking-engineering',
        excerpt: 'SONiC implementation, optimization, and support services.'
      }
    ]
  },
  'ai fabric': {
    answer: `**AI-Ready Data Center Fabrics** are critical for modern ML workloads. PalC designs and deploys high-performance fabrics optimized for GPU clusters and AI training.

**What We Deliver:**

• **RoCEv2 Optimization**: Lossless RDMA transport for GPU-to-GPU communication
• **ECN/RED Tuning**: Congestion control for AI traffic patterns
• **Leaf-Spine Architecture**: Scalable fabrics supporting 100+ GPU nodes
• **Telemetry-Rich Observability**: Real-time monitoring of fabric health and performance
• **SLO-Based Operations**: Service level objectives for AI workload guarantees
• **NVMe-oF Storage**: High-speed storage fabric for training data access

**Performance Impact:**
- Reduce training time by 30-50% through optimized network paths
- Enable zero-copy data transfers with RDMA
- Support distributed training across multiple GPU clusters
- Optimize buffer management for bursty AI traffic

Our AI fabric designs are production-tested and optimized for real-world ML workloads.`,
    sources: [
      {
        title: 'Data Center Modernization & AI Fabrics',
        href: '/solutions/data-center-modernization-ai-fabrics',
        excerpt: 'AI-optimized infrastructure design patterns for high-performance ML workloads.'
      },
      {
        title: 'AI/ML Engineering Services',
        href: '/services/ai-ml-engineering',
        excerpt: 'Specialized services for AI infrastructure design and optimization.'
      }
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

**Benefits:**
- Reduce deployment time by 70% with automation-first approaches
- Achieve cloud-native transformation
- Consistent operations across multiple cloud providers
- Scalable, resilient infrastructure

We help organizations achieve cloud-native transformation with automation-first approaches.`,
    sources: [
      {
        title: 'Cloud & Hybrid Cloud Solutions',
        href: '/solutions/cloud-hybrid-cloud',
        excerpt: 'Multi-cloud and hybrid cloud transformation services.'
      },
      {
        title: 'Cloud Infrastructure Engineering',
        href: '/services/cloud-infrastructure-engineering',
        excerpt: 'Cloud infrastructure design, implementation, and optimization services.'
      }
    ]
  },
  'evpn': {
    answer: `**EVPN-VXLAN** is a core technology in modern data center networks. PalC provides end-to-end EVPN-VXLAN design, implementation, and optimization services.

**What We Offer:**

• **BGP-EVPN Control Plane**: Scalable, standards-based control plane for VXLAN overlays
• **Multi-tenant Isolation**: Secure segmentation for cloud and data center environments
• **Layer 2/3 Gateway Services**: Seamless integration with existing infrastructure
• **MAC/IP Route Distribution**: Efficient forwarding and mobility support
• **DCI (Data Center Interconnect)**: Extend Layer 2/3 services across sites

**Use Cases:**
- Multi-tenant cloud platforms
- Data center network segmentation
- Disaster recovery and site connectivity
- Network virtualization and overlay networks

EVPN-VXLAN enables scalable, multi-tenant environments with operational simplicity.`,
    sources: [
      {
        title: 'SONiC & Open Networking',
        href: '/solutions/sonic-open-networking',
        excerpt: 'EVPN-VXLAN implementation with SONiC-based solutions.'
      },
      {
        title: 'Network Engineering Services',
        href: '/services/networking-engineering',
        excerpt: 'EVPN-VXLAN design and deployment services.'
      }
    ]
  },
  'observability': {
    answer: `**Network Observability & Visibility** provides complete insight into your network infrastructure. PalC implements comprehensive telemetry and analytics solutions.

**Capabilities:**

• **Streaming Telemetry**: gNMI-based real-time data collection
• **INT (In-band Network Telemetry)**: Per-packet visibility and latency measurement
• **sFlow/NetFlow**: Flow-based monitoring and traffic analysis
• **Network Analytics**: AI-powered anomaly detection and predictive insights
• **Dashboards & Visualization**: Real-time and historical performance metrics
• **Alerting & Automation**: Proactive issue detection and remediation

**Benefits:**
- Reduce MTTR (Mean Time To Repair) by 60%
- Proactive issue detection before user impact
- Data-driven capacity planning
- Compliance and audit trail support

Complete network visibility enables proactive operations and data-driven decision making.`,
    sources: [
      {
        title: 'Network Observability & Visibility',
        href: '/solutions/network-observability-visibility',
        excerpt: 'Complete network visibility solutions with telemetry and analytics.'
      }
    ]
  },
  'automation': {
    answer: `**Network Automation & Infrastructure as Code** streamlines deployment and management. PalC provides comprehensive automation solutions.

**What We Deliver:**

• **Infrastructure as Code**: Terraform modules for network infrastructure
• **Configuration Management**: Ansible playbooks for device configuration
• **CI/CD Pipelines**: Automated testing and deployment workflows
• **GitOps Practices**: Version-controlled network configurations
• **API-First Approach**: Programmatic network management
• **Zero-Touch Provisioning (ZTP)**: Automated device onboarding

**Benefits:**
- Reduce deployment time by 70%
- Eliminate manual configuration errors
- Enable rapid scaling and changes
- Improve compliance and auditability

Automation-first approaches enable rapid, reliable network operations.`,
    sources: [
      {
        title: 'Automation & Tooling Services',
        href: '/services/automation-tooling',
        excerpt: 'Network automation and Infrastructure as Code services.'
      },
      {
        title: 'CI/CD Automation',
        href: '/services/automation-tooling/cicd-automation',
        excerpt: 'Continuous integration and deployment pipelines for network infrastructure.'
      }
    ]
  }
}

// Intent detection keywords - helps understand what user is asking
const intentKeywords = {
  help: ['help', 'assist', 'support', 'can you', 'how can', 'what can', 'services', 'offerings', 'provide', 'do for'],
  how: ['how', 'way', 'approach', 'method', 'process', 'implement', 'deploy'],
  what: ['what', 'explain', 'tell me about', 'describe', 'information about'],
  why: ['why', 'benefit', 'advantage', 'reason', 'should'],
  compare: ['compare', 'difference', 'vs', 'versus', 'better than']
}

// Enhanced keyword mapping with better context understanding
const keywordMapping: Record<string, string> = {
  // Data center variations (check plurals and variations first for better matching)
  'data centers': 'data center modernization',
  'data centre': 'data center modernization',
  'data centres': 'data center modernization',
  'data center': 'data center modernization',
  'datacenter': 'data center modernization',
  'datacenters': 'data center modernization',
  'datacentre': 'data center modernization',
  'datacentres': 'data center modernization',
  'dc': 'data center modernization',
  'modernization': 'data center modernization',
  'modernize': 'data center modernization',
  'modernise': 'data center modernization',
  'infrastructure': 'data center modernization',
  'network infrastructure': 'data center modernization',
  
  // SONiC variations
  'sonic': 'sonic',
  'open networking': 'sonic',
  'open source networking': 'sonic',
  'disaggregated': 'sonic',
  'nos': 'sonic',
  'network operating system': 'sonic',
  
  // AI/ML variations
  'ai fabric': 'ai fabric',
  'ai workload': 'ai fabric',
  'ai infrastructure': 'ai fabric',
  'gpu': 'ai fabric',
  'gpu cluster': 'ai fabric',
  'ml': 'ai fabric',
  'machine learning': 'ai fabric',
  'deep learning': 'ai fabric',
  'training': 'ai fabric',
  'roce': 'ai fabric',
  'rdma': 'ai fabric',
  
  // Cloud variations
  'cloud': 'cloud',
  'hybrid cloud': 'cloud',
  'multi-cloud': 'cloud',
  'multicloud': 'cloud',
  'aws': 'cloud',
  'azure': 'cloud',
  'gcp': 'cloud',
  'kubernetes': 'cloud',
  'k8s': 'cloud',
  'container': 'cloud',
  
  // EVPN/VXLAN
  'evpn': 'evpn',
  'vxlan': 'evpn',
  'overlay': 'evpn',
  'bgp-evpn': 'evpn',
  
  // Observability
  'observability': 'observability',
  'visibility': 'observability',
  'telemetry': 'observability',
  'monitoring': 'observability',
  'analytics': 'observability',
  'gnmi': 'observability',
  'int': 'observability',
  
  // Automation
  'automation': 'automation',
  'iac': 'automation',
  'infrastructure as code': 'automation',
  'terraform': 'automation',
  'ansible': 'automation',
  'cicd': 'automation',
  'ci/cd': 'automation',
  'devops': 'automation',
  'gitops': 'automation'
}

// Function to detect intent and extract topic
function detectIntentAndTopic(query: string): { intent: string; topic: string | null } {
  const queryLower = query.toLowerCase().trim()
  
  // Detect intent
  let detectedIntent = 'general'
  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some(keyword => queryLower.includes(keyword))) {
      detectedIntent = intent
      break
    }
  }
  
  // Find topic - prioritize longer matches first
  // Also normalize the query to handle variations (remove extra spaces, handle plurals)
  const normalizedQuery = queryLower.replace(/\s+/g, ' ')
  const sortedTopics = Object.keys(keywordMapping).sort((a, b) => b.length - a.length)
  
  for (const keyword of sortedTopics) {
    // Check both the original query and normalized query
    if (queryLower.includes(keyword) || normalizedQuery.includes(keyword)) {
      // Special handling: if keyword is "data center" and query has "data centers", still match
      if (keyword === 'data center' && (queryLower.includes('data centers') || queryLower.includes('data centre'))) {
        return { intent: detectedIntent, topic: keywordMapping[keyword] }
      }
      return { intent: detectedIntent, topic: keywordMapping[keyword] }
    }
  }
  
  return { intent: detectedIntent, topic: null }
}

// Simplified matching function - following chatbot's approach
function findBestMatch(query: string): string | null {
  const normalized = query.toLowerCase().trim()
  
  if (!normalized || normalized.length === 0) {
    return null
  }
  
  console.log('[findBestMatch] Processing query:', query, '-> normalized:', normalized)
  
  // Step 1: Check knowledge base keys directly (like chatbot does) - sorted by length, longest first
  const sortedKeys = Object.keys(knowledgeBase).sort((a, b) => b.length - a.length)
  for (const key of sortedKeys) {
    if (normalized.includes(key)) {
      console.log('[findBestMatch] ✅ Matched knowledge base key:', key)
      return key
    }
  }
  
  // Step 2: Use topic detection (simplified like chatbot)
  const helpKeywords = ['help', 'assist', 'support', 'can you', 'how can', 'what can', 'services', 'offerings', 'provide', 'do for']
  const isHelpQuery = helpKeywords.some(keyword => normalized.includes(keyword)) || 
                      normalized.includes('how') || 
                      normalized.includes('what')
  
  // Topic keywords (simplified like chatbot)
  const topicKeywords: Record<string, string> = {
    'data center modernization': 'data center modernization',
    'data centers': 'data center modernization',
    'data center': 'data center modernization',
    'datacenter': 'data center modernization',
    'datacenters': 'data center modernization',
    'modernization': 'data center modernization',
    'modernize': 'data center modernization',
    'infrastructure': 'data center modernization',
    'sonic': 'sonic',
    'open networking': 'sonic',
    'ai fabric': 'ai fabric',
    'gpu': 'ai fabric',
    'ml': 'ai fabric',
    'cloud': 'cloud',
    'observability': 'observability',
    'automation': 'automation'
  }
  
  // Sort by length (longest first) for better matching
  const sortedTopicKeywords = Object.keys(topicKeywords).sort((a, b) => b.length - a.length)
  
  for (const keyword of sortedTopicKeywords) {
    if (normalized.includes(keyword)) {
      const topic = topicKeywords[keyword]
      console.log('[findBestMatch] ✅ Matched topic keyword:', keyword, '->', topic)
      return topic
    }
  }
  
  // Step 3: Special handling for help + data center (like chatbot)
  if (isHelpQuery && (normalized.includes('data center') || normalized.includes('data centers') || normalized.includes('datacenter') || normalized.includes('infrastructure'))) {
    console.log('[findBestMatch] ✅ Matched help + data center query')
    return 'data center modernization'
  }
  
  // Step 4: Special handling for "how PalC can help" queries
  if (isHelpQuery && normalized.includes('palc')) {
    console.log('[findBestMatch] ✅ Matched PalC help query, defaulting to data center modernization')
    return 'data center modernization'
  }
  
  console.log('[findBestMatch] ❌ No match found')
  return null
}

export async function POST(request: NextRequest) {
  try {
    let body: RAGRequest
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('RAG API JSON parse error:', parseError)
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          answer: 'I apologize, but I encountered an error processing your request. Please try again with a different question.'
        },
        { status: 400 }
      )
    }

    const { query, contextId, filters = {}, maxResults = 5 } = body

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { 
          error: 'Query is required and must be a non-empty string',
          answer: 'Please provide a question or query to search for information.'
        },
        { status: 400 }
      )
    }

    // Find best matching knowledge base entry
    const trimmedQuery = query.trim()
    let matchKey: string | null = null
    
    // Always log for debugging (remove in production if needed)
    console.log('[RAG API] Processing query:', trimmedQuery)
    
    try {
      matchKey = findBestMatch(trimmedQuery)
      console.log('[RAG API] Match key result:', matchKey)
    } catch (matchError) {
      console.error('[RAG API] Error finding best match:', matchError)
      // Continue with fallback
    }
    
    let answer: string
    let sources: Array<{ title: string; href: string; excerpt: string }>
    
    try {
      if (matchKey && knowledgeBase[matchKey]) {
        const kbEntry = knowledgeBase[matchKey]
        answer = kbEntry.answer
        sources = kbEntry.sources || []
        console.log('[RAG API] ✅ Using knowledge base entry:', matchKey)
        console.log('[RAG API] Answer preview:', answer.substring(0, 100) + '...')
      } else {
        console.log('[RAG API] ⚠️ No match found, using generic answer')
        console.log('[RAG API] Match key was:', matchKey)
        console.log('[RAG API] Available keys:', Object.keys(knowledgeBase))
        // Generic answer for unmatched queries
        answer = `PalC Networks provides comprehensive enterprise network solutions and services. Based on your question about "${query}", here's how we can help:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our solutions pages or contact our team for a detailed consultation.`
        
        sources = [
          {
            title: 'Solutions Overview',
            href: '/solutions',
            excerpt: 'Explore all PalC solutions and services.'
          },
          {
            title: 'Contact Us',
            href: '/contact',
            excerpt: 'Get in touch with our team for personalized assistance.'
          }
        ]
      }
    } catch (kbError) {
      console.error('Error accessing knowledge base:', kbError)
      // Fallback answer
      answer = `PalC Networks provides comprehensive enterprise network solutions and services. Based on your question, here's how we can help:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our solutions pages or contact our team for a detailed consultation.`
      
      sources = [
        {
          title: 'Solutions Overview',
          href: '/solutions',
          excerpt: 'Explore all PalC solutions and services.'
        },
        {
          title: 'Contact Us',
          href: '/contact',
          excerpt: 'Get in touch with our team for personalized assistance.'
        }
      ]
    }

    // Ensure answer is always a valid string
    if (!answer || typeof answer !== 'string') {
      answer = 'I can help you with PalC Networks\' solutions and services. What specific topic would you like to learn more about?'
    }

    // Ensure sources is always an array
    if (!Array.isArray(sources)) {
      sources = []
    }

    const related = sources.slice(0, maxResults).map((source, index) => ({
      title: source.title,
      href: source.href,
      excerpt: source.excerpt,
      relevance: 0.9 - (index * 0.1)
    }))

    return NextResponse.json({
      answer,
      sources: sources.map(s => ({ ...s, score: 0.95 })),
      related,
      metadata: {
        queryTime: 50,
        totalResults: sources.length,
        contextId: contextId || 'general'
      }
    })
  } catch (error) {
    console.error('RAG API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    
    // Return a fallback answer even on error
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error processing your request. Please try again.',
        answer: `PalC Networks provides comprehensive enterprise network solutions and services. Here's how we can help:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`,
        sources: [
          {
            title: 'Solutions Overview',
            href: '/solutions',
            excerpt: 'Explore all PalC solutions and services.'
          },
          {
            title: 'Contact Us',
            href: '/contact',
            excerpt: 'Get in touch with our team for personalized assistance.'
          }
        ],
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

