# Admin Password Setup Guide

## Setting Up Password Protection for Email Logs

**Important:** The `ADMIN_PASSWORD` is **ONLY** needed to **view** the email logs page. Form submissions work fine without it!

- ✅ **Form submissions work** - They use SMTP credentials (SMTP_HOST, SMTP_PORT, etc.)
- ✅ **Emails are logged** - All emails are saved to `data/email-logs.json` automatically
- 🔒 **Viewing logs requires password** - Only the `/admin/email-logs` page needs ADMIN_PASSWORD

The email logs admin page (`/admin/email-logs`) is password protected. Follow these steps to set up the password **only if you want to view the logs**.

### Step 1: Set Environment Variable

Add the `ADMIN_PASSWORD` environment variable to your server:

**Option A: In ecosystem.config.js (Recommended)**

```javascript
module.exports = {
  apps: [{
    name: "palc-staging",
    // ... existing config ...
    env: {
      NODE_ENV: "production",
      // ... existing env vars ...
      ADMIN_PASSWORD: "your-secure-password-here",  // ← Add this
      ADMIN_SESSION_SECRET: "your-random-secret-key-here",  // ← Optional but recommended
    },
  }],
};
```

**Option B: In .env file (Recommended for simplicity)**

Create or edit `.env` file in your project root:

```bash
# Add these lines to your .env file
ADMIN_PASSWORD=your-secure-password-here
ADMIN_SESSION_SECRET=your-random-secret-key-here
```

**Note:** Next.js automatically loads `.env` files, so this will work immediately. Just restart PM2 after adding.

### Step 2: Restart PM2

After adding the environment variable:

```bash
pm2 restart palc-staging
```

### Step 3: Access the Page

1. Navigate to: `http://your-domain/palc-staging/admin/email-logs`
2. Enter the password you set in `ADMIN_PASSWORD`
3. You'll be logged in for 24 hours (session cookie)

## Security Features

- ✅ **Password Protection**: Page requires password to access
- ✅ **Session Management**: 24-hour session cookies
- ✅ **API Protection**: API endpoints also require authentication
- ✅ **Secure Cookies**: HTTP-only cookies in production
- ✅ **Logout Function**: Logout button to end session



**⚠️ IMPORTANT**: Change this default password in production!

## Password Requirements

- Use a strong password (at least 12 characters)
- Include uppercase, lowercase, numbers, and special characters
- Don't use common words or personal information
- Store securely (never commit to Git)

## Session Management

- Sessions are valid for **24 hours**
- Sessions are stored in HTTP-only cookies
- Logout clears the session immediately
- Multiple devices can have separate sessions

## Troubleshooting

### Can't Login

1. **Check environment variable is set:**
   ```bash
   pm2 show palc-staging | grep ADMIN_PASSWORD
   ```

2. **Verify PM2 restarted:**
   ```bash
   pm2 restart palc-staging
   ```

3. **Check browser console** for errors

### Session Expired

- Sessions expire after 24 hours
- Simply login again with the password

### Forgot Password

1. SSH into your server
2. Check `.env` file (most common):
   ```bash
   grep ADMIN_PASSWORD .env
   ```
3. Or check `ecosystem.config.js`:
   ```bash
   grep ADMIN_PASSWORD ecosystem.config.js
   ```
4. Or reset by updating the environment variable and restarting PM2

## Best Practices

1. **Use Strong Password**: Minimum 16 characters with mixed case, numbers, symbols
2. **Rotate Regularly**: Change password every 90 days
3. **Limit Access**: Only share password with authorized personnel
4. **Monitor Access**: Check email logs regularly for suspicious activity
5. **Use HTTPS**: Always access admin pages over HTTPS in production

## Example Strong Password

```
P@lC-N3tw0rk$-2024-Admin!
```

Generate your own secure password using a password manager.

