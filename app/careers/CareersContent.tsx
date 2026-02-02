"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Users,
  Zap,
  Heart,
  GraduationCap,
  ArrowRight
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { CTASection } from '../components/CTASection'
import { Button } from '../components/ui/button'
import { jobs, Job } from '../data/jobs'

const benefits = [
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Work with talented professionals in a supportive, inclusive environment.',
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Tech',
    description: 'Work with the latest technologies and innovative solutions.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible work arrangements and generous time off policies.',
  },
  {
    icon: GraduationCap,
    title: 'Growth & Learning',
    description: 'Continuous learning opportunities and certification support.',
  },
]

function JobCard({ job }: { job: Job }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-hover transition-shadow overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.department}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.type}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {job.experience}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <p className="text-gray-600 mb-6">{job.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="gradient" asChild>
                <Link href={`/careers/apply?job=${job.id}`}>
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function CareersContent() {
  const departments = [...new Set(jobs.map((job) => job.department))]

  return (
    <>
      <PageHero
        title="Join Our Team"
        subtitle="Build your career with a leading enterprise technology company. We're looking for talented individuals who share our passion for innovation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers' },
        ]}
      />

      {/* Why Join Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Why PalC Networks"
            title="Build Your Future With Us"
            subtitle="Join a team that values innovation, collaboration, and continuous growth."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Open Positions"
            title="Current Opportunities"
            subtitle="Explore our open roles and find the perfect fit for your skills and aspirations."
          />

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium cursor-pointer">
              All Departments
            </span>
            {departments.map((dept) => (
              <span
                key={dept}
                className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium cursor-pointer hover:bg-primary/5 hover:text-primary transition-colors border border-gray-200"
              >
                {dept}
              </span>
            ))}
          </div>

          {/* Job Listings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Our Process"
            title="How We Hire"
            subtitle="A transparent and efficient hiring process designed to find the best fit."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Apply', description: 'Submit your application through our careers portal.' },
              { step: '02', title: 'Review', description: 'Our team reviews your application and qualifications.' },
              { step: '03', title: 'Interview', description: 'Technical and behavioral interviews with our team.' },
              { step: '04', title: 'Offer', description: 'Receive an offer and join the PalC Networks team.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-gray-100 mb-4">{item.step}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-gray-200">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Don't See the Right Fit?"
        subtitle="We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities."
        primaryButtonText="Contact Us"
        primaryButtonHref="/contact"
      />
    </>
  )
}

