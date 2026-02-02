'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { caseStudies } from '@/app/data/case-studies'
import { getImageSrc } from '@/app/utils/image-path'
import { RAGWidget } from '@/app/components/RAGWidget'
import { PartnersSection } from '@/app/components/PartnersSection'
import styles from './page.module.css'

const services = [
  {
    name: 'Private & Hybrid Cloud',
    href: '/services/cloud-platform-engineering/private-hybrid-cloud',
    description: 'Design and implementation of private and hybrid cloud infrastructure for enterprise and service provider environments.',
  },
  {
    name: 'Cloud-Native Applications',
    href: '/services/software-platform-engineering/cloud-native-development',
    description: 'Kubernetes-first deployments, containerized applications, and cloud-native patterns for modern platforms.',
  },
  {
    name: 'DevOps & Platform Engineering',
    href: '/services/software-platform-engineering',
    description: 'Cloud-native platforms with microservices, APIs, service mesh, and strong observability.',
  },
  {
    name: 'CI/CD & Build-Time Optimization',
    href: '/services/automation-tooling/cicd-automation',
    description: 'GitOps workflows, multi-stage deployments, automated testing, and progressive delivery with rollback automation.',
  },
  {
    name: 'CDN & Real-Time Streaming Platforms',
    href: '/services/cloud-platform-engineering/cdn-streaming',
    description: 'Content delivery networks and real-time streaming infrastructure for global content distribution and low-latency media delivery.',
  },
]

export default function CloudPlatformEngineeringPage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  
  // Filter case studies relevant to Cloud & Platform Engineering
  const cloudTags = ['Cloud', 'Platform', 'DevOps', 'Kubernetes', 'Container', 'CI/CD', 'CDN', 'Streaming', 'Hybrid Cloud', 'Private Cloud', 'Microservices']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => cloudTags.some(cloudTag => tag.toLowerCase().includes(cloudTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('cloud') ||
    (study.title || '').toLowerCase().includes('platform') ||
    (study.summary || '').toLowerCase().includes('cloud') ||
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

  return (
    <main className={styles.categoryPage}>
      <section className={styles.hero}>
        <div className="container-custom">
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>Cloud & Platform Engineering</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className="heading-1">Cloud & Platform Engineering</h1>
            <p className={styles.subtitle}>
              Comprehensive cloud infrastructure and platform engineering services. From private and hybrid cloud deployments to cloud-native applications and DevOps automation.
            </p>
            <p className={styles.description}>
              Our cloud and platform engineering team delivers production-grade cloud infrastructure, containerized platforms, and DevOps automation. We build scalable, reliable systems that enable organizations to deploy and operate applications efficiently across private, hybrid, and public cloud environments.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className="container-custom">
          <h2 className="heading-2">Our Services</h2>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className={styles.serviceCard}
              >
                <div className={styles.serviceCardContent}>
                  <h3 className="heading-4">{service.name}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <span className={styles.serviceLink}>
                    Learn more
                    <ArrowRight className={styles.arrowIcon} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />

      <section className={styles.caseStudiesSection}>
        <div className="container-custom">
          <div className={styles.caseStudiesHeader}>
            <div className={styles.caseStudiesTitleWrapper}>
              <p className={styles.sectionTag}>Case Studies</p>
              <h2 className="heading-2">Proven outcomes from the field</h2>
              <p className={styles.sectionSubtitle}>
                Cloud infrastructure deployments, platform engineering, and DevOps transformations.
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

      <section className={styles.technicalAssistant}>
        <div className="container-custom">
          <RAGWidget contextId="services:cloud-platform-engineering" />
        </div>
      </section>
    </main>
  )
}

