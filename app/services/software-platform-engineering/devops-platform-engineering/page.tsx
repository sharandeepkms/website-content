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
  'DevOps in complex environments goes beyond build pipelines. It must account for platform dependencies, networking behavior, security policies, and operational workflows.',
  'PalC focuses on platform-aware DevOps, where infrastructure, networking, orchestration, and applications evolve together in a controlled and repeatable manner.',
  'This approach is shaped by our work on: Sovereign and private cloud platforms, Network-centric control planes and orchestration systems, Open networking and disaggregated infrastructure.',
]

const capabilities = [
  {
    title: 'Platform-Centric CI/CD Pipelines',
    description:
      'Design of CI/CD pipelines that support platform components such as networking services, control planes, and orchestration layers.',
    image: '/images/services/software-platform-engineering/platform-cicd.png',
  },
  {
    title: 'Infrastructure & Configuration Automation',
    description:
      'Automation of infrastructure provisioning, configuration, and lifecycle management using declarative and version-controlled approaches.',
    image: '/images/services/software-platform-engineering/infrastructure-automation.png',
  },
  {
    title: 'Release Engineering & Upgrade Management',
    description:
      'Design of release workflows that support rolling upgrades, version compatibility, and minimal service disruption.',
    image: '/images/services/software-platform-engineering/release-engineering.png',
  },
  {
    title: 'Observability & Operational Tooling',
    description:
      'Integration of logging, metrics, and tracing into platforms to support day-2 operations and troubleshooting.',
    image: '/images/services/software-platform-engineering/observability-tooling.png',
  },
  {
    title: 'Security & Policy Automation',
    description:
      'Embedding security controls, identity, and policy enforcement into DevOps workflows.',
    image: '/images/services/software-platform-engineering/security-policy.png',
  },
]

const useCases = [
  {
    title: 'Cloud Platform Engineering',
    description:
      'DevOps workflows supporting private, sovereign, and hybrid cloud platforms.',
  },
  {
    title: 'Networking & Control Plane Systems',
    description:
      'Automation and release pipelines for SONiC, SDN controllers, and network services.',
  },
  {
    title: 'Distributed & Multi-Tenant Platforms',
    description:
      'DevOps practices supporting large-scale, multi-tenant systems with strict isolation and control.',
  },
  {
    title: 'AI & Data Platforms',
    description:
      'DevOps workflows enabling reliable deployment of AI pipelines and GPU-enabled services.',
  },
]

const approachSteps = [
  {
    title: 'Platform Assessment & Design',
    description:
      'Understanding platform architecture, dependencies, and operational requirements before designing DevOps workflows.',
  },
  {
    title: 'Pipeline & Automation Engineering',
    description:
      'Building CI/CD pipelines and automation frameworks aligned with platform components and release models.',
  },
  {
    title: 'Validation & Release Readiness',
    description:
      'Validating upgrades, configuration changes, and automation behavior under real conditions.',
  },
  {
    title: 'Operations Enablement & Support',
    description:
      'Supporting adoption, documentation, and ongoing evolution of DevOps practices.',
  },
]

const techStack = [
  {
    title: 'CI/CD & Automation',
    items: [
      'CI/CD pipelines (Git-based workflows)',
      'Infrastructure as Code (Terraform, Ansible)',
      'Configuration management and templating',
    ],
  },
  {
    title: 'Platform & Orchestration',
    items: [
      'Kubernetes',
      'Docker',
      'Helm',
      'Custom platform operators and controllers',
    ],
  },
  {
    title: 'Networking & Systems Integration',
    items: [
      'SONiC and open networking platforms',
      'Cilium and eBPF-based networking',
      'API-driven control planes',
    ],
  },
  {
    title: 'Observability & Operations',
    items: [
      'Metrics, logging, and tracing pipelines',
      'Automation-driven health checks',
      'Release validation and rollback mechanisms',
    ],
  },
]

const businessOutcomes = [
  'Faster and safer platform changes',
  'Reduced operational risk during upgrades',
  'Improved consistency across environments',
  'Better observability into system behavior',
  'Stronger collaboration between engineering and operations',
]

export default function DevOpsPlatformEngineeringPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Filter case studies relevant to DevOps & Platform Engineering
  const devopsTags = ['DevOps', 'Platform', 'CI/CD', 'Automation', 'Infrastructure', 'Kubernetes', 'Orchestration', 'Release', 'Deployment']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => devopsTags.some(devTag => tag.toLowerCase().includes(devTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('devops') ||
    (study.title || '').toLowerCase().includes('platform') ||
    (study.summary || '').toLowerCase().includes('devops') ||
    (study.summary || '').toLowerCase().includes('orchestration')
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
            <span>DevOps & Platform Engineering</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              DevOps and Platform Engineering for Complex, Distributed Systems
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC designs and implements DevOps and platform engineering practices that support large-scale, network-centric, and cloud-native systems with reliable delivery, controlled change, and operational stability.
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
                DevOps in complex environments goes beyond build pipelines. It must account for platform dependencies, networking behavior, security policies, and operational workflows.
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
              Platform-aware DevOps for complex systems.
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
              DevOps and platform engineering across complex system environments.
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
              PalC applies a structured approach to DevOps and platform engineering, aligned with real operational environments.
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
            This approach ensures DevOps supports platform stability rather than becoming a source of operational risk.
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
                PalC has implemented DevOps and platform engineering practices as part of large-scale platform and system deliveries, including cloud orchestration systems, networking platforms, and distributed control planes. These practices ensure platforms can evolve safely without disrupting production operations.
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
              PalC implements DevOps and platform engineering using tools and frameworks actively used in our system deployments.
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
            <p className={styles.sectionSubtitle}>Organizations adopting PalC&apos;s DevOps and platform engineering services achieve:</p>
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
              <h2 className="heading-2">Looking to strengthen DevOps practices for complex platforms?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your DevOps and platform engineering requirements.
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
          <RAGWidget contextId="services:devops-platform-engineering" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:devops-platform-engineering"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your DevOps and platform engineering requirements."
      />
    </main>
  )
}

