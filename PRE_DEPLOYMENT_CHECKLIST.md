# Pre-Deployment Checklist for AWS EC2

## ✅ Configuration Check

Before deploying to `http://52.21.243.57/palc-staging/`, verify:

### 1. Environment Variables
- [ ] Create `.env.production` with:
  ```
  NEXT_PUBLIC_BASE_PATH=/palc-staging
  NODE_ENV=production
  ```

### 2. Build Test
- [ ] Run `npm run build` locally - should complete without errors
- [ ] Check that `.next/` folder is created
- [ ] Verify `standalone/` folder exists (if using standalone output)

### 3. Code Issues Fixed
- [x] ✅ Next.js config updated with `basePath` support
- [x] ✅ Image paths use relative paths (Next.js handles basePath automatically)
- [x] ✅ All routes use Next.js `Link` component (handles basePath automatically)
- [x] ✅ Static assets in `/public` will work with basePath

### 4. Known Working Features
- [x] ✅ Hero section with counting animation
- [x] ✅ Slider with auto-scroll
- [x] ✅ All solution pages with hero images
- [x] ✅ Image fallbacks working
- [x] ✅ Responsive design
- [x] ✅ All navigation links

### 5. Potential Issues to Watch

#### Images
- All images in `/public/images/` will automatically work with basePath
- External images (Unsplash) will work as-is
- SVG fallbacks are in place

#### Routes
- All routes using Next.js `Link` will work automatically
- API routes will work at `/palc-staging/api/*`

#### Static Assets
- CSS/JS bundles will be served from `/palc-staging/_next/static/`
- Fonts will work automatically

## 🚀 Quick Deploy Steps

1. **Set environment variable:**
   ```bash
   export NEXT_PUBLIC_BASE_PATH=/palc-staging
   ```

2. **Build:**
   ```bash
   npm run build
   ```

3. **Test locally with basePath:**
   ```bash
   NEXT_PUBLIC_BASE_PATH=/palc-staging npm start
   ```
   Then visit: `http://localhost:3000/palc-staging/`

4. **If local test works, deploy to EC2:**
   - Copy files to EC2
   - Set environment variables on EC2
   - Configure Nginx
   - Start the application

## ⚠️ Important Notes

1. **Base Path Must Match**: The `NEXT_PUBLIC_BASE_PATH` must match the URL path exactly (`/palc-staging`)

2. **Nginx Configuration**: The reverse proxy must forward requests to `/palc-staging/` correctly

3. **Static Files**: Ensure `.next/static` and `public` folders are copied to EC2

4. **Port**: The Next.js app should run on a different port (e.g., 3000) and Nginx should proxy to it

## 🔍 Testing After Deployment

Test these URLs after deployment:
- ✅ `http://52.21.243.57/palc-staging/` - Homepage
- ✅ `http://52.21.243.57/palc-staging/solutions` - Solutions page
- ✅ `http://52.21.243.57/palc-staging/services` - Services page
- ✅ `http://52.21.243.57/palc-staging/solutions/sonic-open-networking` - Solution detail
- ✅ Check images load: `/palc-staging/images/...`
- ✅ Check CSS/JS load: `/palc-staging/_next/static/...`

## ✅ Ready to Deploy?

If all checks pass, you're ready to deploy! Follow the `AWS_DEPLOYMENT_GUIDE.md` for detailed steps.

