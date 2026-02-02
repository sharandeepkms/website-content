/**
 * Centralized Search Index Builder
 * Automatically discovers and indexes all pages in the website
 * 
 * HOW TO ADD NEW PAGES TO SEARCH:
 * 
 * 1. For dynamic pages (solutions, services, products, blog posts, etc.):
 *    - These are automatically included from their respective data files
 *    - No action needed - they will appear in search automatically
 * 
 * 2. For static pages (new routes):
 *    - Add an entry to the `staticPages` array below
 *    - Format: { href, title, description, category, tags? }
 *    - Example:
 *      {
 *        href: '/your-new-page',
 *        title: 'Your Page Title',
 *        description: 'Brief description of what this page is about',
 *        category: 'Category Name',
 *        tags: ['tag1', 'tag2'] // Optional
 *      }
 * 
 * 3. The search will automatically:
 *    - Index all solutions from app/data/solutions.ts
 *    - Index all services from app/data/services.ts
 *    - Index all products (defined in staticPages)
 *    - Index all blog posts from app/data/blog.ts
 *    - Index all case studies from app/data/case-studies.ts
 *    - Index all events from app/data/events.ts
 *    - Index all whitepapers from app/data/whitepapers.ts
 *    - Index all static pages from the staticPages array
 */

import { solutions } from '@/app/data/solutions'
import { services } from '@/app/data/services'
import { caseStudies } from '@/app/data/case-studies'
import { events } from '@/app/data/events'
import { blogPosts } from '@/app/data/blog'
import { whitepapers } from '@/app/data/whitepapers'

export interface SearchResult {
  id: string
  title: string
  description: string
  type: 'solution' | 'service' | 'product' | 'blog' | 'case-study' | 'whitepaper' | 'event' | 'documentation' | 'page'
  href: string
  category?: string
  tags?: string[]
}

/**
 * Static pages registry - Add new pages here to make them searchable
 * Format: { href, title, description, category, tags? }
 */
const staticPages: Omit<SearchResult, 'id' | 'type'>[] = [
  // Homepage
  {
    href: '/',
    title: 'Home',
    description: 'PalC Networks - Enterprise Network Solutions & Cloud Services',
    category: 'Pages',
  },
  // Company Pages
  {
    href: '/about',
    title: 'About Us',
    description: 'Learn about PalC Networks - our mission, vision, leadership team, and commitment to delivering exceptional enterprise technology solutions.',
    category: 'Company',
  },
  {
    href: '/company/executive-team',
    title: 'Executive Team',
    description: 'Meet our leadership team and experts driving innovation at PalC Networks.',
    category: 'Company',
  },
  {
    href: '/company/industry-associations',
    title: 'Industry Associations',
    description: 'PalC Networks partnerships with leading industry associations and open networking communities.',
    category: 'Company',
  },
  {
    href: '/contact',
    title: 'Contact Us',
    description: 'Get in touch with PalC Networks for solutions, services, and support.',
    category: 'Company',
  },
  {
    href: '/careers',
    title: 'Careers',
    description: 'Join PalC Networks and build the future of enterprise networking.',
    category: 'Company',
  },
  // Product Pages
  {
    href: '/products',
    title: 'Products',
    description: 'Cloud, SONiC, and AI-ready platforms—switches, servers, NICs/DPUs, optics, and software engineered for open networking.',
    category: 'Products',
    tags: ['Switches', 'Servers', 'NICs', 'DPUs', 'Transceivers', 'Cables', 'Software'],
  },
  {
    href: '/products/switches',
    title: 'Switches',
    description: '1G–400G open switching, EVPN/VXLAN, SRv6, AI-ready leaf/spine/super-spine.',
    category: 'Products',
    tags: ['SONiC', 'EVPN/VXLAN', 'AI fabrics'],
  },
  {
    href: '/products/servers',
    title: 'Servers',
    description: 'Cloud/edge servers with GPU/DPU options, secure boot, telemetry, and automation.',
    category: 'Products',
    tags: ['AI/GPU', 'Edge', 'Secure boot'],
  },
  {
    href: '/products/nics-dpus',
    title: 'NICs / DPUs',
    description: 'RoCE/RDMA SmartNICs & DPUs for offload, inline security, and virtualization.',
    category: 'Products',
    tags: ['RDMA', 'Offload', 'Inline security'],
  },
  {
    href: '/products/transceivers',
    title: 'Transceivers',
    description: '10G–400G optics plus DAC/AOC/breakouts validated for AI and cloud fabrics.',
    category: 'Products',
    tags: ['SR/LR/ZR', 'CWDM/DWDM', 'DAC/AOC'],
  },
  {
    href: '/products/high-speed-cables',
    title: 'High-Speed Cables',
    description: 'High-speed cables for data center and networking applications.',
    category: 'Products',
    tags: ['Cables', 'Data Center'],
  },
  {
    href: '/products/software-tools',
    title: 'Software Tools',
    description: 'NetPro (ops), Guardian (NDR), Packet Broker (traffic), with APIs and automation.',
    category: 'Products',
    tags: ['Observability', 'Automation', 'Security'],
  },
  {
    href: '/products/software-tools/netpro',
    title: 'NetPro',
    description: 'Network operations and management platform.',
    category: 'Products',
    tags: ['Network Management', 'Operations'],
  },
  {
    href: '/products/software-tools/guardian',
    title: 'Guardian',
    description: 'Network Detection and Response (NDR) security solution.',
    category: 'Products',
    tags: ['Security', 'NDR', 'Threat Detection'],
  },
  {
    href: '/products/software-tools/packet-broker',
    title: 'Packet Broker',
    description: 'Traffic visibility and packet analysis platform.',
    category: 'Products',
    tags: ['Traffic Analysis', 'Visibility'],
  },
  {
    href: '/products/configurator',
    title: 'Product Configurator',
    description: 'Guided selection for switch models, optics, power/airflow, and SONiC feature packs.',
    category: 'Products',
    tags: ['Configurator', 'BOM', 'SONiC'],
  },
  // Resource Pages
  {
    href: '/resources/blog',
    title: 'Blog',
    description: 'Latest insights, articles, and updates on networking, cloud, and technology.',
    category: 'Resources',
  },
  {
    href: '/resources/case-studies',
    title: 'Case Studies',
    description: 'Real-world success stories and implementations from our clients.',
    category: 'Resources',
  },
  {
    href: '/resources/whitepapers',
    title: 'Whitepapers',
    description: 'In-depth technical whitepapers and research documents.',
    category: 'Resources',
  },
  {
    href: '/resources/events',
    title: 'Events',
    description: 'Upcoming webinars, conferences, and networking events.',
    category: 'Resources',
  },
  {
    href: '/resources/documentation',
    title: 'Documentation',
    description: 'Technical documentation, guides, and API references.',
    category: 'Resources',
  },
  {
    href: '/resources/events/timeline',
    title: 'Events Timeline',
    description: 'View all events in a timeline format.',
    category: 'Resources',
  },
  {
    href: '/resources/images-gallery',
    title: 'Images Gallery',
    description: 'Browse our collection of images and visual assets.',
    category: 'Resources',
  },
  // Solutions Pages
  {
    href: '/solutions',
    title: 'Solutions',
    description: 'Comprehensive solutions for enterprise networking, cloud, and infrastructure.',
    category: 'Solutions',
  },
  // Service Sub-Pages - Networking Engineering
  {
    href: '/services/networking-engineering',
    title: 'Networking Engineering Services',
    description: 'Expert network engineering services to design, implement, and optimize your network infrastructure.',
    category: 'Services',
    tags: ['IP Networking', 'SDN', 'NFV', 'Wireless'],
  },
  {
    href: '/services/networking-engineering/ip-networking',
    title: 'IP Networking',
    description: 'Cloud-scale routing fabrics with EVPN/VXLAN, SRv6/MPLS, QoS/TE, embedded observability, and security.',
    category: 'Services',
    tags: ['EVPN', 'VXLAN', 'SRv6', 'MPLS'],
  },
  {
    href: '/services/networking-engineering/packet-optical-nos',
    title: 'Packet Optical NOS',
    description: 'Packet optical network operating system development and integration services.',
    category: 'Services',
    tags: ['Packet Optical', 'NOS', 'Optical'],
  },
  {
    href: '/services/networking-engineering/sdn-nfv',
    title: 'SDN & NFV',
    description: 'Software-defined networking and network function virtualization architecture and implementation.',
    category: 'Services',
    tags: ['SDN', 'NFV', 'Virtualization'],
  },
  {
    href: '/services/networking-engineering/wireless',
    title: 'Wireless',
    description: 'Wireless network engineering and deployment services.',
    category: 'Services',
    tags: ['Wireless', 'WiFi', '5G'],
  },
  // Service Sub-Pages - Software Platform Engineering
  {
    href: '/services/software-platform-engineering',
    title: 'Software Platform Engineering',
    description: 'Build control-plane, telemetry, and automation software tailored to your network and platform.',
    category: 'Services',
    tags: ['Software', 'Platform', 'Engineering'],
  },
  // Service Sub-Pages - Protocol & System Development
  {
    href: '/services/protocol-system-development',
    title: 'Protocol & System Development',
    description: 'Develop custom network protocols, enhance kernel functionality, and build specialized network systems.',
    category: 'Services',
    tags: ['Protocol', 'System', 'Development'],
  },
  {
    href: '/services/protocol-system-development/protocol-development',
    title: 'Protocol Development (L2/L3)',
    description: 'Develop custom L2/L3 network protocols and enhance existing protocol implementations.',
    category: 'Services',
    tags: ['L2', 'L3', 'Protocol'],
  },
  {
    href: '/services/protocol-system-development/protocol-testing',
    title: 'Protocol Testing',
    description: 'Comprehensive protocol testing and validation services.',
    category: 'Services',
    tags: ['Testing', 'Protocol', 'Validation'],
  },
  {
    href: '/services/protocol-system-development/kernel-nos-enhancements',
    title: 'Kernel / NOS Enhancements',
    description: 'Kernel and network operating system enhancement services.',
    category: 'Services',
    tags: ['Kernel', 'NOS', 'Enhancements'],
  },
  {
    href: '/services/protocol-system-development/p4-ebpf-workloads',
    title: 'P4 / eBPF Workloads',
    description: 'P4 and eBPF workload development and optimization services.',
    category: 'Services',
    tags: ['P4', 'eBPF', 'Workloads'],
  },
  // Service Sub-Pages - Automation & Tooling
  {
    href: '/services/automation-tooling',
    title: 'Automation & Tooling',
    description: 'Automate your infrastructure and operations with comprehensive automation and tooling services.',
    category: 'Services',
    tags: ['Automation', 'Tooling', 'CI/CD'],
  },
  {
    href: '/services/automation-tooling/cicd-automation',
    title: 'CI/CD Automation',
    description: 'Continuous integration and continuous deployment automation services.',
    category: 'Services',
    tags: ['CI/CD', 'Automation', 'DevOps'],
  },
  {
    href: '/services/automation-tooling/infra-automation',
    title: 'Infrastructure Automation',
    description: 'Infrastructure automation using Terraform, Ansible, and other IaC tools.',
    category: 'Services',
    tags: ['Terraform', 'Ansible', 'IaC'],
  },
  {
    href: '/services/automation-tooling/network-automation',
    title: 'Network Automation',
    description: 'Network configuration and operations automation services.',
    category: 'Services',
    tags: ['Network', 'Automation', 'NetDevOps'],
  },
  {
    href: '/services/automation-tooling/custom-dev-tools',
    title: 'Custom Developer Tools',
    description: 'Custom development tools and platforms for your specific needs.',
    category: 'Services',
    tags: ['Custom', 'Tools', 'Development'],
  },
  // Service Sub-Pages - AI/ML Engineering
  {
    href: '/services/ai-ml-engineering',
    title: 'AI/ML Engineering',
    description: 'AI and machine learning engineering services for network and infrastructure optimization.',
    category: 'Services',
    tags: ['AI', 'ML', 'Engineering'],
  },
  // Service Sub-Pages - Professional Lifecycle Services
  {
    href: '/services/professional-lifecycle-services',
    title: 'Professional Lifecycle Services',
    description: 'End-to-end professional services throughout the entire lifecycle of your infrastructure.',
    category: 'Services',
    tags: ['Professional', 'Lifecycle', 'Services'],
  },
  {
    href: '/services/professional-lifecycle-services/consulting',
    title: 'Consulting',
    description: 'Strategic consulting services for network and infrastructure planning.',
    category: 'Services',
    tags: ['Consulting', 'Strategy'],
  },
  {
    href: '/services/professional-lifecycle-services/implementation',
    title: 'Implementation',
    description: 'Professional implementation services for network and infrastructure projects.',
    category: 'Services',
    tags: ['Implementation', 'Deployment'],
  },
  {
    href: '/services/professional-lifecycle-services/validation-testing',
    title: 'Validation & Testing',
    description: 'Comprehensive validation and testing services for network infrastructure.',
    category: 'Services',
    tags: ['Validation', 'Testing', 'QA'],
  },
  {
    href: '/services/professional-lifecycle-services/support-maintenance',
    title: 'Support & Maintenance',
    description: 'Ongoing support and maintenance services for your infrastructure.',
    category: 'Services',
    tags: ['Support', 'Maintenance'],
  },
  {
    href: '/services/professional-lifecycle-services/managed-services',
    title: 'Managed Services',
    description: 'Fully managed services for your network and infrastructure operations.',
    category: 'Services',
    tags: ['Managed', 'Services', 'Operations'],
  },
  // Service Sub-Pages - Data Optimization
  {
    href: '/services/data-optimization',
    title: 'Data Optimization',
    description: 'Data optimization and analytics services for improved performance and insights.',
    category: 'Services',
    tags: ['Data', 'Optimization', 'Analytics'],
  },
  // Other Pages
  {
    href: '/solutions/iam',
    title: 'Identity & Access Management',
    description: 'Identity and access management solutions for secure enterprise access.',
    category: 'Solutions',
  },
  {
    href: '/careers/apply',
    title: 'Apply for Jobs',
    description: 'Apply for open positions at PalC Networks.',
    category: 'Company',
  },
]

/**
 * Builds comprehensive search index from all data sources
 */
export function buildSearchIndex(): SearchResult[] {
  const searchResults: SearchResult[] = []

  // Add static pages
  staticPages.forEach((page, index) => {
    searchResults.push({
      id: `page-${index}`,
      ...page,
      type: 'page',
    })
  })

  // Add solutions
  solutions.forEach((solution) => {
    searchResults.push({
      id: `sol-${solution.id}`,
      title: solution.title,
      description: solution.description,
      type: 'solution',
      href: `/solutions/${solution.slug}`,
      category: 'Solutions',
      tags: solution.useCases?.slice(0, 3) || [],
    })
  })

  // Add services
  services.forEach((service) => {
    searchResults.push({
      id: `svc-${service.id}`,
      title: service.title,
      description: service.description,
      type: 'service',
      href: `/services/${service.slug}`,
      category: 'Services',
      tags: service.features?.slice(0, 3).map((f) => f.split(':')[0].trim()) || [],
    })
  })

  // Add case studies
  caseStudies.forEach((study) => {
    searchResults.push({
      id: `case-${study.id}`,
      title: study.title,
      description: study.summary,
      type: 'case-study',
      href: `/resources/case-studies/${study.slug}`,
      category: 'Case Studies',
      tags: study.tags || [],
    })
  })

  // Add events
  events.forEach((event) => {
    searchResults.push({
      id: `event-${event.id}`,
      title: event.title,
      description: event.summary,
      type: 'event',
      href: `/resources/events/${event.slug}`,
      category: 'Events',
      tags: event.tags || [],
    })
  })

  // Add blog posts
  blogPosts.forEach((post) => {
    searchResults.push({
      id: `blog-${post.id}`,
      title: post.title,
      description: post.summary,
      type: 'blog',
      href: `/resources/blog/${post.slug}`,
      category: 'Blog',
      tags: post.tags || [],
    })
  })

  // Add whitepapers
  whitepapers.forEach((paper) => {
    searchResults.push({
      id: `wp-${paper.id}`,
      title: paper.title,
      description: paper.summary,
      type: 'whitepaper',
      href: `/resources/whitepapers/${paper.slug}`,
      category: 'Whitepapers',
      tags: paper.tags || [],
    })
  })

  return searchResults
}

/**
 * Search function that filters results based on query
 */
export function searchIndex(query: string, index: SearchResult[]): SearchResult[] {
  if (!query.trim()) return []

  const searchTerm = query.toLowerCase().trim()

  // Search through title, description, tags, category, and type
  const filtered = index.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm)
    const descMatch = item.description.toLowerCase().includes(searchTerm)
    const categoryMatch = item.category?.toLowerCase().includes(searchTerm)
    const tagMatch = item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    const typeMatch = item.type.toLowerCase().includes(searchTerm)
    const hrefMatch = item.href.toLowerCase().includes(searchTerm)

    return titleMatch || descMatch || categoryMatch || tagMatch || typeMatch || hrefMatch
  })

  // Sort results by relevance (title matches first, then description, then category)
  const sorted = filtered.sort((a, b) => {
    const aTitleMatch = a.title.toLowerCase().includes(searchTerm)
    const bTitleMatch = b.title.toLowerCase().includes(searchTerm)
    if (aTitleMatch && !bTitleMatch) return -1
    if (!aTitleMatch && bTitleMatch) return 1

    const aDescMatch = a.description.toLowerCase().includes(searchTerm)
    const bDescMatch = b.description.toLowerCase().includes(searchTerm)
    if (aDescMatch && !bDescMatch) return -1
    if (!aDescMatch && bDescMatch) return 1

    const aCategoryMatch = a.category?.toLowerCase().includes(searchTerm)
    const bCategoryMatch = b.category?.toLowerCase().includes(searchTerm)
    if (aCategoryMatch && !bCategoryMatch) return -1
    if (!aCategoryMatch && bCategoryMatch) return 1

    return 0
  })

  return sorted.slice(0, 30) // Limit to top 30 results
}

