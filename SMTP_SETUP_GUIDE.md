# SMTP Email Setup Guide

## ✅ Current Status

Your website **already has SMTP email functionality** implemented! The following forms will send email notifications when you provide SMTP credentials:

1. **Lead Capture Forms** (`/api/lead`) - Newsletter signups, "Get Started" modals
2. **Contact Forms** (`/api/contact`) - Contact page submissions
3. **Job Applications** (`/api/careers/apply`) - Career application submissions (will be added)

## 📧 Email Notifications Sent

### For Each Form Submission:
1. **Notification Email** → Sent to your team (EMAIL_TO and EMAIL_CC)
2. **Acknowledgment Email** → Sent to the user who submitted the form

## 🔧 Setup Instructions

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the root directory of your project with the following variables:

```env
# SMTP Configuration (Required)
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=marketing@palcnetworks.com
SMTP_PASS=<SET_IN_AWS_ONLY>  # Replace with actual password in AWS environment only

# Email Configuration
EMAIL_FROM="PalC Networks <marketing@palcnetworks.com>"
EMAIL_TO=sharandeep.km@palcnetworks.com
EMAIL_CC=marketing@palcnetworks.com
```

**✅ Your credentials are already configured in the code!** Just create the `.env.local` file with the above content.

### Step 2: Common SMTP Providers

#### Gmail / Google Workspace
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use App Password, not regular password
```
**Note**: For Gmail, you need to:
1. Enable 2-Factor Authentication
2. Generate an "App Password" from Google Account settings
3. Use the App Password (not your regular password)

#### Outlook / Microsoft 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

#### Custom SMTP Server
```env
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587  # or 465 for SSL
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
```

### Step 3: For Production (AWS/Deployment)

Add these environment variables to your hosting platform:

**AWS Elastic Beanstalk / EC2:**
- Add environment variables in the AWS Console
- Or use AWS Systems Manager Parameter Store

**Vercel:**
- Go to Project Settings → Environment Variables
- Add all SMTP variables

**Other Platforms:**
- Add environment variables in your platform's dashboard

## 📋 What Gets Emailed

### Lead Capture Notifications Include:
- Email address
- Name (if provided)
- Company (if provided)
- Source (where the lead came from)
- Interest/Message
- Timestamp
- Status

### Contact Form Notifications Include:
- Full name (First + Last)
- Email address
- Company
- Phone (if provided)
- Subject
- Message content
- Timestamp
- Status

### Job Application Notifications Include:
- Full name
- Email address
- Phone
- LinkedIn/Portfolio links
- Experience level
- Current company
- Cover letter
- Resume file attachment
- Job ID applied for
- Timestamp

## 🔍 Testing

After setting up SMTP credentials:

1. **Test Lead Capture:**
   - Fill out any "Get Started" modal on the website
   - Check your email inbox (EMAIL_TO) for notification
   - Check the user's email for acknowledgment

2. **Test Contact Form:**
   - Go to `/company/contact`
   - Submit the contact form
   - Check your email inbox

3. **Test Job Application:**
   - Go to `/company/careers`
   - Apply for a job
   - Check your email inbox

## 🛡️ Security Notes

- **Never commit `.env.local` to Git** (it's already in `.gitignore`)
- Use **App Passwords** for Gmail instead of regular passwords
- For production, use **environment variables** in your hosting platform
- Consider using **SMTP services** like SendGrid, Mailgun, or AWS SES for better deliverability

## 📊 Data Storage

All form submissions are also saved to JSON files in the `data/` directory:
- `data/leads.json` - Lead captures
- `data/contact-submissions.json` - Contact forms
- `data/job-applications.json` - Job applications
- `data/resumes/` - Uploaded resume files

## 🚨 Troubleshooting

### Emails Not Sending?

1. **Check Environment Variables:**
   - Verify all SMTP variables are set correctly
   - Check for typos in `.env.local`

2. **Check SMTP Credentials:**
   - Verify username/password are correct
   - For Gmail, ensure you're using an App Password

3. **Check Port:**
   - Port 587 (TLS) is most common
   - Port 465 (SSL) may require `secure: true` in code
   - Port 25 is often blocked by ISPs

4. **Check Server Logs:**
   - Look for SMTP errors in console/logs
   - Check if emails are being blocked by spam filters

### Common Errors:

- **"Invalid login"** → Wrong username/password
- **"Connection timeout"** → Wrong SMTP_HOST or port blocked
- **"Authentication failed"** → Need App Password for Gmail
- **"Relay access denied"** → SMTP server doesn't allow sending from your IP

## 📞 Support

If you need help setting up SMTP, provide:
1. Your email provider (Gmail, Outlook, custom)
2. SMTP_HOST and SMTP_PORT
3. Any error messages you're seeing

