# BasePath Image Loading Issue - Analysis & Solution

## Problem
When accessing `http://localhost:3002/palc-staging/`:
- ✅ **PNG images load** (going through `/_next/image` optimization API)
- ❌ **SVG files don't load** (logos, icons, unoptimized images)
- ❌ **Logo SVG doesn't load**

## Root Cause Analysis

### Why PNG Images Work:
- PNG images go through Next.js Image Optimization API: `/_next/image?url=...`
- The optimization API automatically handles `basePath`
- URL becomes: `/palc-staging/_next/image?url=%2Fimages%2F...`

### Why SVG Images Don't Work:
- SVG files use `unoptimized={true}` to bypass optimization
- They're served directly from `/public` folder
- Next.js Image component should prepend `basePath`, but there might be an issue

## Solution Options

### Option 1: Restart Dev Server (FIRST TRY)
After changing `next.config.js` with basePath, **the dev server MUST be restarted**:
```bash
# Stop server
Get-Process -Name node | Stop-Process -Force

# Start fresh
npm run dev -- --port 3002
```

### Option 2: Verify basePath in Browser
Check browser console Network tab:
- **Expected**: `http://localhost:3002/palc-staging/images/logo/palc-logo-white.svg`
- **Actual**: `http://localhost:3002/images/logo/palc-logo-white.svg` (missing basePath)

### Option 3: Manual basePath Prepend (If needed)
If Next.js isn't automatically prepending basePath for unoptimized images, we can:
1. Create a helper function to prepend basePath
2. Use it for SVG images specifically
3. Keep PNG images as-is (they work fine)

## Next Steps

1. **Restart dev server** (critical after config change)
2. **Test at** `http://localhost:3002/palc-staging/`
3. **Check browser console** for actual image URLs being requested
4. **Share the actual failing URLs** from browser Network tab

This will help us determine if:
- It's a config issue (needs restart)
- It's a Next.js bug with unoptimized + basePath
- We need a workaround

