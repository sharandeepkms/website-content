import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, getEmailFrom, getEmailRecipients } from '@/app/utils/smtp'
import { getClientIP, getPageURL } from '@/app/utils/request-utils'
import { rateLimit, getClientIP as getIP } from '@/app/utils/rate-limit'
import { getLeadNotificationTemplate, getLeadConfirmationTemplate } from '@/app/utils/email-templates'
import { readData, writeData, isVercel } from '@/app/utils/storage'

const leadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  interest: z.string().optional(),
})

type Lead = z.infer<typeof leadSchema> & {
  id: string
  createdAt: string
  status: string
  ipAddress?: string
  pageURL?: string
}

async function sendNotificationEmail(lead: Lead) {
  const fromEmail = getEmailFrom()
  const recipients = getEmailRecipients()

  const subject = `New Lead captured: ${lead.email}`
  
  // Get HTML email templates
  const notificationTemplate = getLeadNotificationTemplate({
    email: lead.email,
    name: lead.name,
    company: lead.company,
    interest: lead.interest,
    source: lead.source,
    createdAt: lead.createdAt,
    pageURL: lead.pageURL,
    ipAddress: lead.ipAddress,
    status: lead.status,
  })

  // Send notification to team
  await sendEmail({
    from: fromEmail,
    to: recipients.to,
    cc: recipients.cc,
    subject,
    text: notificationTemplate.text,
    html: notificationTemplate.html,
    formType: 'lead',
    submissionId: lead.id,
  })

  // Get confirmation template for user
  const confirmationTemplate = getLeadConfirmationTemplate({
    name: lead.name,
    email: lead.email,
    interest: lead.interest,
  })

  // Acknowledge user
  await sendEmail({
    from: fromEmail,
    to: lead.email,
    subject: 'We received your request at PalC Networks',
    formType: 'lead',
    submissionId: lead.id,
    text: confirmationTemplate.text,
    html: confirmationTemplate.html,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 20 requests per 15 minutes per IP
    const ip = getIP(request)
    const rateLimitResult = rateLimit(ip, { windowMs: 15 * 60 * 1000, maxRequests: 20 })
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '900',
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = leadSchema.parse(body)
    
    // Extract IP address and page URL
    const ipAddress = getClientIP(request)
    const pageURL = getPageURL(request)
    
    // Add metadata
    const lead: Lead = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      status: 'new',
      ipAddress,
      pageURL,
    }

    // Read existing leads and check for duplicates
    const leads = readData<Lead>('leads')
    const existingLead = leads.find((l) => l.email === validatedData.email)
    
    if (existingLead) {
      return NextResponse.json({
        success: true,
        message: 'Email already registered',
        data: { id: existingLead.id, isExisting: true },
      })
    }

    // Add new lead and save
    leads.push(lead)
    const saved = writeData('leads', leads)
    
    if (!saved && !isVercel) {
      console.error('[Lead API] Failed to save lead to storage')
    }

    // Fire-and-forget email notification (works on both AWS and Vercel)
    sendNotificationEmail(lead).catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Lead email notification failed:', err)
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully',
        data: { id: lead.id },
      },
      {
        headers: {
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('Lead capture error:', error)
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Lead API is working',
    endpoints: {
      POST: '/api/lead - Capture lead (newsletter signup, etc.)',
    },
    environment: isVercel ? 'vercel' : 'aws/local',
  })
}
