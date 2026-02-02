/**
 * Client-side admin authentication utilities
 * For use in Client Components only
 * Server-side code should use admin-auth-server.ts
 */

import { getApiUrl } from '@/lib/api-utils'

export interface AuthCheckResult {
  authenticated: boolean
  token: string | null
}

/**
 * Client-side: Check if user is authenticated
 * Returns authentication status and token
 */
export async function checkAdminAuth(): Promise<AuthCheckResult> {
  // Client-side only - use localStorage
  if (typeof window === 'undefined') {
    return { authenticated: false, token: null }
  }

  const token = localStorage.getItem('admin_token')
  const authTime = localStorage.getItem('admin_auth_time')
  
  if (!token || !authTime) {
    return { authenticated: false, token: null }
  }
  
  // Check if token is expired (24 hours)
  const age = Date.now() - parseInt(authTime)
  if (age >= 24 * 60 * 60 * 1000) {
    // Expired, clear localStorage
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_auth_time')
    return { authenticated: false, token: null }
  }
  
  // Verify token with server
  try {
    const response = await fetch(getApiUrl('/api/admin/auth'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
    
    if (response.status === 200) {
      const data = await response.json()
      if (data.authenticated === true) {
        return { authenticated: true, token }
      }
    }
  } catch (error) {
    console.error('Auth check failed:', error)
  }
  
  // Not authenticated
  return { authenticated: false, token: null }
}

/**
 * Store authentication token (client-side only)
 */
export function storeAdminToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_auth_time', Date.now().toString())
  }
}

/**
 * Clear authentication token (client-side only)
 */
export function clearAdminAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_auth_time')
  }
}

/**
 * Get authentication token (client-side only)
 */
export function getAdminToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token')
  }
  return null
}

