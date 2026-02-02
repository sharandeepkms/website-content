import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Allow separate password for local development
// In production, use ADMIN_PASSWORD
// In local dev, ADMIN_PASSWORD_LOCAL takes precedence if set
// If neither is set in dev mode, use a default dev password
const getAdminPassword = () => {
  if (process.env.NODE_ENV === 'development') {
    // In development, check for local password first
    if (process.env.ADMIN_PASSWORD_LOCAL) {
      return process.env.ADMIN_PASSWORD_LOCAL
    }
    // If no local password set, use production password if available
    if (process.env.ADMIN_PASSWORD) {
      return process.env.ADMIN_PASSWORD
    }
    // Default dev password (only used if no env vars are set)
    return 'dev-admin-123'
  }
  // Production mode: always use ADMIN_PASSWORD
  return process.env.ADMIN_PASSWORD || 'palc-admin-2024'
}

const ADMIN_PASSWORD = getAdminPassword()
const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'palc-session-secret-change-in-production'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

/**
 * Simple session token generator
 */
function generateSessionToken(): string {
  return Buffer.from(`${Date.now()}-${SESSION_SECRET}`).toString('base64')
}

/**
 * Verify session token
 */
function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp] = decoded.split('-')
    const sessionAge = Date.now() - parseInt(timestamp)
    // Session valid for 24 hours
    return sessionAge < 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid password',
        },
        { status: 401 }
      )
    }

    // Generate session token
    const sessionToken = generateSessionToken()

    // Set cookie (valid for 24 hours)
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token: sessionToken, // Return token so client can store it
    })

    // Set cookie with root path so it works with basePath
    // Also set it without httpOnly for debugging (remove in production if needed)
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/', // Use root path - works with basePath
    })

    // Also set a response header to confirm cookie was set
    response.headers.set('X-Auth-Set', 'true')

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Authentication failed',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Read token from Authorization header (more reliable than cookies with basePath)
  const authHeader = request.headers.get('authorization')
  let sessionToken: string | undefined
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    sessionToken = authHeader.substring(7)
  }
  
  // Fallback: try reading from cookie
  if (!sessionToken) {
    const cookieHeader = request.headers.get('cookie') || ''
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=')
        if (key && value) {
          acc[key.trim()] = decodeURIComponent(value.trim())
        }
        return acc
      }, {} as Record<string, string>)
      sessionToken = cookies[ADMIN_SESSION_COOKIE] || cookies[`${ADMIN_SESSION_COOKIE}_root`]
    }
  }

  // Fallback: try cookies() API
  if (!sessionToken) {
    try {
      const cookieStore = await cookies()
      sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value || 
                     cookieStore.get(`${ADMIN_SESSION_COOKIE}_root`)?.value
    } catch {
      // Ignore error
    }
  }

  if (!sessionToken || !verifySessionToken(sessionToken)) {
    return NextResponse.json(
      {
        authenticated: false,
      },
      { status: 401 }
    )
  }

  return NextResponse.json({
    authenticated: true,
  })
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  })

  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/', // Use root path
  })

  return response
}

