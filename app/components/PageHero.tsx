"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
}

export function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 pb-20 min-h-[calc(400px+5rem)] sm:min-h-[calc(400px+6rem)] md:min-h-0 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-deep" />
      
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-gray-300 mb-6"
          >
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <ChevronRight className="w-4 h-4" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-1 text-white max-w-4xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-gray-300 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}

