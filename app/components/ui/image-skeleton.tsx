"use client"

import React from 'react'
import { cn } from '@/lib/utils'

interface ImageSkeletonProps {
  className?: string
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall'
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  tall: 'aspect-[3/4]',
}

/**
 * Reusable skeleton component for image loading states
 * Provides a smooth, animated placeholder while images load
 */
export function ImageSkeleton({ className, aspectRatio = 'video' }: ImageSkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200',
        aspectRatioClasses[aspectRatio],
        className
      )}
      role="status"
      aria-label="Loading image"
    >
      <div className="absolute inset-0 animate-pulse">
        <div className="h-full w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-gray-300/50" />
      </div>
    </div>
  )
}

