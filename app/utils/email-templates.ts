/**
 * HTML Email Templates
 * Professional, responsive email templates for PalC Networks
 */

interface EmailTemplateData {
  [key: string]: any
}

/**
 * Base HTML email template with PalC branding
 */
function getBaseTemplate(content: string, title?: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title || 'PalC Networks'}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; background: linear-gradient(135deg, #0a1929 0%, #1a365d 100%); border-radius: 8px 8px 0 0;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                      PalC Networks
                    </h1>
                    <p style="margin: 8px 0 0 0; color: #a0d2ff; font-size: 14px; font-weight: 400;">
                      Enterprise Network Solutions & Cloud Services
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e9ecef; border-radius: 0 0 8px 8px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <p style="margin: 0; color: #6c757d; font-size: 14px; line-height: 1.6;">
                      <strong style="color: #212529;">PalC Networks</strong><br>
                      Unit 8, 5th Floor, Navigator Building, ITPB, Whitefield<br>
                      Bangalore, Karnataka 560066, India
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-right: 15px;">
                          <a href="mailto:info@palcnetworks.com" style="color: #0066cc; text-decoration: none; font-size: 13px;">info@palcnetworks.com</a>
                        </td>
                        <td style="padding-right: 15px;">
                          <a href="mailto:sales@palcnetworks.com" style="color: #0066cc; text-decoration: none; font-size: 13px;">sales@palcnetworks.com</a>
                        </td>
                        <td>
                          <a href="tel:+918040905088" style="color: #0066cc; text-decoration: none; font-size: 13px;">+91-80-40905088</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px; border-top: 1px solid #e9ecef; margin-top: 20px;">
                    <p style="margin: 0; color: #6c757d; font-size: 12px; line-height: 1.5;">
                      This email was sent from PalC Networks. If you have any questions, please contact us at 
                      <a href="mailto:support@palcnetworks.com" style="color: #0066cc; text-decoration: none;">support@palcnetworks.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

/**
 * Contact Form Notification Email (to team)
 */
export function getContactNotificationTemplate(data: EmailTemplateData): { html: string; text: string } {
  const html = getBaseTemplate(`
    <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 20px; font-weight: 600;">
      New Contact Form Submission
    </h2>
    
    <p style="margin: 0 0 30px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      You have received a new contact form submission from your website.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid #dee2e6;">
                <strong style="color: #212529; font-size: 14px;">Contact Details</strong>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 12px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.firstName} ${data.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Company:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.company}</td>
                  </tr>
                  ${data.phone ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="tel:${data.phone}" style="color: #0066cc; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Subject:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.subject}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <strong style="color: #212529; font-size: 14px; display: block; margin-bottom: 12px;">Message:</strong>
          <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 15px; background-color: #e7f3ff; border-left: 4px solid #0066cc; border-radius: 4px;">
          <p style="margin: 0; color: #495057; font-size: 13px; line-height: 1.5;">
            <strong>Submission Details:</strong><br>
            Submitted: ${new Date(data.submittedAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}<br>
            ${data.pageURL ? `Page: <a href="${data.pageURL}" style="color: #0066cc; text-decoration: none;">${data.pageURL}</a><br>` : ''}
            ${data.ipAddress ? `IP Address: ${data.ipAddress}` : ''}
          </p>
        </td>
      </tr>
    </table>
  `, 'New Contact Form Submission')

  const text = [
    `New contact form submission`,
    ``,
    `Contact Details:`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    data.phone ? `Phone: ${data.phone}` : '',
    `Subject: ${data.subject}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `Submission Details:`,
    `Submitted: ${new Date(data.submittedAt).toLocaleString()}`,
    data.pageURL ? `Page URL: ${data.pageURL}` : '',
    data.ipAddress ? `IP Address: ${data.ipAddress}` : '',
  ].filter(Boolean).join('\n')

  return { html, text }
}

/**
 * Contact Form Confirmation Email (to user)
 */
export function getContactConfirmationTemplate(data: EmailTemplateData): { html: string; text: string } {
  const html = getBaseTemplate(`
    <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 20px; font-weight: 600;">
      Thank You for Contacting Us!
    </h2>
    
    <p style="margin: 0 0 20px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      Hi ${data.firstName},
    </p>
    
    <p style="margin: 0 0 30px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      We've received your message and our team will get back to you within <strong>24-48 hours</strong>. 
      We appreciate your interest in PalC Networks and look forward to assisting you.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <strong style="color: #212529; font-size: 14px; display: block; margin-bottom: 12px;">Your Message Summary:</strong>
          <p style="margin: 0 0 8px 0; color: #6c757d; font-size: 13px;"><strong>Subject:</strong> ${data.subject}</p>
          <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <a href="https://palcnetworks.com" style="display: inline-block; padding: 12px 30px; background-color: #0066cc; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Visit Our Website
          </a>
        </td>
      </tr>
    </table>
  `, 'Thank You for Contacting PalC Networks')

  const text = [
    `Hi ${data.firstName},`,
    ``,
    `Thanks for reaching out. We've received your message and our team will get back to you soon.`,
    ``,
    `Summary:`,
    `Subject: ${data.subject}`,
    `Message: ${data.message}`,
    ``,
    `— PalC Networks Team`,
  ].join('\n')

  return { html, text }
}

/**
 * Lead Capture Notification Email (to team)
 */
export function getLeadNotificationTemplate(data: EmailTemplateData): { html: string; text: string } {
  const html = getBaseTemplate(`
    <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 20px; font-weight: 600;">
      New Lead Captured
    </h2>
    
    <p style="margin: 0 0 30px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      A new lead has been captured from <strong>${data.source || 'your website'}</strong>.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid #dee2e6;">
                <strong style="color: #212529; font-size: 14px;">Lead Details</strong>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 12px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 120px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  ${data.name ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.name}</td>
                  </tr>
                  ` : ''}
                  ${data.company ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Company:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.company}</td>
                  </tr>
                  ` : ''}
                  ${data.interest ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Interest:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.interest}</td>
                  </tr>
                  ` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 15px; background-color: #e7f3ff; border-left: 4px solid #0066cc; border-radius: 4px;">
          <p style="margin: 0; color: #495057; font-size: 13px; line-height: 1.5;">
            <strong>Submission Details:</strong><br>
            Created: ${new Date(data.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}<br>
            Source: ${data.source || 'Website'}<br>
            ${data.pageURL ? `Page: <a href="${data.pageURL}" style="color: #0066cc; text-decoration: none;">${data.pageURL}</a><br>` : ''}
            ${data.ipAddress ? `IP Address: ${data.ipAddress}` : ''}
          </p>
        </td>
      </tr>
    </table>
  `, 'New Lead Captured')

  const text = [
    `New lead captured from ${data.source || 'unknown source'}`,
    ``,
    `Lead Details:`,
    `Email: ${data.email}`,
    data.name ? `Name: ${data.name}` : '',
    data.company ? `Company: ${data.company}` : '',
    data.interest ? `Interest: ${data.interest}` : '',
    ``,
    `Submission Details:`,
    `Created: ${new Date(data.createdAt).toLocaleString()}`,
    `Page URL: ${data.pageURL || 'Unknown'}`,
    `IP Address: ${data.ipAddress || 'Unknown'}`,
    `Status: ${data.status}`,
  ].filter(Boolean).join('\n')

  return { html, text }
}

/**
 * Lead Capture Confirmation Email (to user)
 */
export function getLeadConfirmationTemplate(data: EmailTemplateData): { html: string; text: string } {
  const html = getBaseTemplate(`
    <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 20px; font-weight: 600;">
      Thank You for Your Interest!
    </h2>
    
    <p style="margin: 0 0 20px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      Hi${data.name ? ` ${data.name}` : ''},
    </p>
    
    <p style="margin: 0 0 30px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      Thanks for your interest in PalC Networks! We've received your details and will reach out with next steps soon.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <a href="https://palcnetworks.com" style="display: inline-block; padding: 12px 30px; background-color: #0066cc; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
            Explore Our Solutions
          </a>
        </td>
      </tr>
    </table>
  `, 'Thank You for Your Interest')

  const text = [
    `Hi${data.name ? ` ${data.name}` : ''},`,
    ``,
    `Thanks for your interest. We've received your details and will reach out with next steps.`,
    ``,
    `Summary:`,
    `Email: ${data.email}`,
    data.interest ? `Interest: ${data.interest}` : '',
    ``,
    `— PalC Networks Team`,
  ].filter(Boolean).join('\n')

  return { html, text }
}

/**
 * Event Registration Confirmation Email
 */
export function getEventRegistrationTemplate(data: EmailTemplateData): { html: string; text: string } {
  const html = getBaseTemplate(`
    <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 20px; font-weight: 600;">
      Event Registration Confirmed!
    </h2>
    
    <p style="margin: 0 0 20px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      Hi${data.name ? ` ${data.name}` : ''},
    </p>
    
    <p style="margin: 0 0 30px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      Thank you for registering for <strong>${data.eventTitle}</strong>! We're excited to have you join us.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <strong style="color: #212529; font-size: 14px; display: block; margin-bottom: 16px;">Event Details:</strong>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 120px;"><strong>Event:</strong></td>
              <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.eventTitle}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Date:</strong></td>
              <td style="padding: 8px 0; color: #212529; font-size: 14px;">${new Date(data.eventDate).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</td>
            </tr>
            ${data.location ? `
            <tr>
              <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Location:</strong></td>
              <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.location}</td>
            </tr>
            ` : ''}
          </table>
        </td>
      </tr>
    </table>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 15px; background-color: #d4edda; border-left: 4px solid #28a745; border-radius: 4px;">
          <p style="margin: 0; color: #155724; font-size: 13px; line-height: 1.5;">
            <strong>Registration Confirmed!</strong><br>
            We've received your registration and will send you event details and reminders closer to the date.
          </p>
        </td>
      </tr>
    </table>
    
    <p style="margin: 30px 0 0 0; color: #495057; font-size: 14px; line-height: 1.6;">
      If you have any questions, please contact us at 
      <a href="mailto:info@palcnetworks.com" style="color: #0066cc; text-decoration: none;">info@palcnetworks.com</a>
    </p>
  `, 'Event Registration Confirmed')

  const text = [
    `Hi${data.name ? ` ${data.name}` : ''},`,
    ``,
    `Thank you for registering for "${data.eventTitle}"!`,
    ``,
    `We've received your registration and will send you event details and reminders closer to the date.`,
    ``,
    `Event Details:`,
    `Event: ${data.eventTitle}`,
    `Date: ${new Date(data.eventDate).toLocaleString()}`,
    data.location ? `Location: ${data.location}` : '',
    ``,
    `If you have any questions, please contact us at info@palcnetworks.com`,
    ``,
    `We look forward to seeing you at the event!`,
    ``,
    `Best regards,`,
    `PalC Networks Team`,
  ].filter(Boolean).join('\n')

  return { html, text }
}

/**
 * Career Application Notification Email (to team)
 */
export function getCareerApplicationTemplate(data: EmailTemplateData): { html: string; text: string } {
  const html = getBaseTemplate(`
    <h2 style="margin: 0 0 20px 0; color: #212529; font-size: 20px; font-weight: 600;">
      New Job Application Received
    </h2>
    
    <p style="margin: 0 0 30px 0; color: #495057; font-size: 15px; line-height: 1.6;">
      A new job application has been submitted for <strong>${data.jobTitle || data.jobId}</strong>.
    </p>
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="padding-bottom: 12px; border-bottom: 1px solid #dee2e6;">
                <strong style="color: #212529; font-size: 14px;">Candidate Details</strong>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 12px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px; width: 140px;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.firstName} ${data.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="tel:${data.phone}" style="color: #0066cc; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Experience:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.experience}</td>
                  </tr>
                  ${data.currentCompany ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Current Company:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">${data.currentCompany}</td>
                  </tr>
                  ` : ''}
                  ${data.linkedIn ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>LinkedIn:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="${data.linkedIn}" style="color: #0066cc; text-decoration: none;" target="_blank">${data.linkedIn}</a>
                    </td>
                  </tr>
                  ` : ''}
                  ${data.portfolio ? `
                  <tr>
                    <td style="padding: 8px 0; color: #6c757d; font-size: 14px;"><strong>Portfolio:</strong></td>
                    <td style="padding: 8px 0; color: #212529; font-size: 14px;">
                      <a href="${data.portfolio}" style="color: #0066cc; text-decoration: none;" target="_blank">${data.portfolio}</a>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    ${data.coverLetter ? `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
      <tr>
        <td style="padding: 20px; background-color: #f8f9fa; border-radius: 6px;">
          <strong style="color: #212529; font-size: 14px; display: block; margin-bottom: 12px;">Cover Letter:</strong>
          <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.coverLetter}</p>
        </td>
      </tr>
    </table>
    ` : ''}
    
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td style="padding: 15px; background-color: #e7f3ff; border-left: 4px solid #0066cc; border-radius: 4px;">
          <p style="margin: 0; color: #495057; font-size: 13px; line-height: 1.5;">
            <strong>Application Details:</strong><br>
            Job ID: ${data.jobId}<br>
            ${data.resumeFileName ? `Resume: ${data.resumeFileName} (attached)` : 'Resume: Not provided'}<br>
            Submitted: ${new Date(data.submittedAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}<br>
            ${data.pageURL ? `Page: <a href="${data.pageURL}" style="color: #0066cc; text-decoration: none;">${data.pageURL}</a><br>` : ''}
            ${data.ipAddress ? `IP Address: ${data.ipAddress}` : ''}
          </p>
        </td>
      </tr>
    </table>
  `, 'New Job Application')

  const text = [
    `New job application received`,
    ``,
    `Candidate Details:`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Experience: ${data.experience}`,
    data.currentCompany ? `Current Company: ${data.currentCompany}` : '',
    ``,
    `Links:`,
    data.linkedIn ? `LinkedIn: ${data.linkedIn}` : '',
    data.portfolio ? `Portfolio: ${data.portfolio}` : '',
    ``,
    data.coverLetter ? `Cover Letter:\n${data.coverLetter}` : '',
    ``,
    `Application Details:`,
    `Job ID: ${data.jobId}`,
    data.resumeFileName ? `Resume: Attached (${data.resumeFileName})` : 'Resume: Not provided',
    `Submitted At: ${data.submittedAt}`,
    data.pageURL ? `Page URL: ${data.pageURL}` : '',
    data.ipAddress ? `IP Address: ${data.ipAddress}` : '',
    `Status: ${data.status}`,
  ].filter(Boolean).join('\n')

  return { html, text }
}

