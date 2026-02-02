import { NextRequest } from 'next/server'

/**
 * Get client IP address from request
 * Handles proxies, load balancers, and direct connections
 */
export function getClientIP(request: NextRequest): string {
  // Check various headers for IP address (in order of preference)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip') // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim()
  }

  // Fallback to request IP (may not work behind proxies)
  return request.ip || 'Unknown'
}

/**
 * Get page URL from request
 * Checks referer header or origin
 */
export function getPageURL(request: NextRequest): string {
  // Check referer header (most reliable)
  const referer = request.headers.get('referer')
  if (referer) {
    return referer
  }

  // Check origin header
  const origin = request.headers.get('origin')
  if (origin) {
    return origin
  }

  // Fallback to URL from request
  const url = request.url
  if (url) {
    try {
      const urlObj = new URL(url)
      return urlObj.origin + urlObj.pathname
    } catch {
      return url
    }
  }

  return 'Unknown'
}

