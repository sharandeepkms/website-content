"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  tag?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
  light?: boolean
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl mb-10 lg:mb-12",
        centered && "mx-auto text-center",
        className
      )}
    >
      {tag && (
        <span className={cn(
          "inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4",
          light
            ? "bg-white/10 text-white/90"
            : "bg-primary/10 text-primary"
        )}>
          {tag}
        </span>
      )}
      <h2 className={cn(
        "text-4xl md:text-5xl font-bold",
        light ? "text-white" : "text-gray-900"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg leading-relaxed",
          light ? "text-gray-300" : "text-gray-700"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

