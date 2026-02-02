'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { caseStudies } from '@/app/data/case-studies'
import { getImageSrc } from '@/app/utils/image-path'
import { RAGWidget } from '@/app/components/RAGWidget'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { PartnersSection } from '@/app/components/PartnersSection'
import styles from './page.module.css'

const focusAreas = [
  'Software-defined networking (SDN) and network functions virtualization (NFV) transform networks from static systems into programmable platforms.',
  'PalC focuses on engineering SDN and NFV systems as complete platforms, where controllers, virtualized functions, orchestration layers, and infrastructure operate together reliably in production environments.',
  'Our work spans early SDN concepts through modern cloud-native and container-based network architectures.',
]

const capabilities = [
  {
    title: 'SDN Architecture & Controller Engineering',
    description:
      'Design and development of SDN architectures that separate control and data planes, using centralized controllers and programmable forwarding.',
    image: '/images/services/sdn-nfv/sdn-architecture-controller.png',
  },
  {
    title: 'Controller Application Development',
    description:
      'Engineering SDN controller applications for traffic steering, policy enforcement, service chaining, and network automation.',
    image: '/images/services/sdn-nfv/controller-applications.png',
  },
  {
    title: 'NFV Platform Engineering',
    description:
      'Design and integration of NFV platforms where network functions are virtualized and chained to deliver communication services.',
    image: '/images/services/sdn-nfv/nfv-platform-engineering.png',
  },
  {
    title: 'Orchestration & Automation',
    description:
      'Integration of orchestration layers to manage SDN and NFV components across infrastructure, services, and lifecycle operations.',
    image: '/images/services/sdn-nfv/orchestration-automation.png',
  },
  {
    title: 'Training & Enablement',
    description:
      'Hands-on training programs for operators and engineers covering SDN and NFV concepts, platforms, and real-world deployments.',
    image: '/images/services/sdn-nfv/training-enablement.png',
  },
]

const useCases = [
  {
    title: 'SD-WAN & SD-VPN Platforms',
    description:
      'Software-defined WAN and VPN solutions enabling centralized policy control and flexible service delivery.',
  },
  {
    title: 'Service Provider NFV Platforms',
    description: 'Virtualized network functions and service chaining for carrier and metro networks.',
  },
  {
    title: 'Cloud-Native Network Platforms',
    description: 'SDN and NFV architectures deployed on cloud and container platforms.',
  },
  {
    title: 'CORD-Based Deployments',
    description:
      'SDN and NFV solutions for access and aggregation environments using disaggregated infrastructure.',
  },
]

const approachSteps = [
  {
    title: 'Architecture & Platform Design',
    description:
      'Defining SDN and NFV architectures aligned with scale, performance, and operational requirements.',
  },
  {
    title: 'Platform Engineering & Integration',
    description:
      'Integrating controllers, virtualized network functions, orchestration layers, and infrastructure platforms.',
  },
  {
    title: 'Validation & Interoperability Testing',
    description:
      'Testing control-plane behavior, service chains, and infrastructure integration under real-world conditions.',
  },
  {
    title: 'Deployment, Training & Lifecycle Support',
    description:
      'Supporting rollout, training, troubleshooting, and ongoing evolution of SDN and NFV platforms.',
  },
]

const techStack = [
  {
    title: 'SDN & NFV Platforms',
    items: ['SD-WAN, SD-VPN', 'ONAP, OPNFV', 'R-CORD'],
  },
  {
    title: 'Control Plane & Controllers',
    items: [
      'IP Infusion (ZebOS / ZebXP / OcNOS)',
      'Aricent ISS',
      'Metaswitch DCL',
      'Quagga / FRR',
      'GoBGP, ExaBGP',
      'SONiC, ONL',
      'OpenNSL, OVS, OFDPA',
    ],
  },
  {
    title: 'Orchestration & Management',
    items: [
      'NETCONF, RESTCONF, SNMP',
      'ONIE',
      'YANG models',
      'Sysrepo, ConfD',
      'Netopeer, OpenYuma, Pyang',
    ],
  },
  {
    title: 'NFV Infrastructure & Virtualization',
    items: ['OpenStack', 'Kubernetes', 'Docker', 'KVM', 'OVS', 'DPDK', 'Ceph'],
  },
]

const projects = [
  'SD-WAN and SD-VPN platform development',
  'NFV orchestration and service chaining solutions',
  'CORD-based access and aggregation deployments',
  'Large-scale SDN controller and application development',
  'Training and enablement of over 350 engineers and operators worldwide',
]

const businessOutcomes = [
  'Greater network programmability and automation',
  'Faster service deployment and change management',
  'Reduced dependency on proprietary networking platforms',
  'Improved scalability and operational efficiency',
  'Stronger alignment between networking and cloud platforms',
]

export default function SDNNFVPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Filter case studies relevant to SDN & NFV
  const sdnNfvTags = ['SDN', 'NFV', 'SD-WAN', 'Virtualization', 'Orchestration', 'Controller', 'VNF', 'CNF']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => sdnNfvTags.some(sdnTag => tag.toLowerCase().includes(sdnTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('sdn') ||
    (study.title || '').toLowerCase().includes('nfv') ||
    (study.title || '').toLowerCase().includes('virtual') ||
    (study.summary || '').toLowerCase().includes('sdn') ||
    (study.summary || '').toLowerCase().includes('nfv') ||
    (study.summary || '').toLowerCase().includes('virtualization')
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

  // Sync image column height with tabs column (desktop only)
  useEffect(() => {
    const syncHeights = () => {
      // Only sync on desktop (width > 1024px)
      if (window.innerWidth <= 1024) return
      
      const tabsColumn = document.getElementById('tabs-column')
      const imageColumn = document.getElementById('image-column')
      if (tabsColumn && imageColumn) {
        imageColumn.style.height = `${tabsColumn.offsetHeight}px`
      }
    }
    
    syncHeights()
    window.addEventListener('resize', syncHeights)
    
    // Re-sync when active tab changes (content expands/collapses)
    const timeoutId = setTimeout(syncHeights, 700) // Wait for animation
    
    return () => {
      window.removeEventListener('resize', syncHeights)
      clearTimeout(timeoutId)
    }
  }, [activeCapability])

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
            <span>SDN & NFV</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Engineering Software-Defined and Virtualized Network Platforms
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC Networks designs and builds SDN and NFV platforms that decouple control, forwarding, and services for programmable, scalable, and open network architectures across service provider, enterprise, and data center environments.
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

      <section className={`${styles.section} ${styles.scrollReveal}`}>
        <div className="container-custom">
          <div className={styles.split}>
            <div className={styles.splitHeader}>
              <h2 className="heading-2">What We Focus On</h2>
              <p className={styles.sectionSubtitle}>
                Software-defined networking (SDN) and network functions virtualization (NFV) transform networks from static systems into programmable platforms.
              </p>
            </div>
            <div className={styles.splitBody}>
              {focusAreas.map((item, index) => (
                <div key={item} className={styles.focusItem} style={{ animationDelay: `${index * 0.1}s` }}>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionAlt} ${styles.capabilitiesSection}`}>
        <div className="container-custom">
          <div className={styles.capabilitiesHeader}>
            <h2 className="heading-2">Core Capabilities</h2>
            <p className={styles.sectionSubtitle}>
              Complete SDN and NFV platform engineering.
            </p>
          </div>
          <div className={styles.capabilitiesTabsLayout}>
            <div className={styles.capabilitiesTabs} id="tabs-column">
              {capabilities.map((item, index) => (
                <div
                  key={item.title}
                  className={`${styles.capabilityCard} ${activeCapability === index ? styles.capabilityCardActive : ''}`}
                >
                  <button
                    className={styles.capabilityCardButton}
                    onClick={() => setActiveCapability(index)}
                    aria-selected={activeCapability === index}
                    aria-expanded={activeCapability === index}
                  >
                    <div className={styles.capabilityCardHeader}>
                      <span className={styles.capabilityCardNumber}>{String(index + 1).padStart(2, '0')}</span>
                      <div className={styles.capabilityCardTitleWrapper}>
                        <h3 className="heading-4">{item.title}</h3>
                        <div className={styles.capabilityCardIndicator}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                  <div className={`${styles.capabilityCardContent} ${activeCapability === index ? styles.capabilityCardContentExpanded : ''}`}>
                    <p className={styles.capabilityCardDescription}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`${styles.capabilityImageColumn} ${styles.capabilityImageColumnDesktop}`} id="image-column">
              <div className={styles.imageContainer}>
                {capabilities.map((item, index) => (
                  <div
                    key={item.title}
                    className={`${styles.capabilityImageSlide} ${activeCapability === index ? styles.capabilityImageSlideActive : ''}`}
                  >
                    <Image
                      src={getImageSrc(item.image || '/images/placeholder-hero.svg', true)}
                      alt={item.title}
                      fill
                      className={styles.capabilityImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                      priority={index === 0}
                    />
                    <div className={styles.imageOverlay}></div>
                    <div className={styles.imageGradient}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Where This Is Applied</h2>
            <p className={styles.sectionSubtitle}>
              Proven patterns across service provider, enterprise, and data center environments.
            </p>
          </header>
          <ul className={styles.listRail}>
            {useCases.map((item, index) => (
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

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Our Approach</h2>
            <p className={styles.sectionSubtitle}>
              PalC applies a structured approach to designing and delivering SDN and NFV platforms that remain operable at scale.
            </p>
          </header>
          <ol className={styles.timeline}>
            {approachSteps.map((item, index) => (
              <li key={item.title} className={styles.timelineItem} style={{ animationDelay: `${index * 0.15}s` }}>
                <span className={styles.timelineIndex}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.timelineContent}>
                  <h3 className="heading-4">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.caseStudiesSection}>
        <div className="container-custom">
          <div className={styles.caseStudiesHeader}>
            <div className={styles.caseStudiesTitleWrapper}>
              <p className={styles.sectionTag}>Case Studies</p>
              <h2 className="heading-2">Proven outcomes from the field</h2>
              <p className={styles.sectionSubtitle}>
                Deployments across AI fabrics, multi-cloud, automation, and security.
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
            {caseStudiesPreview.length > 0 ? (
              caseStudiesPreview.map((study) => (
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
              ))
            ) : (
              <div className={styles.noCaseStudies}>
                <p>No case studies available for this service.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Technology stack & expertise</p>
            <h2 className="heading-2">Technology Stack</h2>
            <p className={styles.sectionSubtitle}>
              Platforms, controllers, orchestration, and virtualization technologies.
            </p>
          </header>
          <div className={styles.techStackCards}>
            {techStack.map((group, groupIndex) => (
              <div key={group.title} className={styles.techStackCard} style={{ animationDelay: `${groupIndex * 0.1}s` }}>
                <h3 className={styles.stackTitle}>{group.title}</h3>
                <ul className={styles.stackList}>
                  {group.items.map((item, itemIndex) => (
                    <li key={item} style={{ animationDelay: `${(groupIndex * 0.1) + (itemIndex * 0.05)}s` }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Projects and Real-World Experience</h2>
            <p className={styles.sectionSubtitle}>
              PalC has delivered SDN and NFV solutions across service provider, enterprise, and data center environments.
            </p>
          </header>
          <p className={styles.sectionNote} style={{ marginBottom: '24px' }}>
            Our experience includes:
          </p>
          <ul className={styles.outcomesList}>
            {projects.map((item, index) => (
              <li key={item} className={styles.outcomeItem} style={{ animationDelay: `${index * 0.1}s` }}>
                <span className={styles.outcomeCheck}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className={styles.sectionNote} style={{ marginTop: '24px' }}>
            This experience allows PalC to deliver SDN and NFV platforms that move beyond lab deployments into sustained production use.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Business Outcomes</h2>
            <p className={styles.sectionSubtitle}>Organizations adopting PalC's SDN and NFV solutions achieve:</p>
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

      <PartnersSection />

      <section className={styles.cta}>
        <div className="container-custom">
          <div className={styles.ctaContent}>
            <div>
              <h2 className="heading-2">Designing or modernizing SDN and NFV platforms?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your SDN and NFV requirements.
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
          <RAGWidget contextId="services:sdn-nfv" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:sdn-nfv"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your SDN and NFV requirements."
      />
    </main>
  )
}
