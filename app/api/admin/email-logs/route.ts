import { NextRequest, NextResponse } from 'next/server'
import { getEmailLogs, getEmailLogsByStatus } from '@/app/utils/email-logger'
import { checkAdminAuth } from '@/app/utils/admin-auth-server'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await checkAdminAuth(request)
    if (!authResult.authenticated) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized. Please login first.',
        },
        { status: 401 }
      )
    }
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status') as 'success' | 'failed' | null
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    let logs
    if (status === 'success' || status === 'failed') {
      logs = getEmailLogsByStatus(status, limit)
    } else {
      logs = getEmailLogs(limit)
    }

    return NextResponse.json({
      success: true,
      data: logs,
      count: logs.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch email logs',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

