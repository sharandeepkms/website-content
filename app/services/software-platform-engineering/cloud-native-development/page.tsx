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
  'Cloud-native application development is not just about containers or microservices. It is about building applications that behave predictably at scale, integrate cleanly with infrastructure, and remain operable over time.',
  'PalC focuses on platform-aware cloud-native applications, where application logic, networking, security, and lifecycle automation are designed together.',
  'This approach is shaped by our work on: Sovereign and private cloud platforms, Network-centric orchestration systems, Distributed and multi-tenant environments.',
]

const capabilities = [
  {
    title: 'Cloud-Native Application Architecture',
    description:
      'Design of cloud-native application architectures using microservices, APIs, and event-driven patterns aligned with platform constraints.',
    image: '/images/services/cloud-platform-engineering/cloud-native-architecture.png',
  },
  {
    title: 'Microservices & API Development',
    description:
      'Development of scalable microservices and REST-based APIs that integrate cleanly with orchestration, networking, and security layers.',
    image: '/images/services/cloud-platform-engineering/microservices-api.png',
  },
  {
    title: 'Platform-Integrated Applications',
    description:
      'Applications designed to work natively with Kubernetes, networking policies, identity systems, and observability tooling.',
    image: '/images/services/cloud-platform-engineering/platform-integrated.png',
  },
  {
    title: 'Multi-Tenant & Control-Plane Applications',
    description:
      'Development of applications that manage tenants, resources, policies, and workflows across distributed environments.',
    image: '/images/services/cloud-platform-engineering/multi-tenant-control.png',
  },
  {
    title: 'Lifecycle & Upgrade-Safe Design',
    description:
      'Applications engineered for rolling upgrades, version compatibility, and controlled change.',
    image: '/images/services/cloud-platform-engineering/lifecycle-upgrade.png',
  },
]

const useCases = [
  {
    title: 'Cloud Platform Control Systems',
    description:
      'Applications that manage cloud resources, tenants, policies, and orchestration workflows.',
  },
  {
    title: 'Network-Centric Platforms',
    description:
      'Applications tightly coupled with networking, load balancing, traffic control, and observability systems.',
  },
  {
    title: 'Enterprise & Regulated Environments',
    description:
      'Cloud-native applications designed for compliance, auditability, and operational control.',
  },
  {
    title: 'AI & Data Platforms',
    description:
      'Applications supporting AI pipelines, data workflows, and distributed processing environments.',
  },
]

const approachSteps = [
  {
    title: 'Application & Platform Alignment',
    description:
      'Understanding how applications interact with orchestration, networking, security, and infrastructure layers.',
  },
  {
    title: 'Design & Development',
    description:
      'Building microservices, APIs, and workflows using cloud-native design principles.',
  },
  {
    title: 'Integration & Validation',
    description:
      'Integrating applications with platform services and validating behavior under scale, load, and failure conditions.',
  },
  {
    title: 'Deployment & Operations Support',
    description:
      'Supporting production deployment, monitoring, upgrades, and long-term operation.',
  },
]

const techStack = [
  {
    title: 'Application & Platform',
    items: [
      'Kubernetes',
      'Docker',
      'Microservices architectures',
      'RESTful APIs (OpenAPI / Swagger-driven)',
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      'Distributed backend services',
      'Stateful and stateless service design',
      'MongoDB and Redis (where applicable)',
    ],
  },
  {
    title: 'Networking & Security Integration',
    items: [
      'Service-to-service networking',
      'Policy-driven access control',
      'Integration with identity and RBAC systems',
    ],
  },
  {
    title: 'Automation & Operations',
    items: [
      'CI/CD-driven build and release pipelines',
      'Configuration-as-code',
      'Integrated logging, metrics, and tracing',
    ],
  },
]

const businessOutcomes = [
  'Applications that scale reliably with platform growth',
  'Reduced operational friction during upgrades and change',
  'Stronger alignment between applications and infrastructure',
  'Improved observability and troubleshooting',
  'Faster delivery without compromising stability',
]

export default function CloudNativeDevelopmentPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Filter case studies relevant to Cloud-Native Application Development
  const cloudNativeTags = ['Cloud-Native', 'Microservices', 'Kubernetes', 'Container', 'API', 'Platform', 'Application', 'DevOps']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => cloudNativeTags.some(cnTag => tag.toLowerCase().includes(cnTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('cloud-native') ||
    (study.title || '').toLowerCase().includes('microservice') ||
    (study.summary || '').toLowerCase().includes('cloud-native') ||
    (study.summary || '').toLowerCase().includes('kubernetes')
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
            <span>Cloud-Native Application Development</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              Cloud-Native Applications Built for Real Platforms and Real Operations
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC designs and builds cloud-native applications that run reliably on modern platforms with end-to-end application lifecycle. Our focus is on applications that are tightly aligned with platform behavior, scale requirements, and operational realities.
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
                Cloud-native application development is not just about containers or microservices. It is about building applications that behave predictably at scale, integrate cleanly with infrastructure, and remain operable over time.
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
              Platform-aware cloud-native application development.
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
              Cloud-native applications across diverse platform environments.
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
              PalC applies a structured approach to building cloud-native applications that remain stable as platforms evolve.
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
            This approach ensures applications remain functional and operable as platforms scale and change.
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
                PalC has built cloud-native applications as part of larger platform and system deliveries, including orchestration systems, control planes, and network-aware management platforms. These applications form the operational backbone of private, sovereign, and hybrid cloud environments.
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

      <section className={styles.section}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <p className={styles.sectionTag}>Technology stack & expertise</p>
            <h2 className="heading-2">Technology Stack</h2>
            <p className={styles.sectionSubtitle}>
              PalC builds cloud-native applications using technologies actively used across our platform and system deployments.
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

      <PartnersSection />

      <section className={styles.sectionAlt}>
        <div className="container-custom">
          <header className={styles.sectionHeader}>
            <h2 className="heading-2">Business Outcomes</h2>
            <p className={styles.sectionSubtitle}>Organizations working with PalC on cloud-native application development achieve:</p>
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
              <h2 className="heading-2">Building cloud-native applications tightly aligned with your platform?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your cloud-native application development requirements.
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
          <RAGWidget contextId="services:cloud-native-development" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:cloud-native-development"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your cloud-native application development requirements."
      />
    </main>
  )
}
