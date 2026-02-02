import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendEmail, getEmailFrom, getEmailRecipients } from '@/app/utils/smtp'
import { getClientIP, getPageURL } from '@/app/utils/request-utils'
import { rateLimit, getClientIP as getIP } from '@/app/utils/rate-limit'
import { getContactNotificationTemplate, getContactConfirmationTemplate } from '@/app/utils/email-templates'
import { readData, writeData, isVercel } from '@/app/utils/storage'

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(20),
})

type ContactSubmission = z.infer<typeof contactSchema> & {
  id: string
  submittedAt: string
  status: string
  ipAddress?: string
  pageURL?: string
}

async function sendNotificationEmail(submission: ContactSubmission) {
  const fromEmail = getEmailFrom()
  const recipients = getEmailRecipients()

  const subject = `New Contact submission: ${submission.firstName} ${submission.lastName}`
  
  // Get HTML email templates
  const notificationTemplate = getContactNotificationTemplate({
    firstName: submission.firstName,
    lastName: submission.lastName,
    email: submission.email,
    company: submission.company,
    phone: submission.phone,
    subject: submission.subject,
    message: submission.message,
    submittedAt: submission.submittedAt,
    pageURL: submission.pageURL,
    ipAddress: submission.ipAddress,
  })

  // Send notification to team
  await sendEmail({
    from: fromEmail,
    to: recipients.to,
    cc: recipients.cc,
    subject,
    text: notificationTemplate.text,
    html: notificationTemplate.html,
    formType: 'contact',
    submissionId: submission.id,
  })

  // Get confirmation template for user
  const confirmationTemplate = getContactConfirmationTemplate({
    firstName: submission.firstName,
    subject: submission.subject,
    message: submission.message,
  })

  // Acknowledge user
  await sendEmail({
    from: fromEmail,
    to: submission.email,
    subject: 'We received your inquiry at PalC Networks',
    formType: 'contact',
    submissionId: submission.id,
    text: confirmationTemplate.text,
    html: confirmationTemplate.html,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 10 requests per 15 minutes per IP
    const ip = getIP(request)
    const rateLimitResult = rateLimit(ip, { windowMs: 15 * 60 * 1000, maxRequests: 10 })
    
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
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = contactSchema.parse(body)
    
    // Extract IP address and page URL
    const ipAddress = getClientIP(request)
    const pageURL = getPageURL(request)
    
    // Add metadata
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      ...validatedData,
      submittedAt: new Date().toISOString(),
      status: 'new',
      ipAddress,
      pageURL,
    }

    // Read existing submissions and save
    const submissions = readData<ContactSubmission>('contact-submissions')
    submissions.push(submission)
    const saved = writeData('contact-submissions', submissions)
    
    if (!saved && !isVercel) {
      console.error('[Contact API] Failed to save submission to storage')
    }

    // Fire-and-forget notification (works on both AWS and Vercel)
    sendNotificationEmail(submission).catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Contact notification email failed:', err)
      }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        data: { id: submission.id },
      },
      {
        headers: {
          'X-RateLimit-Limit': '10',
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
      console.error('Contact form error:', error)
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
    message: 'Contact API is working',
    endpoints: {
      POST: '/api/contact - Submit contact form',
    },
    environment: isVercel ? 'vercel' : 'aws/local',
  })
}
