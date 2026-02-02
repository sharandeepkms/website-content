'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, Network, Radio, Globe, Eye, Settings, AlertCircle, Gauge, Zap, Layers, Wifi } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { caseStudies } from '@/app/data/case-studies'
import { getImageSrc } from '@/app/utils/image-path'
import { RAGWidget } from '@/app/components/RAGWidget'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { PartnersSection } from '@/app/components/PartnersSection'
import { motion } from 'framer-motion'
import styles from './page.module.css'

const networkConstraints = [
  {
    title: 'Large-scale, distributed topologies',
    icon: Globe,
    description: 'Networks span multiple geographic regions with complex interconnection requirements.',
  },
  {
    title: 'Strict latency and availability requirements',
    icon: Gauge,
    description: 'Real-time services demand predictable performance and near-zero downtime.',
  },
  {
    title: 'Continuous service delivery with minimal maintenance windows',
    icon: Zap,
    description: 'Services must remain operational during upgrades and maintenance activities.',
  },
  {
    title: 'Multi-vendor hardware and software ecosystems',
    icon: Layers,
    description: 'Integration of diverse vendor solutions into cohesive, interoperable systems.',
  },
  {
    title: 'High operational complexity across access, aggregation, and core layers',
    icon: Settings,
    description: 'Managing complexity across multiple network layers and service domains.',
  },
]

const wherePalcFits = [
  {
    title: 'Modernizing Legacy Telecom Networks',
    description:
      'Transitioning from proprietary systems to open, disaggregated architectures without disrupting live services.',
  },
  {
    title: 'Deploying Open and Disaggregated Platforms',
    description:
      'Adopting whitebox hardware, SONiC, and open control planes across access, aggregation, and core networks.',
  },
  {
    title: 'Building Edge Infrastructure',
    description:
      'Designing edge platforms that support low-latency workloads, localized processing, and distributed control.',
  },
  {
    title: 'Integrating Multi-Vendor Ecosystems',
    description:
      'Ensuring hardware, software, and tools from different vendors function as a cohesive system.',
  },
  {
    title: 'Improving Operational Visibility',
    description:
      'Gaining better insight into traffic behavior, performance, and failures across distributed environments.',
  },
]

const focusAreas = [
  {
    id: 'ip-packet-optical',
    title: 'IP, Packet Optical & Transport Networks',
    tabLabel: 'IP & Transport',
    icon: Network,
    image: '/images/services/industry-focused-engineering/ip-packet-optical-transport.png',
    description:
      'Engineering IP and packet optical networks supporting metro, long-haul, and access aggregation environments.',
  },
  {
    id: 'sdn-nfv-open',
    title: 'SDN, NFV & Open Networking',
    tabLabel: 'SDN & NFV',
    icon: Radio,
    image: '/images/services/industry-focused-engineering/sdn-nfv-open-networking.png',
    description:
      'Design and integration of SDN/NFV platforms, SONiC-based networking, and disaggregated network architectures.',
  },
  {
    id: 'edge-architecture',
    title: 'Edge Network Architecture',
    tabLabel: 'Edge Networks',
    icon: Wifi,
    image: '/images/services/industry-focused-engineering/edge-network-architecture.png',
    description:
      'Design of distributed edge networks optimized for latency-sensitive and location-aware workloads.',
  },
  {
    id: 'network-visibility',
    title: 'Network Visibility & Telemetry',
    tabLabel: 'Visibility',
    icon: Eye,
    image: '/images/services/industry-focused-engineering/network-visibility-telemetry.png',
    description:
      'Implementation of traffic visibility, telemetry, and monitoring solutions across telecom and edge environments.',
  },
  {
    id: 'automation-lifecycle',
    title: 'Automation & Lifecycle Operations',
    tabLabel: 'Automation',
    icon: Settings,
    image: '/images/services/industry-focused-engineering/automation-lifecycle.png',
    description:
      'Automation of provisioning, configuration, validation, and upgrades across large-scale networks.',
  },
]

const useCases = [
  'Metro and core network modernization',
  'Open access and aggregation networks',
  'Edge platforms supporting low-latency services',
  'Packet optical transport and DCI',
  'Multi-vendor SONiC-based deployments',
]

const businessOutcomes = [
  'Improved network resilience and service continuity',
  'Greater flexibility through open and disaggregated platforms',
  'Reduced dependency on proprietary vendor stacks',
  'Better visibility and faster fault isolation',
  'Scalable architectures that support future services',
]

export default function TelecomEdgePage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [activeFocusArea, setActiveFocusArea] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const focusAreaTabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const focusAreaContainerRef = useRef<HTMLDivElement | null>(null)
  
  // Filter case studies relevant to Telecom & Edge
  const telecomTags = ['Telecom', 'Telecommunications', 'Edge', '5G', 'OpenRAN', 'SONiC', 'Network', 'Transport', 'Metro']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => telecomTags.some(telTag => tag.toLowerCase().includes(telTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('telecom') ||
    (study.title || '').toLowerCase().includes('edge') ||
    (study.summary || '').toLowerCase().includes('telecom') ||
    (study.summary || '').toLowerCase().includes('5g')
  ).slice(0, 8)

  const scrollCaseStudies = (direction: 'prev' | 'next') => {
    const el = caseStudiesRef.current
    if (!el) return
    const scrollAmount = 340 + 24
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  // Update indicator position for focus areas tabs
  const updateFocusAreaIndicator = useCallback(() => {
    const activeButton = focusAreaTabRefs.current[activeFocusArea]
    const container = focusAreaContainerRef.current
    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()
      const left = buttonRect.left - containerRect.left
      const width = buttonRect.width
      setIndicatorStyle({ left, width })
    }
  }, [activeFocusArea])

  // Initialize and update focus area indicator
  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      updateFocusAreaIndicator()
    }, 100)

    const handleResize = () => {
      updateFocusAreaIndicator()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [updateFocusAreaIndicator])

  useEffect(() => {
    if (isMounted) {
      updateFocusAreaIndicator()
    }
  }, [activeFocusArea, isMounted, updateFocusAreaIndicator])

  // Keyboard navigation for focus areas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && activeFocusArea > 0) {
        e.preventDefault()
        setActiveFocusArea(activeFocusArea - 1)
        focusAreaTabRefs.current[activeFocusArea - 1]?.focus()
      } else if (e.key === 'ArrowRight' && activeFocusArea < focusAreas.length - 1) {
        e.preventDefault()
        setActiveFocusArea(activeFocusArea + 1)
        focusAreaTabRefs.current[activeFocusArea + 1]?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeFocusArea, focusAreas.length])

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}></div>
        <div className="container-custom">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>Telecom & Edge Networks</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Scalable, Open, and Resilient Networks for Telecom and Edge Environments
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC works with telecom operators and edge infrastructure providers to design and operate networks that support scale, low latency, service continuity, and multi-vendor interoperability. Our work spans core, metro, access, and edge environments where reliability and performance are critical.
            </p>
            <div className={`${styles.heroActions} ${styles.fadeInUp} ${styles.delay3}`}>
              <button 
                className={styles.primaryCta} 
                onClick={() => setIsLeadModalOpen(true)}
                type="button"
              >
                Talk to an Infrastructure Expert
                <span className={styles.ctaArrow}>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.infrastructureSection}`}>
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.infrastructureHeader}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={styles.sectionBadge}
            >
              <Network className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">Telecom & Edge Networks</span>
            </motion.div>
            <h2 className="heading-2">
              The Nature of{' '}
              <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                Telecom and Edge Networks
              </span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Telecom and edge environments operate under constraints that differ significantly from enterprise IT and demand engineering precision.
            </p>
          </motion.div>

          {/* Premium Constraints Grid */}
          <div className={styles.constraintsGrid}>
            {networkConstraints.map((constraint, index) => {
              const IconComponent = constraint.icon
              return (
                <motion.div
                  key={constraint.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={styles.constraintCard}
                >
                  <div className={styles.constraintCardInner}>
                    {/* Icon Badge */}
                    <div className={styles.constraintIconWrapper}>
                      <div className={styles.constraintIconBackground}>
                        <IconComponent className={styles.constraintIcon} />
                      </div>
                      <div className={styles.constraintNumber}>{String(index + 1).padStart(2, '0')}</div>
                    </div>

                    {/* Content */}
                    <div className={styles.constraintContent}>
                      <h3 className={styles.constraintTitle}>{constraint.title}</h3>
                      <p className={styles.constraintDescription}>{constraint.description}</p>
                    </div>

                    {/* Decorative Elements */}
                    <div className={styles.constraintAccent}></div>
                    <div className={styles.constraintGradient}></div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={styles.infrastructureClosing}
          >
            <p className={styles.closingText}>
              PalC focuses on engineering systems that can operate reliably across these constraints, rather than treating networks as static infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Where PalC fits in telecom & edge environments</p>
            <h2 className="heading-2">Where PalC Fits</h2>
            <p className={styles.sectionSubtitle}>
              Organizations in telecom and edge domains typically engage PalC when they are:
            </p>
          </header>
          <ul className={styles.listRail}>
            {wherePalcFits.map((item, index) => (
              <li key={item.title} className={styles.listRailItem} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.listRailDot}></div>
                <div>
                  <h3 className="heading-4">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.section} ${styles.focusAreasSection}`}>
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.focusAreasHeader}
          >
            <p className={styles.sectionTag}>Core engineering focus areas</p>
            <h2 className="heading-2">Focus Areas</h2>
            <p className={styles.sectionSubtitle}>
              Key areas where PalC delivers engineering expertise for telecom and edge organizations.
            </p>
          </motion.div>

          {/* Advanced Tabs Navigation - Premium Dark Theme Strip */}
          <div className={styles.focusAreasTabsContainer}>
            <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="overflow-x-auto custom-tabs-scrollbar snap-x snap-mandatory">
                <div 
                  ref={focusAreaContainerRef}
                  className={`${styles.focusAreasTabStrip} relative inline-flex sm:flex items-center gap-0 w-max sm:w-full bg-gray-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 md:p-2.5 lg:p-3 border border-gray-700/60 shadow-2xl shadow-black/30`}
                >
                  {/* Active Tab Indicator */}
                  {isMounted && indicatorStyle.width > 0 && (
                    <motion.div
                      className={`${styles.focusAreaIndicator} absolute top-1.5 sm:top-2 md:top-2.5 bottom-1.5 sm:bottom-2 md:bottom-2.5 rounded-xl bg-gradient-to-r from-primary via-primary/95 to-cyan shadow-lg shadow-primary/50 z-0`}
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

                  {/* Tabs */}
                  {focusAreas.map((area, index) => {
                    const IconComponent = area.icon
                    const isActive = activeFocusArea === index
                    return (
                      <button
                        key={area.id}
                        ref={(el) => {
                          focusAreaTabRefs.current[index] = el
                        }}
                        onClick={() => setActiveFocusArea(index)}
                        onFocus={() => setActiveFocusArea(index)}
                        className={`${styles.focusAreaTab} relative z-10 flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 lg:gap-3.5 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-4.5 rounded-xl sm:rounded-xl md:rounded-2xl transition-all duration-300 ease-out font-semibold text-sm sm:text-sm md:text-base lg:text-lg whitespace-nowrap snap-start touch-manipulation flex-shrink-0 sm:flex-1 sm:basis-0 min-w-fit sm:min-w-0 ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-400 hover:text-gray-200 active:bg-gray-800/20'
                        } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-gray-900`}
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
                          {area.tabLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Content Area - Image and Description */}
          <motion.div
            key={activeFocusArea}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={styles.focusAreasContent}
          >
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={styles.focusAreaImageColumn}
            >
              <div className="relative group">
                <div className={`${styles.focusAreaImageContainer} relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-cyan/10 to-primary/10 aspect-square sm:aspect-[4/3] lg:aspect-square`}>
                  <Image
                    src={getImageSrc(focusAreas[activeFocusArea].image || '/images/placeholder-hero.svg', true)}
                    alt={focusAreas[activeFocusArea].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    priority={activeFocusArea === 0}
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const placeholderSrc = getImageSrc('/images/placeholder-hero.svg', true)
                      if (!target.src.includes('placeholder-hero')) {
                        target.src = placeholderSrc
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={styles.focusAreaContentColumn}
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
                    {React.createElement(focusAreas[activeFocusArea].icon, { className: 'w-5 h-5 text-white' })}
                  </div>
                  <span className="text-sm font-semibold text-primary">{focusAreas[activeFocusArea].title}</span>
                </motion.div>

                {/* Heading */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                >
                  {focusAreas[activeFocusArea].title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl"
                >
                  {focusAreas[activeFocusArea].description}
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

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">How We Work with Telecom & Edge Teams</h2>
            <p className={styles.sectionSubtitle}>
              PalC engagements in telecom and edge environments are engineering-led and operationally grounded.
            </p>
          </header>
          <ul className={styles.minimalList}>
            <li>Architecture reviews aligned with scale and service requirements</li>
            <li>Hands-on engineering during deployment and integration</li>
            <li>Validation against real traffic, scale, and failure scenarios</li>
            <li>Support for rollout, upgrades, and long-term operations</li>
          </ul>
          <p className={styles.sectionNote}>
            This approach ensures networks remain stable while evolving to meet new demands.
          </p>
        </div>
      </section>

      <section className={styles.caseStudiesSection}>
        <div className="container-custom">
          <div className={styles.caseStudiesHeader}>
            <div className={styles.caseStudiesTitleWrapper}>
              <p className={styles.sectionTag}>Case Studies</p>
              <h2 className="heading-2">Proven outcomes from the field</h2>
              <p className={styles.sectionSubtitle}>
                Telecom network deployments, edge infrastructure, and open networking solutions.
              </p>
            </div>
            <div className={styles.caseStudiesControls}>
              <Button
                variant="outline"
                size="icon"
                className={styles.caseStudyButton}
                onClick={() => scrollCaseStudies('prev')}
                aria-label="Previous case studies"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={styles.caseStudyButton}
                onClick={() => scrollCaseStudies('next')}
                aria-label="Next case studies"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            ref={caseStudiesRef}
            className={styles.caseStudiesCarousel}
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
              <div key={study.slug} className={styles.caseStudyCard}>
                <div className={styles.caseStudyImageWrapper}>
                  <Image
                    src={getImageSrc(study.featuredImage || '/images/placeholder-hero.svg', true)}
                    alt={study.title}
                    fill
                    className={styles.caseStudyImage}
                    sizes="(max-width: 768px) 100vw, 340px"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const placeholderSrc = getImageSrc('/images/placeholder-hero.svg', true)
                      if (!target.src.includes('placeholder-hero')) {
                        target.src = placeholderSrc
                      }
                    }}
                  />
                </div>
                <div className={styles.caseStudyContent}>
                  <div className={styles.caseStudyIndustry}>{study.industry}</div>
                  <h3 className={styles.caseStudyTitle}>{study.title}</h3>
                  <p className={styles.caseStudySummary}>{study.summary}</p>
                  <Link href={`/resources/case-studies/${study.slug}`} className={styles.caseStudyLink}>
                    View Case Study
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Business Outcomes for Telecom & Edge Operators</h2>
            <p className={styles.sectionSubtitle}>Telecom and edge organizations working with PalC typically achieve:</p>
          </header>
          <div className={styles.outcomesGrid}>
            {businessOutcomes.map((item, index) => (
              <div key={item} className={styles.outcomeCard} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={styles.outcomeCardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className={styles.outcomeCardText}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Representative use cases</p>
            <h2 className="heading-2">Use Cases</h2>
          </header>
          <ul className={styles.minimalList}>
            {useCases.map((item, index) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container-custom">
          <div className={styles.ctaContent}>
            <div>
              <h2 className="heading-2">Planning or modernizing telecom and edge network infrastructure?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your telecom and edge network requirements.
              </p>
            </div>
            <button 
              className={styles.primaryCta} 
              onClick={() => setIsLeadModalOpen(true)}
              type="button"
            >
              Talk to an Infrastructure Expert
            </button>
          </div>
        </div>
      </section>

      <section className={styles.technicalAssistant}>
        <div className="container-custom">
          <RAGWidget contextId="services:telecom-edge" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:telecom-edge"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your telecom and edge network requirements."
      />
    </main>
  )
}

