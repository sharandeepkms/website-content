/**
 * Generate canonical URL for pages
 */
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://palcnetworks.ai'
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // Remove basePath from path if it's already included
  const cleanPath = path.startsWith(basePath) ? path.slice(basePath.length) : path
  
  // Ensure path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  
  // If basePath is root, return baseUrl + path
  if (basePath === '/') {
    return `${baseUrl}${normalizedPath}`
  }
  
  return `${baseUrl}${basePath}${normalizedPath}`
}

