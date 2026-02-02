"use client"

import React, { useState } from 'react'
import { Share2, Copy, Check, Linkedin, Twitter, Mail, Facebook } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
// Toast functionality - using browser notification for now

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  className?: string
  variant?: 'default' | 'compact' | 'icon-only'
}

export function SocialShare({ 
  url, 
  title = '', 
  description = '', 
  className,
  variant = 'default'
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareTitle = title || (typeof window !== 'undefined' ? document.title : '')
  const shareDescription = description || ''

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Failed to copy:', fallbackErr)
        }
      }
      document.body.removeChild(textArea)
    }
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareDescription}\n\n${shareUrl}`)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  if (variant === 'icon-only') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="w-9 h-9"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('twitter')}
          className="w-9 h-9"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare('linkedin')}
          className="w-9 h-9"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('twitter')}
          className="gap-2"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleShare('linkedin')}
          className="gap-2"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Share2 className="w-4 h-4" />
        <span className="font-medium">Share:</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
        aria-label={copied ? 'Link copied' : 'Copy link'}
      >
        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="gap-2"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="gap-2"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="gap-2"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('email')}
        className="gap-2"
        aria-label="Share via email"
      >
        <Mail className="w-4 h-4" />
        Email
      </Button>
    </div>
  )
}

