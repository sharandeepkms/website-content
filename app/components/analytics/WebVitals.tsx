"use client"

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP, type Metric } from 'web-vitals'
import { getApiUrl } from '@/lib/api-utils'

/**
 * Core Web Vitals tracking component
 * Tracks and reports performance metrics to the API
 * 
 * Uses web-vitals v5 API
 * Note: FID is deprecated in v5 and replaced with INP (Interaction to Next Paint)
 */
export function WebVitals() {
  useEffect(() => {
    // Function to send metrics to API
    const sendToAnalytics = (metric: Metric) => {
      // Only send in production or if explicitly enabled
      if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[Web Vitals]', metric.name, metric.value, metric.rating)
        }
        return
      }

      // Send to API endpoint
      const apiUrl = getApiUrl('/api/analytics/web-vitals')
      
      // Use sendBeacon for reliable delivery (doesn't block page unload)
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        path: window.location.pathname,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection 
          ? {
              effectiveType: (navigator as any).connection.effectiveType,
              downlink: (navigator as any).connection.downlink,
              rtt: (navigator as any).connection.rtt,
            }
          : null,
      })

      // Try sendBeacon first (more reliable)
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' })
        navigator.sendBeacon(apiUrl, blob)
      } else {
        // Fallback to fetch
        fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true, // Keep request alive even if page unloads
        }).catch(() => {
          // Silently fail - analytics shouldn't break the app
        })
      }
    }

    // Track all Core Web Vitals (web-vitals v5 API)
    // Core Web Vitals: LCP, INP (replaces FID), CLS
    onCLS(sendToAnalytics) // Cumulative Layout Shift
    onLCP(sendToAnalytics) // Largest Contentful Paint
    onINP(sendToAnalytics) // Interaction to Next Paint (replaces FID)
    
    // Additional metrics
    onFCP(sendToAnalytics) // First Contentful Paint
    onTTFB(sendToAnalytics) // Time to First Byte
  }, [])

  // This component doesn't render anything
  return null
}

