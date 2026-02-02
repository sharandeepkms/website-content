# ChunkLoadError Fix Guide

## Problem
ChunkLoadError occurs when Next.js build chunks are out of sync. This typically happens when:
- Old chunks reference new chunk IDs that don't exist
- Browser cache has stale chunk references
- Build was updated but browser hasn't refreshed
- Server build is out of sync with client expectations

## Error Example
```
ChunkLoadError: Loading chunk 7290 failed.
(error: http://52.21.243.57/palc-staging/_next/static/chunks/7290-3ea8fef67e6b9c9c.js)
```

## Solutions

### 1. Client-Side Fix (Already Implemented)
✅ Added `ChunkErrorHandler` component that automatically reloads the page when chunk errors occur.

**File**: `app/components/ChunkErrorHandler.tsx`
- Detects chunk loading errors (including 400 Bad Request errors)
- Detects React error #423 (hydration/null reference errors)
- Automatically reloads the page to fetch fresh chunks
- Handles both error events and promise rejections
- Monitors failed resource loads
- Prevents multiple reloads

**File**: `app/layout.tsx`
- Added early error detection script in `<head>` that runs before React loads
- Catches chunk errors at the earliest possible moment
- Provides immediate page reload for better user experience

### 2. Server-Side Fix (Required)

#### Step 1: Stop the Server
```bash
# Stop PM2 process (if using PM2)
pm2 stop palc-networks

# Or stop Node process
pkill -f "next start"
```

#### Step 2: Clear Build Cache
```bash
# Remove .next directory
rm -rf .next

# Clear npm cache (optional but recommended)
npm cache clean --force
```

#### Step 3: Rebuild the Application
```bash
# Install dependencies (if needed)
npm install

# Build the application
npm run build

# Start the server
npm start

# Or with PM2
pm2 start npm --name "palc-networks" -- start
```

#### Step 4: Clear Browser Cache
Users should:
1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache
3. Or use incognito/private mode

### 3. Production Server Commands

#### For EC2/Server Deployment:
```bash
# SSH into server
ssh user@52.21.243.57

# Navigate to project directory
cd /path/to/palc-networks

# Stop current process
pm2 stop palc-networks

# Clear build
rm -rf .next

# Rebuild
npm run build

# Restart
pm2 restart palc-networks

# Check logs
pm2 logs palc-networks
```

### 4. Prevent Future Issues

#### Add Build Versioning
Add to `next.config.js`:
```javascript
const nextConfig = {
  // ... existing config
  generateBuildId: async () => {
    // Use timestamp or git commit hash
    return `build-${Date.now()}`
  },
}
```

#### Add Cache Headers
Ensure proper cache headers for `_next/static` files:
- Short cache for chunks (e.g., 1 hour)
- Long cache for assets with content hash

#### Use CDN with Cache Invalidation
If using a CDN:
- Invalidate cache after each deployment
- Use cache tags for selective invalidation

## Testing

After rebuilding:
1. Clear browser cache
2. Visit the site
3. Check browser console for errors
4. Verify all chunks load correctly

## Monitoring

Watch for chunk errors in:
- Browser console
- Server logs
- Error tracking service (if configured)

## Additional Notes

- The `ChunkErrorHandler` component will automatically reload the page when chunk errors are detected
- This provides a better user experience than showing an error
- However, the root cause (out-of-sync builds) should be fixed on the server

