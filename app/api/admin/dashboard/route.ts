import { NextRequest, NextResponse } from 'next/server'
import { getEmailLogs, getEmailLogStats } from '@/app/utils/email-logger'
import { blogPosts } from '@/app/data/blog'
import { events } from '@/app/data/events'
import { whitepapers } from '@/app/data/whitepapers'
import { checkAdminAuth } from '@/app/utils/admin-auth-server'
import fs from 'fs'
import path from 'path'

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
  const authResult = await checkAdminAuth(request)
  if (!authResult.authenticated) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  try {
    // Get email statistics
    let emailStats = { total: 0, success: 0, failed: 0 }
    let emailLogs: any[] = []
    
    try {
      emailStats = getEmailLogStats()
      emailLogs = getEmailLogs(100) // Get last 100 logs
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error fetching email logs:', error)
      }
      // Continue with empty stats if email logs fail
    }
    
    // Calculate email trends (last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    const recentLogs = emailLogs.filter(log => {
      const logDate = new Date(log.timestamp).getTime()
      return logDate >= thirtyDaysAgo
    })
    
    const dailyEmailStats = new Map<string, { success: number; failed: number }>()
    recentLogs.forEach(log => {
      const date = new Date(log.timestamp).toISOString().split('T')[0]
      if (!dailyEmailStats.has(date)) {
        dailyEmailStats.set(date, { success: 0, failed: 0 })
      }
      const stats = dailyEmailStats.get(date)!
      if (log.status === 'success') {
        stats.success++
      } else {
        stats.failed++
      }
    })
    
    // Get form submissions
    let submissions: any[] = []
    try {
      submissions = getFormSubmissions()
      // Sort submissions by date (most recent first)
      submissions.sort((a, b) => {
        try {
          const dateA = new Date(a.submittedAt || a.timestamp || a.createdAt || 0).getTime()
          const dateB = new Date(b.submittedAt || b.timestamp || b.createdAt || 0).getTime()
          return dateB - dateA
        } catch {
          return 0
        }
      })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error fetching form submissions:', error)
      }
      // Continue with empty submissions if fetch fails
    }
    
    const today = new Date().toISOString().split('T')[0]
    const todaySubmissions = submissions.filter(sub => {
      try {
        const timestamp = sub.submittedAt || sub.timestamp || sub.createdAt
        if (!timestamp) return false
        const subDate = new Date(timestamp).toISOString().split('T')[0]
        return subDate === today
      } catch {
        return false
      }
    })
    
    // Count by type
    const submissionsByType = {
      lead: submissions.filter(s => s.type === 'lead').length,
      contact: submissions.filter(s => s.type === 'contact').length,
      career: submissions.filter(s => s.type === 'career').length,
    }
    
    // Get content statistics
    let blogCount = 0
    let eventsCount = 0
    let upcomingEvents = 0
    let whitepapersCount = 0
    let caseStudiesCount = 0
    
    try {
      blogCount = blogPosts?.length || 0
      eventsCount = events?.length || 0
      upcomingEvents = events.filter(event => {
        try {
          const eventDate = new Date(event.date)
          return eventDate >= new Date()
        } catch {
          return false
        }
      }).length
      whitepapersCount = whitepapers?.length || 0
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error fetching content stats:', error)
      }
    }
    
    // Get case studies count (if available)
    try {
      const caseStudiesModule = await import('@/app/data/case-studies')
      caseStudiesCount = caseStudiesModule.caseStudies?.length || 0
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error importing case studies:', error)
      }
      // Ignore if not available
    }
    
    // Recent activity - Include ALL submissions and emails, then sort by timestamp
    // Map ALL emails (not limited)
    const emailActivities = (emailLogs || []).map((log: any) => ({
      type: 'email' as const,
      action: log.status === 'success' ? 'Email sent successfully' : 'Email failed',
      details: log.subject || 'No subject',
      timestamp: log.timestamp || new Date().toISOString(),
      id: log.id || `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      formType: log.formType,
      status: log.status,
    }))
    
    // Map ALL submissions (not limited)
    const submissionActivities = (submissions || []).map((sub: any) => {
      // Handle different timestamp field names
      const timestamp = sub.submittedAt || sub.timestamp || sub.createdAt || new Date().toISOString()
      // Handle different name field names
      const name = sub.name || 
                  (sub.firstName && sub.lastName ? `${sub.firstName} ${sub.lastName}` : null) ||
                  sub.firstName || 
                  sub.email || 
                  'Unknown'
      
      return {
        type: 'submission' as const,
        action: `New ${sub.type || 'form'} form submission`,
        details: name,
        timestamp: timestamp,
        id: sub.id || `submission-${sub.email || Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        formType: sub.type,
        email: sub.email,
      }
    })
    
    // Combine and sort ALL activities by timestamp (most recent first)
    const allActivities = [...emailActivities, ...submissionActivities]
      .sort((a, b) => {
        try {
          const timeA = new Date(a.timestamp).getTime()
          const timeB = new Date(b.timestamp).getTime()
          // Most recent first
          if (timeB > timeA) return 1
          if (timeB < timeA) return -1
          return 0
        } catch {
          return 0
        }
      })
      .slice(0, 50) // Get top 50 most recent (increased limit)
    
    // Email performance by form type
    const emailByFormType = {
      lead: (emailLogs || []).filter((log: any) => log.formType === 'lead').length,
      contact: (emailLogs || []).filter((log: any) => log.formType === 'contact').length,
      career: (emailLogs || []).filter((log: any) => log.formType === 'career').length,
      other: (emailLogs || []).filter((log: any) => !log.formType || !['lead', 'contact', 'career'].includes(log.formType)).length,
    }
    
    return NextResponse.json({
      success: true,
      data: {
        email: {
          total: emailStats.total,
          success: emailStats.success,
          failed: emailStats.failed,
          successRate: emailStats.total > 0 ? ((emailStats.success / emailStats.total) * 100).toFixed(1) : '0',
          dailyStats: Array.from(dailyEmailStats.entries())
            .sort(([dateA], [dateB]) => dateB.localeCompare(dateA)) // Sort by date descending
            .map(([date, stats]) => ({
              date,
              success: stats.success,
              failed: stats.failed,
              total: stats.success + stats.failed,
            })),
          // Add note about form submissions vs emails
          note: submissions.length > emailStats.total 
            ? `${submissions.length - emailStats.total} form submissions may not have emails sent yet`
            : undefined,
          byFormType: emailByFormType,
        },
        forms: {
          total: submissions.length,
          today: todaySubmissions.length,
          byType: submissionsByType,
        },
        content: {
          blog: {
            total: blogCount,
            published: blogCount, // All are published in this setup
          },
          events: {
            total: eventsCount,
            upcoming: upcomingEvents,
          },
          whitepapers: whitepapersCount,
          caseStudies: caseStudiesCount,
        },
        activity: allActivities,
        submissions: submissions, // Include full submissions for analytics
      },
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Dashboard data fetch error:', error)
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch dashboard data',
        error: error?.message,
      },
      { status: 500 }
    )
  }
}

