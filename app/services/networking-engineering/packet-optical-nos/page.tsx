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
  'Modern transport networks are evolving toward tighter integration between packet and optical layers. PalC focuses on engineering packet optical systems where IP routing, optical transport, and control software work together as a unified system.',
  'Our work enables service providers and large network operators to adopt packet optical architectures that scale in capacity while remaining programmable, interoperable, and operationally manageable.',
]

const capabilities = [
  {
    title: 'Packet Optical Software Engineering',
    description:
      'Design and development of software stacks for packet optical networks, integrating IP routing and optical transport functions.',
    image: '/images/services/packet-optical-nos/packet-optical-software.png',
  },
  {
    title: 'DWDM & Coherent Optics Enablement',
    description:
      'Engineering and integration of DWDM-based systems using both analog coherent optics (ACO) and digital coherent optics (DCO) on whitebox platforms.',
    image: '/images/services/packet-optical-nos/dwdm-coherent-optics.png',
  },
  {
    title: 'Disaggregated Packet Optical Platforms',
    description:
      'Development of packet optical solutions using open, disaggregated hardware and modular software architectures.',
    image: '/images/services/packet-optical-nos/disaggregated-optical-platforms.png',
  },
  {
    title: 'Control Plane Integration',
    description:
      'Integration of IP control-plane stacks with optical abstraction layers and SDN controllers to enable coordinated packet and optical control.',
    image: '/images/services/packet-optical-nos/control-plane-integration.png',
  },
  {
    title: 'End-to-End System Integration',
    description:
      'Building cohesive packet optical systems by integrating control plane, data plane, and management plane components.',
    image: '/images/services/packet-optical-nos/system-integration.png',
  },
]

const useCases = [
  {
    title: 'Metro & Long-Haul Transport Networks',
    description:
      'High-capacity packet optical systems supporting metro aggregation and long-haul connectivity.',
  },
  {
    title: 'Data Center Interconnect (DCI)',
    description:
      'Packet optical solutions for high-bandwidth, low-latency interconnection between data centers using DWDM transport.',
  },
  {
    title: 'Service Provider Core & Aggregation Networks',
    description: 'Integrated IP-over-optical architectures supporting scalable service delivery.',
  },
  {
    title: 'Open Transport Networks',
    description: 'Disaggregated optical networks replacing proprietary transport platforms.',
  },
]

const approachSteps = [
  {
    title: 'Architecture & System Design',
    description:
      'Defining packet–optical architectures aligned with capacity requirements, topology, and operational constraints.',
  },
  {
    title: 'Platform Engineering & Integration',
    description:
      'Engineering packet optical platforms by integrating coherent optics, forwarding pipelines, and control software.',
  },
  {
    title: 'Validation & Interoperability Testing',
    description:
      'Validating packet optical behavior across scale, failure scenarios, and multi-vendor interoperability conditions.',
  },
  {
    title: 'Deployment & Lifecycle Support',
    description:
      'Supporting rollout, upgrades, troubleshooting, and long-term evolution of packet optical networks.',
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
    title: 'Control Plane & SDN',
    items: [
      'IP Infusion (ZebOS / ZebXP / OcNOS)',
      'Aricent ISS',
      'Metaswitch DCL',
      'Quagga / FRR',
      'GoBGP, ExaBGP',
      'SONiC, ONL',
      'ONOS Controller',
      'OpenTAI (Transponder Abstraction Interface)',
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
      'Broadcom (Trident, Trident+, Trident2/3, Tomahawk, Qumran, Arad, Katana, Triumph)',
      'Marvell (Bobcat, Poncat)',
      'Intel DPDK, SR-IOV',
      'Linux Bridging, OVS',
      'Nephos',
    ],
  },
]

const projects = [
  'Packet optical systems built on whitebox platforms with coherent optics',
  'Integration of IP Infusion control plane stacks with optical abstraction layers',
  'SDN-controlled packet optical solutions using ONOS',
  'End-to-end system bring-up covering control, forwarding, and management planes',
]

const businessOutcomes = [
  'Higher transport capacity with open, flexible architectures',
  'Reduced dependency on proprietary optical platforms',
  'Better coordination between packet and optical layers',
  'Faster deployment of new transport services',
  'Long-term scalability with operational control',
]

export default function PacketOpticalNOSPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Filter case studies relevant to Packet Optical
  const packetOpticalTags = ['Packet Optical', 'DWDM', 'Optical', 'Transport', 'DCI', 'Coherent Optics', 'White Box', 'NOS']
  const caseStudiesPreview = caseStudies.filter(study => 
    study.tags.some(tag => packetOpticalTags.some(optTag => tag.toLowerCase().includes(optTag.toLowerCase()))) ||
    study.title.toLowerCase().includes('packet optical') ||
    study.title.toLowerCase().includes('optical') ||
    study.title.toLowerCase().includes('dwdm') ||
    study.summary.toLowerCase().includes('packet optical') ||
    study.summary.toLowerCase().includes('optical transport')
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
            <span>Packet Optical Network</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Engineering Open and Programmable Packet Optical Networks
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC Networks designs and builds packet optical systems that integrate IP and optical layers using open platforms, modular software, and disaggregated hardware to build scalable, high-capacity transport networks with operational control.
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
                Modern transport networks are evolving toward tighter integration between packet and optical layers.
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
              Integrated packet and optical systems engineering.
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
            <h2 className="heading-2">Where This Is Applied</h2>
            <p className={styles.sectionSubtitle}>
              Proven patterns across metro, long-haul, and data center interconnect networks.
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
              PalC applies a structured engineering approach to building packet optical systems that balance performance, flexibility, and operational stability.
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
            <h2 className="heading-2">Projects and Real-World Deployments</h2>
            <p className={styles.sectionSubtitle}>
              PalC has worked on the development and integration of packet optical platforms that combine IP routing and optical transport using open hardware and software.
            </p>
          </header>
          <p className={styles.sectionNote} style={{ marginBottom: '24px' }}>
            Our work includes:
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
            These projects demonstrate PalC's ability to deliver packet optical networks as integrated systems, not isolated components.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Business Outcomes</h2>
            <p className={styles.sectionSubtitle}>Organizations adopting PalC's packet optical solutions achieve:</p>
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
              <h2 className="heading-2">Designing or modernizing packet optical networks?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your packet optical network requirements.
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
          <RAGWidget contextId="services:packet-optical-nos" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:packet-optical-nos"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your packet optical network requirements."
      />
    </main>
  )
}
