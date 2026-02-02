"use client"

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { X, Send, Loader2, CheckCircle2, User, Mail, Phone, FileText, Shield, Clock, Headphones, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getApiUrl } from '@/lib/api-utils'
import Image from 'next/image'
import { getImageSrc } from '@/app/utils/image-path'
import { motion, AnimatePresence } from 'framer-motion'

interface LeadCaptureModalProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: { name: string; email: string; phone?: string; message?: string }) => void
  redirectHref?: string
  context?: string
  title?: string
  subtitle?: string
  downloadUrl?: string
}

const trustBadges = [
  { icon: Shield, text: 'Enterprise-grade security' },
  { icon: Clock, text: 'Response within 24 hours' },
  { icon: Headphones, text: 'Dedicated expert support' },
]

export function LeadCaptureModal({ 
  open, 
  onClose, 
  onSubmit, 
  redirectHref,
  context = 'general',
  title,
  subtitle,
  downloadUrl,
}: LeadCaptureModalProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleSubmit = async () => {
    setError('')
    
    if (!name || name.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters)')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address')
      return
    }
    
    setSubmitting(true)
    try {
      const isEventRegistration = context?.startsWith('event-registration:')
      const endpoint = isEventRegistration ? '/api/events/rsvp' : '/api/lead'
      
      const requestBody: any = {
        email: email.trim(),
        name: name.trim(),
        phone: phone.trim() || undefined,
        source: context,
        interest: message.trim() || context,
      }
      
      if (isEventRegistration) {
        const eventId = context.split(':')[1]
        requestBody.eventId = eventId
        requestBody.company = message.trim() || undefined
      }
      
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        if (errorData.error) {
          throw new Error(errorData.error)
        }
        throw new Error('Failed to submit')
      }

      const responseData = await response.json()
      
      if (responseData.alreadyRegistered) {
        setError('You are already registered for this event.')
        setSubmitting(false)
        return
      }

      onSubmit?.({ name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() })
      
      setSuccess(true)
      
      if (downloadUrl) {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = downloadUrl.split('/').pop() || 'download.pdf'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      
      setTimeout(() => {
        if (redirectHref) {
          router.push(redirectHref)
        } else {
          onClose()
        }
      }, 2500)
    } catch (e) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!submitting) {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setError('')
      setSuccess(false)
      onClose()
    }
  }

  if (!open || !mounted) return null

  const isEventRegistration = context?.startsWith('event-registration:')

  const modalContent = (
    <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-[10000] my-auto"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left Panel - Visual/Brand */}
              <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] p-8 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,65,194,0.4),transparent_50%)]" />
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(0,194,255,0.3),transparent_50%)]" />
                </div>
                
                {/* Logo */}
                <div className="relative z-10">
                  <Image
                    src={getImageSrc('/images/logo/palc-logo-white.svg', true)}
                    alt="PalC Networks"
                    width={140}
                    height={40}
                    className="h-10 w-auto"
                    unoptimized
                  />
                </div>
                
                {/* Main Content */}
                <div className="relative z-10 space-y-6">
                  <div>
                    <h2 className="text-2xl xl:text-2xl font-bold text-white leading-tight">
                      Let's Build Your<br />
                      <span className="text-gradient-cyan">
                        Next-Gen Infrastructure
                      </span>
                    </h2>
                    <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                      Connect with our experts to discuss your network modernization, SONiC deployment, or AI infrastructure needs.
                    </p>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="space-y-3 pt-4">
                    {trustBadges.map((badge, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-300">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <badge.icon className="w-4 h-4 text-primary-light" />
                        </div>
                        <span className="text-sm">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer Quote */}
                <div className="relative z-10 pt-6 border-t border-white/10">
                  <p className="text-xs text-gray-500">
                    Trusted by Fortune 500 companies and leading enterprises worldwide
                  </p>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="flex-1 lg:w-[55%]">
                {/* Mobile Header */}
                <div className="lg:hidden bg-gradient-to-r from-[#050B18] to-[#0A1734] px-6 py-5">
                  <div className="flex items-center justify-between">
                    <Image
                      src={getImageSrc('/images/logo/palc-logo-white.svg', true)}
                      alt="PalC Networks"
                      width={120}
                      height={35}
                      className="h-8 w-auto"
                      unoptimized
                    />
                    <button
                      onClick={handleClose}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Form Header */}
                <div className="px-6 lg:px-8 pt-6 lg:pt-8 pb-4 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {title || 'Discuss Your Project'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1.5">
                        {subtitle || "Tell us about your infrastructure challenges and we'll connect you with our experts."}
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="hidden lg:flex p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Form Body */}
                <div className="px-6 lg:px-8 py-6">
                  {!success ? (
                    <div className="space-y-5">
                      {/* Name & Email Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className={cn(
                            "relative rounded-xl border-2 transition-all duration-200",
                            focusedField === 'name' ? "border-primary shadow-sm shadow-primary/10" : "border-gray-200 hover:border-gray-300"
                          )}>
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                              <User className="w-4 h-4" />
                            </div>
                            <input 
                              type="text"
                              placeholder="John Smith" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent text-gray-900 pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Work Email <span className="text-red-500">*</span>
                          </label>
                          <div className={cn(
                            "relative rounded-xl border-2 transition-all duration-200",
                            focusedField === 'email' ? "border-primary shadow-sm shadow-primary/10" : "border-gray-200 hover:border-gray-300"
                          )}>
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                              <Mail className="w-4 h-4" />
                            </div>
                            <input 
                              type="email"
                              placeholder="john@company.com" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent text-gray-900 pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Phone Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <div className={cn(
                          "relative rounded-xl border-2 transition-all duration-200",
                          focusedField === 'phone' ? "border-primary shadow-sm shadow-primary/10" : "border-gray-200 hover:border-gray-300"
                        )}>
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                            <Phone className="w-4 h-4" />
                          </div>
                          <input 
                            type="tel"
                            placeholder="+1 (555) 000-0000" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full bg-transparent text-gray-900 pl-10 pr-4 py-3 text-sm rounded-xl focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {isEventRegistration ? 'Company' : 'How can we help?'} 
                          <span className="text-gray-400 font-normal ml-1">(optional)</span>
                        </label>
                        <div className={cn(
                          "relative rounded-xl border-2 transition-all duration-200",
                          focusedField === 'message' ? "border-primary shadow-sm shadow-primary/10" : "border-gray-200 hover:border-gray-300"
                        )}>
                          <textarea 
                            placeholder={isEventRegistration ? "Your organization name" : "Tell us briefly about your project, timeline, or any specific requirements..."}
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={3}
                            className="w-full bg-transparent text-gray-900 px-4 py-3 text-sm rounded-xl focus:outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-xl"
                        >
                          <p className="text-sm text-red-700">{error}</p>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button 
                          onClick={handleSubmit} 
                          disabled={submitting}
                          className="w-full h-12 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Get Started
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Privacy Note */}
                      <p className="text-xs text-gray-400 text-center">
                        By submitting, you agree to our{' '}
                        <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                        . We'll never share your information.
                      </p>
                    </div>
                  ) : (
                    /* Success State */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                        {isEventRegistration 
                          ? "You're registered! Check your email for confirmation."
                          : downloadUrl
                          ? "Your download has started. We'll also send a copy to your email."
                          : "We've received your message. Our team will reach out within 24 hours."}
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleClose}
                        className="rounded-xl"
                      >
                        Close
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}
