"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from './components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center px-4 relative">
      {/* Dark gradient overlay at top for navbar visibility */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary-dark/90 via-primary-dark/60 via-primary/30 to-transparent pointer-events-none z-0" />
      
      <div className="text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none">
            404
          </h1>
          <div className="-mt-16 md:-mt-20">
            <h2 className="heading-2 text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" asChild>
                <Link href="/">
                  <Home className="mr-2 w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:info@palcnetworks.com?subject=Support Request - 404 Page">
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

