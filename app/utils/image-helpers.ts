/**
 * Image helper utilities for validation and fallback handling
 */

import { getImageSrc } from './image-path'

/**
 * Default placeholder images for different content types
 */
export const DEFAULT_IMAGES = {
  blog: '/images/placeholder-hero.svg',
  caseStudy: '/images/placeholder-hero.svg',
  event: '/images/placeholder-hero.svg',
  whitepaper: '/images/placeholder-hero.svg',
  expert: '/images/placeholder-hero.svg',
  partner: '/images/placeholder-hero.svg',
  logo: '/images/placeholder-hero.svg',
  generic: '/images/placeholder-hero.svg',
} as const

/**
 * Get fallback image based on content type
 */
export function getFallbackImage(type: keyof typeof DEFAULT_IMAGES = 'generic'): string {
  return DEFAULT_IMAGES[type] || DEFAULT_IMAGES.generic
}

/**
 * Get image source with fallback
 * Returns the image path if provided, otherwise returns fallback
 */
export function getImageWithFallback(
  imagePath: string | undefined | null,
  fallbackType: keyof typeof DEFAULT_IMAGES = 'generic',
  isUnoptimized: boolean = false
): string {
  if (!imagePath || imagePath.trim() === '') {
    return getImageSrc(getFallbackImage(fallbackType), isUnoptimized)
  }
  return getImageSrc(imagePath, isUnoptimized)
}

/**
 * Get multiple fallback images in order of preference
 * Useful for trying multiple image sources before falling back to default
 */
export function getImageFallbacks(
  primaryImage: string | undefined | null,
  fallbackType: keyof typeof DEFAULT_IMAGES = 'generic',
  isUnoptimized: boolean = false
): string[] {
  const fallbacks: string[] = []
  
  if (primaryImage && primaryImage.trim() !== '') {
    fallbacks.push(getImageSrc(primaryImage, isUnoptimized))
  }
  
  // Add default fallback
  fallbacks.push(getImageSrc(getFallbackImage(fallbackType), isUnoptimized))
  
  return fallbacks
}

/**
 * Check if an image path is valid (not empty and not undefined)
 */
export function isValidImagePath(imagePath: string | undefined | null): boolean {
  return !!(imagePath && imagePath.trim() !== '')
}
