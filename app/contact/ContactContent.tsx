"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2,
  MessageSquare,
  Clock,
  Globe,
  Loader2
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Label } from '../components/ui/label'
import { useToast } from '../components/ui/use-toast'
import { getApiUrl } from '@/lib/api-utils'

const contactSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(20, 'Please provide more details (at least 20 characters)'),
})

type ContactForm = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@palcnetworks.com\nsales@palcnetworks.com\nsupport@palcnetworks.com',
    subContent: '',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '080 40905088 (Bengaluru)\n044 47764670 (Chennai)',
    subContent: 'Mon-Fri, 9am-6pm IST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'Global Offices',
    subContent: 'Bengaluru · Chennai · San Jose · Dubai',
  },
]

const subjects = [
  'General Inquiry',
  'Solutions & Services',
  'Partnership Opportunities',
  'Support Request',
  'Career Inquiry',
  'Media & Press',
]

export function ContactContent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: 'Message Sent!',
          description: 'Thank you for reaching out. We will respond within 24-48 hours.',
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Have questions about our solutions or services? Our team is here to help you find the right fit for your needs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      {/* Contact Info Cards */}
      <section className="py-12 bg-white -mt-10 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-gray-700 whitespace-pre-line">{info.content}</p>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{info.subContent}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-3 text-gray-900 mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-card text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will respond to your inquiry within 24-48 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-8 rounded-2xl bg-white border border-gray-100 shadow-card space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        className="mt-1"
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-danger">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        className="mt-1"
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-danger">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="mt-1"
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-danger">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        className="mt-1"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      {...register('company')}
                      className="mt-1"
                      placeholder="Your company name"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-danger">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <select
                      id="subject"
                      {...register('subject')}
                      className="mt-1 flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-danger">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className="mt-1"
                      placeholder="Tell us about your project or inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-danger">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-card bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3">
                  {[
                    {
                      label: 'Bengaluru, India',
                      query: 'PalC Networks Pvt Ltd Navigator Building ITPB Whitefield Bengaluru',
                    },
                    {
                      label: 'Chennai, India',
                      query: 'PalC Networks Pvt Ltd Chennai One IT SEZ Thoraipakkam Chennai',
                    },
                    {
                      label: 'San Jose, USA',
                      query: 'PalC Networks Inc 2033 Gateway Place Ste 500 San Jose CA 95110',
                    },
                    {
                      label: 'Dubai, UAE',
                      query: 'PalC Networks Information Technology Consultants IFZA Business Park Dubai Silicon Oasis',
                    },
                  ].map((loc) => (
                    <div key={loc.label} className="space-y-1">
                      <p className="text-sm font-semibold text-gray-800">{loc.label}</p>
                      <div className="rounded-xl overflow-hidden border border-gray-100 h-44 bg-gray-200">
                        <iframe
                          title={`Map - ${loc.label}`}
                          src={`https://www.google.com/maps?q=${encodeURIComponent(loc.query)}&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Response Info */}
              <div className="p-6 rounded-2xl bg-gradient-deep text-white">
                <h3 className="font-semibold text-lg mb-4">Quick Response Guarantee</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">24-48 Hour Response</p>
                      <p className="text-sm text-gray-300">For all general inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Dedicated Account Manager</p>
                      <p className="text-sm text-gray-300">For enterprise clients</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Global Coverage</p>
                      <p className="text-sm text-gray-300">Support in multiple time zones | support@palcnetworks.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find answers to common questions about our solutions, services, 
                  and engagement models.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/about">Learn More About Us</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Our Offices"
            title="Global Presence"
            subtitle="With offices around the world, we're always close to our clients."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { region: 'Bengaluru, India', city: 'PalC Networks Pvt Ltd.', details: 'Unit 8, 5th Floor, Navigator Building, International Tech Park Bengaluru, Whitefield Main Road, 560066' },
              { region: 'Chennai, India', city: 'PalC Networks Pvt Ltd.', details: 'Phase 1, Tower 2, 1st Floor, Chennai One IT SEZ Park, Pallavaram-Thoraipakkam 200 Feet Road, Thoraipakkam, 600097' },
              { region: 'San Jose, USA', city: 'PalC Networks Inc.', details: '2033 Gateway Place, Ste 500, San Jose, CA 95110' },
              { region: 'Dubai, UAE', city: 'PalC Networks IT Consultants', details: 'FZCO, IFZA business park, Dubai Silicon Oasis, DDP Building A1' },
            ].map((office, index) => (
              <motion.div
                key={office.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all"
              >
                <MapPin className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-semibold text-gray-900">{office.region}</h4>
                <p className="text-primary text-sm font-medium">{office.city}</p>
                <p className="text-sm text-gray-600 mt-2">{office.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

