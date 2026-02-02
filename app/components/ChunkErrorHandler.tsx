"use client"

import { useEffect } from 'react'

/**
 * Handles chunk loading errors and React hydration errors by reloading the page
 * This is a common issue when chunks are updated but browser cache has old references
 */
export function ChunkErrorHandler() {
  useEffect(() => {
    // Disable in production to prevent false positives
    // Only enable in development or if explicitly needed
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_ENABLE_CHUNK_ERROR_HANDLER) {
      return
    }

    // Use sessionStorage to prevent multiple reloads across the session
    const RELOAD_KEY = 'palc_chunk_reload_attempted'
    const hasAttemptedReload = typeof window !== 'undefined' && sessionStorage.getItem(RELOAD_KEY) === 'true'
    
    if (hasAttemptedReload) {
      // Already attempted reload in this session, don't try again
      return
    }

    let reloadTimeout: NodeJS.Timeout | null = null
    let hasReloaded = false
    let errorCount = 0
    const MAX_ERRORS_BEFORE_RELOAD = 2 // Only reload after multiple confirmed errors

    const reloadPage = () => {
      if (hasReloaded || hasAttemptedReload) return // Prevent multiple reloads
      
      errorCount++
      
      // Only reload if we've seen multiple confirmed chunk errors
      if (errorCount < MAX_ERRORS_BEFORE_RELOAD) {
        return
      }
      
      hasReloaded = true
      
      // Mark in sessionStorage to prevent further reloads
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(RELOAD_KEY, 'true')
      }
      
      console.warn('Reloading page to fix chunk/React errors...')
      
      // Clear any pending timeouts
      if (reloadTimeout) {
        clearTimeout(reloadTimeout)
      }
      
      // Force a hard reload to clear cache
      setTimeout(() => {
        window.location.href = window.location.href.split('#')[0] // Remove hash
      }, 1000) // Increased delay to prevent rapid reloads
    }

    // Handle chunk loading errors
    const handleChunkError = (event: ErrorEvent) => {
      const error = event.error
      const errorMessage = error?.message || event.message || ''
      const errorName = error?.name || ''
      
      // Check if it's a ChunkLoadError or related error - be more specific
      const isChunkError = (
        (errorMessage.includes('Loading chunk') && errorMessage.includes('failed')) ||
        errorName === 'ChunkLoadError' ||
        (errorMessage.includes('chunk') && (errorMessage.includes('404') || errorMessage.includes('400')))
      )
      
      if (isChunkError) {
        console.warn('Chunk loading error detected:', errorMessage)
        event.preventDefault() // Prevent default error handling
        reloadPage()
      }
    }

    // Handle unhandled promise rejections (chunk errors often come as promise rejections)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const errorMessage = reason?.message || (typeof reason === 'string' ? reason : '') || ''
      const errorName = reason?.name || ''
      
      // Check if it's a chunk loading error - be more specific
      const isChunkError = (
        (errorMessage.includes('Loading chunk') && errorMessage.includes('failed')) ||
        errorName === 'ChunkLoadError' ||
        (errorMessage.includes('chunk') && (errorMessage.includes('404') || errorMessage.includes('400')))
      )
      
      if (isChunkError) {
        console.warn('Chunk loading error detected in promise rejection:', errorMessage)
        event.preventDefault() // Prevent default error handling
        reloadPage()
      }
    }

    // Handle React errors (including error #423)
    const handleReactError = (event: ErrorEvent) => {
      const error = event.error
      const errorMessage = error?.message || event.message || ''
      
      // React error #423 typically indicates hydration mismatch or null reference
      // This can happen when chunks are out of sync
      if (
        errorMessage.includes('Minified React error #423') ||
        errorMessage.includes('React error #423') ||
        errorMessage.includes('Cannot read properties of null') ||
        errorMessage.includes('hydration')
      ) {
        console.warn('React error detected (possibly due to chunk mismatch):', errorMessage)
        // Only reload if it's likely a chunk-related issue
        // Check if there are also chunk errors in console
        const hasChunkErrors = window.performance?.getEntriesByType?.('resource')
          ?.some((entry: any) => 
            entry.name?.includes('chunk') && 
            (entry.responseStatus === 400 || entry.responseStatus === 404)
          )
        
        if (hasChunkErrors) {
          event.preventDefault()
          reloadPage()
        }
      }
    }

    // Monitor failed resource loads (chunks) - More strict checking
    const handleResourceError = () => {
      // Only check in development or if explicitly needed
      // In production, this can cause false positives
      if (process.env.NODE_ENV !== 'development') {
        return
      }
      
      // Check for failed chunk loads - be more specific
      if (typeof window.performance !== 'undefined' && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        const failedChunks = resources.filter((entry) => {
          const name = entry.name || ''
          // Only consider it failed if:
          // 1. It's a chunk file
          // 2. It has zero transfer size (actually failed, not just cached)
          // 3. It has a response status indicating failure
          return (
            name.includes('/_next/static/chunks/') &&
            entry.transferSize === 0 &&
            entry.decodedBodySize === 0 &&
            entry.duration > 100 && // Must have taken some time (not instant cache hit)
            (entry as any).responseStatus && 
            ((entry as any).responseStatus >= 400)
          )
        })

        // Only reload if we have multiple confirmed failed chunks
        if (failedChunks.length >= 2) {
          console.warn('Multiple failed chunk loads detected:', failedChunks.map(e => e.name))
          reloadPage()
        }
      }
    }

    // Add event listeners
    window.addEventListener('error', handleChunkError)
    window.addEventListener('error', handleReactError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    // Check for failed resources after a delay - only in development or if explicitly needed
    // Disable in production to prevent false positives
    if (process.env.NODE_ENV === 'development') {
      setTimeout(handleResourceError, 3000)
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleChunkError)
      window.removeEventListener('error', handleReactError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      if (reloadTimeout) {
        clearTimeout(reloadTimeout)
      }
    }
  }, [])

  return null
}

