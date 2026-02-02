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
  
  // Sort submissions by date (most recent first)
  submissions.sort((a, b) => {
    try {
      const dateA = new Date(a.submittedAt || a.timestamp || a.createdAt || 0).getTime()
      const dateB = new Date(b.submittedAt || b.timestamp || b.createdAt || 0).getTime()
      return dateB - dateA // Most recent first
    } catch {
      return 0
    }
  })
  
  return submissions
}

export async function GET(request: NextRequest) {
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
    
    return NextResponse.json({
      success: true,
      data: submissions,
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch submissions:', error)
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
        error: error?.message,
      },
      { status: 500 }
    )
  }
}

