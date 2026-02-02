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

// Technology Partners
const partners = [
  { name: 'Aeverie', logo: '/images/partners/Aeverie.jpg' },
  { name: 'BENU Networks', logo: '/images/partners/BENU.jpg' },
  { name: 'Ciena', logo: '/images/partners/CIENA1.jpg' },
  { name: 'Supermicro', logo: '/images/partners/supermicro.png' },
  { name: 'IncepXion DNS', logo: '/images/partners/DNS-1.jpg' },
  { name: 'ECI Networks', logo: '/images/partners/ECI.jpg' },
  { name: 'Edge-core Networks', logo: '/images/partners/EDGECORE-1.jpg' },
  { name: 'EDTS', logo: '/images/partners/edts-1.jpg' },
  { name: 'Radisys', logo: '/images/partners/Radisys.jpg' },
  { name: 'STORDIS', logo: '/images/partners/Stordis.jpg' },
  { name: 'Ekinops', logo: '/images/partners/Ekinops.jpg' },
  { name: 'EPS', logo: '/images/partners/EPS.jpg' },
  { name: 'Falca', logo: '/images/partners/Falca.jpg' },
  { name: 'GlobalLogic', logo: '/images/partners/GlobalLogic.jpg' },
  { name: 'HFCL', logo: '/images/partners/HFCL-1.jpg' },
  { name: 'Arrcus', logo: '/images/partners/arrcus.png' },
  { name: 'D-Link', logo: '/images/partners/d-link.png' },
  { name: 'Extreme Networks', logo: '/images/partners/extreme-networks.png' },
  { name: 'Hexaware', logo: '/images/partners/hexaware.jpg' },
  { name: 'IDrive', logo: '/images/partners/IDrive.jpg' },
  { name: 'IMS Asia', logo: '/images/partners/IMSAsia.jpg' },
  { name: 'Infinera', logo: '/images/partners/Infinera.jpg' },
  { name: 'Ruijie', logo: '/images/partners/ruijie.png' },
  { name: 'IPinfusion', logo: '/images/partners/IPinfusion.jpg' },
  { name: 'MICAS', logo: '/images/partners/MICAS-1.jpg' },
  { name: 'Aurcore', logo: '/images/partners/Aurcore.png' },
  { name: 'Canoga Perkins', logo: '/images/partners/canoga-perkins.png' },
  { name: 'NTT Electronics', logo: '/images/partners/NTT_Elce-1.jpg' },
  { name: 'Nuron', logo: '/images/partners/Nuron.png' },
  { name: 'Polaris Wireless', logo: '/images/partners/Polaris.jpg' },
  { name: 'Privafy', logo: '/images/partners/Privafy.jpg' },
  { name: 'RACOMM', logo: '/images/partners/RACOMM-1-1.jpg' },
]

// ODM Partners carousel - scrolls left to right
function ODMPartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollAmount = 0
    const scrollSpeed = 1.5

    const scroll = () => {
      scrollAmount += scrollSpeed
      scrollContainer.scrollLeft = scrollAmount

      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0
        scrollContainer.scrollLeft = 0
      }

      requestAnimationFrame(scroll)
    }

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scroll)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const duplicatedODMPartners = [...odmPartners, ...odmPartners]

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-16 items-center no-scrollbar"
        style={{ overflowX: 'scroll', overflowY: 'visible', paddingTop: '12px', paddingBottom: '12px' }}
      >
        {duplicatedODMPartners.map((partner, index) => {
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-20 w-56"
            >
              {partner.logo ? (
                <div className="relative w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
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
                      const target = e.target as HTMLImageElement
                      const parent = target.parentElement?.parentElement
                      if (parent) {
                        parent.innerHTML = `<span class="text-base font-semibold text-gray-600">${partner.name}</span>`
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <span className="text-base font-semibold text-gray-600">{partner.name}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  )
}

// Technology Partners carousel - scrolls right to left
function TechnologyPartnersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const maxScroll = scrollContainer.scrollWidth / 2
    let scrollAmount = maxScroll
    const scrollSpeed = 1.5

    const scroll = () => {
      scrollAmount -= scrollSpeed
      scrollContainer.scrollLeft = scrollAmount

      if (scrollAmount <= 0) {
        scrollAmount = maxScroll
        scrollContainer.scrollLeft = maxScroll
      }

      requestAnimationFrame(scroll)
    }

    const timeoutId = setTimeout(() => {
      scrollContainer.scrollLeft = maxScroll
      requestAnimationFrame(scroll)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const duplicatedPartners = [...partners, ...partners]

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-12 items-center overflow-x-auto no-scrollbar"
      >
        {duplicatedPartners.map((partner, index) => {
          const logosWithoutPadding = [
            'd-link.png',
            'arrcus.png',
            'extreme-networks.png',
            'ruijie.png',
            'Aurcore.png',
            'canoga-perkins.png',
          ]
          
          const hasNoPadding = logosWithoutPadding.some(logoName => 
            partner.logo?.toLowerCase().includes(logoName.toLowerCase())
          )
          
          return (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 w-48 transition-all duration-300 opacity-90 hover:opacity-100"
            >
              {partner.logo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={getImageSrc(partner.logo, true)}
                    alt={partner.name}
                    width={180}
                    height={64}
                    className="object-contain"
                    style={{
                      maxHeight: hasNoPadding ? '52px' : '64px',
                      maxWidth: hasNoPadding ? '150px' : '200px',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                    unoptimized={true}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      const parent = target.parentElement?.parentElement
                      if (parent) {
                        parent.innerHTML = `<span class="text-lg font-semibold text-gray-400">${partner.name}</span>`
                      }
                    }}
                  />
                </div>
              ) : (
                <span className="text-lg font-semibold text-gray-400">{partner.name}</span>
              )}
            </div>
          )
        })}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  )
}

interface PartnersSectionProps {
  className?: string
}

export function PartnersSection({ className = '' }: PartnersSectionProps) {
  return (
    <section className={`py-16 bg-white border-y border-gray-100 overflow-hidden w-full ${className}`}>
      <div className="w-full space-y-12">
        {/* ODM Partners Section - Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-center text-xs md:text-sm font-bold text-gray-700 uppercase tracking-[0.2em]">
            ODM PARTNERS
          </p>
          <ODMPartnersCarousel />
        </motion.div>

        {/* Technology Partners Section - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-center text-sm font-medium text-gray-500">
            TRUSTED BY LEADING TECHNOLOGY PARTNERS
          </p>
          <TechnologyPartnersCarousel />
        </motion.div>
      </div>
    </section>
  )
}
