# AWS Build Fix - Quick Commands

## Issue 1: .env File Permissions

Fix the permission error:

```bash
# Fix .env file permissions
chmod 644 .env

# Or if you want to be more secure (only owner can read/write)
chmod 600 .env
```

## Issue 2: Module Resolution

The `api-utils.ts` file has been moved from `app/lib/` to `lib/` (root level) to match the `@/lib` path alias.

**After pulling the latest code, run:**

```bash
# Clean build cache
rm -rf .next

# Rebuild
npm run build
```

## Complete Build Process

```bash
# 1. Fix .env permissions
chmod 600 .env

# 2. Clean build cache
rm -rf .next

# 3. Rebuild
npm run build

# 4. Restart PM2
pm2 restart palc-staging
```

## Verify Build Success

After build completes, check:

```bash
# Check if build succeeded
ls -la .next/

# Check PM2 status
pm2 status

# Check logs
pm2 logs palc-staging --lines 50
```

