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
    name: 'Microservices Architecture',
    href: '/services/software-platform-engineering/microservices-architecture',
    description: 'Domain-driven microservices with API gateways, service mesh, and event-driven architectures for scalable platforms.',
  },
  {
    name: 'Cloud-Native Development',
    href: '/services/software-platform-engineering/cloud-native-development',
    description: 'Kubernetes-first deployments, containerized applications, and cloud-native patterns for modern platforms.',
  },
]

export default function SoftwarePlatformEngineeringPage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  
  // Filter case studies relevant to Software & Platform Engineering
  const softwareTags = ['Software', 'Platform', 'Microservices', 'Cloud', 'Kubernetes', 'Container', 'API', 'Service Mesh', 'DevOps']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => softwareTags.some(softTag => tag.toLowerCase().includes(softTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('platform') ||
    (study.title || '').toLowerCase().includes('microservice') ||
    (study.summary || '').toLowerCase().includes('platform') ||
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
            <span>Software & Platform Engineering</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className="heading-1">Software & Platform Engineering</h1>
            <p className={styles.subtitle}>
              Cloud-native platforms with microservices, APIs, service mesh, performance engineering, security, and observability.
            </p>
            <p className={styles.description}>
              We build cloud-native platforms with microservices, APIs, service mesh, and strong observability. Performance, security, and reliability are engineered in—from workload isolation and latency optimization to zero-trust services and SLOs.
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

      <section className={styles.caseStudiesSection}>
        <div className="container-custom">
          <div className={styles.caseStudiesHeader}>
            <div className={styles.caseStudiesTitleWrapper}>
              <p className={styles.sectionTag}>Case Studies</p>
              <h2 className="heading-2">Proven outcomes from the field</h2>
              <p className={styles.sectionSubtitle}>
                Cloud-native platforms, microservices, and software engineering solutions.
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

      <section className={styles.technicalAssistant}>
        <div className="container-custom">
          <RAGWidget contextId="services:software-platform-engineering" />
        </div>
      </section>
    </main>
  )
}
