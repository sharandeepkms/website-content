/**
 * Server-side admin authentication utilities
 * For use in API routes and Server Components only
 */

import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'palc-session-secret-change-in-production'

/**
 * Verify session token
 */
function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp] = decoded.split('-')
    const sessionAge = Date.now() - parseInt(timestamp)
    return sessionAge < 24 * 60 * 60 * 1000 // 24 hours
  } catch {
    return false
  }
}

export interface AuthCheckResult {
  authenticated: boolean
  token: string | null
}

/**
 * Server-side: Check if user is authenticated (for API routes)
 */
export async function checkAdminAuth(request?: NextRequest): Promise<AuthCheckResult> {
  let sessionToken: string | undefined

  // Try reading from Authorization header first
  if (request) {
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      sessionToken = authHeader.substring(7)
    }

    // Fallback: try reading from cookie header
    if (!sessionToken) {
      const cookieHeader = request.headers.get('cookie') || ''
      if (cookieHeader) {
        const parsedCookies = cookieHeader.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=')
          if (key && value) acc[key.trim()] = decodeURIComponent(value.trim())
          return acc
        }, {} as Record<string, string>)
        sessionToken = parsedCookies[ADMIN_SESSION_COOKIE]
      }
    }
  }

  // Fallback: try cookies() API (server-side only)
  if (!sessionToken) {
    try {
      const cookieStore = await cookies()
      sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
    } catch (e) {
      // Ignore error - might be called from client component
    }
  }

  if (sessionToken && verifySessionToken(sessionToken)) {
    return { authenticated: true, token: sessionToken }
  }
  return { authenticated: false, token: null }
}

