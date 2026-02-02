"use client"

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Server, Network, Zap, Shield } from 'lucide-react'
import { Button } from './ui/button'
import { LeadCaptureModal } from './LeadCaptureModal'

interface HeroProps {
  title: string | React.ReactNode
  subtitle: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  showStats?: boolean
}

const stats = [
  { value: '500+', label: 'Enterprise Clients', numericValue: 500, suffix: '+' },
  { value: '99.9%', label: 'Uptime SLA', numericValue: 99.9, suffix: '%' },
  { value: '24/7', label: 'Expert Support', numericValue: null, isText: true },
  { value: '50+', label: 'Countries Served', numericValue: 50, suffix: '+' },
]

// Counter component for animated numbers
function Counter({ targetValue, suffix = '', isText = false, duration = 2 }: { targetValue: number | null, suffix?: string, isText?: boolean, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView || isText || targetValue === null) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = (currentTime - startTime) / 1000 // Convert to seconds
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(targetValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, targetValue, isText, duration])

  if (isText) {
    return <span ref={ref}>24/7</span>
  }

  return (
    <span ref={ref}>
      {targetValue !== null ? (targetValue % 1 === 0 ? count : count.toFixed(1)) : 0}{suffix}
    </span>
  )
}

const features = [
  {
    icon: Server,
    title: 'SONiC Infrastructure',
    description: 'Open-source networking solutions'
  },
  {
    icon: Network,
    title: 'Disaggregated Systems',
    description: 'Vendor-independent architecture'
  },
  {
    icon: Zap,
    title: 'AI-Ready Platforms',
    description: 'High-performance computing'
  },
  {
    icon: Shield,
    title: 'Enterprise Grade',
    description: 'Mission-critical reliability'
  }
]

export function Hero({
  title,
  subtitle,
  primaryCTA = { text: 'Get Started', href: '/contact' },
  secondaryCTA = { text: 'Explore Solutions', href: '/solutions' },
  showStats = true,
}: HeroProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  // Check if primaryCTA href is a contact page
  const isContactCTA = primaryCTA.href?.includes('/contact')
  
  return (
    <>
    <section className="relative min-h-[60vh] flex items-center overflow-hidden py-4">
      {/* Background Image - Data Center Rack Setup */}
      <div className="absolute inset-0">
        {/* Data Center Background Image */}
        {/* NOTE: Using external Unsplash image - for production, replace with local image at /public/images/datacenter-hero.jpg */}
        {/* Option 1: Use local image - Place image in /public/images/datacenter-hero.jpg */}
        {/* <Image 
          src="/images/datacenter-hero.jpg" 
          alt="Data Center Rack Setup"
          fill
          className="object-cover"
          priority
        /> */}
        
        {/* Option 2: Use external image URL */}
        {/* <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80')`,
          }}
        /> */}
        
        {/* Background Image - Data Center */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80")`,
          }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/85 to-navy/90"
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/40" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-full overflow-hidden"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-white text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Open Networking & Infrastructure Excellence
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-1 text-white mb-6 [&_span]:block [&_span]:inline"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch gap-3 mb-12 w-full"
            >
              {isContactCTA ? (
                <Button 
                  size="lg" 
                  variant="gradient" 
                  onClick={() => setIsLeadModalOpen(true)}
                  className="w-full sm:w-auto sm:flex-1 text-xs sm:text-sm md:text-base min-h-[48px] !whitespace-normal"
                >
                  <span className="text-center leading-tight break-words min-w-0 flex-1">{primaryCTA.text}</span>
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                </Button>
              ) : (
                <Button size="lg" variant="gradient" asChild className="w-full sm:w-auto sm:flex-1 text-xs sm:text-sm md:text-base min-h-[48px] !whitespace-normal">
                  <Link href={primaryCTA.href} className="flex items-center justify-center px-4 sm:px-6 w-full h-full min-w-0 min-h-[48px]">
                    <span className="text-center leading-tight break-words min-w-0 flex-1">{primaryCTA.text}</span>
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  </Link>
                </Button>
              )}
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40 backdrop-blur-sm w-full sm:w-auto sm:flex-1 font-semibold text-xs sm:text-sm md:text-base min-h-[48px] !whitespace-normal"
                asChild
              >
                <Link href={secondaryCTA.href} className="flex items-center justify-center px-4 sm:px-6 w-full h-full min-w-0 min-h-[48px]">
                  <span className="text-center leading-tight break-words min-w-0">{secondaryCTA.text}</span>
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            {showStats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      <Counter 
                        targetValue={stat.numericValue || null} 
                        suffix={stat.suffix || ''} 
                        isText={stat.isText || false}
                        duration={2}
                      />
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Visual/Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Data Center Rack Visualization */}
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              {/* Rack Visualization */}
              <div className="space-y-3 mb-8">
                {[1, 2, 3, 4, 5, 6].map((rack, index) => (
                  <motion.div
                    key={rack}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="h-12 bg-gradient-to-r from-primary/30 to-cyan/30 rounded-lg border border-primary/50 flex items-center justify-between px-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white text-sm font-medium">Rack {rack}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((led) => (
                        <div
                          key={led}
                          className="w-1 h-4 bg-primary/50 rounded"
                          style={{
                            animation: `pulse 2s ease-in-out ${led * 0.2}s infinite`
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-xs">{feature.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>

    </section>
    
    {/* Lead Capture Modal */}
    <LeadCaptureModal
      open={isLeadModalOpen}
      onClose={() => setIsLeadModalOpen(false)}
      context="hero-get-started"
      title="Get Started with PalC Networks"
      subtitle="Tell us about your project and we'll connect you with the right expert."
    />
    </>
  )
}
