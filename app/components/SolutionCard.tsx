"use client"

import React, { memo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SolutionCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  index?: number
  featured?: boolean
}

function SolutionCardComponent({
  title,
  description,
  icon: Icon,
  href,
  index = 0,
  featured = false,
}: SolutionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href}>
        <div
          className={cn(
            "group relative p-8 rounded-2xl transition-all duration-300",
            "border border-gray-100 bg-white",
            "hover:shadow-hover hover:border-primary/20",
            featured && "lg:p-10"
          )}
        >
          {/* Icon Container */}
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
            "bg-gradient-primary text-white",
            "group-hover:scale-110 transition-transform duration-300"
          )}>
            <Icon className="w-7 h-7" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 line-clamp-3">
            {description}
          </p>

          {/* Link */}
          <div className="flex items-center text-primary font-medium">
            <span className="mr-2">Learn More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>

          {/* Hover Gradient Border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Memoize component for performance
export const SolutionCard = memo(SolutionCardComponent)

