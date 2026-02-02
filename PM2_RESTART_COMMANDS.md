# PM2 Restart Commands - Form Submission Setup

## Your Current Setup ✅

Your `ecosystem.config.js` is correctly configured with all SMTP environment variables.

## Next Steps

### Step 1: Restart PM2 to Load New Environment Variables

SSH into your AWS server and run:

```bash
# Option 1: Restart the specific app
pm2 restart palc-staging

# Option 2: Reload the ecosystem config (recommended)
pm2 delete palc-staging
pm2 start ecosystem.config.js

# Option 3: If you want to reload without downtime
pm2 reload ecosystem.config.js
```

### Step 2: Verify Environment Variables Are Loaded

Check if PM2 loaded the variables:

```bash
# Check PM2 process info
pm2 show palc-staging

# Or check logs for SMTP initialization
pm2 logs palc-staging --lines 50 | grep -i smtp
```

### Step 3: Test Environment Variables

Create a test script to verify variables are accessible:

```bash
# Create test file
cat > test-env.js << 'EOF'
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('EMAIL_TO:', process.env.EMAIL_TO);
console.log('EMAIL_CC:', process.env.EMAIL_CC);
EOF

# Run test
node test-env.js

# Clean up
rm test-env.js
```

### Step 4: Test Form Submission

1. **Submit a form** on your website:
   - Go to: `http://your-domain/palc-staging/company/contact`
   - Fill out and submit the contact form

2. **Check email inboxes:**
   - `sharandeep.km@palcnetworks.com` (should receive notification)
   - `marketing@palcnetworks.com` (should receive CC copy)
   - User's email (should receive acknowledgment)

3. **Check server logs** for any errors:
   ```bash
   pm2 logs palc-staging --lines 100
   ```

### Step 5: Enable Debug Logging (Optional)

If emails aren't sending, enable debug mode:

1. **Add to ecosystem.config.js:**
   ```javascript
   env: {
     // ... existing vars ...
     SMTP_DEBUG: "true",  // Add this line
   }
   ```

2. **Restart PM2:**
   ```bash
   pm2 restart palc-staging
   ```

3. **Check detailed logs:**
   ```bash
   pm2 logs palc-staging --lines 200
   ```

## Troubleshooting

### If Environment Variables Aren't Loading

1. **Check PM2 process environment:**
   ```bash
   pm2 show palc-staging | grep -A 20 "env:"
   ```

2. **Verify ecosystem.config.js syntax:**
   ```bash
   node -c ecosystem.config.js
   ```

3. **Check if PM2 is reading the file:**
   ```bash
   pm2 start ecosystem.config.js --dry-run
   ```

### If Emails Still Not Sending

1. **Test SMTP connection manually:**
   ```bash
   telnet smtp.office365.com 587
   ```
   (Should connect - press Ctrl+] then type `quit` to exit)

2. **Check firewall rules:**
   - Ensure port 587 is open in AWS Security Groups
   - Outbound traffic to `smtp.office365.com:587` should be allowed

3. **Check Office 365 settings:**
   - Verify the password is correct
   - Check if MFA is enabled (may need app-specific password)
   - Ensure "Less secure app access" is enabled (if required)

## Quick Reference

**Your Current Config:**
- ✅ All SMTP variables set in ecosystem.config.js
- ✅ `.env` file created (backup/reference)
- ✅ Port 3001 configured
- ✅ Production environment set

**What to Do:**
1. Restart PM2: `pm2 restart palc-staging`
2. Verify: `pm2 show palc-staging`
3. Test: Submit a form on your website
4. Check: Email inboxes and server logs

## Security Note

Since you have the password in `ecosystem.config.js`, make sure:
- File permissions: `chmod 600 ecosystem.config.js`
- Never commit to Git (should be in `.gitignore`)
- Consider using AWS Secrets Manager for production

