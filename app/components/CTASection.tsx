"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { LeadCaptureModal } from './LeadCaptureModal'

interface CTASectionProps {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

export function CTASection({
  title = "Planning the next phase of your infrastructure?",
  subtitle = "Talk to an Infrastructure Expert to discuss how PalC can help you build production-grade, open networking solutions.",
  primaryButtonText = "Talk to an Infrastructure Expert",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Learn More",
  secondaryButtonHref = "/about",
}: CTASectionProps = {}) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Check if primaryButtonHref is a contact page
  const isContactCTA = primaryButtonHref?.includes('/contact')
  
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-deep" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="heading-2 text-white mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-300 mb-10">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
            {isContactCTA ? (
              <Button 
                size="lg" 
                variant="gradient" 
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full sm:w-auto min-h-[48px]"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <Button 
                size="lg" 
                variant="gradient" 
                asChild
                className="w-full sm:w-auto min-h-[48px]"
              >
                <Link href={primaryButtonHref} className="flex items-center justify-center h-full min-h-[48px]">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-dark w-full sm:w-auto min-h-[48px]"
              asChild
            >
              <Link href={secondaryButtonHref} className="flex items-center justify-center h-full min-h-[48px]">
                {secondaryButtonText}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="cta-section"
        title={title || "Get Started with PalC Networks"}
        subtitle={subtitle || "Tell us about your project and we'll connect you with the right expert."}
      />
    </section>
  )
}

