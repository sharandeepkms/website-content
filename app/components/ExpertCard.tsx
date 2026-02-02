"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import { Mail, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getImageSrc } from '@/app/utils/image-path'
import { LeadCaptureModal } from './LeadCaptureModal'

interface ExpertCardProps {
  name: string
  title: string
  bio?: string
  avatar?: string
  email?: string
  linkedin?: string
  twitter?: string
  ctaText?: string
  ctaHref?: string
  variant?: 'default' | 'compact'
}

export function ExpertCard({
  name,
  title,
  bio,
  avatar,
  email,
  linkedin,
  twitter,
  ctaText = "Talk to Expert",
  ctaHref = "/contact",
  variant = 'default',
}: ExpertCardProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Check if CTA href is a contact page
      const isContactCTA = ctaHref?.includes('/contact')
  
  return (
    <Card className={cn("sticky top-24", variant === 'compact' && "p-4")}>
      <CardHeader className={cn(variant === 'compact' && "p-0 pb-4")}>
        <div className="flex items-start gap-4">
          {avatar && !avatar.includes('john-smith') ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={getImageSrc(avatar, avatar.endsWith('.svg'))}
                alt={name}
                fill
                className="object-cover"
                unoptimized={avatar.endsWith('.svg')}
                onError={(e) => {
                  // Fallback to initials if avatar fails to load
                  const target = e.target as HTMLImageElement
                  const parent = target.parentElement
                  if (parent) {
                    target.style.display = 'none'
                    const fallback = document.createElement('div')
                    fallback.className = 'w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 absolute inset-0'
                    const initials = name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').substring(0, 2)
                    fallback.innerHTML = `<span class="text-white font-bold text-xl">${initials}</span>`
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">
                {name.split(' ').map(n => n.charAt(0).toUpperCase()).join('').substring(0, 2)}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>
      </CardHeader>

      {bio && variant === 'default' && (
        <CardContent className={cn("pt-0", variant === 'compact' && "p-0 pb-4")}>
          <p className="text-sm text-gray-600 mb-4">{bio}</p>
        </CardContent>
      )}

      <CardContent className={cn("pt-0", variant === 'compact' && "p-0")}>
        {/* Social Links */}
        {(email || linkedin || twitter) && (
          <div className="flex items-center gap-3 mb-4">
            {email && (
              <a
                href={`mailto:${email}`}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        )}

        {/* CTA Button */}
        {isContactCTA ? (
          <>
            <Button variant="gradient" className="w-full" onClick={() => setIsLeadModalOpen(true)}>
              {ctaText}
            </Button>
            <LeadCaptureModal
              open={isLeadModalOpen}
              onClose={() => setIsLeadModalOpen(false)}
              context="expert-card"
              title={`Talk to ${name}`}
              subtitle={`Connect with ${name} to discuss your needs.`}
            />
          </>
        ) : (
          <Button variant="gradient" className="w-full" asChild>
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

