# BasePath Image Loading Fix

## Issue
When `basePath: '/palc-staging'` is set:
- ✅ PNG images (through Next.js Image optimization) load correctly
- ❌ SVG images (with `unoptimized={true}`) don't load
- ❌ Logo SVG files don't load

## Root Cause
Next.js Image component should automatically handle `basePath`, but there's a known issue with `unoptimized` images where basePath might not be applied correctly in some scenarios.

## Solution
Next.js Image component **should** automatically prepend `basePath` to all image sources, but for unoptimized images, we need to ensure:

1. ✅ All image paths start with `/` (absolute paths)
2. ✅ `basePath` and `assetPrefix` are set correctly in `next.config.js`
3. ✅ Dev server is restarted after config changes
4. ✅ SVG files have `unoptimized={true}` prop

## Testing Steps

1. **Restart Dev Server** (Required after config changes):
   ```bash
   # Stop existing server
   Get-Process -Name node | Stop-Process -Force
   
   # Start fresh
   npm run dev -- --port 3002
   ```

2. **Access with basePath**:
   ```
   http://localhost:3002/palc-staging/
   ```

3. **Check Image URLs in Browser DevTools**:
   - Should see: `http://localhost:3002/palc-staging/images/logo/palc-logo-white.svg`
   - NOT: `http://localhost:3002/images/logo/palc-logo-white.svg`

## Verification

After restart, check:
- Logo loads: `http://localhost:3002/palc-staging/images/logo/palc-logo-white.svg`
- Homepage slider images load
- All SVG icons load
- Resource images load

## If Still Not Working

If images still don't load after restart, we may need to:
1. Check Next.js version compatibility
2. Use a workaround with manual basePath prepending for SVGs
3. Check browser console for actual error messages

