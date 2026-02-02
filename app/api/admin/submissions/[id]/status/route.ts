import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { checkAdminAuth } from '@/app/utils/admin-auth-server'

/**
 * Update submission status in the appropriate file
 */
function updateSubmissionStatus(submissionId: string, status: string) {
  const dataDir = path.join(process.cwd(), 'data')
  
  // Try each file type
  const files = [
    { path: path.join(dataDir, 'leads.json'), type: 'lead' },
    { path: path.join(dataDir, 'contact-submissions.json'), type: 'contact' },
    { path: path.join(dataDir, 'career-applications.json'), type: 'career' },
  ]
  
  for (const fileInfo of files) {
    if (fs.existsSync(fileInfo.path)) {
      try {
        const submissions = JSON.parse(fs.readFileSync(fileInfo.path, 'utf-8'))
        if (Array.isArray(submissions)) {
          const index = submissions.findIndex((s: any) => s.id === submissionId)
          if (index !== -1) {
            submissions[index].status = status
            fs.writeFileSync(fileInfo.path, JSON.stringify(submissions, null, 2))
            return { ...submissions[index], type: fileInfo.type }
          }
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error(`Failed to update ${fileInfo.path}:`, error)
        }
      }
    }
  }
  
  return null
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const { authenticated } = await checkAdminAuth(request)
  if (!authenticated) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    const body = await request.json()
    const { status } = body
    
    if (!status || !['new', 'processed', 'archived'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      )
    }
    
    const updated = updateSubmissionStatus(params.id, status)
    
    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: updated,
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to update submission status:', error)
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update submission status',
        error: error?.message,
      },
      { status: 500 }
    )
  }
}

