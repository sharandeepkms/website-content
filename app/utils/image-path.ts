/**
 * Image path utility for basePath handling
 * Ensures images work correctly with basePath in Next.js
 * 
 * The basePath is configured in next.config.js and automatically
 * injected as NEXT_PUBLIC_BASE_PATH environment variable.
 */

/**
 * Gets the basePath dynamically from Next.js
 * Reads from __NEXT_DATA__ (client) or process.env (server)
 * The value is set in next.config.js - no hardcoded fallbacks needed
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    // Client-side: Next.js automatically injects __NEXT_DATA__ with basePath
    const nextData = (window as any).__NEXT_DATA__
    if (nextData?.basePath !== undefined) {
      return String(nextData.basePath).trim()
    }
  }
  
  // Server-side or fallback: Use environment variable from next.config.js
  return (process.env.NEXT_PUBLIC_BASE_PATH || '').trim()
}

/**
 * Ensures an image path includes basePath
 * Next.js Image component handles this automatically, but for unoptimized images
 * or direct img tags, we need to prepend basePath manually
 * 
 * @param imagePath - Image path starting with /
 * @returns Image path with basePath prepended if needed
 */
export function withBasePath(imagePath: string): string {
  if (!imagePath) return imagePath
  
  // If path already includes basePath, return as-is
  const basePath = getBasePath()
  if (!basePath || basePath === '/') return imagePath
  if (imagePath.startsWith(basePath)) return imagePath
  
  // Prepend basePath
  // Remove leading slash from basePath if imagePath already has one
  const cleanBasePath = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
  const cleanImagePath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
  
  return `${cleanBasePath}${cleanImagePath}`
}

/**
 * For Next.js Image component
 * 
 * IMPORTANT: Since next.config.js has `images.unoptimized: true`, ALL images
 * are treated as unoptimized. Next.js does NOT automatically prepend basePath
 * for unoptimized images, so we need to manually prepend it for ALL images.
 * 
 * @param imagePath - Image path starting with /
 * @param isUnoptimized - Whether the image uses unoptimized={true} prop
 * @returns Image path with basePath prepended
 */
export function getImageSrc(imagePath: string, isUnoptimized: boolean = false): string {
  if (!imagePath) return imagePath
  
  // Since images.unoptimized: true is set in next.config.js,
  // ALL images are unoptimized, so we always prepend basePath
  // This ensures images work correctly with basePath on both local and server
  return withBasePath(imagePath)
}

