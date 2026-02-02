# Email Logs Guide - Where to Find Email Activity

## Quick Access Commands

### 1. View PM2 Logs (Real-time)

```bash
# View all logs in real-time
pm2 logs palc-staging

# View last 100 lines
pm2 logs palc-staging --lines 100

# View only error logs
pm2 logs palc-staging --err

# View only output logs
pm2 logs palc-staging --out
```

### 2. View PM2 Log Files (Direct Access)

PM2 stores logs in:
```bash
# Default PM2 log location
~/.pm2/logs/

# View error log file
tail -f ~/.pm2/logs/palc-staging-error.log

# View output log file
tail -f ~/.pm2/logs/palc-staging-out.log

# View last 50 lines of error log
tail -n 50 ~/.pm2/logs/palc-staging-error.log

# Search for SMTP-related logs
grep -i "smtp" ~/.pm2/logs/palc-staging-error.log
grep -i "email" ~/.pm2/logs/palc-staging-error.log
```

### 3. Enable Detailed SMTP Debug Logging

To see detailed email logs, enable debug mode:

**Option A: Add to ecosystem.config.js (Permanent)**

```javascript
module.exports = {
  apps: [{
    name: "palc-staging",
    // ... existing config ...
    env: {
      NODE_ENV: "production",
      SMTP_HOST: "smtp.office365.com",
      SMTP_PORT: "587",
      SMTP_USER: "marketing@palcnetworks.com",
      SMTP_PASS: "your-password",
      EMAIL_FROM: "PalC Networks <marketing@palcnetworks.com>",
      EMAIL_TO: "sharandeep.km@palcnetworks.com",
      EMAIL_CC: "marketing@palcnetworks.com",
      SMTP_DEBUG: "true",  // ← Add this line
    },
  }],
};
```

Then restart:
```bash
pm2 restart palc-staging
```

**Option B: Temporary (Current Session Only)**

```bash
export SMTP_DEBUG=true
pm2 restart palc-staging
```

### 4. What You'll See in Logs

**With SMTP_DEBUG=true enabled, you'll see:**

```
[SMTP] Email send failed: {
  code: 'EAUTH',
  message: 'Invalid login',
  to: 'user@example.com',
  subject: 'New Lead captured'
}
```

**Successful emails (in development mode):**
```
Email sent successfully to user@example.com
```

**SMTP Connection Verification:**
```
[SMTP] Connection verified successfully
```

### 5. Search Logs for Specific Information

```bash
# Find all email-related logs
pm2 logs palc-staging --lines 1000 | grep -i "email\|smtp"

# Find failed email attempts
pm2 logs palc-staging --lines 1000 | grep -i "failed\|error"

# Find successful email sends (if logged)
pm2 logs palc-staging --lines 1000 | grep -i "sent successfully"

# Find logs for a specific email address
pm2 logs palc-staging --lines 1000 | grep "user@example.com"

# Find logs for a specific time period
pm2 logs palc-staging --lines 1000 | grep "2024-01-15"
```

### 6. Clear PM2 Logs (If Needed)

```bash
# Clear all logs
pm2 flush

# Clear logs for specific app
pm2 flush palc-staging
```

### 7. Monitor Logs in Real-Time

```bash
# Watch error log file
tail -f ~/.pm2/logs/palc-staging-error.log

# Watch both error and output logs
tail -f ~/.pm2/logs/palc-staging-error.log ~/.pm2/logs/palc-staging-out.log

# Watch with grep filter (only SMTP-related)
tail -f ~/.pm2/logs/palc-staging-error.log | grep -i "smtp\|email"
```

## Log Locations Summary

| Log Type | Location | Command |
|----------|----------|---------|
| **PM2 Error Logs** | `~/.pm2/logs/palc-staging-error.log` | `tail -f ~/.pm2/logs/palc-staging-error.log` |
| **PM2 Output Logs** | `~/.pm2/logs/palc-staging-out.log` | `tail -f ~/.pm2/logs/palc-staging-out.log` |
| **PM2 Real-time** | PM2 stdout | `pm2 logs palc-staging` |
| **Next.js Build Logs** | Console output | Check during `npm run build` |

## Important Notes

1. **By Default**: Email logs are only shown when:
   - `NODE_ENV=development` OR
   - `SMTP_DEBUG=true` is set

2. **Production Mode**: In production (`NODE_ENV=production`), email errors are logged silently unless `SMTP_DEBUG=true` is enabled.

3. **Log Retention**: PM2 logs are retained based on PM2 configuration. Check with:
   ```bash
   pm2 info palc-staging
   ```

4. **Log Rotation**: PM2 can be configured to rotate logs automatically. Check PM2 config:
   ```bash
   pm2 install pm2-logrotate
   ```

## Troubleshooting Email Issues

### Check if emails are being sent:

```bash
# 1. Enable debug mode
export SMTP_DEBUG=true
pm2 restart palc-staging

# 2. Submit a test form

# 3. Check logs immediately
pm2 logs palc-staging --lines 50 | grep -i "smtp\|email"
```

### Common Log Patterns:

**Connection Error:**
```
[SMTP] Email send failed: { code: 'ECONNREFUSED', message: '...' }
```

**Authentication Error:**
```
[SMTP] Email send failed: { code: 'EAUTH', message: 'Invalid login' }
```

**Timeout Error:**
```
[SMTP] Email send failed: { code: 'ETIMEDOUT', message: '...' }
```

## Quick Reference

```bash
# Most common commands:
pm2 logs palc-staging                    # View real-time logs
pm2 logs palc-staging --lines 100       # Last 100 lines
grep -i "smtp" ~/.pm2/logs/palc-staging-error.log  # Search for SMTP logs
tail -f ~/.pm2/logs/palc-staging-error.log         # Watch error log
```

