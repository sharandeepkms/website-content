"use client"

import React, { useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PageHero } from '@/app/components/PageHero'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Label } from '@/app/components/ui/label'
import { useToast } from '@/app/components/ui/use-toast'
import { jobs, getJobById } from '@/app/data/jobs'
import { Send, CheckCircle2, Upload, File, X, Loader2 } from 'lucide-react'
import { getApiUrl } from '@/lib/api-utils'

const applicationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  linkedIn: z.string().url('Invalid URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  experience: z.string().min(1, 'Years of experience is required'),
  currentCompany: z.string().optional(),
  coverLetter: z.string().min(50, 'Please write at least 50 characters'),
  jobId: z.string().min(1, 'Please select a position'),
  // Note: resume is handled separately via FormData, not through react-hook-form
})

type ApplicationForm = z.infer<typeof applicationSchema>

export function ApplyContent() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get('job') || ''
  const selectedJob = jobId ? getJobById(jobId) : undefined
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumePreview, setResumePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobId: jobId,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a PDF or Word document (.pdf, .doc, .docx)',
          variant: 'destructive',
        })
        return
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please upload a file smaller than 5MB',
          variant: 'destructive',
        })
        return
      }
      setResumeFile(file)
      setResumePreview(file.name)
    }
  }

  const removeResume = () => {
    setResumeFile(null)
    setResumePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = async (data: ApplicationForm) => {
    try {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('linkedIn', data.linkedIn || '')
      formData.append('portfolio', data.portfolio || '')
      formData.append('experience', data.experience)
      formData.append('currentCompany', data.currentCompany || '')
      formData.append('coverLetter', data.coverLetter)
      formData.append('jobId', data.jobId)
      
      if (resumeFile) {
        formData.append('resume', resumeFile)
      }

      const response = await fetch(getApiUrl('/api/careers/apply'), {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setIsSubmitted(true)
        setResumeFile(null)
        setResumePreview('')
        toast({
          title: 'Application Submitted!',
          description: 'Thank you for your interest. We will review your application and get back to you.',
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (isSubmitted) {
    return (
      <>
        <PageHero
          title="Application Submitted"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Careers', href: '/careers' },
            { label: 'Apply' },
          ]}
        />
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h2 className="heading-3 text-gray-900 mb-4">
                Thank You for Applying!
              </h2>
              <p className="text-gray-600 mb-8">
                We&apos;ve received your application and will review it carefully. 
                Our team will reach out to you within 5-7 business days if your 
                qualifications match our requirements.
              </p>
              <Button variant="gradient" asChild>
                <a href="/careers">View More Positions</a>
              </Button>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        title={selectedJob ? `Apply: ${selectedJob.title}` : 'Submit Application'}
        subtitle={selectedJob?.description || 'Complete the form below to apply for a position at PalC Networks.'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
          { label: 'Apply' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* Position Selection */}
              <div>
                <Label htmlFor="jobId">Position *</Label>
                <select
                  id="jobId"
                  {...register('jobId')}
                  className="mt-1 flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a position</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </option>
                  ))}
                </select>
                {errors.jobId && (
                  <p className="mt-1 text-sm text-danger">{errors.jobId.message}</p>
                )}
              </div>

              {/* Personal Information */}
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
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-danger">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    className="mt-1"
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-danger">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    {...register('linkedIn')}
                    className="mt-1"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {errors.linkedIn && (
                    <p className="mt-1 text-sm text-danger">{errors.linkedIn.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio / GitHub</Label>
                  <Input
                    id="portfolio"
                    {...register('portfolio')}
                    className="mt-1"
                    placeholder="https://github.com/yourprofile"
                  />
                  {errors.portfolio && (
                    <p className="mt-1 text-sm text-danger">{errors.portfolio.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <select
                    id="experience"
                    {...register('experience')}
                    className="mt-1 flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="5-8">5-8 years</option>
                    <option value="8-10">8-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-danger">{errors.experience.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="currentCompany">Current Company</Label>
                  <Input
                    id="currentCompany"
                    {...register('currentCompany')}
                    className="mt-1"
                    placeholder="Current or last employer"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="coverLetter">Cover Letter / Introduction *</Label>
                <Textarea
                  id="coverLetter"
                  {...register('coverLetter')}
                  className="mt-1 min-h-[200px]"
                  placeholder="Tell us about yourself, your experience, and why you're interested in this position..."
                />
                {errors.coverLetter && (
                  <p className="mt-1 text-sm text-danger">{errors.coverLetter.message}</p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <Label htmlFor="resume">Resume Upload (Optional)</Label>
                {resumePreview ? (
                  <div className="mt-2 p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{resumePreview}</p>
                        <p className="text-xs text-gray-500">
                          {resumeFile ? `${(resumeFile.size / 1024).toFixed(1)} KB` : ''}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeResume}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex flex-col items-center justify-center w-full p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-primary transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Click to upload resume
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, or DOCX (Max 5MB)
                      </p>
                    </label>
                  </div>
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
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  )
}

