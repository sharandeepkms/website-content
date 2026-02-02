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
  'CI/CD for system software, networking platforms, and cloud environments is fundamentally different from application-only pipelines.',
  'PalC focuses on build and delivery pipelines that understand system complexity—including large codebases, hardware dependencies, protocol validation, and multi-environment releases.',
  'This approach is shaped by our work on: Network operating systems and protocol stacks, Cloud and orchestration platforms, SDN/NFV and control-plane software, Multi-component, distributed systems.',
]

const capabilities = [
  {
    title: 'CI/CD for System and Platform Software',
    description:
      'Design of CI/CD pipelines that support large, modular codebases with multiple build artifacts and dependencies.',
    image: '/images/services/automation-tooling/cicd-system-platform.png',
  },
  {
    title: 'Build-Time Optimization',
    description:
      'Techniques to reduce build times through parallelization, caching, incremental builds, and dependency optimization.',
    image: '/images/services/automation-tooling/build-optimization.png',
  },
  {
    title: 'Test Automation & Validation Pipelines',
    description:
      'Integration of functional, scale, regression, and interoperability testing into CI/CD workflows.',
    image: '/images/services/automation-tooling/test-automation.png',
  },
  {
    title: 'Multi-Environment Release Pipelines',
    description:
      'Pipelines supporting development, staging, pre-production, and production environments with controlled promotion.',
    image: '/images/services/automation-tooling/multi-environment.png',
  },
  {
    title: 'Failure Isolation & Rollback Mechanisms',
    description:
      'Design of pipelines that detect failures early and support safe rollback and recovery.',
    image: '/images/services/automation-tooling/failure-rollback.png',
  },
]

const useCases = [
  {
    title: 'Networking Platforms & NOS',
    description:
      'CI/CD pipelines for SONiC, protocol stacks, and network services with hardware and topology dependencies.',
  },
  {
    title: 'Cloud & Platform Software',
    description:
      'Build and release pipelines for orchestration systems, control planes, and platform services.',
  },
  {
    title: 'SDN & NFV Systems',
    description:
      'CI/CD workflows supporting controller software, VNFs, and orchestration layers.',
  },
  {
    title: 'Distributed & Multi-Component Systems',
    description:
      'Pipelines managing coordinated releases across multiple interdependent components.',
  },
]

const approachSteps = [
  {
    title: 'Pipeline Assessment & Design',
    description:
      'Understanding code structure, dependencies, build bottlenecks, and release requirements.',
  },
  {
    title: 'Build & Test Pipeline Engineering',
    description:
      'Designing pipelines that optimize build performance while preserving validation coverage.',
  },
  {
    title: 'Optimization & Instrumentation',
    description:
      'Identifying build-time hotspots and introducing caching, parallelism, and smarter dependency handling.',
  },
  {
    title: 'Release Validation & Operations Enablement',
    description:
      'Ensuring pipelines support safe releases, monitoring, and operational workflows.',
  },
]

const techStack = [
  {
    title: 'CI/CD & Build Tooling',
    items: [
      'Git-based CI/CD workflows',
      'Distributed build systems',
      'Artifact repositories and dependency management',
    ],
  },
  {
    title: 'Automation & Testing',
    items: [
      'Automated test frameworks',
      'Hardware-in-the-loop and simulation-based testing (where applicable)',
      'Regression and interoperability testing',
    ],
  },
  {
    title: 'Platform Integration',
    items: [
      'Kubernetes-based pipeline execution',
      'Containerized build environments',
      'API-driven release orchestration',
    ],
  },
  {
    title: 'Observability & Feedback',
    items: [
      'Build metrics and performance monitoring',
      'Pipeline health dashboards',
      'Automated notifications and reporting',
    ],
  },
]

const businessOutcomes = [
  'Faster build and test cycles',
  'Reduced time-to-release for complex platforms',
  'Lower release-related failure rates',
  'Improved developer productivity',
  'Greater confidence in production deployments',
]

export default function CICDAutomationPage() {
  const [activeCapability, setActiveCapability] = useState(0)
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Filter case studies relevant to CI/CD & Build-Time Optimization
  const cicdTags = ['CI/CD', 'Build', 'Pipeline', 'Automation', 'DevOps', 'Testing', 'Release', 'Deployment', 'Jenkins', 'GitLab', 'GitHub Actions']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => cicdTags.some(cicdTag => tag.toLowerCase().includes(cicdTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('cicd') ||
    (study.title || '').toLowerCase().includes('pipeline') ||
    (study.summary || '').toLowerCase().includes('build') ||
    (study.summary || '').toLowerCase().includes('automation')
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
            <span>CI/CD & Build-Time Optimization</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className={`heading-1 ${styles.fadeInUp}`}>
              CI/CD and Build Systems Optimized for Complex Software and Platforms
            </h1>
            <p className={`${styles.heroSubtitle} ${styles.fadeInUp} ${styles.delay2}`}>
              PalC designs CI/CD pipelines and build systems for complex software stacks covering networking platforms, control planes, cloud systems, and distributed applications where correctness, speed, and reliability matter without compromising system integrity.
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
                CI/CD for system software, networking platforms, and cloud environments is fundamentally different from application-only pipelines.
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
              CI/CD and build optimization for complex system software.
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
              CI/CD and build optimization across complex system software environments.
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
              PalC applies a structured approach to CI/CD and build optimization that balances speed with system safety.
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
            This approach ensures faster delivery without introducing instability into complex systems.
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
                PalC has implemented CI/CD and build optimization pipelines for networking platforms, cloud systems, and distributed software stacks—significantly reducing build times while improving release reliability. These pipelines support continuous development without compromising system stability.
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
              PalC designs CI/CD and build systems using tools and practices proven in system and platform engineering.
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
            <p className={styles.sectionSubtitle}>Organizations working with PalC on CI/CD and build optimization achieve:</p>
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
              <h2 className="heading-2">Struggling with slow builds or risky releases in complex systems?</h2>
              <p className={styles.ctaSubtitle}>
                Talk to an Infrastructure Expert to discuss your CI/CD and build optimization requirements.
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
          <RAGWidget contextId="services:cicd-automation" />
        </div>
      </section>

      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services:cicd-automation"
        title="Talk to an Infrastructure Expert"
        subtitle="Connect with our team to discuss your CI/CD and build optimization requirements."
      />
    </main>
  )
}
