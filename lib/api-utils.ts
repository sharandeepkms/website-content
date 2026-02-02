/**
 * Get the base path for API calls
 * Reads dynamically from next.config.js (via NEXT_PUBLIC_BASE_PATH)
 */
export function getBasePath(): string {
  // Client-side: Try Next.js __NEXT_DATA__ first (most reliable)
  if (typeof window !== 'undefined') {
    try {
      const nextData = (window as any).__NEXT_DATA__
      if (nextData?.basePath !== undefined) {
        return String(nextData.basePath).trim()
      }
    } catch (e) {
      // Ignore errors
    }
  }
  
  // Server-side or fallback: Use environment variable from next.config.js
  return (process.env.NEXT_PUBLIC_BASE_PATH || '').trim()
}

/**
 * Get full API URL with base path
 */
export function getApiUrl(endpoint: string): string {
  const basePath = getBasePath()
  // Remove leading slash from endpoint if present, then add basePath
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
  return basePath ? `${basePath}/${cleanEndpoint}` : `/${cleanEndpoint}`
}

