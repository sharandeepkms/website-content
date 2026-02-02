# AWS Server Setup - Form Submission Configuration

## Quick Setup Steps

To enable form submissions on your AWS server, you need to set **7 environment variables**.

### Required Environment Variables

Set these on your AWS server:

```bash
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=marketing@palcnetworks.com
SMTP_PASS=YOUR_ACTUAL_PASSWORD_HERE
EMAIL_FROM="PalC Networks <marketing@palcnetworks.com>"
EMAIL_TO=sharandeep.km@palcnetworks.com
EMAIL_CC=marketing@palcnetworks.com
```

**⚠️ IMPORTANT:** Replace `YOUR_ACTUAL_PASSWORD_HERE` with the actual SMTP password.

---

## Setup Methods (Choose One)

### Method 1: PM2 with .env file (Recommended for EC2)

1. **SSH into your AWS EC2 server**
   ```bash
   ssh ubuntu@your-server-ip
   ```

2. **Navigate to your project directory**
   ```bash
   cd /var/www/repos/palc-new-repo
   # or wherever your project is located
   ```

3. **Create `.env` file**
   ```bash
   nano .env
   ```

4. **Paste all environment variables** (replace password):
   ```bash
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_USER=marketing@palcnetworks.com
   SMTP_PASS=your-actual-password-here
   EMAIL_FROM="PalC Networks <marketing@palcnetworks.com>"
   EMAIL_TO=sharandeep.km@palcnetworks.com
   EMAIL_CC=marketing@palcnetworks.com
   ```

5. **Save and exit** (Ctrl+X, then Y, then Enter)

6. **Set secure permissions**
   ```bash
   chmod 600 .env
   ```

7. **Update PM2 ecosystem file** (if using PM2):
   ```bash
   nano ecosystem.config.js
   ```
   
   Make sure it includes:
   ```javascript
   module.exports = {
     apps: [{
       name: 'palc-staging',
       script: './node_modules/next/dist/bin/next',
       args: 'start',
       env_file: '.env', // This loads .env automatically
     }]
   }
   ```

8. **Restart PM2**
   ```bash
   pm2 restart palc-staging
   # or
   pm2 reload ecosystem.config.js
   ```

---

### Method 2: Direct PM2 Environment Variables

If you prefer not to use a `.env` file:

1. **Edit PM2 ecosystem file**
   ```bash
   nano ecosystem.config.js
   ```

2. **Add environment variables directly:**
   ```javascript
   module.exports = {
     apps: [{
       name: 'palc-staging',
       script: './node_modules/next/dist/bin/next',
       args: 'start',
       env: {
         SMTP_HOST: 'smtp.office365.com',
         SMTP_PORT: '587',
         SMTP_USER: 'marketing@palcnetworks.com',
         SMTP_PASS: 'your-actual-password-here',
         EMAIL_FROM: 'PalC Networks <marketing@palcnetworks.com>',
         EMAIL_TO: 'sharandeep.km@palcnetworks.com',
         EMAIL_CC: 'marketing@palcnetworks.com',
       }
     }]
   }
   ```

3. **Restart PM2**
   ```bash
   pm2 restart palc-staging
   ```

---

### Method 3: System Environment Variables (Linux)

1. **Edit systemd service file** (if using systemd):
   ```bash
   sudo nano /etc/systemd/system/palc-staging.service
   ```

2. **Add environment variables:**
   ```ini
   [Service]
   Environment="SMTP_HOST=smtp.office365.com"
   Environment="SMTP_PORT=587"
   Environment="SMTP_USER=marketing@palcnetworks.com"
   Environment="SMTP_PASS=your-actual-password-here"
   Environment="EMAIL_FROM=PalC Networks <marketing@palcnetworks.com>"
   Environment="EMAIL_TO=sharandeep.km@palcnetworks.com"
   Environment="EMAIL_CC=marketing@palcnetworks.com"
   ```

3. **Reload and restart:**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart palc-staging
   ```

---

### Method 4: AWS Elastic Beanstalk

1. Go to **AWS Console** → **Elastic Beanstalk** → Your Environment
2. Click **Configuration** → **Software** → **Environment Properties**
3. Add each variable:
   - `SMTP_HOST` = `smtp.office365.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `marketing@palcnetworks.com`
   - `SMTP_PASS` = `your-actual-password-here`
   - `EMAIL_FROM` = `PalC Networks <marketing@palcnetworks.com>`
   - `EMAIL_TO` = `sharandeep.km@palcnetworks.com`
   - `EMAIL_CC` = `marketing@palcnetworks.com`
4. Click **Apply** (environment will restart automatically)

---

## Verify Setup

After setting environment variables, verify they're loaded:

```bash
# Check if variables are loaded
pm2 logs palc-staging --lines 50 | grep SMTP

# Or test directly
node -e "console.log('SMTP_HOST:', process.env.SMTP_HOST)"
```

---

## Test Form Submission

1. **Submit a form** on your website:
   - Contact form (`/palc-staging/company/contact`)
   - Lead capture form (any "Get Started" button)
   - Job application form (`/palc-staging/company/careers`)

2. **Check email inboxes:**
   - `sharandeep.km@palcnetworks.com` (should receive notification)
   - `marketing@palcnetworks.com` (should receive CC copy)
   - User's email (should receive acknowledgment)

3. **Check server logs** for any errors:
   ```bash
   pm2 logs palc-staging --lines 100
   ```

---

## Troubleshooting

### Emails Not Sending?

1. **Verify environment variables are set:**
   ```bash
   node -e "console.log(process.env.SMTP_HOST, process.env.SMTP_USER)"
   ```

2. **Check SMTP connection:**
   ```bash
   telnet smtp.office365.com 587
   ```
   (Should connect - press Ctrl+] then type `quit` to exit)

3. **Enable debug logging:**
   Add to your environment variables:
   ```bash
   SMTP_DEBUG=true
   ```
   Then check logs: `pm2 logs palc-staging`

4. **Check firewall:**
   Ensure port 587 is open in AWS Security Groups

### Common Errors

- **`ECONNREFUSED`**: Wrong SMTP_HOST or SMTP_PORT
- **`EAUTH`**: Wrong SMTP_USER or SMTP_PASS
- **`ETIMEDOUT`**: Firewall blocking port 587
- **`ENOTFOUND`**: DNS issue with SMTP_HOST

---

## Security Notes

✅ **DO:**
- Use `.env` file with `chmod 600` permissions
- Use AWS Secrets Manager for production (recommended)
- Restart application after setting variables

❌ **DON'T:**
- Commit `.env` files to Git
- Share passwords in plain text
- Use production passwords in development

---

## Quick Reference

**Required Variables:**
- `SMTP_HOST` - SMTP server address
- `SMTP_PORT` - SMTP port (587 for Office 365)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASS` - SMTP password
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Primary recipient
- `EMAIL_CC` - CC recipient

**Optional Variables:**
- `SMTP_DEBUG=true` - Enable detailed logging
- `SMTP_VERIFY=false` - Disable connection verification

---

For detailed troubleshooting, see `AWS_SMTP_SETUP.md`

