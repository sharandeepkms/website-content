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
  "PalC's private and hybrid cloud work focuses on building cloud platforms as integrated systems, not isolated infrastructure components.",
  'We design environments where compute, networking, security, and orchestration are tightly aligned enabling predictable performance, strong isolation, and operational clarity.',
  'This approach is shaped by real deployments where on-premises control is mandatory, data sovereignty and compliance are non-negotiable, and performance and networking behavior matter as much as compute.',
]

const capabilities = [
  {
    title: 'Private & Sovereign Cloud Platforms',
    description:
      'Design and delivery of on-premises cloud platforms providing cloud-like provisioning while retaining full control over infrastructure, networking, and data.',
    image: '/images/services/cloud-platform-engineering/private-sovereign-cloud.png',
  },
  {
    title: 'Hybrid Cloud Architecture & Networking',
    description:
      'Design of hybrid environments integrating on-premises platforms with public cloud, using consistent networking and security models.',
    image: '/images/services/cloud-platform-engineering/hybrid-cloud-architecture.png',
  },
  {
    title: 'Cloud-Native Networking & Security',
    description:
      'Advanced virtual networking, traffic segmentation, load balancing, and policy enforcement aligned with cloud-native workloads.',
    image: '/images/services/cloud-platform-engineering/cloud-native-networking.png',
  },
  {
    title: 'Kubernetes-Centric Platform Engineering',
    description:
      'Design and operation of Kubernetes-based platforms where networking, security, and observability are first-class concerns.',
    image: '/images/services/cloud-platform-engineering/kubernetes-platform.png',
  },
  {
    title: 'High-Performance & AI-Ready Platforms',
    description:
      'Cloud platforms engineered to support GPU workloads, AI pipelines, and performance-sensitive applications.',
    image: '/images/services/cloud-platform-engineering/ai-ready-platforms.png',
  },
]

const useCases = [
  {
    title: 'Sovereign & Government Cloud Environments',
    description:
      'Platforms designed to meet strict data residency, compliance, and control requirements.',
  },
  {
    title: 'Enterprise Private Cloud Platforms',
    description:
      'Cloud environments supporting business-critical workloads with predictable performance.',
  },
  {
    title: 'Hybrid Application Platforms',
    description:
      'Workloads spanning on-premises and cloud environments with unified control.',
  },
  {
    title: 'AI & Data-Intensive Systems',
    description:
      'Platforms supporting GPU-enabled workloads and high-throughput data processing.',
  },
]

const approachSteps = [
  {
    title: 'Planning & Platform Architecture',
    description:
      'Defining platform architecture based on workload behavior, regulatory requirements, and operational constraints.',
  },
  {
    title: 'Engineering & Platform Build',
    description:
      'Integrating compute, networking, orchestration, and security into a cohesive cloud platform.',
  },
  {
    title: 'Commissioning & Validation',
    description:
      'Validating platform behavior under real workloads, scale conditions, and security scenarios.',
  },
  {
    title: 'Deployment & Lifecycle Operations',
    description:
      'Supporting production rollout, upgrades, monitoring, and controlled change across the platform lifecycle.',
  },
]

const techStack = [
  {
    title: 'Cloud & Orchestration',
    items: [
      'Kubernetes',
      'Docker',
      'KVM',
      'OpenStack (where applicable)',
    ],
  },
  {
    title: 'Networking & Data Plane',
    items: [
      'SONiC-based open networking',
      'Cilium (eBPF-based networking and security)',
      'VPP',
      'XDP acceleration',
      'SmartNICs and DPUs (Marvell-class platforms)',
    ],
  },
  {
    title: 'Security & Connectivity',
    items: [
      'IPSec (StrongSwan)',
      'Policy-driven networking and segmentation',
      'Identity-aware access controls',
    ],
  },
  {
    title: 'Platform & Control Systems',
    items: [
      'Custom orchestration and control APIs',
      'RESTful APIs (Swagger/OpenAPI-driven)',
      'Role-based access control (RBAC)',
      'Multi-tenant VPC, VM, and Kubernetes workload management',
    ],
  },
  {
    title: 'Observability & Operations',
    items: [
      'Telemetry and flow-based monitoring',
      'Integrated logging and metrics pipelines',
      'Automation-driven configuration management',
    ],
  },
]

const architectureOverview = [
  'Central orchestration layer managing regions, zones, tenants, and workloads',
  'Kubernetes-based compute layer with integrated networking and security',
  'High-performance networking accelerated using DPUs and eBPF',
  'Secure connectivity across on-premises and hybrid environments',
  'Operational tooling for visibility, control, and lifecycle management',
]

const businessOutcomes = [
  'Full control over infrastructure, networking, and data',
  'Strong security and compliance posture',
  'Predictable performance for critical workloads',
  'Reduced reliance on single public cloud providers',
  'Cloud-native agility without operational fragmentation',
]

export default function PrivateHybridCloudPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Filter case studies relevant to Private & Hybrid Cloud
  const cloudTags = ['Cloud', 'Private Cloud', 'Hybrid Cloud', 'Kubernetes', 'Platform', 'Sovereign', 'Government', 'Enterprise']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => cloudTags.some(cloudTag => tag.toLowerCase().includes(cloudTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('cloud') ||
    (study.title || '').toLowerCase().includes('platform') ||
    (study.summary || '').toLowerCase().includes('private cloud') ||
    (study.summary || '').toLowerCase().includes('hybrid')
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
            <span>Private & Hybrid Cloud</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Private and Hybrid Cloud Platforms Engineered for Control, Performance, and Compliance
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC designs and delivers private and hybrid cloud platforms for organizations that require full control over networking, security, and operations. Our work spans platform architecture, cloud-native networking, orchestration, and lifecycle operations across enterprise, government, and regulated environments.
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
                PalC&apos;s private and hybrid cloud work focuses on building cloud platforms as integrated systems, not isolated infrastructure components.
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
              Comprehensive cloud platform engineering from architecture to operations.
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
              Proven patterns across sovereign, enterprise, and hybrid cloud environments.
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
              PalC follows a structured approach to delivering private and hybrid cloud platforms that remain operable at scale.
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
          <p className={styles.sectionNote}>
            This approach ensures platforms evolve without losing stability or control.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Technology stack & expertise</p>
            <h2 className="heading-2">Technology Stack</h2>
            <p className={styles.sectionSubtitle}>
              This solution is built using technologies and tools PalC actively uses in production environments.
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
            <h2 className="heading-2">Architecture Overview</h2>
            <p className={styles.sectionSubtitle}>
              PalC&apos;s private and hybrid cloud platforms follow a modular, layered architecture:
            </p>
          </header>
          <ul className={styles.minimalList}>
            {architectureOverview.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className={styles.sectionNote}>
            This architecture allows platforms to scale while maintaining strong isolation and operational clarity.
          </p>
        </div>
      </section>

      <section className={styles.caseStudiesSection}>
        <div className="container-custom">
          <div className={styles.caseStudiesHeader}>
            <div className={styles.caseStudiesTitleWrapper}>
              <p className={styles.sectionTag}>Case Studies</p>
              <h2 className="heading-2">Related Work</h2>
              <p className={styles.sectionSubtitle}>
                PalC has delivered full-scale private and sovereign cloud platforms from the ground up—covering architecture, networking, orchestration, and operations for production environments.
              </p>
            </div>
            {caseStudiesPreview.length > 0 && (
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
            )}
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
                <p>No case studies available for this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <PartnersSection />

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Business Outcomes</h2>
            <p className={styles.sectionSubtitle}>Organizations adopting PalC's private and hybrid cloud platforms typically achieve:</p>
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
              <h2 className="heading-2">Planning a private or hybrid cloud platform with full control and compliance?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your private and hybrid cloud requirements.
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
          <RAGWidget contextId="services:private-hybrid-cloud" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:private-hybrid-cloud"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your private and hybrid cloud platform requirements."
      />
    </main>
  )
}

