import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendEmail, getEmailFrom, getEmailRecipients } from '@/app/utils/smtp'
import { getClientIP, getPageURL } from '@/app/utils/request-utils'
import { events } from '@/app/data/events'
import { rateLimit, getClientIP as getIP } from '@/app/utils/rate-limit'
import { getEventRegistrationTemplate } from '@/app/utils/email-templates'

/**
 * Event RSVP API
 * 
 * Handles event registration and RSVP management
 */
interface RSVPRequest {
  eventId: string
  email: string
  name?: string
  company?: string
  phone?: string
  source?: string
}

type EventRegistration = RSVPRequest & {
  id: string
  registeredAt: string
  status: string
  ipAddress?: string
  pageURL?: string
}

const getRegistrationsFilePath = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  return path.join(dataDir, 'event-registrations.json')
}

function loadRegistrations(): EventRegistration[] {
  const filePath = getRegistrationsFilePath()
  if (!fs.existsSync(filePath)) {
    return []
  }
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading registrations:', error)
    return []
  }
}

function saveRegistration(registration: EventRegistration) {
  const registrations = loadRegistrations()
  registrations.push(registration)
  const filePath = getRegistrationsFilePath()
  fs.writeFileSync(filePath, JSON.stringify(registrations, null, 2))
}

async function sendRegistrationEmail(registration: EventRegistration, eventTitle: string) {
  const fromEmail = getEmailFrom()
  const recipients = getEmailRecipients()
  
  // Find event details
  const event = events.find(e => e.id === registration.eventId)

  const subject = `New Event Registration: ${registration.name || registration.email} - ${eventTitle}`
  
  // Notification email to team (plain text for now, can be enhanced later)
  const notificationText = [
    `New event registration received`,
    ``,
    `Event: ${eventTitle}`,
    `Event ID: ${registration.eventId}`,
    ``,
    `Attendee Details:`,
    `Name: ${registration.name || '-'}`,
    `Email: ${registration.email}`,
    `Company: ${registration.company || '-'}`,
    `Phone: ${registration.phone || '-'}`,
    ``,
    `Registration Details:`,
    `Registered At: ${registration.registeredAt}`,
    `Page URL: ${registration.pageURL || 'Unknown'}`,
    `IP Address: ${registration.ipAddress || 'Unknown'}`,
    `Status: ${registration.status}`,
  ].join('\n')

  // Send notification to team
  await sendEmail({
    from: fromEmail,
    to: recipients.to,
    cc: recipients.cc,
    subject,
    text: notificationText,
    formType: 'event-rsvp',
    submissionId: registration.id,
  })

  // Get HTML confirmation template for attendee
  const confirmationTemplate = getEventRegistrationTemplate({
    name: registration.name,
    email: registration.email,
    eventTitle: eventTitle,
    eventDate: event?.date || registration.registeredAt,
    location: event?.location,
  })

  // Send confirmation to attendee
  await sendEmail({
    from: fromEmail,
    to: registration.email,
    subject: `Registration Confirmed: ${eventTitle}`,
    formType: 'event-rsvp',
    submissionId: registration.id,
    text: confirmationTemplate.text,
    html: confirmationTemplate.html,
  })
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 registrations per 15 minutes per IP
    const ip = getIP(request)
    const rateLimitResult = rateLimit(ip, { windowMs: 15 * 60 * 1000, maxRequests: 5 })
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many registration attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '900',
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          },
        }
      )
    }

    const body = await request.json() as RSVPRequest
    const { eventId, email, name, company, phone, source } = body

    if (!eventId || !email) {
      return NextResponse.json(
        { error: 'Event ID and email are required' },
        { status: 400 }
      )
    }

    // Find the event
    const event = events.find(e => e.id === eventId)
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check if event is in the past
    const isPastEvent = new Date(event.date) < new Date()
    if (isPastEvent) {
      return NextResponse.json(
        { error: 'This event has already passed' },
        { status: 400 }
      )
    }

    // Check if user already registered
    const registrations = loadRegistrations()
    const existingRegistration = registrations.find(
      r => r.eventId === eventId && r.email.toLowerCase() === email.toLowerCase()
    )

    if (existingRegistration) {
      return NextResponse.json(
        { 
          success: true,
          message: 'You are already registered for this event',
          alreadyRegistered: true
        },
        { status: 200 }
      )
    }

    // Create registration record
    const registration: EventRegistration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      eventId,
      email: email.trim(),
      name: name?.trim(),
      company: company?.trim(),
      phone: phone?.trim(),
      source: source || 'event-registration',
      registeredAt: new Date().toISOString(),
      status: 'confirmed',
      ipAddress: getClientIP(request),
      pageURL: getPageURL(request),
    }

    // Save registration
    saveRegistration(registration)

    // Send emails
    try {
      await sendRegistrationEmail(registration, event.title)
    } catch (emailError) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Error sending registration emails:', emailError)
      }
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      eventId,
      registrationId: registration.id,
      message: 'Registration successful! You will receive a confirmation email shortly.'
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('RSVP error:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
