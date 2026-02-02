"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { CTASection } from '@/app/components/CTASection'
import { Button } from '@/app/components/ui/button'
import { Solution, getSolutionBySlug } from '@/app/data/solutions'

interface Props {
  solution: Omit<Solution, 'icon'>
}

export function SolutionDetailContent({ solution }: Props) {
  // Get the full solution with icon from client-side data
  const fullSolution = getSolutionBySlug(solution.slug)
  const Icon = fullSolution?.icon

  return (
    <>
      <PageHero
        title={solution.title}
        subtitle={solution.longDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: solution.shortTitle },
        ]}
      />

      {/* Inner Solutions Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Capabilities"
            title="What We Offer"
            subtitle="Comprehensive capabilities designed to address your specific needs."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.innerSolutions.map((inner, index) => (
              <motion.div
                key={inner.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-hover hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {inner.title}
                </h3>
                <p className="text-gray-600">{inner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Use Cases */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="heading-3 text-gray-900 mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {solution.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="heading-3 text-gray-900 mb-6">Use Cases</h3>
              <div className="space-y-4">
                {solution.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100"
                  >
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-700">{useCase}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Explore More"
            title="Related Solutions"
            subtitle="Discover other solutions that complement your technology stack."
          />
          <div className="flex justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/solutions">
                View All Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Get Started?"
        subtitle="Contact our experts to discuss how this solution can help transform your infrastructure."
        primaryButtonText="Talk to an Expert"
        primaryButtonHref="/contact"
      />
    </>
  )
}

