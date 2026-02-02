# Apache + PM2 Deployment Guide for PalC Networks

## Current Stack
- ✅ Reverse Proxy: **Apache**
- ✅ Runtime: **Next.js 14**
- ✅ Process Manager: **PM2**
- ✅ Deployment Path: **/palc-staging**

## Step 1: Build Configuration

### 1.1 Set Environment Variables

Create `.env.production` file:
```bash
NEXT_PUBLIC_BASE_PATH=/palc-staging
NODE_ENV=production
PORT=3000
```

### 1.2 Build the Application

```bash
npm install
npm run build
```

This creates:
- `.next/` folder (standard Next.js build output)
- All optimized assets and pages

## Step 2: Deploy Files to EC2

### 2.1 File Structure on EC2

```
/var/www/palc-staging/
├── .next/              # Build output
├── public/             # Static files (images, etc.)
├── node_modules/       # Production dependencies
├── package.json
├── package-lock.json
├── next.config.js
├── server.js           # If you have a custom server
└── .env.production     # Environment variables
```

### 2.2 Copy Files to EC2

```bash
# From your local machine
scp -r .next user@52.21.243.57:/var/www/palc-staging/
scp -r public user@52.21.243.57:/var/www/palc-staging/
scp package*.json user@52.21.243.57:/var/www/palc-staging/
scp next.config.js user@52.21.243.57:/var/www/palc-staging/
scp .env.production user@52.21.243.57:/var/www/palc-staging/

# On EC2, install production dependencies
ssh user@52.21.243.57
cd /var/www/palc-staging
npm install --production
```

## Step 3: Configure PM2

### 3.1 Create PM2 Ecosystem File

Create `/var/www/palc-staging/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'palc-staging',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: '/var/www/palc-staging',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_BASE_PATH: '/palc-staging',
      PORT: 3000
    },
    error_file: '/var/log/pm2/palc-staging-error.log',
    out_file: '/var/log/pm2/palc-staging-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '1G'
  }]
}
```

### 3.2 Start with PM2

```bash
cd /var/www/palc-staging
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the command it gives you
```

### 3.3 PM2 Commands

```bash
pm2 status              # Check status
pm2 logs palc-staging   # View logs
pm2 restart palc-staging # Restart app
pm2 stop palc-staging   # Stop app
```

## Step 4: Configure Apache Virtual Host

### 4.1 Create Apache Config

Create `/etc/apache2/sites-available/palc-staging.conf`:

```apache
<VirtualHost *:80>
    ServerName 52.21.243.57
    
    # Proxy all requests to Next.js app
    ProxyPreserveHost On
    ProxyRequests Off
    
    # Main application proxy
    <Location /palc-staging>
        ProxyPass http://localhost:3000/palc-staging
        ProxyPassReverse http://localhost:3000/palc-staging
        
        # Headers
        ProxyPassReverse /palc-staging
        RequestHeader set X-Forwarded-Proto "http"
        RequestHeader set X-Forwarded-Port "80"
    </Location>
    
    # Static assets - Next.js handles these via basePath
    <LocationMatch "^/palc-staging/_next/static/">
        ProxyPass http://localhost:3000/palc-staging/_next/static/
        ProxyPassReverse http://localhost:3000/palc-staging/_next/static/
        Header set Cache-Control "public, max-age=31536000, immutable"
    </LocationMatch>
    
    # Image assets
    <LocationMatch "^/palc-staging/images/">
        ProxyPass http://localhost:3000/palc-staging/images/
        ProxyPassReverse http://localhost:3000/palc-staging/images/
        Header set Cache-Control "public, max-age=2592000"
    </LocationMatch>
    
    # WebSocket support (if needed)
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/palc-staging(.*)$ ws://localhost:3000/palc-staging$1 [P,L]
</VirtualHost>
```

### 4.2 Enable Apache Modules

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo a2enmod rewrite
sudo a2ensite palc-staging
sudo systemctl restart apache2
```

### 4.3 Verify Apache Config

```bash
sudo apache2ctl configtest
```

## Step 5: Fix Image Paths (if needed)

### 5.1 Verify Image Paths Work

Next.js automatically handles basePath for:
- ✅ Images in `/public` folder
- ✅ Next.js `Image` component
- ✅ Static assets

### 5.2 If Images Still Don't Load

Check that images are being served correctly:

```bash
# Test image access
curl http://localhost:3000/palc-staging/images/logo.svg
curl http://52.21.243.57/palc-staging/images/logo.svg
```

## Step 6: Testing

### 6.1 Test Direct Access (bypass Apache)

```bash
curl http://localhost:3000/palc-staging/
```

### 6.2 Test Through Apache

```bash
curl http://52.21.243.57/palc-staging/
```

### 6.3 Test Pages

- Homepage: `http://52.21.243.57/palc-staging/`
- Solutions: `http://52.21.243.57/palc-staging/solutions`
- Services: `http://52.21.243.57/palc-staging/services`
- Images: `http://52.21.243.57/palc-staging/images/logo.svg`

## Troubleshooting

### Images Not Loading

1. **Check basePath is set correctly:**
   ```bash
   # In your .env.production
   NEXT_PUBLIC_BASE_PATH=/palc-staging
   ```

2. **Verify image files exist:**
   ```bash
   ls -la /var/www/palc-staging/public/images/
   ```

3. **Check Apache proxy:**
   ```bash
   # Test direct Next.js
   curl http://localhost:3000/palc-staging/images/logo.svg
   
   # Test through Apache
   curl http://52.21.243.57/palc-staging/images/logo.svg
   ```

4. **Check PM2 logs:**
   ```bash
   pm2 logs palc-staging
   ```

### 404 Errors

1. **Check basePath matches:**
   - `next.config.js`: `basePath: '/palc-staging'`
   - `.env.production`: `NEXT_PUBLIC_BASE_PATH=/palc-staging`
   - Apache config: `/palc-staging`

2. **Rebuild after config changes:**
   ```bash
   npm run build
   pm2 restart palc-staging
   ```

### Port Already in Use

```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill process if needed
sudo kill -9 <PID>
```

## Quick Deployment Script

Save as `deploy-apache.sh`:

```bash
#!/bin/bash
set -e

echo "Building application..."
export NEXT_PUBLIC_BASE_PATH=/palc-staging
npm install
npm run build

echo "Copying files to EC2..."
scp -r .next user@52.21.243.57:/var/www/palc-staging/
scp -r public user@52.21.243.57:/var/www/palc-staging/
scp package*.json user@52.21.243.57:/var/www/palc-staging/
scp next.config.js user@52.21.243.57:/var/www/palc-staging/
scp .env.production user@52.21.243.57:/var/www/palc-staging/

echo "Installing dependencies and restarting on EC2..."
ssh user@52.21.243.57 << 'EOF'
cd /var/www/palc-staging
npm install --production
pm2 restart palc-staging
pm2 logs palc-staging --lines 20
EOF

echo "Deployment complete!"
```

Make executable: `chmod +x deploy-apache.sh`

## Environment Variables Checklist

Ensure these are set on EC2:

```bash
NODE_ENV=production
NEXT_PUBLIC_BASE_PATH=/palc-staging
PORT=3000
```

## Notes

- ✅ Using standard Next.js build (not standalone)
- ✅ PM2 manages the Next.js process
- ✅ Apache proxies requests to Next.js on port 3000
- ✅ All static assets handled via basePath automatically
- ✅ Images in `/public` work automatically with basePath

