import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://palcnetworks.ai'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function robots(): MetadataRoute.Robots {
  const base = basePath === '/' ? baseUrl : `${baseUrl}${basePath}`
  
  // Disable site indexing for now - disallow all crawlers
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/', // Disallow all pages from being indexed
      },
    ],
    // Sitemap commented out since indexing is disabled
    // sitemap: `${base}/sitemap.xml`,
  }
}

