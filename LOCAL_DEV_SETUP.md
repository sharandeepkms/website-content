# Local Development Setup for Admin Dashboard

## Overview

The admin dashboard supports separate authentication for local development without affecting the production server login flow.

## Authentication Setup

### Option 1: Use Separate Local Password (Recommended)

Create a `.env.local` file in your project root:

```env
# Local Development Admin Password
ADMIN_PASSWORD_LOCAL=your-local-dev-password

# Optional: Local session secret
ADMIN_SESSION_SECRET=local-dev-secret
```

**Benefits:**
- Separate password for local development
- Production password remains unchanged
- Easy to share with team members
- `.env.local` is typically gitignored

### Option 2: Use Default Dev Password

If you don't set `ADMIN_PASSWORD_LOCAL` or `ADMIN_PASSWORD` in development mode, the system will use a default dev password:

**Default Dev Password:** `dev-admin-123`

**Note:** This only works in `NODE_ENV=development` mode and only if no password env vars are set.

### Option 3: Use Production Password Locally

You can also use the same password as production by setting:

```env
ADMIN_PASSWORD=your-production-password
```

## How It Works

1. **Development Mode (`NODE_ENV=development`):**
   - Checks for `ADMIN_PASSWORD_LOCAL` first
   - Falls back to `ADMIN_PASSWORD` if `ADMIN_PASSWORD_LOCAL` is not set
   - Uses default `dev-admin-123` only if neither is set

2. **Production Mode:**
   - Always uses `ADMIN_PASSWORD`
   - Ignores `ADMIN_PASSWORD_LOCAL`

## Session Management

- Local sessions are stored in browser `localStorage`
- Sessions are independent between local and production
- Logging in locally does NOT affect production sessions
- Each environment has its own session tokens

## Testing Locally

1. **Start your local dev server:**
   ```bash
   npm run dev
   ```

2. **Access admin dashboard:**
   - Local: `http://localhost:3000/admin/dashboard` (or your dev port)
   - Production: `https://yourdomain.com/palc-staging/admin/dashboard`

3. **Login:**
   - Use your local password (from `.env.local` or default `dev-admin-123`)
   - Production password will NOT work locally (unless you set `ADMIN_PASSWORD`)

## Environment Variables Priority

In **Development Mode:**
1. `ADMIN_PASSWORD_LOCAL` (highest priority)
2. `ADMIN_PASSWORD`
3. `dev-admin-123` (default fallback)

In **Production Mode:**
1. `ADMIN_PASSWORD` (only option)

## Security Notes

- Never commit `.env.local` to git
- Default dev password (`dev-admin-123`) should only be used in local development
- Production always requires `ADMIN_PASSWORD` to be set
- Sessions are isolated per environment

## Example `.env.local` File

```env
# Local Development Configuration
NODE_ENV=development

# Local Admin Password (different from production)
ADMIN_PASSWORD_LOCAL=my-local-dev-password-2024

# Optional: Local session secret
ADMIN_SESSION_SECRET=local-dev-secret-key

# Other local env vars...
```

## Troubleshooting

**Issue:** Can't login locally
- Check if `.env.local` exists and has `ADMIN_PASSWORD_LOCAL`
- Try default password: `dev-admin-123`
- Restart dev server after changing env vars

**Issue:** Production password works locally
- You might have `ADMIN_PASSWORD` set in your local env
- Remove it or use `ADMIN_PASSWORD_LOCAL` instead

**Issue:** Sessions conflict
- Sessions are stored per domain/port
- Local (`localhost:3000`) and production are separate
- Clear browser localStorage if needed

