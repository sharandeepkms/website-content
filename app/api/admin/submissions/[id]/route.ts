import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { checkAdminAuth } from '@/app/utils/admin-auth-server'

/**
 * Get form submissions from saved JSON files
 */
function getFormSubmissions() {
  const dataDir = path.join(process.cwd(), 'data')
  const submissions: any[] = []
  
  // Check for lead submissions
  const leadFile = path.join(dataDir, 'leads.json')
  if (fs.existsSync(leadFile)) {
    try {
      const leads = JSON.parse(fs.readFileSync(leadFile, 'utf-8'))
      if (Array.isArray(leads)) {
        submissions.push(...leads.map((lead: any) => ({ ...lead, type: 'lead' })))
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to read leads.json:', error)
      }
    }
  }
  
  // Check for contact submissions
  const contactFile = path.join(dataDir, 'contact-submissions.json')
  if (fs.existsSync(contactFile)) {
    try {
      const contacts = JSON.parse(fs.readFileSync(contactFile, 'utf-8'))
      if (Array.isArray(contacts)) {
        submissions.push(...contacts.map((contact: any) => ({ ...contact, type: 'contact' })))
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to read contact-submissions.json:', error)
      }
    }
  }
  
  // Check for career applications
  const careerFile = path.join(dataDir, 'career-applications.json')
  if (fs.existsSync(careerFile)) {
    try {
      const careers = JSON.parse(fs.readFileSync(careerFile, 'utf-8'))
      if (Array.isArray(careers)) {
        submissions.push(...careers.map((career: any) => ({ ...career, type: 'career' })))
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to read career-applications.json:', error)
      }
    }
  }
  
  return submissions
}

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

export async function GET(
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
    const submissions = getFormSubmissions()
    const submission = submissions.find(s => s.id === params.id)
    
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: submission,
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch submission:', error)
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submission',
        error: error?.message,
      },
      { status: 500 }
    )
  }
}

