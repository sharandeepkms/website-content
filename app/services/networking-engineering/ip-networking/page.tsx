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
import { VideoSection } from '@/app/components/VideoSection'
import styles from './page.module.css'

const focusAreas = [
  'Modern IP networks must scale across diverse environments while remaining programmable, interoperable, and operationally stable.',
  'PalC focuses on engineering IP networking systems at the protocol, platform, and system levels, covering both control and data planes.',
  'Our work enables organizations to build networks that evolve with changing workloads, architectures, and vendor ecosystems.',
]

const capabilities = [
  {
    title: 'Control Plane Architecture & Protocol Engineering',
    description:
      'Design and development of control-plane architectures for IP networking protocols across Layer 2, Layer 3, Multicast, MPLS, Segment Routing, and Carrier Ethernet environments.',
    image: '/images/services/ip-networking/control-plane-architecture.png',
  },
  {
    title: 'Data Plane Design & Integration',
    description:
      'Engineering high-performance data plane solutions optimized for merchant silicon, DPUs, and software-based forwarding frameworks.',
    image: '/images/services/ip-networking/data-plane-design.png',
  },
  {
    title: 'Disaggregated & Whitebox Networking',
    description:
      'Development of software stacks for whitebox and disaggregated networking platforms, enabling flexible deployment across multi-vendor environments.',
    image: '/images/services/ip-networking/disaggregated-whitebox.png',
  },
  {
    title: 'Network Architecture & Deployment Design',
    description:
      'End-to-end network design for diverse deployment models including data centers, service provider networks, and enterprise environments.',
    image: '/images/services/ip-networking/network-architecture-deployment.png',
  },
  {
    title: 'Standards & Interoperability Engineering',
    description:
      'Active contribution to industry standards and interoperability initiatives, ensuring solutions align with open specifications and evolving ecosystems.',
    image: '/images/services/ip-networking/standards-interoperability.png',
  },
]

const useCases = [
  {
    title: 'Data Center Networks',
    description:
      'Leaf–spine architectures, EVPN/VXLAN overlays, and DCI solutions designed for scale, performance, and operational clarity.',
  },
  {
    title: 'Data Center Interconnect (DCI)',
    description:
      'VXLAN-based overlays and DWDM packet-optical networks enabling resilient, high-bandwidth inter-data-center connectivity.',
  },
  {
    title: 'Service Provider & Carrier Networks',
    description:
      'Carrier Ethernet, MPLS, Segment Routing, and Metro Ethernet solutions supporting large-scale service delivery.',
  },
  {
    title: 'Mobile Backhaul & Access Aggregation',
    description: 'IP networking solutions for mobile backhaul, OLT aggregation, and CORD-based deployments.',
  },
  {
    title: 'Enterprise Networks',
    description: 'Programmable, scalable IP networking for campus and enterprise environments.',
  },
]

const approachSteps = [
            {
              title: 'Architecture & Protocol Design',
    description:
      'Defining control-plane and data-plane architectures aligned with scale, performance, and interoperability requirements.',
            },
            {
              title: 'Platform Engineering & Integration',
    description:
      'Integrating protocol stacks, forwarding pipelines, and management systems across hardware and software platforms.',
            },
            {
              title: 'Validation & Interoperability Testing',
    description:
      'Testing protocol behavior, scale limits, and interoperability across vendors and deployment scenarios.',
            },
            {
              title: 'Deployment & Lifecycle Support',
    description:
      'Supporting rollout, upgrades, troubleshooting, and long-term evolution of IP networking systems.',
  },
]

const techStack = [
  {
    title: 'Protocols & Technologies',
    items: [
      'L2, L3, MPLS, G-MPLS, Carrier Ethernet',
      'Segment Routing, PCE, BGP-LS',
      'Access technologies including GPON, OLTs, ONUs, and edge aggregation',
    ],
  },
  {
    title: 'Control Plane Stacks',
    items: [
      'IP Infusion (ZebOS / ZebXP / OcNOS)',
      'Aricent ISS',
      'Metaswitch DCL',
      'Quagga / FRR',
      'GoBGP, ExaBGP',
      'SONiC, ONL',
    ],
  },
  {
    title: 'Management Plane',
    items: [
      'NETCONF, RESTCONF, SNMP',
      'ONIE',
      'YANG models',
      'Sysrepo, ConfD',
      'Netopeer, OpenYuma, Pyang',
    ],
  },
  {
    title: 'Forwarding & Data Plane',
    items: [
      'Broadcom (Trident, Trident2/3, Tomahawk, Qumran, Arad, Katana, Triumph)',
      'Marvell (Bobcat, Poncat)',
      'Intel DPDK, SR-IOV',
      'Linux Bridging, OVS',
      'Nephos',
    ],
  },
]

const standards = [
  'Published RFCs',
  'Internet drafts',
  'Active participation in protocol standardization',
]

const businessOutcomes = [
  'Scalable and interoperable network architectures',
  'Reduced vendor dependency through disaggregation',
  'Faster adoption of new networking technologies',
  'Improved operational stability and control',
  'Standards-aligned, future-ready network designs',
]

const videoResources = [
  {
    title: 'PalC Whitebox Networking',
    description: 'Discover how PalC enables disaggregated, open networking solutions for modern data centers.',
    vimeoId: '797034402',
    duration: 'Overview',
    thumbnail: '/images/services/ip-networking/whitebox-networking-thumbnail.jpg',
  },
]

export default function IPNetworkingPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const caseStudiesPreview = caseStudies.slice(0, 8)

  const scrollCaseStudies = (direction: 'prev' | 'next') => {
    const el = caseStudiesRef.current
    if (!el) return
    const scrollAmount = 340 + 24
    el.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    })
  }

  // Sync image column height with tabs column
  useEffect(() => {
    const syncHeights = () => {
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
            <span>IP Networking</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Engineering the Control and Data Planes of Modern IP Networks
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC Networks designs and builds advanced IP networking systems using open, modular software and disaggregated
              platforms, enabling scalable, programmable, and intelligent networks across data center, service provider, and
              enterprise environments.
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
              <p className={styles.sectionTag}>What this service focuses on</p>
              <h2 className="heading-2">What We Focus On</h2>
              <p className={styles.sectionSubtitle}>
                Modern IP networks must scale across diverse environments while remaining programmable, interoperable, and
                operationally stable.
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
              Depth across control, data, and system architecture.
            </p>
          </div>
          <div className={styles.capabilitiesTabsLayout}>
            <div className={styles.capabilitiesTabs} id="tabs-column">
              {capabilities.map((item, index) => (
                <button
                  key={item.title}
                  className={`${styles.capabilityTab} ${activeCapability === index ? styles.capabilityTabActive : ''}`}
                  onClick={() => setActiveCapability(index)}
                  aria-selected={activeCapability === index}
                  aria-expanded={activeCapability === index}
                >
                  <div className={styles.tabHeader}>
                    <span className={styles.tabNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <div className={styles.tabTitleWrapper}>
                      <h3 className="heading-4">{item.title}</h3>
                      <div className={styles.tabIndicator}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tabContentWrapper}>
                    <div className={styles.tabContent}>
                      <p className={styles.tabDescription}>{item.description}</p>
                    </div>
                  </div>
                  <div className={styles.tabAccent}></div>
                </button>
              ))}
            </div>
            <div className={styles.capabilityImageColumn} id="image-column">
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
            <p className={styles.sectionTag}>Deployment scenarios & use cases</p>
            <h2 className="heading-2">Where This Is Applied</h2>
            <p className={styles.sectionSubtitle}>
              Proven patterns across data centers, service providers, and enterprise networks.
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
              PalC applies a structured engineering approach to IP networking projects, ensuring systems are robust,
              interoperable, and production-ready.
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
            <p className={styles.sectionTag}>Technology stack & expertise</p>
            <h2 className="heading-2">Technology Stack</h2>
            <p className={styles.sectionSubtitle}>
              Protocols, platforms, and tooling across control, management, and forwarding planes.
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
            <h2 className="heading-2">Standards & Industry Contributions</h2>
            <p className={styles.sectionSubtitle}>
              PalC engineers have made notable contributions to the IETF, including work within the MPLS and TRILL working groups.
            </p>
          </header>
          <ul className={styles.minimalList}>
            {standards.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.sectionNote}>
            This ensures our solutions align with open standards and industry best practices.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection
        sectionTag="See It In Action"
        title="Whitebox Networking in Practice"
        subtitle="Watch how PalC delivers open, disaggregated networking solutions that transform enterprise infrastructure."
        videos={videoResources}
        featuredImage="/images/services/ip-networking/disaggregated-whitebox.png"
      />

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Business Outcomes</h2>
            <p className={styles.sectionSubtitle}>Organizations working with PalC on IP networking achieve:</p>
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

      <section className={styles.cta}>
        <div className="container-custom">
          <div className={styles.ctaContent}>
            <div>
              <h2 className="heading-2">Building or modernizing IP networking systems?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your IP networking requirements.
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
          <RAGWidget contextId="services:ip-networking" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:ip-networking"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your IP networking requirements."
      />
    </main>
  )
}

