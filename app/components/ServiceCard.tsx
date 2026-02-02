"use client"

import React, { memo } from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  index?: number
}

function ServiceCardComponent({
  title,
  description,
  icon: Icon,
  features,
  index = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={cn(
        "h-full p-8 rounded-2xl transition-all duration-300",
        "border border-gray-100 bg-white",
        "hover:shadow-hover hover:border-primary/20"
      )}>
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-2">
          {features.slice(0, 4).map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Memoize component for performance
export const ServiceCard = memo(ServiceCardComponent)

