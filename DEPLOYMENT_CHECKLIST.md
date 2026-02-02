# Deployment Checklist - Pre-Deployment Verification

## ✅ Image Loading Verification

### Solution Pages Banner Images
All solution pages are configured with correct image paths:

1. ✅ **Data Center Modernization & AI Fabrics**
   - File: `public/images/solutions/data-center-modernization-ai-fabrics-banner.png`
   - Page: `app/solutions/data-center-modernization-ai-fabrics/page.tsx`
   - Status: ✅ Configured

2. ✅ **SONiC & Open Networking**
   - File: `public/images/solutions/sonic-open-networking-banner.png`
   - Page: `app/solutions/sonic-open-networking/page.tsx`
   - Status: ✅ Configured

3. ✅ **Cloud & Hybrid Cloud**
   - File: `public/images/solutions/cloud-hybrid-cloud-banner.png`
   - Page: `app/solutions/cloud-hybrid-cloud/page.tsx`
   - Status: ✅ Configured

4. ✅ **Network Observability & Visibility**
   - File: `public/images/solutions/network-observability-visibility-banner.png`
   - Page: `app/solutions/network-observability-visibility/page.tsx`
   - Status: ✅ Configured

5. ✅ **Network Observability**
   - File: `public/images/solutions/network-observability-visibility-banner.png` (shared)
   - Page: `app/solutions/network-observability/page.tsx`
   - Status: ✅ Configured

6. ✅ **Telecom & Edge**
   - File: `public/images/solutions/telecom-edge-banner.png`
   - Page: `app/solutions/telecom-edge/page.tsx`
   - Status: ✅ Configured

7. ✅ **Identity & Access Management**
   - File: `public/images/solutions/identity-access-management-banner.png`
   - Page: `app/solutions/identity-access-management/page.tsx`
   - Status: ✅ Configured

8. ✅ **IAM (Alternative Route)**
   - File: `public/images/solutions/identity-access-management-banner.png` (shared)
   - Page: `app/solutions/iam/page.tsx`
   - Status: ✅ Configured

9. ⚠️ **Data Center Modernization**
   - File: `public/images/placeholder-hero.svg` (placeholder - no banner image yet)
   - Page: `app/solutions/data-center-modernization/page.tsx`
   - Status: ⚠️ Using placeholder (acceptable)

---

## ✅ Image Path Handling

### BasePath Configuration
- ✅ `next.config.js` configured with `basePath: "/palc-staging"`
- ✅ `images.unoptimized: true` - All images use unoptimized mode
- ✅ `getImageSrc()` utility handles basePath prepending for all images
- ✅ `HeroImageWithFallback` component uses `getImageSrc()` correctly

### Image Component Configuration
- ✅ All solution banner images use `object-cover object-center`
- ✅ All images have `unoptimized={true}` prop
- ✅ Error handling with fallback to placeholder
- ✅ BasePath is prepended automatically via `getImageSrc()`

---

## ✅ Code Quality Checks

### Linting
- ✅ No linting errors found
- ✅ All TypeScript types are correct
- ✅ All imports are valid

### File Structure
- ✅ All solution pages exist and are properly structured
- ✅ Image files exist in `public/images/solutions/` directory
- ✅ All paths use absolute paths starting with `/images/`

---

## ✅ Configuration Files

### next.config.js
- ✅ `basePath: "/palc-staging"` configured
- ✅ `images.unoptimized: true` set
- ✅ No `assetPrefix` (correctly removed to avoid CSS issues)
- ✅ Webpack aliases configured
- ✅ TypeScript and ESLint build errors ignored (for staging)

### Environment Variables
- ✅ `NEXT_PUBLIC_BASE_PATH` can be set to override basePath
- ✅ Defaults to `/palc-staging` if not set

---

## ✅ Image Files Verification

### Existing Banner Images
All required PNG banner images exist:
- ✅ `cloud-hybrid-cloud-banner.png`
- ✅ `data-center-modernization-ai-fabrics-banner.png`
- ✅ `identity-access-management-banner.png`
- ✅ `network-observability-visibility-banner.png`
- ✅ `sonic-open-networking-banner.png`
- ✅ `telecom-edge-banner.png`

### Image Specifications
- ✅ Format: PNG
- ✅ Aspect Ratio: 1:1 (square) for new images
- ✅ Location: `public/images/solutions/`
- ✅ Paths: All use `/images/solutions/` prefix

---

## ✅ Component Verification

### DetailPageTemplate Component
- ✅ `HeroImageWithFallback` component handles basePath correctly
- ✅ Uses `getImageSrc()` for all images
- ✅ Error handling with fallback to placeholder
- ✅ `object-cover object-center` CSS applied
- ✅ `unoptimized={true}` prop set

### Image Path Utilities
- ✅ `app/utils/image-path.ts` handles basePath correctly
- ✅ `getImageSrc()` prepends basePath for all images
- ✅ `withBasePath()` function works correctly
- ✅ Client-side and server-side basePath detection works

---

## 🚀 Deployment Readiness

### Pre-Deployment Checklist
- ✅ All solution pages configured with banner images
- ✅ Image paths are correct and use basePath handling
- ✅ No linting errors
- ✅ All image files exist in public directory
- ✅ BasePath configuration is correct
- ✅ Image loading error handling is in place

### Server Deployment
When deploying to `http://52.21.243.57/palc-staging`:

1. ✅ Ensure `NEXT_PUBLIC_BASE_PATH=/palc-staging` is set in production environment
2. ✅ All image files are deployed to `public/images/solutions/` directory
3. ✅ Build completes successfully
4. ✅ All routes are accessible under `/palc-staging` prefix

### Expected Behavior
- ✅ Images load correctly with `/palc-staging` prefix
- ✅ No 404 errors for images
- ✅ Fallback to placeholder if image fails to load
- ✅ All solution pages display banner images correctly

---

## 📝 Notes

1. **Data Center Modernization** page still uses placeholder image - this is acceptable and will fallback gracefully
2. All other solution pages have proper banner images configured
3. Image loading uses proper basePath handling for staging server
4. Error handling ensures graceful fallback if images fail to load

---

## ✅ Final Verification

All systems ready for deployment to `http://52.21.243.57/palc-staging`:

- ✅ Image paths configured correctly
- ✅ BasePath handling implemented
- ✅ Error handling in place
- ✅ All required files exist
- ✅ No code errors
- ✅ Configuration is correct

**Status: READY FOR DEPLOYMENT** ✅
