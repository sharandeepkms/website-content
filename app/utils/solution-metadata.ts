import { Metadata } from 'next'
import { getCanonicalUrl } from './canonical'

interface SolutionMetadataOptions {
  title: string
  description: string
  path: string
  ogImage?: string
}

/**
 * Generate consistent metadata for solution pages
 */
export function generateSolutionMetadata({
  title,
  description,
  path,
  ogImage,
}: SolutionMetadataOptions): Metadata {
  const canonicalUrl = getCanonicalUrl(path)
  const fullTitle = `${title} | PalC Networks`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}

