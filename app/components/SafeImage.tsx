"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getImageSrc } from '@/app/utils/image-path'
import { getFallbackImage, getImageWithFallback, type DEFAULT_IMAGES } from '@/app/utils/image-helpers'
import { ImageSkeleton } from './ui/image-skeleton'

interface SafeImageProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'onError'> {
  src: string | undefined | null
  fallbackType?: keyof typeof DEFAULT_IMAGES
  fallbackSrc?: string
  showSkeleton?: boolean
  onError?: (error: Error) => void
  onLoad?: () => void
}

/**
 * SafeImage component with automatic fallback handling
 * 
 * Features:
 * - Automatic fallback to placeholder if image fails to load
 * - Loading skeleton support
 * - Error handling with retry logic
 * - Base path handling for staging environments
 */
export function SafeImage({
  src,
  fallbackType = 'generic',
  fallbackSrc,
  showSkeleton = false,
  className,
  onError,
  onLoad,
  alt = '',
  ...props
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(showSkeleton)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 1

  // Initialize image source
  useEffect(() => {
    if (src && src.trim() !== '') {
      setImageSrc(getImageSrc(src, props.unoptimized !== false))
      setHasError(false)
      setIsLoading(showSkeleton)
    } else {
      // No source provided, use fallback immediately
      const fallback = fallbackSrc || getFallbackImage(fallbackType)
      setImageSrc(getImageSrc(fallback, props.unoptimized !== false))
      setIsLoading(false)
      setHasError(false)
    }
  }, [src, fallbackType, fallbackSrc, showSkeleton, props.unoptimized])

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    
    // If we haven't tried fallback yet, try it
    if (!hasError && retryCount < maxRetries) {
      const fallback = fallbackSrc || getFallbackImage(fallbackType)
      const fallbackPath = getImageSrc(fallback, props.unoptimized !== false)
      
      // Only switch to fallback if current src is not already the fallback
      if (target.src && !target.src.includes(fallback.split('/').pop() || '')) {
        setImageSrc(fallbackPath)
        setRetryCount(prev => prev + 1)
        return
      }
    }
    
    // If fallback also failed or we've already tried, hide image and show placeholder
    setHasError(true)
    setIsLoading(false)
    
    // Hide the broken image
    target.style.display = 'none'
    
    // Call custom error handler if provided
    if (onError) {
      onError(new Error(`Failed to load image: ${src}`))
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    if (onLoad) {
      onLoad()
    }
  }

  // If no src and no fallback, don't render
  if (!src && !fallbackSrc && !fallbackType) {
    return null
  }

  return (
    <div className={cn("relative", className)}>
      {isLoading && showSkeleton && (
        <div className="absolute inset-0 z-10">
          <ImageSkeleton className="h-full w-full" />
        </div>
      )}
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          hasError && "hidden",
          className
        )}
        onError={handleError}
        onLoad={handleLoad}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-4">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  )
}


