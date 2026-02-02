import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'
import { sendEmail, getEmailFrom, getEmailRecipients } from '@/app/utils/smtp'
import { getClientIP, getPageURL } from '@/app/utils/request-utils'
import { getCareerApplicationTemplate } from '@/app/utils/email-templates'

const applicationSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  linkedIn: z.string().url().optional().or(z.literal('')),
  portfolio: z.string().url().optional().or(z.literal('')),
  experience: z.string().min(1),
  currentCompany: z.string().optional(),
  coverLetter: z.string().min(50),
  jobId: z.string().min(1),
  resumeFileName: z.string().optional(),
})

type JobApplication = z.infer<typeof applicationSchema> & {
  id: string
  submittedAt: string
  status: string
  ipAddress?: string
  pageURL?: string
}

async function sendNotificationEmail(application: JobApplication, jobTitle?: string) {
  const fromEmail = getEmailFrom()
  const recipients = getEmailRecipients()

  const subject = `New Job Application: ${application.firstName} ${application.lastName} - ${jobTitle || application.jobId}`
  
  // Get HTML email template
  const template = getCareerApplicationTemplate({
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    phone: application.phone,
    experience: application.experience,
    currentCompany: application.currentCompany,
    linkedIn: application.linkedIn,
    portfolio: application.portfolio,
    coverLetter: application.coverLetter,
    jobId: application.jobId,
    jobTitle: jobTitle,
    resumeFileName: application.resumeFileName,
    submittedAt: application.submittedAt,
    pageURL: application.pageURL,
    ipAddress: application.ipAddress,
    status: application.status,
  })

  // Prepare attachments if resume is available
  const attachments = []
  if (application.resumeFileName) {
    const resumePath = path.join(process.cwd(), 'data', 'resumes', application.resumeFileName)
    if (fs.existsSync(resumePath)) {
      attachments.push({
        filename: application.resumeFileName,
        path: resumePath,
      })
    }
  }

  // Send notification to team with HTML template
  await sendEmail({
    from: fromEmail,
    to: recipients.to,
    cc: recipients.cc,
    subject,
    text: template.text,
    html: template.html,
    attachments: attachments.length > 0 ? attachments : undefined,
    formType: 'career',
    submissionId: application.id,
  })

  // Acknowledge candidate (simple text email for now)
  await sendEmail({
    from: fromEmail,
    to: application.email,
    subject: 'Application Received - PalC Networks',
    formType: 'career',
    submissionId: application.id,
    text: [
      `Hi ${application.firstName},`,
      ``,
      `Thank you for your interest in joining PalC Networks!`,
      ``,
      `We've received your application for ${jobTitle || `position ${application.jobId}`} and our team will review it shortly.`,
      ``,
      `Application Summary:`,
      `Position: ${jobTitle || application.jobId}`,
      `Submitted: ${new Date(application.submittedAt).toLocaleDateString()}`,
      ``,
      `We'll be in touch soon if your profile matches our requirements.`,
      ``,
      `Best regards,`,
      `PalC Networks HR Team`,
    ].join('\n'),
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const linkedIn = formData.get('linkedIn') as string || ''
    const portfolio = formData.get('portfolio') as string || ''
    const experience = formData.get('experience') as string
    const currentCompany = formData.get('currentCompany') as string || ''
    const coverLetter = formData.get('coverLetter') as string
    const jobId = formData.get('jobId') as string
    const resumeFile = formData.get('resume') as File | null

    // Validate input
    const validatedData = applicationSchema.parse({
      firstName,
      lastName,
      email,
      phone,
      linkedIn,
      portfolio,
      experience,
      currentCompany,
      coverLetter,
      jobId,
    })

    // Handle resume file upload
    let resumeFileName = ''
    if (resumeFile && resumeFile.size > 0) {
      const bytes = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Create uploads directory
      const uploadsDir = path.join(process.cwd(), 'data', 'resumes')
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true })
      }
      
      // Generate unique filename
      const timestamp = Date.now()
      const originalName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      resumeFileName = `${timestamp}_${originalName}`
      const resumePath = path.join(uploadsDir, resumeFileName)
      
      // Save file
      await writeFile(resumePath, buffer)
    }
    
    // Extract IP address and page URL
    const ipAddress = getClientIP(request)
    const pageURL = getPageURL(request)
    
    // Add metadata
    const application = {
      id: Date.now().toString(),
      ...validatedData,
      resumeFileName: resumeFileName || undefined,
      submittedAt: new Date().toISOString(),
      status: 'pending_review',
      ipAddress,
      pageURL,
    }

    // Store in JSON file (mock database)
    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, 'job-applications.json')

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Read existing applications
    let applications: JobApplication[] = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      applications = JSON.parse(fileContent) as JobApplication[]
    }

    // Add new application
    applications.push(application)

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2))

    // Get job title for email (optional - can be enhanced to fetch from jobs data)
    const jobTitle = undefined // Can be fetched from jobs data if needed

    // Fire-and-forget email notification
    sendNotificationEmail(application, jobTitle).catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Job application email notification failed:', err)
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: { id: application.id },
    })
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
      console.error('Application error:', error)
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
    message: 'Careers API is working',
    endpoints: {
      POST: '/api/careers/apply - Submit job application',
    },
  })
}

