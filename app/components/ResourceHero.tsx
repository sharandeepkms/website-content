"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResourceHeroProps {
  title: string
  subtitle: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  gradient?: boolean
}

export function ResourceHero({
  title,
  subtitle,
  breadcrumbs,
  gradient = true,
}: ResourceHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        gradient
          ? "bg-gradient-to-br from-primary via-primary-dark to-indigo-900"
          : "bg-gray-50"
      )}
    >
      {/* Background Pattern */}
      {gradient && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      )}

      <div className="container-custom relative z-10 py-16 lg:py-24">
        {/* Enhanced Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-sm mb-6"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              const isHome = crumb.label === 'Home'
              
              return (
                <React.Fragment key={`${crumb.label}-${index}`}>
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-200",
                        gradient
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      )}
                    >
                      {isHome && <Home className="w-3.5 h-3.5" />}
                      <span>{crumb.label}</span>
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "px-2 py-1",
                        gradient ? "text-white/60" : "text-gray-500"
                      )}
                    >
                      {isHome && <Home className="w-3.5 h-3.5 inline-block mr-1.5" />}
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <ChevronRight
                      className={cn(
                        "w-4 h-4",
                        gradient ? "text-white/40" : "text-gray-400"
                      )}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
            gradient ? "text-white" : "text-gray-900"
          )}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "text-lg md:text-xl max-w-3xl",
            gradient ? "text-white/90" : "text-gray-600"
          )}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}

