"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, Server, Network, BarChart3, Radio, Cloud, Shield, Code, Settings, TestTube, HeadphonesIcon, Cpu, Zap, Search, Users, MessageCircle, Wrench, Building2, Briefcase, Package, HelpCircle, LifeBuoy, Phone, BookOpen, FileText, Calendar, BookMarked } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { CommandKSearch } from './search/CommandKSearch'
import { EnhancedSearch } from './search/EnhancedSearch'
import { LeadCaptureModal } from './LeadCaptureModal'
import type { LucideIcon } from 'lucide-react'
import { events } from '@/app/data/events'
import { caseStudies } from '@/app/data/case-studies'
import { blogPosts } from '@/app/data/blog'
import { whitepapers } from '@/app/data/whitepapers'
import { getImageSrc } from '@/app/utils/image-path'

interface SolutionItem {
  name: string
  href: string
  icon: LucideIcon
  description: string
  tag?: string
}

const solutions: SolutionItem[] = [
  { 
    name: 'Data Center Modernization & AI Fabrics', 
    href: '/solutions/data-center-modernization-ai-fabrics',
    icon: Server,
    description: 'AI-optimized fabrics for high-performance ML workloads',
    tag: 'AI/ML'
  },
  { 
    name: 'SONiC & Open Networking', 
    href: '/solutions/sonic-open-networking',
    icon: Network,
    description: 'Open-source networking with disaggregated infrastructure',
    tag: 'Open Source'
  },
  { 
    name: 'Networking Visibility & Monitoring', 
    href: '/solutions/network-observability-visibility',
    icon: BarChart3,
    description: 'Complete network visibility with telemetry and analytics',
    tag: 'Monitoring'
  },
  { 
    name: 'Cloud & Hybrid Cloud', 
    href: '/solutions/cloud-hybrid-cloud',
    icon: Cloud,
    description: 'Multi-cloud and hybrid cloud transformation',
    tag: 'Cloud'
  },
  { 
    name: 'Identity & Access Management', 
    href: '/solutions/identity-access-management',
    icon: Shield,
    description: 'Zero trust security and identity governance',
    tag: 'Security'
  },
]

interface ServiceItem {
  name: string
  href: string
  icon: LucideIcon
  description: string
  subItems?: Array<{ name: string; href: string }>
}

const services: ServiceItem[] = [
  {
    name: 'Networking Engineering',
    href: '/services/networking-engineering',
    icon: Network,
    description: 'Expert network design, implementation, and optimization',
    subItems: [
      { name: 'IP Networking', href: '/services/networking-engineering/ip-networking' },
      { name: 'Packet Optical Networks', href: '/services/networking-engineering/packet-optical-nos' },
      { name: 'SDN & NFV', href: '/services/networking-engineering/sdn-nfv' },
    ],
  },
  {
    name: 'Cloud & Platform Engineering',
    href: '/services/cloud-platform-engineering',
    icon: Cloud,
    description: 'Cloud infrastructure, platforms, and DevOps services',
    subItems: [
      { name: 'Private & Hybrid Cloud', href: '/services/cloud-platform-engineering/private-hybrid-cloud' },
      { name: 'Cloud-Native Applications', href: '/services/software-platform-engineering/cloud-native-development' },
      { name: 'DevOps & Platform Engineering', href: '/services/software-platform-engineering/devops-platform-engineering' },
      { name: 'CI/CD & Build-Time Optimization', href: '/services/automation-tooling/cicd-automation' },
      { name: 'CDN & Real-Time Streaming Platforms', href: '/services/cloud-platform-engineering/cdn-streaming' },
    ],
  },
  {
    name: 'Security, Visibility & Analytics',
    href: '/services/security-visibility-analytics',
    icon: Shield,
    description: 'Security, identity management, and network analytics',
    subItems: [
      { name: 'Identity & Access Management', href: '/services/security-visibility-analytics/identity-access-management' },
      { name: 'Security Engineering', href: '/services/security-visibility-analytics/security-engineering' },
      { name: 'Network & Data Analytics', href: '/services/security-visibility-analytics/network-data-analytics' },
    ],
  },
  {
    name: 'Industry-Focused Engineering',
    href: '/services/industry-focused-engineering',
    icon: Building2,
    description: 'Specialized solutions for specific industries',
    subItems: [
      { name: 'Banking, Financial Services & Insurance', href: '/services/industry-focused-engineering/bfsi' },
      { name: 'Telecom & Edge Networks', href: '/services/industry-focused-engineering/telecom-edge' },
      { name: 'Enterprise & Digital Platforms', href: '/services/industry-focused-engineering/enterprise-digital' },
    ],
  },
  {
    name: 'Engagement & Delivery Models',
    href: '/services/engagement-delivery-models',
    icon: HeadphonesIcon,
    description: 'Flexible service delivery and engagement options',
    subItems: [
      { name: 'CPDaaS – Customized Product Development', href: '/services/engagement-delivery-models/cpdaas' },
      { name: 'PDaaS – Protocol Development', href: '/services/protocol-system-development/protocol-development' },
      { name: 'PTaaS – Protocol Testing & Validation', href: '/services/protocol-system-development/protocol-testing' },
      { name: 'SaaS – Support as a Service', href: '/services/professional-lifecycle-services/support-maintenance' },
    ],
  },
]

interface NavLink {
  name: string
  href: string
  subItems?: NavLink[]
}

interface CompanyItem {
  name: string
  href: string
  description: string
  icon: LucideIcon
  subItems?: NavLink[]
}

interface SupportItem {
  name: string
  href: string
  description: string
  icon: LucideIcon
}

interface ResourceItem {
  name: string
  href: string
  description: string
  icon: LucideIcon
}

const platforms: NavLink[] = [
  { name: 'Infrastructure Platforms (Overview)', href: '/platforms' },
  {
    name: 'Switching Platforms',
    href: '/products/switches',
    subItems: [
      { name: 'Whitebox Switching with SONiC', href: '/products/switches' },
    ],
  },
  {
    name: 'Compute Platforms',
    href: '/products/servers',
    subItems: [
      { name: 'AI / Cloud-Ready Servers', href: '/products/servers' },
    ],
  },
  {
    name: 'Network Interface Platforms',
    href: '/products/nics-dpus',
    subItems: [
      { name: 'High-Performance NICs & DPUs', href: '/products/nics-dpus' },
    ],
  },
  {
    name: 'Connectivity Platforms',
    href: '/products/high-speed-cables',
    subItems: [
      { name: 'High-Speed Cables & Optics', href: '/products/high-speed-cables' },
    ],
  },
]

const company: CompanyItem[] = [
  { 
    name: 'About Us', 
    href: '/about',
    description: 'Learn about our mission, vision, and commitment to innovation',
    icon: Building2
  },
  { 
    name: 'Careers', 
    href: '/careers',
    description: 'Join our team and build the future of networking',
    icon: Briefcase
  },
  { 
    name: 'Executive Team', 
    href: '/company/executive-team',
    description: 'Meet our leadership driving innovation',
    icon: Users
  },
  { 
    name: 'Industry Associations', 
    href: '/company/industry-associations',
    description: 'Our partnerships with leading industry organizations',
    icon: Users
  },
  {
    name: 'Platforms',
    href: '/platforms',
    description: 'Infrastructure platforms for modern data centers',
    icon: Package,
    subItems: [
      { name: 'Infrastructure Platforms (Overview)', href: '/platforms' },
      { name: 'Switching Platforms', href: '/products/switches' },
      { name: 'Compute Platforms', href: '/products/servers' },
      { name: 'Network Interface Platforms', href: '/products/nics-dpus' },
      { name: 'Connectivity Platforms', href: '/products/high-speed-cables' },
    ],
  },
]

const support: SupportItem[] = [
  { 
    name: 'Support Overview', 
    href: '/support',
    description: 'Comprehensive support resources and assistance',
    icon: HelpCircle
  },
  { 
    name: 'Technical Assistance Center (TAC)', 
    href: '/support/tac',
    description: '24/7 technical support and troubleshooting',
    icon: HeadphonesIcon
  },
  { 
    name: 'Knowledge Base', 
    href: 'https://support.palcnetworks.com/portal/en/home',
    description: 'Search articles, guides, and documentation',
    icon: BookOpen
  },
  { 
    name: 'Managed Services', 
    href: '/services/professional-lifecycle-services/managed-services',
    description: 'End-to-end managed infrastructure services',
    icon: LifeBuoy
  },
]

const resources: ResourceItem[] = [
  { 
    name: 'Blogs & Insights', 
    href: '/resources/blog',
    description: 'Latest insights, articles, and updates on networking and technology',
    icon: BookOpen
  },
  { 
    name: 'Case Studies', 
    href: '/resources/case-studies',
    description: 'Real-world success stories and implementations from our clients',
    icon: FileText
  },
  { 
    name: 'Whitepapers', 
    href: '/resources/whitepapers',
    description: 'In-depth technical whitepapers and research documents',
    icon: BookMarked
  },
  { 
    name: 'Technical Guides', 
    href: '/resources/documentation',
    description: 'Comprehensive technical documentation and API references',
    icon: FileText
  },
  { 
    name: 'Events & Talks', 
    href: '/resources/events',
    description: 'Upcoming webinars, conferences, and networking events',
    icon: Calendar
  },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check scroll position on mount and navigation
  useEffect(() => {
    const checkScrollPosition = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    // Check immediately on mount/navigation (handles back button case)
    checkScrollPosition()
    
    // Also check after a brief delay to handle scroll restoration
    // This ensures we catch the scroll position even if browser restores it after initial render
    const timeoutId = setTimeout(() => {
      checkScrollPosition()
    }, 100)
    
    // Also listen for scroll events
    window.addEventListener('scroll', checkScrollPosition, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [pathname]) // Re-check when pathname changes (navigation)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenDropdown(null)
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }, [pathname])

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Special check for Company menu - includes /about, /contact, /careers, and /company/* routes
  const isCompanyActive = () => {
    return pathname === '/about' || 
           pathname === '/contact' || 
           pathname === '/careers' || 
           pathname.startsWith('/company/')
  }

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  // Get featured resources for Resources menu widgets
  const featuredEvent = events.find(e => {
    const eventDate = new Date(e.date)
    return eventDate >= new Date()
  }) || events[0]
  
  const featuredCaseStudy = caseStudies[0]
  const featuredBlog = blogPosts[0]
  const featuredWhitepaper = whitepapers[0]

  useEffect(() => {
    if (openDropdown === 'search') {
      setIsSearchOpen(true)
      setOpenDropdown(null)
    }
  }, [openDropdown])

  // Check if any mega menu is open
  const isMegaMenuOpen = openDropdown === 'solutions' || openDropdown === 'services' || openDropdown === 'company' || openDropdown === 'support' || openDropdown === 'resources'

  return (
    <>
      <EnhancedSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      
      {/* Backdrop Blur Overlay when mega menu is open */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenDropdown(null)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            style={{ top: '73px' }}
          />
        )}
      </AnimatePresence>
      
      <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      )}
      style={{ maxWidth: '100vw' }}
    >
      <nav className="container-custom w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-[120px] sm:min-w-[140px]">
            <Logo 
              href="/"
              size="lg"
              variant={isScrolled ? "dark" : "light"}
              imgClassName="h-8 w-auto sm:h-10 md:h-12 max-h-12"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 flex-1 min-w-0 justify-center">
            {/* Solutions Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')
                }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown('solutions')
                }}
                onMouseLeave={() => {
                  // Small delay to allow moving to dropdown
                  hoverTimeoutRef.current = setTimeout(() => {
                    setOpenDropdown((prev) => prev === 'solutions' ? null : prev)
                  }, 200)
                }}
                className={cn(
                  "px-2 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap",
                  isActive('/solutions')
                    ? "text-primary bg-primary/5"
                    : isScrolled 
                      ? "text-gray-900 hover:text-primary hover:bg-gray-50"
                      : "text-white hover:text-primary hover:bg-white/10"
                )}
              >
                Solutions
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === 'solutions' && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {openDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                        hoverTimeoutRef.current = null
                      }
                      setOpenDropdown('solutions')
                    }}
                    onMouseLeave={() => {
                      // Small delay to allow moving to footer links
                      hoverTimeoutRef.current = setTimeout(() => {
                        setOpenDropdown((prev) => prev === 'solutions' ? null : prev)
                      }, 200)
                    }}
                    onClick={(e) => {
                      // Prevent clicks inside from closing the dropdown
                      e.stopPropagation()
                    }}
                    className="fixed left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 top-20 sm:top-24 lg:top-24 mt-2 max-w-[1280px] mx-auto bg-white rounded-2xl shadow-deep border border-gray-100 overflow-hidden z-50"
                    style={{ maxHeight: 'calc(100vh - 100px)' }}
                  >
                    {/* Header with Title and Description */}
                    <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex-shrink-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Solutions</h3>
                      <p className="text-xs text-gray-600 leading-snug">
                        Production-grade infrastructure solutions for modern networks and distributed systems.
                      </p>
                    </div>

                    {/* Solutions Cards - Responsive Grid Layout */}
                    <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-2.5">
                        {solutions.map((solution, index) => {
                          const IconComponent = solution.icon
                          return (
                            <motion.div
                              key={solution.href}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={solution.href}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setOpenDropdown(null)
                                }}
                                onMouseDown={(e) => {
                                  e.stopPropagation()
                                }}
                                className="group block p-3 sm:p-4 rounded-lg border border-gray-200 hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-300 h-full relative"
                              >
                                {/* Icon - Left Aligned with Advanced Design */}
                                <div className="mb-2.5 flex items-start">
                                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm flex-shrink-0 overflow-hidden">
                                    {/* Icon Background Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
                                  </div>
                                </div>
                                
                                {/* Content */}
                                <div className="space-y-1">
                                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                    {solution.name}
                                  </h4>
                                  <p className="text-xs text-gray-600 leading-snug line-clamp-2">
                                    {solution.description}
                                  </p>
                                </div>

                                {/* Hover Arrow Indicator - Bottom Right */}
                                <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-0.5">
                                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                                </div>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    <Link
                      href="/solutions"
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(null)
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                      }}
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current)
                          hoverTimeoutRef.current = null
                        }
                      }}
                      className="block px-3 py-1.5 bg-gray-50 border-t border-gray-100 flex-shrink-0 group hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Explore All Solutions
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown(openDropdown === 'services' ? null : 'services')
                }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown('services')
                }}
                onMouseLeave={() => {
                  // Small delay to allow moving to dropdown
                  hoverTimeoutRef.current = setTimeout(() => {
                    setOpenDropdown((prev) => prev === 'services' ? null : prev)
                  }, 200)
                }}
                className={cn(
                  "px-2 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap",
                  isActive('/services')
                    ? "text-primary bg-primary/5"
                    : isScrolled 
                      ? "text-gray-900 hover:text-primary hover:bg-gray-50"
                      : "text-white hover:text-primary hover:bg-white/10"
                )}
              >
                Services
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === 'services' && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {openDropdown === 'services' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                        hoverTimeoutRef.current = null
                      }
                      setOpenDropdown('services')
                    }}
                    onMouseLeave={() => {
                      // Small delay to allow moving to footer links
                      hoverTimeoutRef.current = setTimeout(() => {
                        setOpenDropdown((prev) => prev === 'services' ? null : prev)
                      }, 200)
                    }}
                    onClick={(e) => {
                      // Prevent clicks inside from closing the dropdown
                      e.stopPropagation()
                    }}
                    className="fixed left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 top-20 sm:top-24 lg:top-24 mt-2 max-w-[1280px] mx-auto bg-white rounded-2xl shadow-deep border border-gray-100 overflow-hidden z-50"
                  >
                    {/* Services Grid - No Header */}
                    <div className="p-2 sm:p-2.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-stretch">
                        {services.map((service, index) => (
                          <motion.div
                            key={service.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="h-full"
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              className="p-2 sm:p-2.5 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-200 flex flex-col h-full cursor-pointer"
                              onClick={(e) => {
                                if (!(e.target as HTMLElement).closest('a')) {
                                  router.push(service.href)
                                  setOpenDropdown(null)
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  if (!(e.target as HTMLElement).closest('a')) {
                                    router.push(service.href)
                                    setOpenDropdown(null)
                                  }
                                }
                              }}
                            >
                              <Link
                                href={service.href}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setOpenDropdown(null)
                                }}
                                onMouseDown={(e) => {
                                  e.stopPropagation()
                                }}
                                className="group block flex-shrink-0 mb-1.5"
                              >
                                <div className="flex items-start gap-2">
                                  {/* Icon */}
                                  <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm relative overflow-hidden">
                                    {/* Icon glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white relative z-10" />
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-0.5">
                                      {service.name}
                                    </h4>
                                    <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>

                              {/* Sub Items - Enhanced with Scale Effect */}
                              {service.subItems && service.subItems.length > 0 && (
                                <div className="mt-1.5 pt-1.5 border-t border-gray-100 space-y-0.5 flex-1">
                                  {service.subItems.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setOpenDropdown(null)
                                      }}
                                      onMouseDown={(e) => {
                                        e.stopPropagation()
                                      }}
                                      className="group/sub flex items-center gap-1.5 px-1 py-0.5 sm:px-1.5 sm:py-1 rounded text-xs sm:text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                    >
                                      {/* Enhanced Dot Indicator */}
                                      <div className="relative flex-shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover/sub:bg-primary transition-all duration-200 group-hover/sub:scale-125"></div>
                                        <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-primary/20 opacity-0 group-hover/sub:opacity-100 group-hover/sub:scale-150 transition-all duration-200"></div>
                                      </div>
                                      <span className="flex-1 line-clamp-1 group-hover/sub:font-semibold transition-all duration-200">{subItem.name}</span>
                                      {/* Arrow indicator on hover */}
                                      <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 group-hover/sub:scale-110 transition-all duration-200 flex-shrink-0" />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <Link
                      href="/services"
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(null)
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                      }}
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current)
                          hoverTimeoutRef.current = null
                        }
                      }}
                      className="block px-3 py-1.5 bg-gray-50 border-t border-gray-100 flex-shrink-0 group hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Explore All Services
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Support Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown(openDropdown === 'support' ? null : 'support')
                }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown('support')
                }}
                onMouseLeave={() => {
                  // Small delay to allow moving to dropdown
                  hoverTimeoutRef.current = setTimeout(() => {
                    setOpenDropdown((prev) => prev === 'support' ? null : prev)
                  }, 200)
                }}
                className={cn(
                  "px-2 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap",
                  isActive('/support')
                    ? "text-primary bg-primary/5"
                    : isScrolled 
                      ? "text-gray-900 hover:text-primary hover:bg-gray-50"
                      : "text-white hover:text-primary hover:bg-white/10"
                )}
              >
                Support
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === 'support' && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {openDropdown === 'support' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                        hoverTimeoutRef.current = null
                      }
                      setOpenDropdown('support')
                    }}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="fixed left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 top-20 sm:top-24 lg:top-24 mt-2 max-w-[1280px] mx-auto bg-white rounded-2xl shadow-deep border border-gray-100 overflow-hidden z-50"
                    style={{ maxHeight: 'calc(100vh - 100px)' }}
                  >
                    {/* Header */}
                    <div className="bg-gradient-soft px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
                      <h3 className="text-base font-bold text-gray-900">Support & Assistance</h3>
                    </div>

                    {/* Content - Two Column Layout */}
                    <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        {/* Column 1: Support Items with Icons - 3 rows filling full height */}
                        <div className="flex flex-col gap-2 h-full">
                          {support.map((item) => {
                            const IconComponent = item.icon
                            if (!IconComponent) return null
                            const isExternal = item.href.startsWith('http')
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                className="group flex-1 flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-200 min-h-0"
                              >
                                {/* Icon */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                                      {item.name}
                                    </h4>
                                    <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                  </div>
                                  <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>

                        {/* Column 2: Support Widget/Poster */}
                        <div className="h-full">
                          <div className="w-full h-full p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-cyan/5 to-primary/10 border-2 border-primary/20 relative overflow-hidden flex flex-col justify-center">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                              <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                                backgroundSize: '20px 20px'
                              }}></div>
                            </div>
                            
                            <div className="relative z-10">
                              {/* Icon */}
                              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto shadow-lg">
                                <Phone className="w-8 h-8 text-white" />
                              </div>
                              
                              {/* Content */}
                              <h4 className="text-xl font-bold text-gray-900 text-center mb-2">
                                24/7 Technical Support
                              </h4>
                              <p className="text-sm text-gray-600 text-center mb-4">
                                Get immediate assistance from our expert team
                              </p>
                              
                              {/* Contact Info */}
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                  <Phone className="w-4 h-4 text-primary" />
                                  <span className="font-semibold">Tollfree: +1-888-823-3172</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                                  <MessageCircle className="w-4 h-4 text-primary" />
                                  <span>support@palcnetworks.com</span>
                                </div>
                              </div>
                              
                              {/* CTA Button */}
                              <Link
                                href="/support/tac"
                                className="block w-full text-center px-4 py-2.5 rounded-lg bg-gradient-primary text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
                              >
                                Contact Support
                                <ArrowRight className="w-4 h-4 inline-block ml-2" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown(openDropdown === 'company' ? null : 'company')
                }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown('company')
                }}
                onMouseLeave={() => {
                  // Small delay to allow moving to dropdown
                  hoverTimeoutRef.current = setTimeout(() => {
                    setOpenDropdown((prev) => prev === 'company' ? null : prev)
                  }, 200)
                }}
                className={cn(
                  "px-2 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap",
                  isCompanyActive()
                    ? "text-primary bg-primary/5"
                    : isScrolled 
                      ? "text-gray-900 hover:text-primary hover:bg-gray-50"
                      : "text-white hover:text-primary hover:bg-white/10"
                )}
              >
                Company
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === 'company' && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {openDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                        hoverTimeoutRef.current = null
                      }
                      setOpenDropdown('company')
                    }}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="fixed left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 top-20 sm:top-24 lg:top-24 mt-2 max-w-[1280px] mx-auto bg-white rounded-2xl shadow-deep border border-gray-100 overflow-hidden z-50"
                    style={{ maxHeight: 'calc(100vh - 100px)' }}
                  >
                    {/* Header */}
                    <div className="bg-gradient-soft px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
                      <h3 className="text-base font-bold text-gray-900">Company</h3>
                    </div>

                    {/* Content - Two Column Layout */}
                    <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Column 1: About, Careers, Contact, Executive Team */}
                        <div className="space-y-2">
                          {company
                            .filter(item => item.name !== 'Platforms' && item.name !== 'Industry Associations')
                            .map((item) => {
                              const IconComponent = item.icon
                              if (!IconComponent) return null
                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className="group block p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-200"
                                >
                                  <div className="flex items-center gap-3">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                      <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-2 mb-1">
                                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                                          {item.name}
                                        </h4>
                                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                      </div>
                                      <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              )
                            })}
                          {/* Add Contact */}
                          <Link
                            href="/contact"
                            className="group block p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              {/* Icon */}
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                <MessageCircle className="w-5 h-5 text-white" />
                              </div>
                              
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                                    Contact
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                                  Get in touch with our team
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>

                        {/* Column 2: Platforms with Sub-items */}
                        <div>
                          {company
                            .filter(item => item.name === 'Platforms')
                            .map((item) => {
                              const IconComponent = item.icon
                              if (!IconComponent) return null
                              return (
                                <div key={item.href} className="p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-200 h-full flex flex-col">
                                  <Link
                                    href={item.href}
                                    className="group block flex-1"
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      {/* Icon */}
                                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                        <IconComponent className="w-5 h-5 text-white" />
                                      </div>
                                      
                                      {/* Content */}
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-1">
                                          {item.name}
                                        </h4>
                                        <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>

                                  {/* Sub Items - List all */}
                                  {item.subItems && item.subItems.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-gray-100 space-y-1.5">
                                      {item.subItems.map((subItem) => (
                                        <Link
                                          key={subItem.href}
                                          href={subItem.href}
                                          className="flex items-center gap-2 px-1.5 py-1.5 rounded text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-all group/sub"
                                        >
                                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover/sub:bg-primary transition-colors flex-shrink-0" />
                                          <span className="flex-1 line-clamp-1">{subItem.name}</span>
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown(openDropdown === 'resources' ? null : 'resources')
                }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setOpenDropdown('resources')
                }}
                onMouseLeave={() => {
                  // Small delay to allow moving to dropdown
                  hoverTimeoutRef.current = setTimeout(() => {
                    setOpenDropdown((prev) => prev === 'resources' ? null : prev)
                  }, 200)
                }}
                className={cn(
                  "px-2 xl:px-4 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all duration-200 flex items-center gap-1 whitespace-nowrap",
                  isActive('/resources')
                    ? "text-primary bg-primary/5"
                    : isScrolled 
                      ? "text-gray-900 hover:text-primary hover:bg-gray-50"
                      : "text-white hover:text-primary hover:bg-white/10"
                )}
              >
                Resources
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === 'resources' && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {openDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                        hoverTimeoutRef.current = null
                      }
                      setOpenDropdown('resources')
                    }}
                    onMouseLeave={() => {
                      // Small delay to allow moving to footer links
                      hoverTimeoutRef.current = setTimeout(() => {
                        setOpenDropdown((prev) => prev === 'resources' ? null : prev)
                      }, 200)
                    }}
                    onClick={(e) => {
                      // Prevent clicks inside from closing the dropdown
                      e.stopPropagation()
                    }}
                    className="fixed left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8 top-20 sm:top-24 lg:top-24 mt-2 max-w-[1280px] mx-auto bg-white rounded-2xl shadow-deep border border-gray-100 overflow-hidden z-50"
                    style={{ maxHeight: 'calc(100vh - 100px)' }}
                  >
                    {/* Header */}
                    <div className="bg-gradient-soft px-4 py-2.5 border-b border-gray-100 flex-shrink-0">
                      <h3 className="text-base font-bold text-gray-900">Resources</h3>
                    </div>

                    {/* Content - Three Column Layout */}
                    <div className="p-3 sm:p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 160px)' }}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Column 1: Resource Items with Icons */}
                        <div className="space-y-2">
                          {resources.map((resource) => {
                            const IconComponent = resource.icon
                            if (!IconComponent) return null
                            return (
                              <Link
                                key={resource.href}
                                href={resource.href}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setOpenDropdown(null)
                                }}
                                onMouseDown={(e) => {
                                  e.stopPropagation()
                                }}
                                className="group block p-3 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  {/* Icon */}
                                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                                    <IconComponent className="w-5 h-5 text-white" />
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                      <h4 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight">
                                        {resource.name}
                                      </h4>
                                      <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
                                      {resource.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>

                        {/* Column 2-3: Featured Resource Cards (2x2 Grid) */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                          {/* Card 1: Recent Event */}
                          {featuredEvent && (
                            <Link
                              href={`/resources/events/${featuredEvent.slug}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpenDropdown(null)
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation()
                              }}
                              className="group relative p-5 rounded-xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-white h-full flex flex-col"
                            >
                              <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity shadow-sm z-10">
                                {featuredEvent.featuredImage ? (
                                  <img 
                                    src={getImageSrc(featuredEvent.featuredImage, true)} 
                                    alt={featuredEvent.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                      const parent = target.parentElement
                                      if (parent) {
                                        const fallback = document.createElement('div')
                                        fallback.className = 'w-full h-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center'
                                        fallback.innerHTML = '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
                                        parent.appendChild(fallback)
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                                    <Calendar className="w-8 h-8 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="pr-24 flex-1 flex flex-col">
                                <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                  {featuredEvent.title}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {featuredEvent.summary}
                                </p>
                              </div>
                            </Link>
                          )}

                          {/* Card 2: Featured Case Study */}
                          {featuredCaseStudy && (
                            <Link
                              href={`/resources/case-studies/${featuredCaseStudy.slug}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpenDropdown(null)
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation()
                              }}
                              className="group relative p-5 rounded-xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-white h-full flex flex-col"
                            >
                              <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity shadow-sm z-10">
                                {featuredCaseStudy.featuredImage ? (
                                  <img 
                                    src={getImageSrc(featuredCaseStudy.featuredImage, true)} 
                                    alt={featuredCaseStudy.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                      const parent = target.parentElement
                                      if (parent) {
                                        const fallback = document.createElement('div')
                                        fallback.className = 'w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center'
                                        fallback.innerHTML = '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'
                                        parent.appendChild(fallback)
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                                    <FileText className="w-8 h-8 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="pr-24 flex-1 flex flex-col">
                                <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                  {featuredCaseStudy.title}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {featuredCaseStudy.summary}
                                </p>
                              </div>
                            </Link>
                          )}

                          {/* Card 3: Latest Blog */}
                          {featuredBlog && (
                            <Link
                              href={`/resources/blog/${featuredBlog.slug}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpenDropdown(null)
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation()
                              }}
                              className="group relative p-5 rounded-xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-white h-full flex flex-col"
                            >
                              <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity shadow-sm z-10">
                                {featuredBlog.featuredImage ? (
                                  <img 
                                    src={getImageSrc(featuredBlog.featuredImage, true)} 
                                    alt={featuredBlog.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                      const parent = target.parentElement
                                      if (parent) {
                                        const fallback = document.createElement('div')
                                        fallback.className = 'w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center'
                                        fallback.innerHTML = '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>'
                                        parent.appendChild(fallback)
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="pr-24 flex-1 flex flex-col">
                                <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                  {featuredBlog.title}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {featuredBlog.summary}
                                </p>
                              </div>
                            </Link>
                          )}

                          {/* Card 4: Featured Whitepaper */}
                          {featuredWhitepaper && (
                            <Link
                              href={`/resources/whitepapers/${featuredWhitepaper.slug}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpenDropdown(null)
                              }}
                              onMouseDown={(e) => {
                                e.stopPropagation()
                              }}
                              className="group relative p-5 rounded-xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 bg-white h-full flex flex-col"
                            >
                              <div className="absolute top-4 right-4 w-16 h-16 rounded-lg overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity shadow-sm z-10">
                                {featuredWhitepaper.cover ? (
                                  <img 
                                    src={getImageSrc(featuredWhitepaper.cover, true)} 
                                    alt={featuredWhitepaper.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = 'none'
                                      const parent = target.parentElement
                                      if (parent) {
                                        const fallback = document.createElement('div')
                                        fallback.className = 'w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'
                                        fallback.innerHTML = '<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>'
                                        parent.appendChild(fallback)
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <BookMarked className="w-8 h-8 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="pr-24 flex-1 flex flex-col">
                                <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                  {featuredWhitepaper.title}
                                </h4>
                                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                                  {featuredWhitepaper.summary}
                                </p>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <Link
                      href="/resources"
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(null)
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                      }}
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current) {
                          clearTimeout(hoverTimeoutRef.current)
                          hoverTimeoutRef.current = null
                        }
                      }}
                      className="block px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex-shrink-0 group hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Explore All Resources
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* New Feature Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 ml-2 xl:ml-4 pl-2 xl:pl-4 border-l border-gray-200 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenDropdown('search')}
                className={cn(
                  "hover:text-primary",
                  isScrolled ? "text-gray-700" : "text-white"
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link
                href="/portal"
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  isActive('/portal')
                    ? "text-primary bg-primary/5"
                    : isScrolled 
                      ? "text-gray-700 hover:text-primary hover:bg-gray-50"
                      : "text-white hover:text-primary hover:bg-white/10"
                )}
                title="Portal"
              >
                <Users className="w-5 h-5" />
              </Link>
              <Link
                href="/products?configurator=true"
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  isScrolled 
                    ? "text-gray-700 hover:text-primary hover:bg-gray-50"
                    : "text-white hover:text-primary hover:bg-white/10"
                )}
                title="Configurator"
              >
                <Wrench className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            <Button variant="outline" className={cn(
              "transition-transform duration-200 hover:scale-[1.03]",
              isScrolled 
                ? "border-gray-300 text-gray-800 hover:bg-gray-50 hover:text-gray-900" 
                : "border-white/50 text-white hover:bg-white hover:text-gray-900"
            )} asChild>
              <Link href="https://palcnetworks.ai" target="_blank" rel="noopener noreferrer">
                PalC AI
              </Link>
            </Button>
            <Button variant="gradient" onClick={() => setIsLeadModalOpen(true)}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </nav>
    </header>

    {/* Mobile Navigation - Outside header to escape stacking context */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop - starts below header to keep logo clear */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed left-0 right-0 top-[73px] bottom-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            style={{ width: '100%', maxWidth: '100vw', touchAction: 'none' }}
          />
          
          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 right-0 top-[64px] bottom-0 lg:hidden z-[70] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden flex flex-col"
            style={{ touchAction: 'pan-y', width: '100%', maxWidth: '100vw' }}
          >
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
              {/* Search Bar Section */}
              <div className="px-6 py-6 border-b border-white/10">
                {/* Premium Search Bar */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-primary/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Search className="w-5 h-5 text-primary-light group-hover:text-primary transition-colors" />
                  </div>
                  <span className="flex-1 text-left text-sm text-gray-300 group-hover:text-white transition-colors">Search solutions, services, platforms...</span>
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-xs text-gray-300">
                    <span className="text-[10px]">⌘</span>K
                  </kbd>
                </button>
              </div>
              
              {/* Navigation Items */}
              <div className="px-4 py-4 space-y-2 pb-4">
            
                {/* Mobile Solutions */}
                <MobileDropdown
                  title="Solutions"
                  items={solutions}
                  isActive={isActive('/solutions')}
                  variant="premium"
                />
                
                {/* Mobile Services */}
                <MobileDropdown
                  title="Services"
                  items={services}
                  isActive={isActive('/services')}
                  variant="premium"
                />
                
                {/* Mobile Support */}
                <MobileDropdown
                  title="Support"
                  items={support as NavItem[]}
                  isActive={isActive('/support')}
                  variant="premium"
                />

                {/* Mobile Company */}
                <MobileDropdown
                  title="Company"
                  items={company as NavItem[]}
                  isActive={isCompanyActive()}
                  variant="premium"
                />

                {/* Mobile Resources */}
                <MobileDropdown
                  title="Resources"
                  items={resources as NavItem[]}
                  isActive={isActive('/resources')}
                  variant="premium"
                />

                {/* PalC AI Link */}
                <Link
                  href="https://palcnetworks.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3.5 rounded-xl text-base font-semibold transition-all text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <span>PalC AI</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Fixed CTA Section - Always visible at bottom */}
            <div className="px-4 py-6 border-t border-white/10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button 
                  variant="gradient" 
                  className="w-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all" 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsLeadModalOpen(true)
                  }}
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    
    {/* Lead Capture Modal */}
    <LeadCaptureModal
      open={isLeadModalOpen}
      onClose={() => setIsLeadModalOpen(false)}
      context="get-started"
      title="Get Started with PalC Networks"
      subtitle="Tell us about your project and we'll connect you with the right expert."
    />
    </>
  )
}

interface NavItem {
  name: string
  href: string
  icon?: LucideIcon
  description?: string
  tag?: string
  subItems?: Array<{ name: string; href: string }>
}

// Mobile Dropdown Component
function MobileDropdown({ 
  title, 
  items, 
  isActive,
  variant = 'default'
}: { 
  title: string
  items: NavItem[]
  isActive: boolean
  variant?: 'default' | 'premium'
}) {
  const [isOpen, setIsOpen] = useState(false)

  if (variant === 'premium') {
    return (
      <div className="mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all",
            isActive
              ? "text-white bg-primary/20 border border-primary/30"
              : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
          )}
        >
          <span>{title}</span>
          <ChevronDown className={cn(
            "w-5 h-5 transition-transform duration-300",
            isOpen && "rotate-180"
          )} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden mt-2"
            >
              <div className="pl-2 space-y-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {(title === 'Solutions' || title === 'Company' || title === 'Support' || title === 'Resources') && item.icon ? (
                      // Premium Solutions/Company/Support/Resources mobile view
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group backdrop-blur-sm"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-primary/50">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                              {item.name}
                            </h4>
                            <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary-light transition-all flex-shrink-0 mt-0.5" />
                          </div>
                          {item.description && (
                            <p className="text-xs text-gray-400 mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors">
                              {item.description}
                            </p>
                          )}
                          {item.tag && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/20 text-primary-light border border-primary/30">
                              {item.tag}
                            </span>
                          )}
                          {item.subItems && item.subItems.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-white/10 space-y-1.5">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-gray-400 hover:bg-white/10 hover:text-primary-light transition-all group/sub"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover/sub:bg-primary-light transition-colors flex-shrink-0" />
                                  <span className="flex-1">{subItem.name}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </Link>
                    ) : title === 'Services' && item.icon ? (
                      // Premium Services mobile view
                      <div className="mb-2">
                        <Link
                          href={item.href}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all group backdrop-blur-sm"
                        >
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-primary/50">
                            <item.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h4 className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                                {item.name}
                              </h4>
                              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-primary-light transition-all flex-shrink-0 mt-0.5" />
                            </div>
                            <p className="text-xs text-gray-400 mb-2 line-clamp-2 group-hover:text-gray-300 transition-colors">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                        {item.subItems && item.subItems.length > 0 && (
                          <div className="ml-[60px] space-y-1.5 mt-2 max-h-48 overflow-y-auto pr-2">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-gray-400 hover:bg-white/10 hover:text-primary-light transition-all group/sub"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover/sub:bg-primary-light transition-colors flex-shrink-0" />
                                <span>{subItem.name}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      // Premium standard mobile view
                      <>
                        <Link
                          href={item.href}
                          className="block px-4 py-3 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all font-medium"
                        >
                          {item.name}
                        </Link>
                        {item.subItems && (
                          <div className="pl-4 space-y-1 mt-1">
                            {item.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="block px-4 py-2 rounded-lg text-xs text-gray-400 hover:text-primary-light hover:bg-white/5 transition-all"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Default variant (fallback)
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all",
          isActive
            ? "text-primary bg-primary/5"
            : "text-gray-600 hover:text-primary hover:bg-gray-50"
        )}
      >
        {title}
        <ChevronDown className={cn(
          "w-5 h-5 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pl-4 space-y-2 mt-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
