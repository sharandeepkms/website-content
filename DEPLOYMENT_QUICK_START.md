# Quick Deployment Guide - Apache + PM2

## ✅ Your Current Stack
- **Reverse Proxy:** Apache
- **Runtime:** Next.js 14  
- **Process Manager:** PM2
- **Path:** `/palc-staging`

## 🚀 Quick Deploy Steps

### 1. Build Locally

```bash
# Set base path
export NEXT_PUBLIC_BASE_PATH=/palc-staging

# Build
npm install
npm run build
```

### 2. Copy to EC2

```bash
scp -r .next user@52.21.243.57:/var/www/palc-staging/
scp -r public user@52.21.243.57:/var/www/palc-staging/
scp package*.json user@52.21.243.57:/var/www/palc-staging/
scp next.config.js user@52.21.243.57:/var/www/palc-staging/
```

### 3. On EC2 Server

```bash
# SSH into EC2
ssh user@52.21.243.57
cd /var/www/palc-staging

# Install dependencies
npm install --production

# Restart PM2
pm2 restart palc-staging

# Check logs
pm2 logs palc-staging
```

### 4. Verify Apache Config

Your Apache should have:
```apache
ProxyPass /palc-staging http://localhost:3000/palc-staging
ProxyPassReverse /palc-staging http://localhost:3000/palc-staging
```

### 5. Test

Visit: `http://52.21.243.57/palc-staging/`

## ⚙️ Configuration Files

### `.env.production` (on EC2)
```
NEXT_PUBLIC_BASE_PATH=/palc-staging
NODE_ENV=production
PORT=3000
```

### `ecosystem.config.js` (PM2)
```javascript
module.exports = {
  apps: [{
    name: 'palc-staging',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/palc-staging',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_BASE_PATH: '/palc-staging',
      PORT: 3000
    }
  }]
}
```

## 🔍 Troubleshooting

### Images Not Loading?
✅ **Fixed**: `next.config.js` now has `basePath: '/palc-staging'` by default
- All `/images/` paths automatically work with basePath
- Next.js `Image` component handles basePath automatically

### 404 Errors?
- Check PM2 is running: `pm2 status`
- Check Apache proxy: `curl http://localhost:3000/palc-staging/`
- Verify basePath in `.env.production`

### Port Issues?
```bash
# Check if port 3000 is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart palc-staging
```

## ✅ What's Fixed

1. ✅ Removed `standalone` output mode
2. ✅ Set default `basePath: '/palc-staging'`
3. ✅ Image paths automatically work with basePath
4. ✅ Compatible with PM2 + Apache setup
5. ✅ Standard Next.js build output

## 📋 Checklist Before Deploy

- [ ] Build completes without errors
- [ ] `.env.production` has `NEXT_PUBLIC_BASE_PATH=/palc-staging`
- [ ] PM2 ecosystem file configured
- [ ] Apache proxy configured correctly
- [ ] All files copied to EC2
- [ ] Dependencies installed on EC2
- [ ] PM2 restarted

See `APACHE_DEPLOYMENT_GUIDE.md` for detailed Apache configuration.

