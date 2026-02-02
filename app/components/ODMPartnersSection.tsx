"use client"

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { getImageSrc } from '@/app/utils/image-path'

// ODM Partner companies with logo paths
const odmPartners = [
  { name: 'Broadcom', logo: '/images/odm/broadcom-logo.png' },
  { name: 'Celestica', logo: '/images/odm/celestica-logo.png' },
  { name: 'Dell', logo: '/images/odm/dell-logo.png' },
  { name: 'Edgecore', logo: '/images/odm/edgecore-logo.png' },
  { name: 'Marvell', logo: '/images/odm/marvell-logo.png' },
  { name: 'MICAS', logo: '/images/odm/micas-logo.png' },
  { name: 'Orange', logo: '/images/odm/orange-logo.png' },
  { name: 'Ragile', logo: '/images/odm/ragile-logo.png' },
  { name: 'UfiSpace', logo: '/images/odm/ufispace-logo.png' },
  { name: 'Wistron', logo: '/images/odm/wistron-logo.png' },
]

function ODMPartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side to prevent hydration errors
    if (typeof window === 'undefined') return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 1.5 // pixels per frame

    const scroll = () => {
      scrollAmount += scrollSpeed
      scrollContainer.scrollLeft = scrollAmount

      // Reset scroll position when we've scrolled past the duplicated content
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0
        scrollContainer.scrollLeft = 0
      }

      requestAnimationFrame(scroll)
    }

    // Delay start to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scroll)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...odmPartners, ...odmPartners]

  return (
    <div className="relative w-full py-4">
      <div
        ref={scrollRef}
        className="flex gap-16 items-center overflow-x-auto no-scrollbar"
      >
        {duplicatedPartners.map((partner, index) => {
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-20 w-56 transition-all duration-300 hover:scale-105"
            >
              {partner.logo ? (
                <div className="relative w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                  <Image
                    src={getImageSrc(partner.logo, true)}
                    alt={partner.name}
                    width={200}
                    height={80}
                    className="object-contain"
                    style={{
                      maxHeight: '60px',
                      maxWidth: '180px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                    unoptimized={true}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement
                      const parent = target.parentElement?.parentElement
                      if (parent) {
                        parent.innerHTML = `<span class="text-base font-semibold text-gray-600">${partner.name}</span>`
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <span className="text-base font-semibold text-gray-600">{partner.name}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface ODMPartnersSectionProps {
  className?: string
  title?: string
  subtitle?: string
}

export function ODMPartnersSection({ 
  className = '', 
  title = 'ODM PARTNERS',
  subtitle 
}: ODMPartnersSectionProps) {
  return (
    <section className={`py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden ${className}`}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs md:text-sm font-bold text-gray-700 uppercase tracking-[0.2em] mb-3">
            {title}
          </p>
          {subtitle && (
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
        <ODMPartnersCarousel />
      </div>
    </section>
  )
}

