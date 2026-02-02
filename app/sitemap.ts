import { MetadataRoute } from 'next'
import { blogPosts } from './data/blog'
import { caseStudies } from './data/case-studies'
import { whitepapers } from './data/whitepapers'
import { events } from './data/events'
import { solutions } from './data/solutions'
import { services } from './data/services'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://palcnetworks.ai'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Helper function to safely parse dates and ensure they're valid
function safeDate(dateString: string | undefined): Date {
  const now = new Date()
  
  // Return current date if no date provided
  if (!dateString || typeof dateString !== 'string' || dateString.trim() === '') {
    return now
  }
  
  // Try to parse the date
  const date = new Date(dateString)
  
  // Check if date is valid (not NaN)
  if (isNaN(date.getTime())) {
    // Try alternative parsing methods
    const timestamp = Date.parse(dateString)
    if (!isNaN(timestamp)) {
      const parsedDate = new Date(timestamp)
      // Double-check the parsed date is valid
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate
      }
    }
    // If all parsing fails, return current date
    return now
  }
  
  // Ensure the date is reasonable (not too far in the past or future)
  const year = date.getFullYear()
  if (year < 2000 || year > 2100) {
    return now
  }
  
  return date
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = basePath === '/' ? baseUrl : `${baseUrl}${basePath}`
  const now = new Date()
  
  // Static pages (excluding admin pages)
  const staticPages = [
    '',
    '/solutions',
    '/products',
    '/services',
    '/resources',
    '/resources/blog',
    '/resources/case-studies',
    '/resources/whitepapers',
    '/resources/events',
    '/about',
    '/contact',
    '/careers',
    '/careers',
  ]

  // Solution pages - dynamically generate from solutions data
  const solutionPages = solutions
    .filter((solution) => solution.slug) // Ensure slug exists
    .map((solution) => `/solutions/${solution.slug}`)
  
  // Also include hardcoded solution pages that might not be in data
  const additionalSolutionPages = [
    '/solutions/data-center-modernization-ai-fabrics',
    '/solutions/sonic-open-networking',
    '/solutions/cloud-hybrid-cloud',
    '/solutions/network-observability-visibility',
    '/solutions/network-observability',
    '/solutions/telecom-edge',
    '/solutions/identity-access-management',
    '/solutions/iam',
    '/solutions/data-center-modernization',
  ]
  
  // Combine and deduplicate solution pages
  const allSolutionPages = Array.from(new Set([...solutionPages, ...additionalSolutionPages]))
  
  // Service pages - dynamically generate from services data
  const servicePages = services
    .filter((service) => service.slug) // Ensure slug exists
    .map((service) => `/services/${service.slug}`)

  // Blog posts - filter out invalid dates
  const blogPages = blogPosts
    .filter((post) => post.date && post.slug) // Ensure date and slug exist
    .map((post) => ({
      url: `${base}/resources/blog/${post.slug}`,
      lastModified: safeDate(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Case studies - filter out invalid dates
  const caseStudyPages = caseStudies
    .filter((study) => study.date && study.slug) // Ensure date and slug exist
    .map((study) => ({
      url: `${base}/resources/case-studies/${study.slug}`,
      lastModified: safeDate(study.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Whitepapers - filter out invalid dates (using lastUpdated field)
  const whitepaperPages = whitepapers
    .filter((paper) => paper.lastUpdated && paper.slug) // Ensure lastUpdated and slug exist
    .map((paper) => ({
      url: `${base}/resources/whitepapers/${paper.slug}`,
      lastModified: safeDate(paper.lastUpdated),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Events - filter out invalid dates
  const eventPages = events
    .filter((event) => event.date && event.slug) // Ensure date and slug exist
    .map((event) => ({
      url: `${base}/resources/events/${event.slug}`,
      lastModified: safeDate(event.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  // Combine all pages (excluding admin pages)
  const allPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: base,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Static pages
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/solutions' || path === '/products' ? 0.9 : 0.8,
    })),
    // Solution pages
    ...allSolutionPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    // Service pages
    ...servicePages.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Dynamic content
    ...blogPages,
    ...caseStudyPages,
    ...whitepaperPages,
    ...eventPages,
  ]

  // Filter out any pages with invalid URLs or admin pages, and ensure all dates are valid
  return allPages
    .filter((page) => {
      // Exclude admin pages, portal pages, API routes, and private pages
      if (page.url.includes('/admin') || 
          page.url.includes('/portal') || 
          page.url.includes('/api/') ||
          page.url.includes('/private/') ||
          page.url.includes('/palc-staging/palc-staging')) { // Prevent double basePath
        return false
      }
      // Ensure URL is valid
      if (!page.url || typeof page.url !== 'string' || page.url.trim() === '') {
        return false
      }
      return true
    })
    .map((page) => {
      // Ensure lastModified is a valid Date object
      let lastModified: Date
      if (page.lastModified instanceof Date) {
        // Already a Date object, validate it
        if (isNaN(page.lastModified.getTime())) {
          lastModified = now
        } else {
          lastModified = page.lastModified
        }
      } else {
        // Try to convert to Date
        const date = new Date(page.lastModified as any)
        if (isNaN(date.getTime())) {
          lastModified = now
        } else {
          lastModified = date
        }
      }
      
      // Final validation - ensure date is reasonable
      const year = lastModified.getFullYear()
      if (year < 2000 || year > 2100) {
        lastModified = now
      }
      
      return {
        ...page,
        lastModified,
      }
    })
    .filter((page) => {
      // Final check - ensure lastModified is valid before returning
      return page.lastModified instanceof Date && !isNaN(page.lastModified.getTime())
    })
}

