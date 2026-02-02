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
    name: 'Model Deployment',
    href: '/services/ai-ml-engineering/model-deployment',
    description: 'Real-time inference infrastructure with TensorRT, ONNX Runtime, Triton Inference Server, and autoscaling for production ML models.',
  },
  {
    name: 'AI Pipelines',
    href: '/services/ai-ml-engineering/ai-pipelines',
    description: 'End-to-end ML pipelines with data ingestion, feature engineering, training, and deployment automation for scalable AI systems.',
  },
  {
    name: 'GPU Optimization',
    href: '/services/ai-ml-engineering/gpu-optimization',
    description: 'CUDA kernel optimization, mixed precision training, memory optimization, and multi-GPU communication tuning for maximum performance.',
  },
]

export default function AIMLEngineeringPage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  
  // Filter case studies relevant to AI/ML Engineering
  const aiMlTags = ['AI', 'ML', 'Machine Learning', 'GPU', 'Deep Learning', 'Model', 'Training', 'Inference', 'Neural Network', 'TensorFlow', 'PyTorch']
  const caseStudiesPreview = (caseStudies || []).filter(study => 
    (study.tags || []).some(tag => aiMlTags.some(aiTag => tag.toLowerCase().includes(aiTag.toLowerCase()))) ||
    (study.title || '').toLowerCase().includes('ai') ||
    (study.title || '').toLowerCase().includes('ml') ||
    (study.summary || '').toLowerCase().includes('machine learning') ||
    (study.summary || '').toLowerCase().includes('gpu')
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
            <span>AI/ML Engineering</span>
          </nav>

          <div className={styles.heroContent}>
            <h1 className="heading-1">AI/ML Engineering</h1>
            <p className={styles.subtitle}>
              Build and deploy AI/ML solutions at scale with our expert engineering services. From data pipelines to model deployment, we help organizations leverage artificial intelligence effectively.
            </p>
            <p className={styles.description}>
              AI/ML engineering requires deep expertise in distributed systems, GPU computing, data pipelines, and model serving infrastructure. We build production-grade AI systems that scale to thousands of GPUs, handle petabyte-scale datasets, and serve models with sub-100ms latency.
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
                AI infrastructure, model deployments, and GPU optimization solutions.
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
          <RAGWidget contextId="services:ai-ml-engineering" />
        </div>
      </section>
    </main>
  )
}
