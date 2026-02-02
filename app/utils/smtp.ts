/**
 * SMTP Configuration Utility
 * Centralized SMTP setup for AWS/production environments
 */

import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import { logEmailAttempt } from './email-logger'

interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  tls?: {
    ciphers?: string
    rejectUnauthorized?: boolean
  }
  connectionTimeout?: number
  greetingTimeout?: number
  socketTimeout?: number
}

interface EmailOptions {
  from: string
  to: string | string[]
  cc?: string | string[]
  bcc?: string | string[]
  subject: string
  text: string
  html?: string
  attachments?: Array<{
    filename: string
    path: string
  }>
  formType?: 'lead' | 'contact' | 'career' | 'other'
  submissionId?: string
}

/**
 * Get SMTP configuration from environment variables
 * Handles AWS/production environment variables properly
 */
function getSMTPConfig(): SMTPConfig | null {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
  } = process.env

  // Validate required environment variables
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  const port = Number(SMTP_PORT)
  
  // Office 365 / Exchange Online uses port 587 with STARTTLS
  // Port 465 uses SSL/TLS directly
  const isSecurePort = port === 465
  const isOffice365 = SMTP_HOST.includes('office365.com') || SMTP_HOST.includes('outlook.com')

  const config: SMTPConfig = {
    host: SMTP_HOST.trim(),
    port,
    secure: isSecurePort, // true for 465, false for other ports
    auth: {
      user: SMTP_USER.trim(),
      pass: SMTP_PASS.trim(),
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  }

  // Office 365 specific TLS configuration
  if (isOffice365 && !isSecurePort) {
    config.tls = {
      ciphers: 'SSLv3',
      rejectUnauthorized: false, // Office 365 certificates are valid
    }
  }

  return config
}

/**
 * Get email sender address from environment
 * Handles quoted strings and fallbacks properly
 */
export function getEmailFrom(): string {
  const { EMAIL_FROM, SMTP_USER } = process.env
  
  if (EMAIL_FROM) {
    // Remove quotes if present (common in env files)
    const cleaned = EMAIL_FROM.trim().replace(/^["']|["']$/g, '')
    if (cleaned) {
      return cleaned
    }
  }
  
  // Fallback to SMTP_USER if EMAIL_FROM is not set
  return SMTP_USER?.trim() || 'noreply@palcnetworks.com'
}

/**
 * Get email recipient addresses from environment
 */
export function getEmailRecipients(): {
  to: string
  cc?: string
} {
  const {
    EMAIL_TO = 'sharandeep.km@palcnetworks.com',
    EMAIL_CC = 'marketing@palcnetworks.com',
  } = process.env

  return {
    to: EMAIL_TO.trim(),
    cc: EMAIL_CC.trim(),
  }
}

/**
 * Create and verify SMTP transporter
 * Returns null if SMTP is not configured
 */
export async function createSMTPTransporter(): Promise<Transporter | null> {
  const config = getSMTPConfig()
  
  if (!config) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[SMTP] SMTP environment variables not set; email notifications disabled')
    }
    return null
  }

  try {
    const transporter = nodemailer.createTransport(config)
    
    // Verify connection in production (optional - can be disabled for performance)
    // Only verify in production to catch configuration issues early
    if (process.env.NODE_ENV === 'production' && process.env.SMTP_VERIFY !== 'false') {
      try {
        await transporter.verify()
        if (process.env.NODE_ENV === 'development') {
          console.log('[SMTP] Connection verified successfully')
        }
      } catch (verifyError) {
        // Log but don't fail - email might still work
        console.error('[SMTP] Connection verification failed:', verifyError)
        // Continue anyway - verification can fail due to network issues
      }
    }
    
    return transporter
  } catch (error) {
    console.error('[SMTP] Failed to create transporter:', error)
    return null
  }
}

/**
 * Send email using SMTP transporter
 * Handles errors gracefully and returns success status
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const transporter = await createSMTPTransporter()
  
  if (!transporter) {
    // Silently fail if SMTP is not configured (don't break the app)
    return false
  }

  try {
    await transporter.sendMail({
      from: options.from,
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    })
    
    // Log successful email
    logEmailAttempt({
      status: 'success',
      from: options.from,
      to: options.to,
      cc: options.cc,
      subject: options.subject,
      formType: options.formType,
      submissionId: options.submissionId,
    })
    
    return true
  } catch (error: any) {
    // Log error but don't throw - email failures shouldn't break the app
    const errorMessage = error?.message || 'Unknown error'
    const errorCode = error?.code || 'UNKNOWN'
    
    // Log failed email
    logEmailAttempt({
      status: 'failed',
      from: options.from,
      to: options.to,
      cc: options.cc,
      subject: options.subject,
      errorCode,
      errorMessage,
      formType: options.formType,
      submissionId: options.submissionId,
    })
    
    // Only log in development or if explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.SMTP_DEBUG === 'true') {
      console.error('[SMTP] Email send failed:', {
        code: errorCode,
        message: errorMessage,
        to: options.to,
        subject: options.subject,
      })
    }
    
    return false
  }
}

/**
 * Check if SMTP is configured
 */
export function isSMTPConfigured(): boolean {
  return getSMTPConfig() !== null
}

