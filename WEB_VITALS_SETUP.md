# Core Web Vitals Tracking Setup

## Overview
Core Web Vitals tracking has been implemented to monitor website performance metrics (LCP, FID, CLS, FCP, TTFB) and display them in the admin dashboard.

## Installation

### Step 1: Install the web-vitals package
```bash
npm install web-vitals
```

Or if using PowerShell (Windows):
```powershell
cmd /c "npm install web-vitals"
```

## Implementation Details

### 1. Web Vitals Tracking Component
**Location:** `app/components/analytics/WebVitals.tsx`

- Automatically tracks Core Web Vitals on every page load
- Uses `web-vitals` library for accurate metric collection
- Sends metrics to API endpoint using `sendBeacon` for reliable delivery
- Only tracks in production (or when `NEXT_PUBLIC_ENABLE_ANALYTICS` is set)

### 2. API Endpoint
**Location:** `app/api/analytics/web-vitals/route.ts`

- **POST**: Receives and stores Web Vitals metrics
- **GET**: Returns aggregated statistics and recent metrics
- Stores data in `data/web-vitals.json`
- Keeps last 10,000 metrics to prevent file from growing too large

### 3. Admin Dashboard Integration
**Location:** `app/admin/dashboard/components/WebVitalsDashboard.tsx`

- Displays Core Web Vitals performance metrics
- Shows aggregated statistics (average, min, max)
- Rating distribution (Good, Needs Improvement, Poor)
- Recent metrics with filtering by page path
- Auto-refreshes every 60 seconds

### 4. Layout Integration
**Location:** `app/layout.tsx`

The `<WebVitals />` component is added to the root layout, so it tracks metrics on all pages automatically.

## Tracked Metrics

### Core Web Vitals (Google Ranking Factors)
1. **LCP (Largest Contentful Paint)** - Measures loading performance
   - Good: < 2.5s
   - Needs Improvement: 2.5s - 4.0s
   - Poor: > 4.0s

2. **FID (First Input Delay)** - Measures interactivity
   - Good: < 100ms
   - Needs Improvement: 100ms - 300ms
   - Poor: > 300ms

3. **CLS (Cumulative Layout Shift)** - Measures visual stability
   - Good: < 0.1
   - Needs Improvement: 0.1 - 0.25
   - Poor: > 0.25

### Additional Metrics
4. **FCP (First Contentful Paint)** - First content rendered
5. **TTFB (Time to First Byte)** - Server response time

## Admin Dashboard Features

### Viewing Web Vitals Data
1. Navigate to `/admin/dashboard`
2. Scroll down to the "Core Web Vitals Performance" section
3. View aggregated statistics and recent metrics

### Features:
- **Summary Stats**: Total metrics, good ratings count, pages tracked
- **Metric Cards**: Individual cards for each Core Web Vital with:
  - Average, min, max values
  - Rating distribution (Good/Needs Improvement/Poor percentages)
  - Visual progress bars
- **Recent Metrics**: Last 20 metrics with:
  - Metric name and value
  - Page path
  - Rating indicator
  - Timestamp
- **Page Filtering**: Filter metrics by specific page paths
- **Auto-refresh**: Updates every 60 seconds

## Data Storage

Metrics are stored in `data/web-vitals.json` with the following structure:
```json
[
  {
    "name": "LCP",
    "value": 2450,
    "rating": "good",
    "delta": 2450,
    "id": "v3-1234567890",
    "url": "https://palcnetworks.ai/palc-staging/",
    "path": "/",
    "timestamp": 1234567890123,
    "userAgent": "...",
    "connection": {
      "effectiveType": "4g",
      "downlink": 10,
      "rtt": 50
    }
  }
]
```

## Environment Variables

### Optional Configuration
- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Set to `true` to enable tracking in development mode
- `NEXT_PUBLIC_BASE_URL`: Base URL for canonical URLs (defaults to `https://palcnetworks.ai`)
- `NEXT_PUBLIC_BASE_PATH`: Base path for subpath deployments (defaults to `/palc-staging`)

## Usage

### Automatic Tracking
Once installed, Web Vitals are automatically tracked on all pages. No additional configuration needed.

### Viewing Results
1. Visit any page on your website
2. Metrics are automatically collected and sent to the API
3. View aggregated results in the admin dashboard at `/admin/dashboard`

### API Endpoints

#### Get Web Vitals Statistics
```bash
GET /api/analytics/web-vitals?limit=1000&path=/solutions
```

**Query Parameters:**
- `limit`: Number of recent metrics to return (default: 1000)
- `path`: Filter by specific page path (optional)

**Response:**
```json
{
  "success": true,
  "stats": {
    "total": 1500,
    "byMetric": {
      "LCP": {
        "count": 500,
        "avg": 2100,
        "min": 800,
        "max": 4500,
        "good": 350,
        "needsImprovement": 100,
        "poor": 50
      }
    },
    "byPath": {
      "/": 200,
      "/solutions": 150
    },
    "recent": [...]
  },
  "metrics": [...]
}
```

## Performance Impact

- **Minimal**: Uses `sendBeacon` API which doesn't block page unload
- **Non-blocking**: Metrics are sent asynchronously
- **Efficient**: Only sends essential data
- **Privacy-friendly**: No personal information collected

## Troubleshooting

### Metrics Not Appearing
1. Check if `web-vitals` package is installed: `npm list web-vitals`
2. Verify API endpoint is accessible: Check browser console for errors
3. Check `data/web-vitals.json` file exists and is writable
4. In development, set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` to enable tracking

### Dashboard Not Loading Data
1. Check admin authentication is working
2. Verify API endpoint `/api/analytics/web-vitals` is accessible
3. Check browser console for errors
4. Ensure `data/web-vitals.json` exists (will be created automatically)

## Next Steps

1. **Install web-vitals package**: `npm install web-vitals`
2. **Deploy and test**: Visit pages and check admin dashboard
3. **Monitor regularly**: Check dashboard weekly for performance trends
4. **Optimize based on data**: Use metrics to identify slow pages and optimize

## Files Created/Modified

### New Files:
- `app/components/analytics/WebVitals.tsx` - Tracking component
- `app/api/analytics/web-vitals/route.ts` - API endpoint
- `app/admin/dashboard/components/WebVitalsDashboard.tsx` - Dashboard component

### Modified Files:
- `app/layout.tsx` - Added WebVitals component
- `app/admin/dashboard/DashboardViewer.tsx` - Added WebVitalsDashboard component

