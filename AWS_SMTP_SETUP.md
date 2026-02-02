# AWS SMTP Configuration Guide

This guide explains how to configure SMTP credentials for the PalC Networks website on AWS servers.

## Environment Variables Required

Add these environment variables to your AWS server (EC2, Elastic Beanstalk, ECS, etc.):

### Required Variables

```bash
# SMTP Server Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=marketing@palcnetworks.com
SMTP_PASS=<SET_IN_AWS_ONLY>

# Email Configuration
EMAIL_FROM="PalC Networks <marketing@palcnetworks.com>"
EMAIL_TO=sharandeep.km@palcnetworks.com
EMAIL_CC=marketing@palcnetworks.com
```

### Optional Variables

```bash
# Disable SMTP connection verification (for faster startup)
SMTP_VERIFY=false

# Enable detailed SMTP error logging
SMTP_DEBUG=true
```

## Setting Environment Variables

### Option 1: AWS EC2 / PM2

1. **Create `.env` file** in your project root:
   ```bash
   cd /path/to/your/project
   nano .env
   ```

2. **Add all environment variables** (copy from above)

3. **Load environment variables** in your PM2 ecosystem file or startup script:
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'palc-staging',
       script: './node_modules/next/dist/bin/next',
       args: 'start',
       env_file: '.env', // PM2 will load this automatically
     }]
   }
   ```

   Or use `dotenv`:
   ```bash
   npm install dotenv
   ```

   Then in your startup script:
   ```bash
   #!/bin/bash
   export $(cat .env | xargs)
   pm2 start ecosystem.config.js
   ```

### Option 2: AWS Elastic Beanstalk

1. Go to **Configuration** → **Software** → **Environment Properties**
2. Add each variable:
   - `SMTP_HOST` = `smtp.office365.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `marketing@palcnetworks.com`
   - `SMTP_PASS` = `<SET_IN_AWS_ONLY>`
   - `EMAIL_FROM` = `PalC Networks <marketing@palcnetworks.com>`
   - `EMAIL_TO` = `sharandeep.km@palcnetworks.com`
   - `EMAIL_CC` = `marketing@palcnetworks.com`

### Option 3: AWS ECS / Docker

Add to your `docker-compose.yml` or ECS task definition:

```yaml
environment:
  - SMTP_HOST=smtp.office365.com
  - SMTP_PORT=587
  - SMTP_USER=marketing@palcnetworks.com
  - SMTP_PASS=<SET_IN_AWS_ONLY>
  - EMAIL_FROM=PalC Networks <marketing@palcnetworks.com>
  - EMAIL_TO=sharandeep.km@palcnetworks.com
  - EMAIL_CC=marketing@palcnetworks.com
```

Or use AWS Secrets Manager / Parameter Store for sensitive values.

### Option 4: System Environment Variables (Linux)

Add to `/etc/environment` or create `/etc/systemd/system/your-app.service`:

```ini
[Service]
Environment="SMTP_HOST=smtp.office365.com"
Environment="SMTP_PORT=587"
Environment="SMTP_USER=marketing@palcnetworks.com"
Environment="SMTP_PASS=<SET_IN_AWS_ONLY>"
Environment="EMAIL_FROM=PalC Networks <marketing@palcnetworks.com>"
Environment="EMAIL_TO=sharandeep.km@palcnetworks.com"
Environment="EMAIL_CC=marketing@palcnetworks.com"
```

## Important Notes

### EMAIL_FROM Format

- **With quotes**: `EMAIL_FROM="PalC Networks <marketing@palcnetworks.com>"`
- **Without quotes**: `EMAIL_FROM=PalC Networks <marketing@palcnetworks.com>`
- **Just email**: `EMAIL_FROM=marketing@palcnetworks.com`

The system automatically handles quotes, so any format works.

### Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use AWS Secrets Manager** for production (recommended)
3. **Restrict file permissions**: `chmod 600 .env`
4. **Rotate passwords** regularly
5. **Use IAM roles** when possible instead of hardcoded credentials

### Testing SMTP Configuration

After setting environment variables, restart your application and test:

1. **Submit a form** (contact form, lead capture, job application)
2. **Check email inboxes**:
   - `sharandeep.km@palcnetworks.com` (notification)
   - `marketing@palcnetworks.com` (CC)
   - User's email (acknowledgment)
3. **Check application logs** for SMTP errors:
   ```bash
   pm2 logs palc-staging
   # or
   tail -f /var/log/your-app.log
   ```

### Troubleshooting

#### Emails Not Sending

1. **Check environment variables are loaded**:
   ```bash
   node -e "console.log(process.env.SMTP_HOST)"
   ```

2. **Check SMTP connection**:
   ```bash
   telnet smtp.office365.com 587
   ```

3. **Enable debug mode**:
   ```bash
   export SMTP_DEBUG=true
   ```

4. **Check firewall rules** - Port 587 must be open

#### Office 365 Specific Issues

- **Port 587** uses STARTTLS (not SSL)
- **Port 465** uses SSL/TLS directly
- Ensure **"Less secure app access"** is enabled (if required)
- Check **MFA** - may need app-specific password

#### Common Errors

- `ECONNREFUSED`: SMTP_HOST or SMTP_PORT incorrect
- `EAUTH`: SMTP_USER or SMTP_PASS incorrect
- `ETIMEDOUT`: Firewall blocking port 587
- `ENOTFOUND`: DNS resolution failed for SMTP_HOST

## Features

The SMTP utility automatically:

- ✅ Handles Office 365 TLS configuration
- ✅ Strips quotes from EMAIL_FROM
- ✅ Falls back gracefully if SMTP not configured
- ✅ Verifies connection in production (optional)
- ✅ Handles timeouts and connection errors
- ✅ Logs errors only in development/debug mode
- ✅ Supports attachments (resume uploads)

## Support

If you encounter issues:

1. Check application logs
2. Verify environment variables are set correctly
3. Test SMTP connection manually
4. Enable `SMTP_DEBUG=true` for detailed logs
5. Contact the development team

