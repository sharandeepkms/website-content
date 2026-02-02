# AWS EC2 Deployment Guide for PalC Networks Website

## Deployment to Subpath: `/palc-staging/`

This guide covers deploying the Next.js application to AWS EC2 at `http://52.21.243.57/palc-staging/`

## Prerequisites

- AWS EC2 instance running (Ubuntu/Amazon Linux)
- Node.js 18+ installed
- Nginx or Apache configured as reverse proxy
- SSH access to EC2 instance

## Step 1: Configure Base Path

### Option A: Using Environment Variable (Recommended)

1. Create `.env.production` file:
```bash
NEXT_PUBLIC_BASE_PATH=/palc-staging
NEXT_PUBLIC_SITE_URL=http://52.21.243.57/palc-staging
NODE_ENV=production
```

2. Build with the environment variable:
```bash
npm run build
```

### Option B: Hardcode in next.config.js

If you prefer, you can hardcode the basePath in `next.config.js`:
```javascript
basePath: '/palc-staging',
assetPrefix: '/palc-staging',
```

## Step 2: Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

The build will create:
- `.next/` folder with optimized production build
- `standalone/` folder (if using standalone output)

## Step 3: Deploy to EC2

### Using Standalone Output (Recommended)

1. Copy the `standalone` folder to EC2:
```bash
scp -r .next/standalone user@52.21.243.57:/var/www/palc-staging/
scp -r public user@52.21.243.57:/var/www/palc-staging/
scp -r .next/static user@52.21.243.57:/var/www/palc-staging/.next/
```

2. On EC2, install dependencies in standalone folder:
```bash
cd /var/www/palc-staging/standalone
npm install --production
```

3. Start the application:
```bash
cd /var/www/palc-staging/standalone
NODE_ENV=production NEXT_PUBLIC_BASE_PATH=/palc-staging node server.js
```

### Using PM2 (Process Manager)

1. Install PM2:
```bash
npm install -g pm2
```

2. Create PM2 ecosystem file (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'palc-staging',
    script: './standalone/server.js',
    cwd: '/var/www/palc-staging',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_BASE_PATH: '/palc-staging',
      PORT: 3000
    }
  }]
}
```

3. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 4: Configure Nginx Reverse Proxy

Create/update `/etc/nginx/sites-available/palc-staging`:

```nginx
server {
    listen 80;
    server_name 52.21.243.57;

    location /palc-staging/ {
        proxy_pass http://localhost:3000/palc-staging/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Important: Remove trailing slash handling
        rewrite ^/palc-staging$ /palc-staging/ permanent;
    }

    # Serve static files directly
    location /palc-staging/_next/static/ {
        alias /var/www/palc-staging/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /palc-staging/images/ {
        alias /var/www/palc-staging/public/images/;
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

Enable and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/palc-staging /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: Verify Deployment

1. Check if the app is running:
```bash
curl http://localhost:3000/palc-staging/
```

2. Check Nginx:
```bash
curl http://52.21.243.57/palc-staging/
```

3. Verify all routes work:
- `http://52.21.243.57/palc-staging/`
- `http://52.21.243.57/palc-staging/solutions`
- `http://52.21.243.243.57/palc-staging/services`

## Troubleshooting

### Issue: 404 errors on routes
**Solution**: Ensure `basePath` is set correctly in `next.config.js` and environment variables.

### Issue: Images not loading
**Solution**: Check that `assetPrefix` matches `basePath` and static files are served correctly.

### Issue: CSS/JS not loading
**Solution**: Verify Nginx is serving `/_next/static/` files correctly.

### Issue: API routes not working
**Solution**: Ensure API routes are proxied correctly in Nginx configuration.

## Environment Variables Checklist

Before deployment, ensure these are set:
- ✅ `NEXT_PUBLIC_BASE_PATH=/palc-staging`
- ✅ `NODE_ENV=production`
- ✅ `NEXT_PUBLIC_SITE_URL=http://52.21.243.57/palc-staging` (optional, for metadata)

## Quick Deployment Script

Save as `deploy.sh`:

```bash
#!/bin/bash
set -e

echo "Building application..."
npm install
NEXT_PUBLIC_BASE_PATH=/palc-staging npm run build

echo "Copying files to EC2..."
scp -r .next/standalone user@52.21.243.57:/var/www/palc-staging/
scp -r public user@52.21.243.57:/var/www/palc-staging/
scp -r .next/static user@52.21.243.57:/var/www/palc-staging/.next/

echo "Restarting application on EC2..."
ssh user@52.21.243.57 "cd /var/www/palc-staging/standalone && pm2 restart palc-staging"

echo "Deployment complete!"
```

Make executable: `chmod +x deploy.sh`

## Notes

- The `standalone` output mode creates a minimal server bundle
- All static assets (images, fonts) must be copied to EC2
- PM2 ensures the app restarts automatically if it crashes
- Nginx handles SSL termination and static file serving efficiently

