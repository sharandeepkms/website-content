'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, Shield, Network, Eye, Cloud, Key, AlertCircle, Lock, Gauge, FileCheck, Settings } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { caseStudies } from '@/app/data/case-studies'
import { getImageSrc } from '@/app/utils/image-path'
import { RAGWidget } from '@/app/components/RAGWidget'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { PartnersSection } from '@/app/components/PartnersSection'
import { motion } from 'framer-motion'
import styles from './page.module.css'

const infrastructureConstraints = [
  {
    title: 'Zero tolerance for downtime or data loss',
    icon: AlertCircle,
    description: 'Infrastructure must maintain continuous availability with no acceptable service interruptions.',
  },
  {
    title: 'Predictable latency and throughput for transaction systems',
    icon: Gauge,
    description: 'Network performance must be consistent and measurable to support real-time financial operations.',
  },
  {
    title: 'Strong isolation and access control',
    icon: Lock,
    description: 'Multi-tenant environments require strict segmentation and granular access policies.',
  },
  {
    title: 'Deep visibility for audit, compliance, and incident response',
    icon: Eye,
    description: 'Comprehensive monitoring and logging are essential for regulatory compliance and security.',
  },
  {
    title: 'Controlled change and upgrade processes',
    icon: Settings,
    description: 'All infrastructure changes must follow rigorous change management and validation procedures.',
  },
]

const wherePalcFits = [
  {
    title: 'Modernizing Core Infrastructure',
    description:
      'Transitioning from rigid, legacy architectures to open, scalable platforms while maintaining operational stability.',
  },
  {
    title: 'Adopting Open or Disaggregated Networks',
    description:
      'Moving toward SONiC-based or multi-vendor networking environments that require careful integration and operational discipline.',
  },
  {
    title: 'Building Secure Digital Platforms',
    description:
      'Supporting digital banking, payment systems, and API-driven platforms with strong security and access control.',
  },
  {
    title: 'Improving Observability and Control',
    description:
      'Gaining deeper visibility into network behavior, traffic flows, and system performance for audit and compliance needs.',
  },
  {
    title: 'Operating at Scale Under Regulation',
    description:
      'Balancing scale, performance, and regulatory requirements without introducing operational risk.',
  },
]

const focusAreas = [
  {
    id: 'secure-network',
    title: 'Secure Network Architecture',
    tabLabel: 'Secure Networks',
    icon: Shield,
    image: '/images/services/industry-focused-engineering/secure-network-architecture.png',
    description:
      'Design of highly available, segmented network architectures supporting transaction processing and sensitive data flows.',
  },
  {
    id: 'open-networking',
    title: 'Open & Disaggregated Networking',
    tabLabel: 'Open Networking',
    icon: Network,
    image: '/images/services/industry-focused-engineering/open-disaggregated-networking.png',
    description:
      'Engineering and operation of SONiC-based and open networking platforms with multi-vendor hardware.',
  },
  {
    id: 'network-visibility',
    title: 'Network Visibility & Monitoring',
    tabLabel: 'Visibility',
    icon: Eye,
    image: '/images/services/industry-focused-engineering/network-visibility-monitoring.png',
    description:
      'Full-fidelity traffic visibility and telemetry to support compliance, fraud detection, and operational troubleshooting.',
  },
  {
    id: 'cloud-platforms',
    title: 'Cloud & Hybrid Platforms',
    tabLabel: 'Cloud Platforms',
    icon: Cloud,
    image: '/images/services/industry-focused-engineering/cloud-hybrid-platforms.png',
    description:
      'Private and hybrid cloud platforms supporting regulated workloads and controlled data residency.',
  },
  {
    id: 'iam-integration',
    title: 'Identity & Access Management Integration',
    tabLabel: 'IAM Integration',
    icon: Key,
    image: '/images/services/industry-focused-engineering/iam-integration.png',
    description:
      'Infrastructure-level IAM integration supporting strong authentication, authorization, and policy enforcement.',
  },
]

const useCases = [
  'Transaction processing and payment platforms',
  'Core banking and financial services infrastructure',
  'Risk, compliance, and analytics platforms',
  'Digital banking and API-driven financial services',
  'Secure inter-data-center connectivity for financial systems',
]

const businessOutcomes = [
  'Improved platform resilience and availability',
  'Stronger security and access control at the infrastructure layer',
  'Better visibility for audit, compliance, and incident response',
  'Reduced operational risk during modernization initiatives',
  'Infrastructure that scales predictably with business growth',
]

export default function BFSIPage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [activeFocusArea, setActiveFocusArea] = useState(0)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const focusAreaTabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const focusAreaContainerRef = useRef<HTMLDivElement | null>(null)
  
  // Filter case studies relevant to BFSI
  const bfsiTags = ['Banking', 'Financial', 'BFSI', 'Insurance', 'Transaction', 'Payment', 'Compliance', 'Regulatory', 'Security']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => bfsiTags.some(bfsiTag => tag.toLowerCase().includes(bfsiTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('banking') ||
    (study.title || '').toLowerCase().includes('financial') ||
    (study.summary || '').toLowerCase().includes('transaction') ||
    (study.summary || '').toLowerCase().includes('payment')
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
            <span>Banking, Financial Services & Insurance</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Engineering Secure, High-Performance Infrastructure for Regulated Environments
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC works with banking, financial services, and insurance organizations to design and operate networked platforms that meet strict requirements around security, availability, performance, and regulatory compliance. Our work supports transaction platforms, core banking systems, risk engines, and digital financial services operating at scale.
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
              <Shield className="w-5 h-5 text-white" />
              <span className="text-sm font-bold text-white tracking-wide">BFSI Infrastructure</span>
            </motion.div>
            <h2 className="heading-2">
              The Nature of{' '}
              <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
                BFSI Infrastructure
              </span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Infrastructure in BFSI environments operates under unique constraints that demand engineering precision and operational excellence.
            </p>
          </motion.div>

          {/* Premium Constraints Grid */}
          <div className={styles.constraintsGrid}>
            {infrastructureConstraints.map((constraint, index) => {
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
              PalC focuses on engineering infrastructure that meets these constraints without sacrificing scalability or modernization goals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Where PalC fits in BFSI environments</p>
            <h2 className="heading-2">Where PalC Fits</h2>
            <p className={styles.sectionSubtitle}>
              Organizations in the BFSI sector typically engage PalC when they are:
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
              Key areas where PalC delivers engineering expertise for BFSI organizations.
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
            <h2 className="heading-2">How We Work with BFSI Teams</h2>
            <p className={styles.sectionSubtitle}>
              PalC engagements in BFSI environments are engineering-led and tightly aligned with operational teams.
            </p>
          </header>
          <ul className={styles.minimalList}>
            <li>Architecture reviews aligned with regulatory and operational constraints</li>
            <li>Hands-on engineering during deployment and integration</li>
            <li>Validation against real traffic patterns and failure scenarios</li>
            <li>Support for controlled rollout, upgrades, and long-term operations</li>
          </ul>
          <p className={styles.sectionNote}>
            This approach ensures systems remain stable, observable, and compliant as they evolve.
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
                Secure infrastructure deployments, financial services platforms, and compliance-driven network solutions.
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
            <h2 className="heading-2">Business Outcomes for BFSI Organizations</h2>
            <p className={styles.sectionSubtitle}>BFSI organizations working with PalC typically achieve:</p>
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
            <p className={styles.sectionTag}>Use cases in BFSI context</p>
            <h2 className="heading-2">Representative Use Cases</h2>
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
              <h2 className="heading-2">Planning or modernizing infrastructure for financial systems?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your BFSI infrastructure requirements.
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
          <RAGWidget contextId="services:bfsi" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:bfsi"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your BFSI infrastructure requirements."
      />
    </main>
  )
}

