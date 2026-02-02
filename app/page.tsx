"use client"

import React, { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap, Settings, Network, Server, Cpu, Cable, Sparkles, TrendingUp, Clock, Building2, Cloud, Landmark, Lightbulb, Rocket, Globe2, BarChart3, Code2, Wrench, Shield, Layers, Users, Target, BookOpen, FileText, Eye, CheckSquare, GitBranch, ArrowDown, ArrowLeft, Radio } from 'lucide-react'
import { SectionHeading } from './components/SectionHeading'
import { SolutionCard } from './components/SolutionCard'
import { ServiceCard } from './components/ServiceCard'
import { CTASection } from './components/CTASection'
import { Button } from './components/ui/button'
import { solutions } from './data/solutions'
import { services } from './data/services'
import { RAGWidget } from './components/RAGWidget'
import dynamic from 'next/dynamic'

// Lazy load HomeSlider to improve initial page load
const HomeSlider = dynamic(() => import('./components/home/HomeSlider').then(mod => ({ default: mod.HomeSlider })), {
  ssr: true,
  loading: () => <div className="h-[600px] bg-gradient-soft animate-pulse" />,
})
import { caseStudies } from './data/case-studies'
import { blogPosts } from './data/blog'
import { whitepapers } from './data/whitepapers'
import { getImageSrc } from '@/app/utils/image-path'
import { PartnersSection } from './components/PartnersSection'

// Use Cases Tabbed Section Component
function UseCasesTabbedSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  const useCases = [
    {
      id: 'ai-data-center',
      title: 'AI Data Center Platforms',
      tabLabel: 'AI Data Centers',
      icon: Cpu,
      image: '/images/AI-Data-Centers.png',
      heading: 'AI DATA CENTER PLATFORMS DELIVER OPTIMIZED NETWORK PERFORMANCE AND SCALABILITY FOR LARGE-SCALE AI WORKLOADS.',
      description: 'Whether running high-performance training clusters or powering inference infrastructure for the latest AI applications, let PalC design and deploy your network so that your engineers can focus on developing your core AI value.',
      highlightWords: ['PalC', 'engineers'],
    },
    {
      id: 'bfsi',
      title: 'BFSI Infrastructure',
      tabLabel: 'BFSI & Fintech',
      icon: Landmark,
      image: '/images/BFSI-Fintech.png',
      heading: 'BFSI INFRASTRUCTURE PROVIDES SECURE, HIGHLY AVAILABLE, AND OBSERVABLE NETWORKS FOR CRITICAL TRANSACTION SYSTEMS.',
      description: 'Whether operating secure transaction platforms or powering compliance-driven financial services, let PalC build your network infrastructure so that your teams can focus on delivering reliable financial services.',
      highlightWords: ['PalC', 'teams'],
    },
    {
      id: 'enterprise-cloud',
      title: 'Enterprise & Cloud Platforms',
      tabLabel: 'Enterprise & Cloud',
      icon: Cloud,
      image: '/images/Enterprise-Cloud-Platforms.png',
      heading: 'ENTERPRISE & CLOUD PLATFORMS ENABLE AUTOMATION-DRIVEN SYSTEMS WITH OPEN NETWORKING ARCHITECTURES.',
      description: 'Whether building hybrid cloud infrastructure or powering enterprise automation platforms, let PalC design your network so that your teams can focus on delivering business-critical applications.',
      highlightWords: ['PalC', 'teams'],
    },
    {
      id: 'distributed-edge',
      title: 'Distributed & Edge Platforms',
      tabLabel: 'Distributed & Edge',
      icon: Radio,
      image: '/images/Distributed-Edge-Platforms.png',
      heading: 'DISTRIBUTED & EDGE PLATFORMS ENABLE LOW-LATENCY, RESILIENT, AND DISTRIBUTED INFRASTRUCTURE FOR MODERN SERVICES.',
      description: 'Whether deploying edge computing nodes or powering distributed infrastructure, let PalC architect your network so that your engineers can focus on delivering next-generation connectivity services.',
      highlightWords: ['PalC', 'engineers'],
    },
  ]

  const activeCase = useCases[activeTab]

  // Update indicator position
  const updateIndicatorPosition = useCallback(() => {
    const activeButton = tabRefs.current[activeTab]
    const container = containerRef.current
    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      const left = buttonRect.left - containerRect.left
      const width = buttonRect.width
      setIndicatorStyle({ left, width })
    }
  }, [activeTab])

  // Initialize and update on mount/resize
  useEffect(() => {
    setIsMounted(true)
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      updateIndicatorPosition()
    }, 100)

    const handleResize = () => {
      updateIndicatorPosition()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [updateIndicatorPosition])

  // Update indicator when active tab changes
  useEffect(() => {
    if (isMounted) {
      updateIndicatorPosition()
    }
  }, [activeTab, isMounted, updateIndicatorPosition])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeTab > 0) {
        e.preventDefault()
        setActiveTab(activeTab - 1)
        tabRefs.current[activeTab - 1]?.focus()
      } else if (e.key === 'ArrowRight' && activeTab < useCases.length - 1) {
        e.preventDefault()
        setActiveTab(activeTab + 1)
        tabRefs.current[activeTab + 1]?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab, useCases.length])

  return (
    <section className="section-padding bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-cyan/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border-2 border-primary/20 mb-6 shadow-lg backdrop-blur-sm"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-primary tracking-wide">Use Cases</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Where Our Work{' '}
            <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
              Is Applied
            </span>
          </h2>
        </motion.div>

        {/* Advanced Tabs Navigation - Premium Dark Theme Strip */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="relative">
            {/* Tab Container with Carousel Scroll */}
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              {/* Scroll Container */}
              <div className="overflow-x-auto custom-tabs-scrollbar snap-x snap-mandatory">
                {/* Tab Strip - Mobile: Carousel, Desktop: Full Width */}
                <div 
                  ref={containerRef}
                  className="relative inline-flex sm:flex items-center gap-0 w-max sm:w-full bg-gray-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 md:p-2.5 lg:p-3 border border-gray-700/60 shadow-2xl shadow-black/30"
                >
                  {/* Active Tab Indicator - Premium Gradient */}
                  {isMounted && indicatorStyle.width > 0 && (
                    <motion.div
                      className="absolute top-1.5 sm:top-2 md:top-2.5 bottom-1.5 sm:bottom-2 md:bottom-2.5 rounded-xl bg-gradient-to-r from-primary via-primary/95 to-cyan shadow-lg shadow-primary/50 z-0"
                      initial={false}
                      animate={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Tabs - Professional Spacing */}
                  {useCases.map((useCase, index) => {
                    const IconComponent = useCase.icon
                    const isActive = activeTab === index
                    return (
                      <button
                        key={useCase.id}
                        ref={(el) => {
                          tabRefs.current[index] = el
                        }}
                        onClick={() => setActiveTab(index)}
                        onFocus={() => setActiveTab(index)}
                        className={`
                          relative z-10 flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5
                          px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10
                          py-3 sm:py-3.5 md:py-4 lg:py-4.5
                          rounded-xl sm:rounded-xl md:rounded-2xl
                          transition-all duration-300 ease-out
                          font-semibold 
                          text-sm sm:text-sm md:text-base lg:text-lg
                          whitespace-nowrap snap-start touch-manipulation
                          flex-shrink-0 sm:flex-1 sm:basis-0
                          min-w-fit sm:min-w-0
                          ${
                            isActive
                              ? 'text-white'
                              : 'text-gray-400 hover:text-gray-200 active:bg-gray-800/20'
                          }
                          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900
                        `}
                        aria-selected={isActive}
                        role="tab"
                        tabIndex={isActive ? 0 : -1}
                      >
                        <IconComponent 
                          className={`flex-shrink-0 transition-all duration-300 ${
                            isActive 
                              ? 'text-white w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6' 
                              : 'text-gray-400 w-5 h-5 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:text-gray-200'
                          }`} 
                        />
                        <span className={`font-semibold ${isActive ? 'drop-shadow-sm' : ''} ml-1 sm:ml-0`}>
                          {useCase.tabLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area - Advanced Layout */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          {/* Left Column - Image (5 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 order-2 lg:order-1 relative"
          >
            <div className="relative group">
              {/* Image Container with Advanced Styling */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-cyan/10 to-primary/10 aspect-square sm:aspect-[4/3] lg:aspect-square">
                <Image
                  src={getImageSrc(activeCase.image, true)}
                  alt={activeCase.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority={activeTab === 0}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Right Column - Content (7 columns on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              {/* Icon Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-lg">
                  {React.createElement(activeCase.icon, { className: 'w-5 h-5 text-white' })}
                </div>
                <span className="text-sm font-semibold text-primary">{activeCase.title}</span>
              </motion.div>

              {/* Heading */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {activeCase.heading.split(' ').map((word, idx, arr) => {
                  const titleCaseWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  return (
                    <span key={idx}>
                      {titleCaseWord}
                      {idx < arr.length - 1 && ' '}
                    </span>
                  )
                })}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl"
              >
                {activeCase.description.split(/(\s+)/).map((segment, idx) => {
                  if (!segment.trim()) return segment
                  const words = segment.split(/(\W+)/)
                  return words.map((word, wordIdx) => {
                    const cleanWord = word.replace(/\W/g, '').toLowerCase()
                    const shouldHighlight = activeCase.highlightWords.some(hw => 
                      cleanWord === hw.toLowerCase()
                    )
                    return (
                      <span
                        key={`${idx}-${wordIdx}`}
                        className={shouldHighlight ? 'font-semibold text-primary' : 'text-gray-700'}
                      >
                        {word}
                      </span>
                    )
                  })
                })}
              </motion.p>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-primary via-cyan to-primary rounded-full max-w-24"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const industriesAndOutcomes = [
  {
    title: 'AI Data Centers',
    description: 'RoCEv2/ECN tuned fabrics, lossless transport, and GPU/accelerator optimization for high-performance ML workloads.',
    icon: Cpu,
    metric: 'Sub-μs Latency',
    type: 'industry',
  },
  {
    title: 'Cloud & Multi-Cloud',
    description: 'Hub/spoke and mesh interconnects with zero-trust security, transit integration, and GitOps automation.',
    icon: Cloud,
    metric: '70% Faster Deployment',
    type: 'industry',
  },
  {
    title: 'Enterprise Networks',
    description: 'Campus modernization, identity-driven segmentation, and unified observability across distributed sites.',
    icon: Building2,
    metric: '40% Cost Reduction',
    type: 'industry',
  },
  {
    title: 'Cloud-Scale Performance',
    description: 'Low-latency EVPN/VXLAN + SRv6 fabrics tuned for AI/ML and high east-west traffic patterns.',
    icon: Zap,
    metric: '99.99% Uptime',
    type: 'outcome',
  },
  {
    title: 'Automation-First Operations',
    description: 'Pipelines, policy-as-code, and GitOps guardrails for consistent, repeatable infrastructure operations.',
    icon: Code2,
    metric: '70% Faster',
    type: 'outcome',
  },
  {
    title: 'Open & Multi-Vendor',
    description: 'SONiC-first architecture with validated multi-vendor optics, hardware, and controller integrations.',
    icon: Network,
    metric: '60% Lower TCO',
    type: 'outcome',
  },
]

const benefitsGrid = [
  { title: 'Cloud-Scale Performance', detail: 'Low-latency EVPN/VXLAN + SRv6 fabrics tuned for AI/ML and high east-west traffic.' },
  { title: 'Automation-First', detail: 'Pipelines, policy-as-code, and GitOps guardrails for consistent operations.' },
  { title: 'Open & Multi-Vendor', detail: 'SONiC-first with validated multi-vendor optics, hardware, and controller integrations.' },
  { title: 'Security by Design', detail: 'Zero-trust overlays, microsegmentation, and identity-driven policy enforcement.' },
]

// Partner companies with logo paths
// Logo images should be placed in public/images/partners/ directory
// Note: Partners data is now managed in app/components/PartnersSection.tsx

// Infinite scrolling testimonials carousel component
function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const autoScrollRef = useRef<number | null>(null)
  const scrollAmountRef = useRef(0)

  // Ensure component is mounted on client before running effects
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'TechCorp Global',
      companyIcon: Building2,
      quote: 'PalC Networks transformed our data center infrastructure with their AI-ready solutions. The automation-first approach reduced our operational overhead by 40%.',
      rating: 5,
      highlight: '40% Reduction',
      metric: 'Cost Savings',
      gradient: 'from-blue-500/10 via-cyan-500/10 to-blue-600/10',
      accentColor: 'blue',
    },
    {
      name: 'Michael Rodriguez',
      role: 'VP of Infrastructure',
      company: 'CloudScale Inc.',
      companyIcon: Cloud,
      quote: 'The SONiC-based switching platform and expert services exceeded our expectations. Their team\'s deep technical expertise is unmatched in the industry.',
      rating: 5,
      highlight: 'Industry Leading',
      metric: 'Performance',
      gradient: 'from-primary/10 via-blue-500/10 to-cyan-500/10',
      accentColor: 'primary',
    },
    {
      name: 'Emily Watson',
      role: 'Network Architect',
      company: 'Enterprise Solutions Ltd.',
      companyIcon: Landmark,
      quote: 'Working with PalC Networks has been a game-changer. Their open networking approach and 24/7 support ensure our infrastructure is always optimized.',
      rating: 5,
      highlight: '24/7 Support',
      metric: 'Reliability',
      gradient: 'from-cyan-500/10 via-blue-500/10 to-primary/10',
      accentColor: 'cyan',
    },
    {
      name: 'David Kim',
      role: 'Director of IT',
      company: 'InnovateTech Systems',
      companyIcon: Lightbulb,
      quote: 'The network observability solutions provided by PalC gave us complete visibility into our infrastructure. We can now proactively address issues before they impact operations.',
      rating: 5,
      highlight: 'Proactive Operations',
      metric: 'Visibility',
      gradient: 'from-blue-600/10 via-cyan-500/10 to-blue-500/10',
      accentColor: 'blue',
    },
    {
      name: 'Lisa Anderson',
      role: 'Cloud Architect',
      company: 'Digital Dynamics',
      companyIcon: Rocket,
      quote: 'PalC\'s cloud transformation services helped us migrate seamlessly to a multi-cloud environment. Their expertise in automation and GitOps workflows is exceptional.',
      rating: 5,
      highlight: 'Seamless Migration',
      metric: 'Efficiency',
      gradient: 'from-primary/10 via-cyan-500/10 to-blue-500/10',
      accentColor: 'primary',
    },
    {
      name: 'James Wilson',
      role: 'Network Operations Manager',
      company: 'Global Enterprises',
      companyIcon: Globe2,
      quote: 'The zero-trust security implementation by PalC Networks has significantly improved our security posture. Their IAM solutions are enterprise-grade and highly effective.',
      rating: 5,
      highlight: 'Enterprise Security',
      metric: 'Security',
      gradient: 'from-blue-500/10 via-primary/10 to-cyan-500/10',
      accentColor: 'blue',
    },
  ]

  const scrollTestimonials = (direction: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    
    // Pause auto-scroll when manually controlling
    setIsAutoScrolling(false)
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current)
      autoScrollRef.current = null
    }
    
    const cardWidth = 416 // Card width (400px) + gap (16px)
    const delta = direction === 'next' ? cardWidth : -cardWidth
    el.scrollBy({ left: delta, behavior: 'smooth' })
    
    // Resume auto-scroll after 5 seconds
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 5000)
  }

  useEffect(() => {
    // Only run on client side to prevent hydration errors
    if (typeof window === 'undefined' || !isMounted) return

    if (!isAutoScrolling) {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
        autoScrollRef.current = null
      }
      return
    }
    
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const scrollSpeed = 0.8 // Normal scroll speed

    const scroll = () => {
      if (!scrollContainer || !isAutoScrolling) {
        if (autoScrollRef.current) {
          cancelAnimationFrame(autoScrollRef.current)
          autoScrollRef.current = null
        }
        return
      }

      scrollAmountRef.current += scrollSpeed
      scrollContainer.scrollLeft = scrollAmountRef.current

      // Reset scroll position when we've scrolled past the duplicated content
      if (scrollAmountRef.current >= scrollContainer.scrollWidth / 2) {
        scrollAmountRef.current = 0
        scrollContainer.scrollLeft = 0
      }

      autoScrollRef.current = requestAnimationFrame(scroll)
    }

    // Delay start to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      autoScrollRef.current = requestAnimationFrame(scroll)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
        autoScrollRef.current = null
      }
    }
  }, [isAutoScrolling, isMounted])

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  return (
    <div className="relative w-full">
      {/* Navigation Buttons - Above Carousel */}
      <div className="flex items-center justify-end gap-3 mb-6 pr-4 sm:pr-6 lg:pr-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollTestimonials('prev')}
          className="w-12 h-12 rounded-full border-2 border-primary/30 bg-white/90 backdrop-blur-md hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group/btn"
          aria-label="Previous testimonials"
        >
          <ArrowRight className="w-5 h-5 rotate-180 group-hover/btn:translate-x-[-2px] transition-transform" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollTestimonials('next')}
          className="w-12 h-12 rounded-full border-2 border-primary/30 bg-white/90 backdrop-blur-md hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 group/btn"
          aria-label="Next testimonials"
        >
          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-[2px] transition-transform" />
        </Button>
      </div>
      
      <div
        ref={scrollRef}
        className="flex gap-4 items-stretch overflow-x-auto overflow-y-visible no-scrollbar pt-4 pb-6 px-4 sm:px-6 lg:px-8"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => {
          setIsAutoScrolling(true)
          setHoveredIndex(null)
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => {
          const CompanyIcon = testimonial.companyIcon || Building2
          const isHovered = hoveredIndex === index
          const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
          
          return (
            <div
              key={`${testimonial.name}-${index}`}
              className="flex-shrink-0 w-[90vw] sm:w-[420px] group transition-all duration-500"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transform: isHovered ? 'scale(1.05)' : isOtherHovered ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.5s ease-out',
              }}
            >
                        {/* Premium Professional Testimonial Card */}
                        <div className="relative h-full p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/50 hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl">
              {/* Decorative Accent Bar - Inside Card */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${testimonial.accentColor === 'primary' ? 'from-primary via-cyan to-blue-500' : testimonial.accentColor === 'cyan' ? 'from-cyan via-primary to-blue-500' : 'from-blue-500 via-primary to-cyan'} opacity-60 group-hover:opacity-0 transition-opacity duration-300`}></div>
              
              {/* Subtle Background Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-cyan/10 to-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Header Section with Company Logo and Quote Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* Company Logo/Icon - Modern Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center border border-gray-200/50 group-hover:border-primary/30 group-hover:from-primary/20 group-hover:to-cyan/20 transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <CompanyIcon className="w-6 h-6 text-primary/80 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg mb-0.5 group-hover:text-primary transition-colors">
                        {testimonial.company}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">
                        {testimonial.metric || 'Enterprise'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Logo Icons - Left and Right */}
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Left Logo Icon */}
                    <div className="absolute left-0 w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src={getImageSrc('/images/logo/Logo_Icon_Left.png', true)}
                        alt="PalC Logo Icon"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                    {/* Right Logo Icon */}
                    <div className="absolute right-0 w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src={getImageSrc('/images/logo/Logo_Icon_Right.png', true)}
                        alt="PalC Logo Icon"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-xl text-yellow-400">★</span>
                  ))}
                </div>

                {/* Highlight Metric Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20 mb-6 w-fit group-hover:from-primary/20 group-hover:to-cyan/20 transition-all">
                  <BarChart3 className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-bold text-primary">{testimonial.highlight}</span>
                </div>

                {/* Quote Text - Enhanced Typography */}
                <p className="text-lg text-gray-700 mb-8 leading-relaxed font-normal flex-1 group-hover:text-gray-900 transition-colors">
                  "{testimonial.quote}"
                </p>

                {/* Author Section - Premium Layout */}
                <div className="flex items-center gap-5 pt-6 border-t-2 border-gray-100 group-hover:border-primary/20 transition-colors">
                  {/* Enhanced Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                      <span className="relative z-10">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-[3px] border-white flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Author Info - Better Typography */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-lg mb-1 group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 mb-0.5">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Shine Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

// Note: Partners carousels are now managed in app/components/PartnersSection.tsx

export default function HomePage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const caseStudiesPreview = caseStudies.slice(0, 8)

  const scrollCaseStudies = (direction: 'next' | 'prev') => {
    const el = caseStudiesRef.current
    if (!el) return
    // Card width (320px) + gap (24px) = 344px per card
    const cardWidth = 344
    const delta = direction === 'next' ? cardWidth : -cardWidth
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Slider */}
      <HomeSlider />

      {/* Core Expertise Section - Consolidated Premium Design */}
      <section className="section-padding bg-gradient-to-b from-white via-primary/5 to-cyan/5 relative overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-cyan/20 border-2 border-primary/30 mb-6 shadow-lg backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
              Where We{' '}
              <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                Specialize
              </span>
            </h2>
          </motion.div>
          
          {/* Core Expertise Grid - 6 Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'SONiC & Open Networking',
                description: 'Deep, hands-on experience with SONiC across design, customization, integration, automation, and production operations.',
                whereWeExcel: 'Operating SONiC as a living platform within real, multi-vendor environments.',
                icon: Network,
                href: '/solutions/sonic-open-networking',
              },
              {
                title: 'Data Center & Network Infrastructure',
                description: 'Open, scalable network architectures for modern data centers, designed with long-term stability and operational clarity in mind.',
                whereWeExcel: 'Creating data center networks that remain transparent, diagnosable, and adaptable as demands evolve.',
                icon: Server,
                href: '/solutions/data-center-modernization-ai-fabrics',
              },
              {
                title: 'AI Infrastructure Networking',
                description: 'Network design and integration aligned with AI workloads, high data movement, and performance-sensitive platforms.',
                whereWeExcel: 'Building network architectures that allow AI platforms to scale without introducing hidden performance or operational constraints.',
                icon: Cpu,
                href: '/solutions/data-center-modernization-ai-fabrics',
              },
              {
                title: 'Networking Engineering',
                description: 'Strong engineering capabilities across routing, transport, control-plane systems, and distributed network architectures.',
                whereWeExcel: 'Solving complex networking challenges that require system-level thinking rather than isolated fixes.',
                icon: Code2,
                href: '/services/networking-engineering',
              },
              {
                title: 'Cloud & Hybrid Networking',
                description: 'Consistent networking models across on-premises, cloud, and hybrid environments, reducing fragmentation and operational drift.',
                whereWeExcel: 'Reducing fragmentation and operational drift across hybrid infrastructure landscapes.',
                icon: Cloud,
                href: '/solutions/cloud-hybrid-cloud',
              },
              {
                title: 'Visibility & Operations',
                description: 'Telemetry, monitoring, and diagnostics embedded into network designs to improve observability and day-to-day operations.',
                whereWeExcel: 'Making open and disaggregated networks observable, explainable, and easier to operate at scale.',
                icon: BarChart3,
                href: '/solutions/network-observability-visibility',
              },
            ].map((expertise, index) => {
              const IconComponent = expertise.icon
              return (
                <motion.div
                  key={expertise.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  <Link href={expertise.href} className="block h-full">
                    <div className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-600/60 transition-all duration-300 overflow-hidden shadow-2xl hover:scale-105">
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div className="relative mb-4 sm:mb-6">
                          <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
                            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                          {expertise.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed flex-1">
                          {expertise.description}
                        </p>
                        
                        {/* Where We Excel - Highlighted */}
                        <div className="mt-auto pt-4 border-t-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-4 -mx-2 mb-2">
                          <div className="flex items-start gap-2 mb-2">
                            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                            <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wide">Where we excel:</p>
                          </div>
                          <p className="text-sm sm:text-base text-white font-semibold leading-relaxed pl-7">
                            {expertise.whereWeExcel}
                          </p>
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center text-primary text-sm sm:text-base font-semibold mt-4">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Professional Services - Outcome-Focused Section */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl opacity-40"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan/20 border-2 border-primary/30 mb-6 shadow-lg backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-primary tracking-wide">Professional Services</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Engineering-Led Services for{' '}
              <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                Production Infrastructure
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              PalC delivers end-to-end services that ensure your infrastructure is designed correctly, deployed reliably, and operated with confidence. We support organizations across the full lifecycle—from initial planning through long-term operations.
            </p>
          </motion.div>

          {/* Outcome-Focused Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {[
                {
                  icon: Zap,
                  title: 'Faster Time-to-Market',
                  description: 'Accelerate deployment with proven methodologies and expert engineering that reduce implementation cycles.',
                  metric: '40% Faster',
                },
                {
                  icon: Shield,
                  title: 'Reduced Risk',
                  description: 'Minimize operational risk through thorough validation, testing, and production-ready architectures.',
                  metric: '99.9% Uptime',
                },
                {
                  icon: TrendingUp,
                  title: 'Lower Total Cost',
                  description: 'Optimize infrastructure costs through efficient design, automation, and long-term operational excellence.',
                  metric: '30% Savings',
                },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative h-full p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-2xl">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Metric Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border border-primary/20 mb-4">
                        <span className="text-sm font-bold text-primary">{item.metric}</span>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <Link href="/services">
                <Button size="lg" variant="gradient" className="group">
                  Explore Our Services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Where PalC Fits Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-cyan/20 border-2 border-primary/30 mb-6 shadow-lg backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Where{' '}
              <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                PalC Fits
              </span>
            </h2>
            <p className="text-base sm:text-lg font-semibold text-gray-900 max-w-3xl mx-auto leading-relaxed mt-4">
              Organizations typically engage PalC when they reach one of these points:
            </p>
          </motion.div>
          
          {/* Where PalC Fits Grid */}
          <div className="max-w-6xl mx-auto">
            {/* First Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {[
                {
                  title: 'Planning a Major Infrastructure Change',
                  description: 'When existing network or data center architectures no longer align with growth, workload changes, or platform strategy.',
                  icon: GitBranch,
                },
                {
                  title: 'Adopting Open or Disaggregated Infrastructure',
                  description: 'When teams want to move toward open networking or multi-vendor platforms but need help making them production-ready.',
                  icon: Network,
                },
                {
                  title: 'Building or Scaling AI Platforms',
                  description: 'When AI workloads introduce new performance, data movement, and reliability requirements across infrastructure.',
                  icon: Cpu,
                },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative h-full"
                  >
                    <div className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-gray-200/60 bg-white hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02]">
                      {/* Top Accent Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cyan to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                      
                      {/* Animated Background Glow */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-primary group-hover:to-cyan transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1 group-hover:text-gray-800 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Second Row - 2 Cards Centered */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8">
              {[
                {
                  title: 'Facing Operational Complexity at Scale',
                  description: 'When systems technically work, but are difficult to observe, troubleshoot, or evolve safely.',
                  icon: Eye,
                },
                {
                  title: 'Integrating Multiple Vendors and Technologies',
                  description: 'When infrastructure spans hardware, software, and tools from different ecosystems that must function as a single system.',
                  icon: Layers,
                },
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                    className="group relative h-full w-full md:w-auto md:max-w-md"
                  >
                    <div className="relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-gray-200/60 bg-white hover:border-primary/40 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl hover:scale-[1.02]">
                      {/* Top Accent Bar */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cyan to-blue-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
                      
                      {/* Animated Background Glow */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-cyan/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-primary group-hover:to-cyan transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" />
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1 group-hover:text-gray-800 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases - Tabbed Layout Section */}
      <UseCasesTabbedSection />

      {/* Product Configurator Section - Hidden */}
      {false && (
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] border-y border-white/5">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-[#00C2FF]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Configuration</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Build Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-[#00C2FF]">
                  Network Infrastructure
                </span>
              </h2>
              
              <p className="text-xl text-gray-200 leading-relaxed">
                Our advanced Product Configurator lets you design, customize, and generate complete BOMs for switches, servers, NICs, DPUs, transceivers, and cables—all in one place.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Settings, text: 'Multi-Product Configuration' },
                  { icon: TrendingUp, text: 'Real-Time Pricing' },
                  { icon: Clock, text: 'Instant BOM Generation' },
                  { icon: CheckCircle2, text: 'Export & Share' },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Technical Highlights */}
              <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Technical Capabilities</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-light flex-shrink-0" />
                    <span>SONiC Build Configuration</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-light flex-shrink-0" />
                    <span>AI Fabric Tuning</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-light flex-shrink-0" />
                    <span>Port Speed/Density</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-light flex-shrink-0" />
                    <span>Power & Airflow Options</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-light flex-shrink-0" />
                    <span>Optics & Breakouts</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-primary-light flex-shrink-0" />
                    <span>Compatibility Checking</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/products/configurator">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold group">
                    Start Configuring
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products/configurator">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                    View Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Side - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Product Type Icons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-8">
                {[
                  { icon: Network, label: 'Switches', color: 'from-blue-500 to-cyan-500' },
                  { icon: Server, label: 'Servers', color: 'from-purple-500 to-pink-500' },
                  { icon: Cpu, label: 'NICs/DPUs', color: 'from-green-500 to-emerald-500' },
                  { icon: Cable, label: 'Cables', color: 'from-orange-500 to-red-500' },
                  { icon: Settings, label: 'Optics', color: 'from-indigo-500 to-blue-500' },
                  { icon: Zap, label: 'Power', color: 'from-yellow-500 to-orange-500' },
                ].map((product, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative group flex flex-col items-center justify-center"
                  >
                    <div className={`relative w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-br ${product.color} shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/20 rounded-2xl group-hover:bg-black/10 transition-colors" />
                      <product.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 mb-2 flex-shrink-0" />
                      <p className="text-xs font-semibold text-white text-center relative z-10 leading-tight">{product.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">6+</div>
                  <div className="text-sm text-gray-300">Product Categories</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">&lt;5min</div>
                  <div className="text-sm text-gray-300">BOM Generation</div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00C2FF]/20 rounded-full blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* Testimonials Section - Premium UI */}
      <section className="py-16 lg:py-20 w-full bg-gradient-to-br from-primary/10 via-blue-500/10 via-cyan-500/10 to-primary/10 relative overflow-visible pt-20">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-cyan/5 to-primary/5 rounded-full blur-3xl opacity-30"></div>
        
        <div className="w-full relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan/20 border-2 border-primary/30 mb-6 shadow-lg backdrop-blur-sm"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-primary tracking-wide">Client Testimonials</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                What Our Clients{' '}
                <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                  Say About Us
                </span>
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Trusted by leading enterprises worldwide. See how we've helped organizations transform their infrastructure.
              </p>
            </motion.div>
          </div>

          {/* Infinite Testimonials Carousel - Full Width */}
          <div className="w-full pt-4">
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Insights from Real Deployments Section */}
      <section className="section-padding bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-primary/20 to-cyan/20 border-2 border-primary/30 mb-6 shadow-lg backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Insights from{' '}
              <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                Real Deployments
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Our teams document practical learnings from real-world deployments, including what works, what breaks, and how open infrastructure behaves in production.
            </p>
          </motion.div>

          {/* Insights Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              'Operating SONiC in production environments',
              'Designing networks for AI platforms',
              'Managing multi-vendor open infrastructure',
              'Improving observability and troubleshooting',
            ].map((topic, index) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border-2 border-gray-200 hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-gray-900">{topic}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Link */}
          <div className="text-center px-4 sm:px-0">
            <Link href="/resources" className="inline-block w-full sm:w-auto max-w-full">
              <Button size="lg" variant="gradient" className="group w-full sm:w-auto whitespace-normal sm:whitespace-nowrap">
                <span className="text-sm sm:text-base">
                  <span className="hidden sm:inline">Explore Documents and Whitepapers</span>
                  <span className="sm:hidden">Explore Resources</span>
                </span>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Carousel */}
      <section className="py-16 bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] text-white border-y border-white/5 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-light mb-2">Case Studies</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Proven outcomes from the field</h3>
              <p className="text-sm text-gray-200/80">Deployments across AI fabrics, multi-cloud, automation, and security.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 bg-white/10 rounded-full shadow-md"
                onClick={() => scrollCaseStudies('prev')}
                aria-label="Previous case studies"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 bg-white/10 rounded-full shadow-md"
                onClick={() => scrollCaseStudies('next')}
                aria-label="Next case studies"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            ref={caseStudiesRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 pr-6 [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="region"
            aria-label="Case studies carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                scrollCaseStudies('prev')
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                scrollCaseStudies('next')
              }
            }}
          >
            {caseStudiesPreview.map((study) => (
              <div
                key={study.slug}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-start rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(0,255,200,0.12)] transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[16/9] bg-white/5">
                  <Image
                    src={getImageSrc(study.featuredImage || '/images/placeholder-hero.svg', true)}
                    alt={study.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 340px"
                    unoptimized={true}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      const placeholderSrc = getImageSrc('/images/placeholder-hero.svg', true)
                      if (!target.src.includes('placeholder-hero')) {
                        target.src = placeholderSrc
                      }
                    }}
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-primary-light">
                    {study.industry}
                  </div>
                  <p className="text-sm font-semibold text-white line-clamp-2">{study.title}</p>
                  <p className="text-xs text-gray-300 line-clamp-2">{study.summary}</p>
                  <Link
                    href={`/resources/case-studies/${study.slug}`}
                    className="inline-flex items-center text-primary-light text-sm font-semibold"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Assistant Section - Advanced Layout */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.08, 0.15, 0.08],
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/20 rounded-full blur-3xl"
          />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(0,255,200,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,255,200,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">AI-Powered Assistant</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Get Instant Answers About
              <span className="block bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                PalC's Solutions & Services
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ask questions about SONiC networking, AI fabrics, cloud infrastructure, technical specifications, and more. 
              Our AI assistant provides accurate, context-aware answers powered by PalC's expertise.
            </p>
          </motion.div>

          {/* RAG Widget Container with Premium Styling */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan to-primary rounded-3xl blur-xl opacity-20 animate-pulse" />
              
              {/* Main container */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-primary via-cyan to-primary" />
                
                {/* Widget content */}
                <div className="p-6 md:p-8">
                  <RAGWidget 
                    contextId="homepage" 
                    customPrompts={[
                      { text: 'How should data center architectures evolve to support AI workloads?', category: 'Architecture' },
                      { text: 'What are the benefits of SONiC-based open networking?', category: 'SONiC' },
                      { text: 'How can PalC help with cloud platform engineering?', category: 'Cloud' },
                      { text: 'What network observability solutions does PalC provide?', category: 'Observability' },
                      { text: 'How does PalC approach data center modernization?', category: 'Modernization' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Sparkles, text: 'AI-Powered Responses', color: 'from-primary to-cyan' },
              { icon: FileText, text: 'Context-Aware Answers', color: 'from-cyan to-blue-500' },
              { icon: Zap, text: 'Instant Technical Insights', color: 'from-blue-500 to-primary' },
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:border-primary/30 hover:bg-white/80 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{feature.text}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* CTA Section */}
      <CTASection />
    </>
  )
}


