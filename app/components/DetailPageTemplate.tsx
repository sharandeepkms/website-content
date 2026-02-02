"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  CheckCircle2, 
  Code, 
  FileText, 
  Download,
  ExternalLink,
  Server,
  Network,
  Database,
  Cloud,
  Zap,
  Shield,
  TrendingUp,
  BarChart3,
  Target,
  Rocket,
  ChevronRight,
  Radio,
  Settings,
  Monitor
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { LeadCaptureModal } from './LeadCaptureModal'
import { ReadingProgress } from './ReadingProgress'
import { BackToTop } from './BackToTop'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { ImageSkeleton } from './ui/image-skeleton'
import { getImageFallbacks } from '@/app/utils/image-helpers'
import { getImageSrc } from '@/app/utils/image-path'

// Resource Item Card Component to fix React Hooks rule
function ResourceItemCard({ item, idx, getMetaText }: { item: any; idx: number; getMetaText: (item: any) => string }) {
  const [imgLoading, setImgLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const placeholderImage = '/images/placeholder-hero.svg'
  // Get base image from item properties, ensuring we always have a valid path
  const baseImage =
    (item.featuredImage && item.featuredImage.trim()) ||
    (item.cover && item.cover.trim()) ||
    (item.featuredimage && item.featuredimage.trim()) ||
    (item.avatar && item.avatar.trim()) ||
    placeholderImage
  
  // Reset image state when item changes
  useEffect(() => {
    setImgLoading(true)
    setImgSrc(null)
  }, [item.id, item.slug, baseImage])
  
  // ALWAYS use getImageSrc to ensure basePath is prepended for all images
  // This ensures images load correctly on staging server with basePath
  const image = imgSrc || getImageSrc(baseImage, true)
  const category = item.type.replace('-', ' ')
  const author = item.author || item.expert || undefined

  return (
    <div
      key={`${item.type}-${item.href}-${idx}`}
      className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-start rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(0,255,200,0.15)] transition-all duration-300 ease-out overflow-hidden will-change-transform"
    >
      <div className="relative w-full aspect-[16/9] bg-white/5">
        {imgLoading && (
          <div className="absolute inset-0 z-10">
            <ImageSkeleton className="h-full w-full" aspectRatio="video" />
          </div>
        )}
        <Image
          src={image}
          alt={item.title || 'Resource image'}
          fill
          className={cn("object-cover transition-opacity duration-300", imgLoading ? "opacity-0" : "opacity-100")}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          onLoad={() => {
            setImgLoading(false)
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            const fallbackSrc = getImageSrc(placeholderImage, true)
            // Only set fallback if current src is not already the placeholder
            if (target.src && !target.src.includes('placeholder-hero')) {
              setImgSrc(fallbackSrc)
            } else {
              // If already placeholder, just stop loading
              setImgLoading(false)
            }
          }}
          unoptimized={true}
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary-light">{category}</div>
        <p className="text-sm font-semibold text-white line-clamp-2">{item.title}</p>
        {getMetaText(item) && (
          <p className="text-xs text-gray-300 line-clamp-2">{getMetaText(item)}</p>
        )}
        {author && (
          <p className="text-[11px] text-gray-400 line-clamp-1">
            {author.name || ''} {author.title ? `• ${author.title}` : ''}
          </p>
        )}
        <Link href={item.href} className="inline-flex items-center text-primary-light text-sm font-semibold">
          View
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}

// Case Study Card Component to fix React Hooks rule
function CaseStudyCard({ study }: { study: any }) {
  const [imgLoading, setImgLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const baseImage = study.featuredImage || '/images/placeholder-hero.svg'
  const placeholderImage = '/images/placeholder-hero.svg'
  // ALWAYS use getImageSrc to ensure basePath is prepended for all images
  // This ensures images load correctly on staging server with basePath
  const image = imgSrc || getImageSrc(baseImage, true)

  return (
    <div
      key={study.slug}
      className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-start rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(0,255,200,0.12)] transition-all duration-300 ease-out overflow-hidden will-change-transform"
    >
      <div className="relative w-full aspect-[16/9] bg-white/5">
        {imgLoading && (
          <div className="absolute inset-0 z-10">
            <ImageSkeleton className="h-full w-full" aspectRatio="video" />
          </div>
        )}
        <Image
          src={image}
          alt={study.title}
          fill
          className={cn("object-cover", imgLoading && "opacity-0")}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          onLoad={() => setImgLoading(false)}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            const fallbackSrc = getImageSrc(placeholderImage, true)
            if (!target.src.includes('placeholder-hero')) {
              setImgSrc(fallbackSrc)
            }
            setImgLoading(false)
          }}
          unoptimized={true}
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="text-[11px] uppercase tracking-[0.2em] text-primary-light">
          {study.industry}
        </div>
        <p className="text-sm font-semibold text-white line-clamp-2">{study.title}</p>
        <p className="text-xs text-gray-300 line-clamp-2">{study.summary}</p>
        <Link
          href={`/resources/case-studies/${study.slug}`}
          className="inline-flex items-center text-primary-light text-sm font-semibold"
        >
          View Case Study
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  )
}

// Hero Image Component with Fallback Support
function HeroImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src)
  const [errorCount, setErrorCount] = useState(0)
  const [hasError, setHasError] = useState(false)
  const fallbacks = useMemo(() => getImageFallbacks(src), [src])
  const placeholderImage = '/images/placeholder-hero.svg'

  // Reset when src prop changes
  useEffect(() => {
    setImgSrc(src)
    setErrorCount(0)
    setHasError(false)
  }, [src])

  const handleError = useCallback(() => {
    if (errorCount < fallbacks.length) {
      // Try next fallback
      const nextSrc = fallbacks[errorCount]
      setImgSrc(nextSrc)
      setErrorCount(prev => prev + 1)
    } else {
      // Final fallback - use placeholder
      setHasError(true)
      setImgSrc(placeholderImage)
    }
  }, [errorCount, fallbacks, placeholderImage])

  // For JPG/SVG files, use unoptimized to avoid Next.js optimization issues
  const isUnoptimized = imgSrc.endsWith('.svg') || imgSrc.endsWith('.jpg') || imgSrc.endsWith('.jpeg')
  
  // Use placeholder if no src or if error occurred
  const baseSrc = hasError || !src || imgSrc === placeholderImage ? placeholderImage : imgSrc
  
  // Use getImageSrc for basePath handling (already imported at top)
  const finalSrc = getImageSrc(baseSrc, isUnoptimized)
  
  return (
    <Image
      key={finalSrc} // Force remount on src change
      src={finalSrc}
      alt={alt}
      fill
      className="object-cover object-center"
      priority
      sizes="50vw"
      onError={hasError ? undefined : handleError}
      unoptimized={true} // Always use unoptimized for fallback safety
    />
  )
}

// Dynamically import heavy components for code splitting
const RAGWidget = dynamic(() => import('./RAGWidget').then(mod => ({ default: mod.RAGWidget })), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 rounded-lg animate-pulse" />
})

const ReactFlowCanvas = dynamic(() => import('./ReactFlowCanvas').then(mod => ({ default: mod.ReactFlowCanvas })), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 rounded-lg animate-pulse" />
})
import { cn } from '@/lib/utils'
import { blogPosts, getBlogPostBySlug } from '@/app/data/blog'
import { caseStudies, getCaseStudyBySlug } from '@/app/data/case-studies'
import { whitepapers, getWhitepaperBySlug } from '@/app/data/whitepapers'
import { events, getEventBySlug } from '@/app/data/events'
import { getSolutionInteractiveConfig } from '@/app/data/solution-interactive-configs'

type IconKey = 'server' | 'network' | 'database' | 'cloud' | 'code' | 'zap' | 'shield' | 'cpu' | 'storage'

type Capability =
  | string
  | {
      title: string
      description: string
      iconKey?: IconKey
    }

interface DetailPageTemplateProps {
  // Hero Section
  title: string
  tagline?: string
  subtitle?: string
  heroImage?: string
  heroImageAlt?: string
  
  // Page Type (determines heading labels)
  pageType?: 'solution' | 'service' // Defaults to 'solution'
  
  // Overview
  overview: string
  overviewDetails?: string[]
  
  // Key Capabilities
  capabilities: Capability[]
  
  // Architecture Diagram
  architectureDiagram?: {
    type: 'reactflow' | 'svg'
    preset?: 'sonic-deploy' | 'dc-ai-fabric' | 'cloud-hybrid' | 'data-optimization' | 'network-visibility'
    svgPath?: string
    title?: string
    description?: string
  }
  
  // Benefits
  benefits: Array<{
    title: string
    description: string
  }>
  
  // Use Cases
  useCases: Array<{
    title: string
    description: string
    industry?: string
  }>
  
  // Technical Specifications
  technicalSpecs?: {
    title?: string
    items: Array<{
      category: string
      details: string[]
    }>
  }
  
  // Configuration Examples
  configExamples?: Array<{
    title: string
    type: 'terraform' | 'ansible' | 'sonic' | 'kubernetes' | 'helm'
    code: string
    description?: string
  }>
  
  // KPIs
  kpis?: Array<{
    metric: string
    value: string
    description: string
  }>
  
  // Resources
  resources?: Array<{
    title: string
    type: 'whitepaper' | 'case-study' | 'blog' | 'documentation'
    href: string
  }>
  
  // RAG Context
  ragContextId: string
  ragCustomPrompts?: Array<{
    text: string
    category: string
  }>
  
  // Breadcrumbs
  breadcrumbs?: Array<{
    label: string
    href: string
  }>
  
  // CTA
  cta?: {
    title: string
    description: string
    primaryButton: {
      text: string
      href: string
    }
    secondaryButton?: {
      text: string
      href: string
    }
  }
  
  // Show Reading Progress (only for resource detail pages)
  showReadingProgress?: boolean

  // Optional brand showcase sections (e.g., vendor families)
  brandSections?: Array<{
    title: string
    description?: string
    cards: Array<{
      title: string
      description: string
      image?: string
      links?: Array<{ label: string; href: string }>
      viewAll?: { label: string; href: string }
    }>
  }>

  // Optional category/usage sections (e.g., switch types)
  categorySections?: Array<{
    title: string
    description?: string
    cards: Array<{
      title: string
      description: string
      image?: string
      links?: Array<{ label: string; href: string }>
      viewAll?: { label: string; href: string }
    }>
  }>

  // Custom sections to insert before CTA (React nodes)
  customSections?: React.ReactNode

  // Optional custom section titles
  sectionTitles?: {
    overview?: string
    capabilities?: string
    useCases?: string
    benefits?: string
  }
}

const iconMap: Record<string, React.ElementType> = {
  server: Server,
  network: Network,
  database: Database,
  cloud: Cloud,
  code: Code,
  zap: Zap,
  shield: Shield,
  cpu: Server,
  storage: Database,
}

export function DetailPageTemplate({
  title,
  tagline,
  subtitle,
  heroImage,
  heroImageAlt = 'Hero image',
  pageType = 'solution',
  overview,
  overviewDetails = [],
  capabilities,
  architectureDiagram,
  benefits,
  useCases,
  technicalSpecs,
  configExamples = [],
  kpis = [],
  resources = [],
  ragContextId,
  ragCustomPrompts,
  breadcrumbs = [],
  cta,
  showReadingProgress = false,
  brandSections = [],
  categorySections = [],
  customSections,
  sectionTitles,
}: DetailPageTemplateProps) {
  const router = useRouter()
  const [leadOpen, setLeadOpen] = useState(false)
  const [pendingHref, setPendingHref] = useState<string | undefined>(undefined)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeStepId, setActiveStepId] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const openLead = (href?: string) => {
    setPendingHref(href)
    setLeadOpen(true)
  }

  const heroTagline = tagline ?? subtitle ?? ''

  /**
   * Gets hero image with fallback to JPG/SVG if PNG doesn't exist
   * @param imagePath - Original image path (PNG)
   * @returns Image path with fallback
   */
  const getHeroImageWithFallback = (imagePath?: string): string | undefined => {
    if (!imagePath) return undefined
    
    // If it's already a fallback format, return as-is
    if (imagePath.endsWith('.svg') || imagePath.endsWith('.jpg')) {
      return imagePath
    }
    
    // Try PNG first, then JPG, then SVG
    const basePath = imagePath.replace('.png', '')
    const fallbacks = [
      `${basePath}.png`,  // Original PNG
      `${basePath}.jpg`,  // JPG fallback
      `${basePath}.svg`,  // SVG fallback
    ]
    
    // Return the first path - Next.js Image will handle 404 gracefully
    // We'll add onError handler to try fallbacks
    return imagePath
  }

  /**
   * Validates if a resource exists in the data based on its href
   * @param item - Resource item with type and href
   * @returns true if resource exists, false otherwise
   */
  const validateResourceExists = useCallback((item: any): boolean => {
    try {
      // Extract slug from href (e.g., /resources/case-studies/slug-name -> slug-name)
      const hrefMatch = item.href?.match(/\/([^/]+)$/)
      if (!hrefMatch) return false
      
      const slug = hrefMatch[1]
      
      switch (item.type) {
        case 'case-study':
          return !!getCaseStudyBySlug(slug)
        case 'blog':
          return !!getBlogPostBySlug(slug)
        case 'whitepaper':
          return !!getWhitepaperBySlug(slug)
        case 'event':
          return !!getEventBySlug(slug)
        case 'documentation':
          // Documentation items are always valid (they're static pages)
          return true
        default:
          return false
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('Error validating resource:', item.href, error)
      }
      return false
    }
  }, [])

  const resourceItems = useMemo(() => {
    const defaults = [
      ...caseStudies.slice(0, 7).map(cs => ({ ...cs, type: 'case-study' as const, href: `/resources/case-studies/${cs.slug}` })),
      ...whitepapers.slice(0, 7).map(wp => ({ ...wp, type: 'whitepaper' as const, href: `/resources/whitepapers/${wp.slug}` })),
      ...blogPosts.slice(0, 10).map(bp => ({ ...bp, type: 'blog' as const, href: `/resources/blog/${bp.slug}` })),
      ...events.slice(0, 10).map(ev => ({ ...ev, type: 'event' as const, href: `/resources/events/${ev.slug}` })),
    ]

    const provided = resources || []
    const merged = [...provided, ...defaults]

    // First deduplicate
    const deduped = merged.filter((item, index, arr) => {
      const key = `${item.type}-${item.href}`
      return arr.findIndex(x => `${x.type}-${x.href}` === key) === index
    })

    // Then validate that resources actually exist (filter out 404s)
    const validated = deduped.filter(item => validateResourceExists(item))

    // Return validated items (limit to reasonable number)
    return validated.slice(0, Math.max(30, validated.length))
  }, [resources, validateResourceExists])

  /**
   * Extracts meta text (summary/description) from a resource item
   * @param item - Resource item (case study, blog, whitepaper, or event)
   * @returns The first available text field from the item
   */
  /**
   * Extracts meta text (summary/description) from a resource item
   * @param item - Resource item (case study, blog, whitepaper, or event)
   * @returns The first available text field from the item
   */
  const getMetaText = (item: any) =>
    item?.summary ||
    item?.description ||
    item?.overview ||
    item?.body ||
    item?.content ||
    ''

  /**
   * Scrolls a carousel container horizontally by one card width
   * @param type - The carousel type identifier
   * @param direction - Scroll direction ('next' or 'prev')
   */
  const scrollCarousel = (type: string, direction: 'next' | 'prev') => {
    const el = carouselRefs.current[type]
    if (!el) return
    // Card width (320px) + gap (24px) = 344px per card
    const cardWidth = 344
    const delta = direction === 'next' ? cardWidth : -cardWidth
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  /**
   * Scrolls the case studies carousel horizontally by one card width
   * @param direction - Scroll direction ('next' or 'prev')
   */
  const scrollCaseStudies = (direction: 'next' | 'prev') => {
    const el = caseStudiesRef.current
    if (!el) return
    const cardWidth = 340
    const delta = direction === 'next' ? cardWidth : -cardWidth
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {showReadingProgress && <ReadingProgress />}
      <LeadCaptureModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        redirectHref={pendingHref}
        context="detail-page"
        title="Get Started with PalC Networks"
        subtitle="Tell us about your project and we'll connect you with the right expert."
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden min-h-[calc(400px+5rem)] sm:min-h-[calc(400px+6rem)] md:min-h-0">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan/20 opacity-30" />
        
        <div className="container-custom relative z-10 pt-20 pb-12 sm:pt-24 sm:pb-16 md:py-12 lg:py-20 xl:py-32">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={`${crumb.label}-${index}`}>
                  {index > 0 && <span>/</span>}
                  {crumb.href ? (
                    <Link 
                      href={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-500">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <div className={cn(
            "grid grid-cols-1 gap-8 sm:gap-10 lg:gap-12 items-center",
            heroImage ? "lg:grid-cols-2" : "lg:grid-cols-1"
          )}>
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
                {title}
              </h1>
              {heroTagline && (
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  {heroTagline}
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={() => openLead(cta?.primaryButton?.href || '/contact')}
                  className="w-full sm:w-auto min-h-[48px]"
                >
                  {cta?.primaryButton.text || 'Get Started'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Hero Image */}
            {heroImage && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden"
              >
                <HeroImageWithFallback
                  src={heroImage}
                  alt={heroImageAlt}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Brand Sections (optional) */}
      {brandSections.map((section, sectionIdx) => (
        <section key={`brand-${sectionIdx}`} className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">{section.title}</h2>
              {section.description && (
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">{section.description}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.cards.map((card, cardIdx) => {
                const imgSrc = getImageSrc(card.image || '/images/placeholder-hero.svg', true)
                return (
                  <Card key={`${sectionIdx}-${cardIdx}`} className="h-full">
                    <div className="relative h-44 w-full">
                      <Image
                        src={imgSrc}
                        alt={card.title}
                        fill
                        className="object-contain p-4"
                        loading="lazy"
                        unoptimized
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          const fallback = getImageSrc('/images/placeholder-hero.svg', true)
                          if (!target.src.includes('placeholder-hero')) {
                            target.src = fallback
                          }
                        }}
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{card.description}</p>
                      {card.links && card.links.length > 0 && (
                        <div className="space-y-2">
                          {card.links.map((link, linkIdx) => (
                            <Link
                              key={`${cardIdx}-link-${linkIdx}`}
                              href={link.href}
                              className="block text-primary hover:text-primary/80 text-sm font-semibold"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                      {card.viewAll && (
                        <Link
                          href={card.viewAll.href}
                          className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-semibold"
                        >
                          {card.viewAll.label}
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Category/Usage Sections - Scroll Stacking Effect */}
      {categorySections.map((section, sectionIdx) => {
        const cardCount = section.cards.length
        const cardHeight = 220
        const stackOffset = 24
        const scrollSpacePerCard = 300
        
        return (
          <section 
            key={`category-${sectionIdx}`} 
            className="bg-gradient-to-b from-gray-50 to-white"
            style={{ 
              position: 'relative',
              paddingTop: '100px',
              paddingBottom: '100px',
            }}
          >
            <div className="container-custom">
              {/* Two Column Grid */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '80px',
                  alignItems: 'start',
                  minHeight: `${(cardCount * scrollSpacePerCard) + 400}px`,
                }}
              >
                {/* Left Column - Sticky Content */}
                <div
                  style={{
                    position: 'sticky',
                    top: '120px',
                    alignSelf: 'start',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                      {(() => {
                        const words = section.title.split(' ')
                        const totalWords = words.length
                        const gradientStart = Math.max(0, totalWords - 3)
                        
                        return words.map((word, idx) => {
                          const shouldGradient = idx >= gradientStart
                          return shouldGradient ? (
                            <span key={idx}>
                              <span className="bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">
                                {word}
                              </span>
                              {idx < totalWords - 1 && ' '}
                            </span>
                          ) : (
                            <span key={idx}>{word}{idx < totalWords - 1 && ' '}</span>
                          )
                        })
                      })()}
                    </h2>
                    {section.description && (
                      <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                        {section.description}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Right Column - Scroll Stacking Cards */}
                <div 
                  style={{
                    position: 'relative',
                    height: `${cardCount * scrollSpacePerCard}px`,
                  }}
                >
                  {section.cards.map((card, cardIdx) => {
                    const stickyTop = 120 + (cardIdx * stackOffset)
                    const zIndex = cardIdx + 1
                    
                    return (
                      <motion.div
                        key={`${sectionIdx}-${cardIdx}`}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: cardIdx * 0.1 }}
                        style={{
                          position: 'sticky',
                          top: `${stickyTop}px`,
                          zIndex: zIndex,
                          marginBottom: cardIdx < cardCount - 1 ? `${scrollSpacePerCard - cardHeight}px` : '0',
                        }}
                      >
                        <div
                          className="transition-all duration-300"
                          style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            padding: '32px',
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
                            border: '1px solid rgba(0, 0, 0, 0.05)',
                          }}
                        >
                          {/* Step Number Badge */}
                          <div 
                            className="inline-flex items-center justify-center mb-4"
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '10px',
                              background: 'linear-gradient(135deg, #0041C2 0%, #00C2FF 100%)',
                              color: '#fff',
                              fontWeight: '700',
                              fontSize: '16px',
                            }}
                          >
                            {cardIdx + 1}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {card.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-600 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Overview Section - Full Width Layout */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto space-y-10 sm:space-y-12 lg:space-y-16"
          >
            {/* First Row - Full Width Heading and Content */}
            <div className="relative">
              {/* Brand Logo Icon - Top Left */}
              <div className="absolute top-0 left-0">
                <img
                  src={getImageSrc('/images/logo/Logo_Icon_Left.png', true)}
                  alt="PalC Logo Icon"
                  className="w-6 h-6 object-contain"
                  loading="lazy"
                />
              </div>
              
              <div className="space-y-4 sm:space-y-5 lg:space-y-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {sectionTitles?.overview || (pageType === 'service' ? 'Service Overview' : 'Solution Overview')}
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  {overview}
                </p>
              </div>
            </div>

            {/* Second Row - Points on Left, Image on Right */}
            {overviewDetails.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-stretch">
                {/* Left Column - Overview Details Points */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative flex flex-col"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gray-50 rounded-2xl" 
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.02) 24px, rgba(0,0,0,0.02) 25px),
                        repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(0,0,0,0.02) 24px, rgba(0,0,0,0.02) 25px)
                      `,
                      backgroundSize: '24px 24px'
                    }}
                  ></div>
                  
                  {/* Advanced Panel */}
                  <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 sm:p-8 lg:p-10 flex-1 flex flex-col">
                    {/* Brand Logo Icon - Top Right Corner */}
                    <div className="absolute top-6 right-6 opacity-10">
                      <img
                        src={getImageSrc('/images/logo/Logo_Icon_Left.png', true)}
                        alt="PalC Logo Icon"
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Overview Details List - Advanced Design */}
                    <div className="space-y-3 sm:space-y-4 lg:space-y-5 relative z-10">
                      {overviewDetails.map((detail, index) => {
                        // Extract the main title from the detail (text before the colon)
                        const titleMatch = detail.match(/^([^:]+):/)
                        const mainTitle = titleMatch ? titleMatch[1].trim() : detail.split('.')[0]
                        const description = titleMatch ? detail.substring(titleMatch[0].length).trim() : detail
                        
                        // Determine icon based on content
                        const getIcon = () => {
                          const lowerDetail = detail.toLowerCase()
                          if (lowerDetail.includes('planning') || lowerDetail.includes('architecture')) return Target
                          if (lowerDetail.includes('engineering') || lowerDetail.includes('build')) return Code
                          if (lowerDetail.includes('commissioning') || lowerDetail.includes('validation')) return CheckCircle2
                          if (lowerDetail.includes('deployment') || lowerDetail.includes('operations')) return Rocket
                          if (lowerDetail.includes('approach') || lowerDetail.includes('ensures')) return TrendingUp
                          return CheckCircle2
                        }
                        
                        const IconComponent = getIcon()
                        
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className="group relative"
                          >
                            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 rounded-lg hover:bg-gray-50/50 transition-all duration-300 border-l-2 border-transparent hover:border-primary/30">
                              {/* Icon with enhanced styling */}
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-cyan/20 transition-all duration-300">
                                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                                </div>
                              </div>
                              
                              {/* Content with better typography */}
                              <div className="flex-1 min-w-0 pt-0.5">
                                <p className="text-sm sm:text-base font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors duration-300">
                                  {mainTitle}
                                </p>
                                {description && description !== mainTitle && (
                                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                                    {description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative flex flex-col"
                >
                  <div className="relative h-full flex-1 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/50 shadow-xl">
                    {/* Brand Logo Icon - Bottom Right Decorative */}
                    <div className="absolute bottom-6 right-6 opacity-10">
                      <img
                        src={getImageSrc('/images/logo/Logo_Icon_Right.png', true)}
                        alt="PalC Logo Icon"
                        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Placeholder for image - You can replace this with actual image */}
                    {heroImage ? (
                      <img
                        src={getImageSrc(heroImage, true)}
                        alt={heroImageAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-cyan/5 to-primary/5">
                        <div className="text-center p-8">
                          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center">
                            <Target className="w-12 h-12 text-primary/40" />
                          </div>
                          <p className="text-gray-500 text-sm">Image Placeholder</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">{sectionTitles?.capabilities || 'Key Capabilities'}</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive features designed for enterprise-scale infrastructure
            </p>
          </div>
          {capabilities.length === 5 ? (
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {/* First row: 3 items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {capabilities.slice(0, 3).map((capability, index) => {
              const normalized =
                typeof capability === 'string'
                  ? { title: capability, description: '' }
                  : capability || { title: 'Capability', description: '' }
              const key = normalized.iconKey || (normalized.title ? normalized.title.toLowerCase() : 'code')
              const Icon = iconMap[key] || Code
                  
              return (
                <motion.div
                      key={typeof capability === 'string' ? capability : capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Card className="h-full hover:shadow-hover transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{normalized.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {normalized.description && (
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{normalized.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
              
              {/* Second row: 2 items centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                  {capabilities.slice(3, 5).map((capability, index) => {
                    const normalized =
                      typeof capability === 'string'
                        ? { title: capability, description: '' }
                        : capability || { title: 'Capability', description: '' }
                    const key = normalized.iconKey || (normalized.title ? normalized.title.toLowerCase() : 'code')
                    const Icon = iconMap[key] || Code
                    
                    return (
                      <motion.div
                        key={typeof capability === 'string' ? capability : capability.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                      >
                        <Card className="h-full hover:shadow-hover transition-shadow">
                          <CardHeader>
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <CardTitle>{normalized.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {normalized.description && (
                              <p className="text-gray-600">{normalized.description}</p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
            </div>
              </div>
            </div>
          ) : capabilities.length === 7 ? (
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {/* First row: 4 items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {capabilities.slice(0, 4).map((capability, index) => {
              const normalized =
                typeof capability === 'string'
                  ? { title: capability, description: '' }
                  : capability || { title: 'Capability', description: '' }
              const key = normalized.iconKey || (normalized.title ? normalized.title.toLowerCase() : 'code')
              const Icon = iconMap[key] || Code
                  
              return (
                <motion.div
                      key={typeof capability === 'string' ? capability : capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                >
                  <Card className="h-full hover:shadow-hover transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle>{normalized.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {normalized.description && (
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{normalized.description}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
              
              {/* Second row: 3 items centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                  {capabilities.slice(4, 7).map((capability, index) => {
                    const normalized =
                      typeof capability === 'string'
                        ? { title: capability, description: '' }
                        : capability || { title: 'Capability', description: '' }
                    const key = normalized.iconKey || (normalized.title ? normalized.title.toLowerCase() : 'code')
                    const Icon = iconMap[key] || Code
                    
                    return (
                      <motion.div
                        key={typeof capability === 'string' ? capability : capability.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                      >
                        <Card className="h-full hover:shadow-hover transition-shadow">
                          <CardHeader>
                            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <CardTitle>{normalized.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {normalized.description && (
                              <p className="text-gray-600">{normalized.description}</p>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
            </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((capability, index) => {
                const normalized =
                  typeof capability === 'string'
                    ? { title: capability, description: '' }
                    : capability || { title: 'Capability', description: '' }
                const key = normalized.iconKey || (normalized.title ? normalized.title.toLowerCase() : 'code')
                const Icon = iconMap[key] || Code
                
                return (
                  <motion.div
                    key={typeof capability === 'string' ? capability : capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  >
                    <Card className="h-full hover:shadow-hover transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle>{normalized.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {normalized.description && (
                          <p className="text-gray-600">{normalized.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Architecture Diagram */}
      {architectureDiagram && (
        <section id="architecture-section" className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                {architectureDiagram.title || 'Architecture'}
              </h2>
              {architectureDiagram.description && (
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {architectureDiagram.description}
                </p>
              )}
            </div>
            {architectureDiagram.type === 'reactflow' && architectureDiagram.preset ? (
              <ReactFlowCanvas preset={architectureDiagram.preset} />
            ) : architectureDiagram.svgPath ? (
              <div className="relative bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 overflow-hidden">
                <div className="w-full h-auto flex items-center justify-center">
                  <img
                    src={getImageSrc(architectureDiagram.svgPath, true)}
                    alt="Architecture Diagram"
                    className="w-full h-auto max-w-full object-contain"
                    style={{ 
                      imageRendering: 'auto',
                      display: 'block',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                    onError={(e) => {
                      console.error('Failed to load architecture diagram image')
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                    onLoad={() => {
                      console.log('Architecture diagram image loaded successfully')
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Solution Process & Components - Interactive Image with Component List */}
      {(() => {
        const interactiveConfig = getSolutionInteractiveConfig(ragContextId)
        if (!interactiveConfig) return null
        
        return (
          <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-6 sm:mb-8 lg:mb-14"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Solution Process & Components
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
                  Explore the key components and processes that power this solution
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column - Interactive Image (2/3 width) */}
              <div className="lg:col-span-8 order-1 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-800"
                >
                  <div className="aspect-[4/3] sm:aspect-[4/3] lg:aspect-[3/2] relative bg-gray-900 overflow-hidden">
                    {/* Architecture Image */}
                    {ragContextId === 'data-center-modernization-ai-fabrics' ? (
                      <>
                        <div className="absolute inset-0 z-0 flex items-center justify-center">
                          <img
                            src={getImageSrc('/images/solutions/dc-ai-architechture.png', true)}
                            alt="AI-Ready Data Fabric Architecture"
                            className="w-full h-full object-contain"
                            style={{ 
                              imageRendering: 'auto',
                              display: 'block',
                              maxWidth: '100%',
                              maxHeight: '100%'
                            }}
                            onError={(e) => {
                              console.error('Failed to load architecture image')
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                            onLoad={() => {
                              console.log('Architecture image loaded successfully')
                            }}
                          />
                        </div>
                      </>
                    ) : ragContextId === 'network-observability-visibility' ? (
                      <>
                        <div className="absolute inset-0 z-0 flex items-center justify-center">
                          <img
                            src={getImageSrc('/images/solutions/network-observability-visibility-banner.png', true)}
                            alt="Network Visibility and Monitoring Architecture"
                            className="w-full h-full object-contain"
                            style={{ 
                              imageRendering: 'auto',
                              display: 'block',
                              maxWidth: '100%',
                              maxHeight: '100%'
                            }}
                            onError={(e) => {
                              console.error('Failed to load architecture image')
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                            onLoad={() => {
                              console.log('Architecture image loaded successfully')
                            }}
                          />
                        </div>
                      </>
                    ) : heroImage ? (
                      <div className="absolute inset-0 opacity-20 z-0">
                        <HeroImageWithFallback
                          src={heroImage}
                          alt={heroImageAlt}
                        />
                      </div>
                    ) : null}
                    
                    {/* Interactive Points with Hover Tooltips */}
                    {(() => {
                      const componentData = interactiveConfig.components

                      return (
                        <div className="absolute inset-0 z-10">
                          {componentData.map((item) => {
                            const isActive = activeStepId === item.id
                            const wrapperStyle: React.CSSProperties = {
                              position: 'absolute',
                            }
                            
                            // Position configuration - use mobile positions on mobile, desktop positions on desktop
                            if (isMobile) {
                              // Mobile-specific positions (if provided, otherwise fall back to desktop)
                              if (item.topMobile !== undefined) {
                                wrapperStyle.top = item.topMobile
                              } else if (item.top) {
                                wrapperStyle.top = item.top
                              }
                              if (item.bottomMobile !== undefined) {
                                wrapperStyle.bottom = item.bottomMobile
                              } else if (item.bottom) {
                                wrapperStyle.bottom = item.bottom
                              }
                              if (item.leftMobile !== undefined) {
                                wrapperStyle.left = item.leftMobile
                              } else if (item.left) {
                                wrapperStyle.left = item.left
                              }
                              if (item.rightMobile !== undefined) {
                                wrapperStyle.right = item.rightMobile
                              } else if (item.right) {
                                wrapperStyle.right = item.right
                              }
                              if (item.transformMobile !== undefined) {
                                wrapperStyle.transform = item.transformMobile
                              } else if (item.transform) {
                                wrapperStyle.transform = item.transform
                              }
                            } else {
                              // Desktop positions
                              if (item.top) wrapperStyle.top = item.top
                              if (item.bottom) wrapperStyle.bottom = item.bottom
                              if (item.left) wrapperStyle.left = item.left
                              if (item.right) wrapperStyle.right = item.right
                              if (item.transform) wrapperStyle.transform = item.transform
                            }
                            
                            return (
                              <div
                                key={item.id}
                                style={{
                                  ...wrapperStyle,
                                  width: 0,
                                  height: 0,
                                }}
                                className="relative group"
                                onMouseEnter={() => setActiveStepId(item.id)}
                                onMouseLeave={() => {
                                  if (activeStepId !== item.id) {
                                    setActiveStepId(null)
                                  }
                                }}
                              >
                                {/* Interactive Point */}
                                <motion.div
                                  initial={false}
                                  animate={{
                                    opacity: isActive ? 0.4 : 0.3,
                                    scale: isActive ? 1.001 : 1,
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1]
                                  }}
                                  className="absolute top-0 left-0 cursor-pointer"
                                  style={{
                                    transform: 'translate(-50%, -50%)',
                                  }}
                                >
                                  {/* Point Size Configuration */}
                                  {(() => {
                                    // Determine point size - use mobile size on mobile, desktop size on desktop
                                    const effectivePointSize = isMobile && item.pointSizeMobile !== undefined 
                                      ? item.pointSizeMobile 
                                      : item.pointSize
                                    
                                    let pointSizeClass = 'w-3 h-3' // Default: 12px (medium)
                                    let pointSizePx = 12
                                    
                                    if (effectivePointSize) {
                                      if (effectivePointSize === 'small') {
                                        pointSizeClass = 'w-2 h-2'
                                        pointSizePx = 8
                                      } else if (effectivePointSize === 'medium') {
                                        pointSizeClass = 'w-3 h-3'
                                        pointSizePx = 12
                                      } else if (effectivePointSize === 'large') {
                                        pointSizeClass = 'w-4 h-4'
                                        pointSizePx = 16
                                      } else {
                                        // Custom size (e.g., '10px', '14px', '72px', '28px')
                                        pointSizePx = parseInt(effectivePointSize) || 12
                                        pointSizeClass = ''
                                      }
                                    }
                                    
                                    // Determine point shape
                                    const isCircle = !item.pointShape || item.pointShape === 'circle'
                                    const isSquare = item.pointShape === 'square'
                                    const isDiamond = item.pointShape === 'diamond'
                                    const isRectangle = item.pointShape === 'rectangle'
                                    
                                    // For rectangles, check if custom width/height are provided
                                    // Use mobile-specific dimensions on mobile if provided
                                    let rectangleWidth: number | null = null
                                    let rectangleHeight: number | null = null
                                    
                                    if (isRectangle) {
                                      // Use mobile dimensions on mobile if provided, otherwise use desktop
                                      const effectiveWidth = isMobile && item.pointWidthMobile !== undefined 
                                        ? item.pointWidthMobile 
                                        : item.pointWidth
                                      const effectiveHeight = isMobile && item.pointHeightMobile !== undefined 
                                        ? item.pointHeightMobile 
                                        : item.pointHeight
                                      
                                      if (effectiveWidth) {
                                        rectangleWidth = parseInt(effectiveWidth) || null
                                      }
                                      if (effectiveHeight) {
                                        rectangleHeight = parseInt(effectiveHeight) || null
                                      }
                                      // If both custom dimensions provided, use them
                                      // If only one provided, use pointSize for the other
                                      // If neither provided, use default 1.5x ratio
                                      if (rectangleWidth === null && rectangleHeight === null) {
                                        // No custom dimensions, use default ratio
                                        rectangleWidth = pointSizePx * 1.5
                                        rectangleHeight = pointSizePx
                                      } else if (rectangleWidth === null) {
                                        // Only height provided, use pointSize for width
                                        rectangleWidth = pointSizePx * 1.5
                                      } else if (rectangleHeight === null) {
                                        // Only width provided, use pointSize for height
                                        rectangleHeight = pointSizePx
                                      }
                                    }
                                    
                                    const shapeClass = isCircle 
                                      ? 'rounded-full' 
                                      : isSquare 
                                        ? 'rounded-sm' 
                                        : isDiamond
                                          ? 'rotate-45 rounded-sm'
                                          : isRectangle
                                            ? 'rounded'
                                            : 'rounded-full'
                                    
                                    return (
                                      <>
                                        {/* Outer Ring - Pulsing Effect */}
                                        {isActive && (
                                          <motion.div
                                            animate={{
                                              scale: [1, 1.8, 1.8],
                                              opacity: [0.6, 0, 0],
                                            }}
                                            transition={{
                                              duration: 2,
                                              repeat: Infinity,
                                              ease: "easeOut"
                                            }}
                                            className={`absolute ${isCircle ? 'rounded-full' : isSquare ? 'rounded-sm' : isDiamond ? 'rotate-45 rounded-sm' : isRectangle ? 'rounded' : 'rounded-full'} bg-primary border-2 border-primary`}
                                            style={{
                                              width: isRectangle && rectangleWidth ? `${rectangleWidth * 2}px` : `${pointSizePx * 2}px`,
                                              height: isRectangle && rectangleHeight ? `${rectangleHeight * 2}px` : `${pointSizePx * 2}px`,
                                              top: '50%',
                                              left: '50%',
                                              transform: 'translate(-50%, -50%)',
                                            }}
                                          />
                                        )}
                                        
                                        {/* Main Point */}
                                        <div 
                                          className={`${isRectangle ? '' : pointSizeClass} ${shapeClass} transition-all duration-300 ${
                                            isActive
                                              ? 'bg-primary shadow-lg shadow-primary/50'
                                              : 'bg-white border-2 border-primary/60 shadow-md group-hover:bg-primary'
                                          }`}
                                          style={isRectangle ? {
                                            width: rectangleWidth ? `${rectangleWidth}px` : `${pointSizePx * 1.5}px`,
                                            height: rectangleHeight ? `${rectangleHeight}px` : `${pointSizePx}px`
                                          } : pointSizeClass === '' ? {
                                            width: `${pointSizePx}px`,
                                            height: `${pointSizePx}px`
                                          } : {}}
                                        />
                                      </>
                                    )
                                  })()}
                                  
                                  {/* Tooltip - Shows on Hover */}
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                      opacity: isActive ? 1 : 0,
                                      y: isActive ? 0 : 10,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    className={`absolute ${
                                      item.left ? 'left-full ml-3' : 'right-full mr-3'
                                    } top-1/2 -translate-y-1/2 pointer-events-none z-20`}
                                    style={{
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    <div className="relative bg-gray-900 text-white text-sm font-semibold px-3 py-2 rounded-lg shadow-xl border border-gray-700">
                                      {item.label}
                                      {/* Tooltip Arrow */}
                                      <div 
                                        className={`absolute top-1/2 -translate-y-1/2 border-4 border-transparent ${
                                          item.left 
                                            ? '-left-2 border-r-gray-900' 
                                            : '-right-2 border-l-gray-900'
                                        }`}
                                      />
                                    </div>
                                  </motion.div>
                                </motion.div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })()}
                  </div>
              </motion.div>
            </div>

            {/* Right Column - Scrollable Component List (1/3 width) */}
            <div className="lg:col-span-4 flex flex-col lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] order-2 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col h-full lg:h-auto lg:min-h-[600px] bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
              >
                {/* Scrollable List */}
                <div 
                  className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 sm:py-6 space-y-3 sm:space-y-4 custom-scrollbar max-h-[600px] lg:max-h-none" 
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db #f3f4f6'
                  }}
                >
                  {interactiveConfig.accordionSteps.map((step) => {
                    const Icon = step.icon
                    const isActive = activeStepId === step.id
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * interactiveConfig.accordionSteps.indexOf(step) }}
                        className={`group relative rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                            : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md hover:bg-gray-50/50'
                        }`}
                        onMouseEnter={() => setActiveStepId(step.id)}
                        onMouseLeave={() => {
                          if (activeStepId === step.id) {
                            setActiveStepId(null)
                          }
                        }}
                        onClick={() => setActiveStepId(isActive ? null : step.id)}
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Icon Thumbnail */}
                            <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? 'bg-primary/10 border-2 border-primary shadow-sm'
                                : 'bg-gray-100 border-2 border-gray-200 group-hover:bg-primary/5 group-hover:border-primary/30'
                            }`}>
                              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                                isActive ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
                              }`} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-0.5">
                              <div className="flex items-center justify-between gap-2 sm:gap-3">
                                <h4 className={`text-sm sm:text-base font-semibold transition-colors duration-300 leading-tight ${
                                  isActive ? 'text-primary' : 'text-gray-900'
                                }`}>
                                  {step.title}
                                </h4>
                                <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 flex-shrink-0 ${
                                  isActive
                                    ? 'text-primary rotate-90'
                                    : 'text-gray-400 group-hover:text-primary group-hover:translate-x-0.5'
                                }`} />
                              </div>
                              
                              {/* Expanded Details - Only show when active */}
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200"
                                >
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                    {step.details}
                                  </p>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        </section>
        )
      })()}

      {/* Benefits - Advanced Layout */}
      <section className="section-padding bg-gradient-to-br from-white via-primary/5 to-cyan/5 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-cyan/20 border-2 border-primary/30 mb-6 shadow-lg backdrop-blur-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-primary tracking-wide">Key Benefits</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">{sectionTitles?.benefits || 'Why Choose This Solution'}</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Delivering measurable value through proven technology and expertise
            </p>
          </div>
          
          {benefits.length === 5 ? (
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {/* First row: 3 items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-7 lg:p-8 border-2 border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>
                      
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                            {benefit.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed flex-1">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Second row: 2 items centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                  {benefits.slice(3, 5).map((benefit, index) => (
                    <motion.div
                      key={index + 3}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                      className="relative group"
                    >
                      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-7 lg:p-8 border-2 border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>
                        
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                              {benefit.title}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed flex-1">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-7 lg:p-8 border-2 border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl"></div>
                    
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                          {benefit.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed flex-1">
                      {benefit.description}
                    </p>
                  
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>


      {/* Technical Specifications */}
      {technicalSpecs && technicalSpecs.items.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              {technicalSpecs.title || 'Technical Specifications'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSpecs.items.map((spec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{spec.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spec.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-base sm:text-lg text-gray-700 leading-relaxed">
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Configuration Examples */}
      {configExamples.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Configuration Examples</h2>
            <div className="space-y-8">
              {configExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{example.title}</CardTitle>
                        {example.description && (
                          <CardDescription className="mt-2">
                            {example.description}
                          </CardDescription>
                        )}
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {example.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                        <code>{example.code}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4"
                        onClick={() => {
                          navigator.clipboard.writeText(example.code)
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* KPIs */}
      {kpis.length > 0 && (
        <section className="section-padding bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] text-white border-y border-white/5 overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-light">Performance Metrics</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">SLOs, Latency, and Scale Benchmarks</h2>
              <p className="text-sm text-gray-200/80">Designed for AI fabrics, cloud interconnects, and enterprise cores.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:bg-white/10 transition-all duration-300 text-center"
                >
                  <div className="text-4xl font-bold text-primary-light mb-2">{kpi.value}</div>
                  <h3 className="font-semibold text-white mb-2">{kpi.metric}</h3>
                  <p className="text-sm text-gray-200/80">{kpi.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">{sectionTitles?.useCases || 'Use Cases'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => {
              const normalized =
                typeof useCase === 'string'
                  ? { title: useCase, description: '', industry: undefined }
                  : useCase || { title: 'Use Case', description: '', industry: undefined }
              return (
                <Card key={`${normalized.title}-${index}`} className="h-full">
                  <CardHeader>
                    {normalized.industry && (
                      <Badge variant="secondary" className="mb-2 w-fit">
                        {normalized.industry}
                      </Badge>
                    )}
                    <CardTitle>{normalized.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {normalized.description && (
                      <p className="text-gray-600">{normalized.description}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* RAG Widget */}
      <section className="section-padding bg-white border-y border-gray-200">
        <div className="container-custom">
          <RAGWidget contextId={ragContextId} customPrompts={ragCustomPrompts} />
        </div>
      </section>

      {/* Case Studies Carousel */}
      {caseStudies.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] text-white border-y border-white/5 overflow-hidden">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-primary-light mb-2">Case Studies</p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">Proven outcomes from the field</h3>
                <p className="text-sm text-gray-200/80">Deployments across AI fabrics, multi-cloud, automation, and security.</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/30 text-white hover:bg-white/10 bg-white/10 rounded-full shadow-md"
                  onClick={() => scrollCaseStudies('prev')}
                  aria-label="Previous case studies"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-white/30 text-white hover:bg-white/10 bg-white/10 rounded-full shadow-md"
                  onClick={() => scrollCaseStudies('next')}
                  aria-label="Next case studies"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              ref={caseStudiesRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 pr-6 [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
              {caseStudies.slice(0, 8).map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Resources */}
      {resources.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources
                    .filter((r) => Boolean(r.href))
                    .map((resource, index) => (
                      <Card key={index} className="h-full hover:shadow-hover transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="capitalize">
                              {resource.type}
                            </Badge>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" size="sm" asChild className="w-full">
                            <Link href={resource.href!}>
                              View Resource
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
            </div>
          </div>
        </section>
      )}

      {/* Custom Sections (inserted before CTA) */}
      {customSections}

      {/* CTA Section */}
      {cta && (
        <section className="section-padding bg-gradient-primary text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{cta.title}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={() => openLead(cta.primaryButton.href)}
                className="w-full sm:w-auto min-h-[48px]"
              >
                {cta.primaryButton.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              {cta.secondaryButton && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto min-h-[48px]"
                  onClick={() => {
                    if (cta.secondaryButton?.href?.includes('#architecture-section')) {
                      // Scroll to architecture section
                      const scrollToArchitecture = () => {
                        const archSection = document.getElementById('architecture-section')
                        if (archSection) {
                          archSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          return true
                        }
                        return false
                      }
                      
                      // Try immediately
                      if (!scrollToArchitecture()) {
                        // Retry after a short delay if element not found
                        setTimeout(() => {
                          scrollToArchitecture()
                        }, 500)
                      }
                    } else if (cta.secondaryButton?.href) {
                      router.push(cta.secondaryButton.href)
                    }
                  }}
                >
                  {cta.secondaryButton.text}
                </Button>
              )}
            </div>
          </div>
        </section>
      )}
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}
