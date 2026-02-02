"use client"

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Award, Users, Globe, Zap } from 'lucide-react'
import { Hero } from '../components/Hero'
import { SectionHeading } from '../components/SectionHeading'
import { SolutionCard } from '../components/SolutionCard'
import { ServiceCard } from '../components/ServiceCard'
import { CTASection } from '../components/CTASection'
import { Button } from '../components/ui/button'
import { solutions } from '../data/solutions'
import { services } from '../data/services'
import { HomeSlider } from '../components/home/HomeSlider'
import { caseStudies } from '../data/case-studies'
import { getImageSrc } from '@/app/utils/image-path'

const industries = [
  { name: 'Financial Services', icon: '/images/industries/financial.svg' },
  { name: 'Healthcare', icon: '/images/industries/healthcare.svg' },
  { name: 'Telecommunications', icon: '/images/industries/telecom.svg' },
  { name: 'Manufacturing', icon: '/images/industries/manufacturing.svg' },
  { name: 'Retail & E-commerce', icon: '/images/industries/retail.svg' },
  { name: 'Government', icon: '/images/industries/government.svg' },
]

const whyChooseUsItems = [
  {
    icon: Award,
    title: 'Industry Expertise',
    description: 'Deep expertise across network, cloud, security, and emerging technologies with certified professionals.',
  },
  {
    icon: Users,
    title: 'Customer-Centric Approach',
    description: 'We prioritize your success with tailored solutions and dedicated support throughout your journey.',
  },
  {
    icon: Globe,
    title: 'Global Delivery',
    description: 'Serving clients worldwide with 24/7 support and flexible engagement models.',
  },
  {
    icon: Zap,
    title: 'Innovation Focus',
    description: 'Continuous investment in emerging technologies and open-source solutions to drive innovation.',
  },
]

const useCaseTiles = [
  {
    title: 'AI Data Centers',
    body: 'RoCEv2/ECN tuned fabrics, lossless transport, GPU/accelerator east-west optimization, and telemetry-rich observability.',
  },
  {
    title: 'Cloud & Multi-Cloud',
    body: 'Hub/spoke and mesh interconnects, zero-trust ingress/egress, transit/SD-WAN integration, and GitOps guardrails.',
  },
  {
    title: 'Enterprises',
    body: 'Campus and core modernization, segmentation, identity-driven policy, and unified observability across sites.',
  },
  {
    title: 'Telcos & Edge',
    body: 'EVPN/VXLAN/SRv6 backbones, O-RAN alignment, edge PoPs, and closed-loop automation with OSS/BSS integration.',
  },
]

const productTech = [
  {
    title: 'SONiC Platforms',
    description: 'Disaggregated switching with BGP-EVPN, telemetry, and validated optics/buffer profiles.',
    href: '/products/switches',
  },
  {
    title: 'AI Fabric Reference Designs',
    description: 'Leaf-spine and super-spine blueprints with RoCE tuning, ECN/RED, and SLO dashboards.',
    href: '/solutions/data-center-modernization-ai-fabrics',
  },
  {
    title: 'NetDevOps & Automation',
    description: 'IaC/GitOps modules, pipelines, golden configs, drift detection, and pre/post checks.',
    href: '/services/automation-tooling',
  },
  {
    title: 'Observability & Assurance',
    description: 'INT/gNMI/sFlow pipelines, SLO burn-rate views, and closed-loop runbooks.',
    href: '/services/networking-engineering',
  },
]

const benefitsGrid = [
  { title: 'Cloud-Scale Performance', detail: 'Low-latency EVPN/VXLAN + SRv6 fabrics tuned for AI/ML and high east-west traffic.' },
  { title: 'Automation-First', detail: 'Pipelines, policy-as-code, and GitOps guardrails for consistent operations.' },
  { title: 'Open & Multi-Vendor', detail: 'SONiC-first with validated multi-vendor optics, hardware, and controller integrations.' },
  { title: 'Security by Design', detail: 'Zero-trust overlays, microsegmentation, and identity-driven policy enforcement.' },
  { title: 'Deep Observability', detail: 'Streaming telemetry, INT, and SLO dashboards with actionable runbooks.' },
  { title: 'SRE-Grade Operations', detail: 'SLOs, postmortems, and runbooks to keep uptime high and MTTR low.' },
]

const architectureSteps = [
  {
    title: 'Assess & Model',
    body: 'Traffic patterns, AI/ML workload profiles, failure domains, and compliance guardrails.',
  },
  {
    title: 'Design & Simulate',
    body: 'EVPN/VXLAN/SRv6 underlay/overlay, QoS/ECN tuning, optics/buffer profiles, and security zoning.',
  },
  {
    title: 'Automate & Validate',
    body: 'IaC/GitOps pipelines, golden configs, pre/post checks, and lab/scale validation.',
  },
  {
    title: 'Operate & Assure',
    body: 'Telemetry, SLOs, runbooks, drift detection, and closed-loop remediation.',
  },
]

export default function PalcStagingPage() {
  const caseStudiesRef = useRef<HTMLDivElement | null>(null)
  const caseStudiesPreview = caseStudies.slice(0, 8)

  const scrollCaseStudies = (direction: 'next' | 'prev') => {
    const el = caseStudiesRef.current
    if (!el) return
    // Card width (320px) + gap (24px) = 344px per card
    const cardWidth = 344
    const delta = direction === 'next' ? cardWidth : -cardWidth
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Slider */}
      <HomeSlider />

      {/* Solutions Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Our Solutions"
            title="Comprehensive Technology Solutions"
            subtitle="From open networking to AI-ready infrastructure, we deliver solutions that drive business value and enable digital transformation."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.slice(0, 6).map((solution, index) => (
              <SolutionCard
                key={solution.id}
                title={solution.shortTitle}
                description={solution.description}
                icon={solution.icon}
                href={`/solutions/${solution.slug}`}
                index={index}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/solutions">
                View All Solutions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Our Services"
            title="Expert Services for Every Need"
            subtitle="From engineering to managed support, our services help you design, build, and operate world-class infrastructure."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
                index={index}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/services">
                Explore All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Hero Section - Positioned at mid-screen */}
      <Hero
        title={
          <>
            Enterprise Infrastructure &{' '}
            <span className="inline-block bg-gradient-to-r from-primary to-cyan bg-clip-text text-transparent">SONiC Open Networking</span>
            {' '}Solutions
          </>
        }
        subtitle="Build next-generation infrastructure with SONiC open networking, disaggregated systems, and AI-ready platforms. Transform your data center with open-source networking solutions that deliver flexibility, cost savings, and vendor independence."
        primaryCTA={{
          text: 'Explore SONiC Solutions',
          href: '/solutions/sonic-open-networking'
        }}
        secondaryCTA={{
          text: 'View Infrastructure Services',
          href: '/services'
        }}
      />

      {/* Industry Use Cases */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Key Industries & Use Cases"
            title="Built for AI Data Centers, Cloud Providers, Enterprises, and Telcos"
            subtitle="Reference patterns for high-density fabrics, multi-cloud interconnects, secure segmentation, and edge/telco rollouts."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCaseTiles.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-hover transition-all duration-300"
              >
                <div className="text-xs font-semibold text-primary tracking-[0.18em] uppercase mb-2">{item.title}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products & Technologies */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Products & Technologies"
            title="Open, AI-Ready, Automation-First"
            subtitle="Hardware, software, and reference designs aligned to SONiC, AI fabrics, automation, and deep observability."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productTech.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-hover hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 mb-4 flex-1">{item.description}</p>
                <Link href={item.href} className="text-primary font-semibold inline-flex items-center group">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Benefits */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Customer Outcomes"
            title="Enterprise-Grade Results"
            subtitle="Modeled after leading cloud and networking vendors to ensure performance, reliability, and speed."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefitsGrid.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-hover transition-all duration-300"
              >
                <div className="text-sm font-semibold text-gray-900 mb-2">{item.title}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Blueprint */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Architecture & Operations"
            title="Blueprint to Operations"
            subtitle="From modeling to day-2 assurance with IaC, GitOps, and SRE-grade operations."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {architectureSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-hover transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Step {idx + 1}</p>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Industries We Serve"
            title="Trusted Across Industries"
            subtitle="We serve leading organizations across diverse industries, delivering solutions tailored to their unique challenges."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:border-primary/20 border border-transparent transition-all duration-300"
              >
                <div className="w-14 h-14 mb-3 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                  <Image
                    src={getImageSrc(industry.icon, industry.icon.endsWith('.svg'))}
                    alt={industry.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                    unoptimized={industry.icon.endsWith('.svg')}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {industry.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                tag="Why PalC Networks"
                title="Your Trusted Technology Partner"
                subtitle="We combine deep technical expertise with a customer-first approach to deliver exceptional results."
                centered={false}
              />
              <div className="space-y-4 mt-8">
                {[
                  'Proven track record with Fortune 500 clients',
                  'Multi-vendor expertise across platforms',
                  '24/7 global support and operations',
                  'Certified professionals and industry leaders',
                  'Flexible engagement models',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Button variant="gradient" size="lg" asChild>
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyChooseUsItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-hover transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Carousel */}
      <section className="py-16 bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] text-white border-y border-white/5 overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-primary-light mb-2">Case Studies</p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Proven outcomes from the field</h3>
              <p className="text-sm text-gray-200/80">Deployments across AI fabrics, multi-cloud, automation, and security.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 bg-white/10 rounded-full shadow-md"
                onClick={() => scrollCaseStudies('prev')}
                aria-label="Previous case studies"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-white/30 text-white hover:bg-white/10 bg-white/10 rounded-full shadow-md"
                onClick={() => scrollCaseStudies('next')}
                aria-label="Next case studies"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div
            ref={caseStudiesRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 pr-6 [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="region"
            aria-label="Case studies carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                scrollCaseStudies('prev')
              } else if (e.key === 'ArrowRight') {
                e.preventDefault()
                scrollCaseStudies('next')
              }
            }}
          >
            {caseStudiesPreview.map((study) => (
              <div
                key={study.slug}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-start rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(0,255,200,0.12)] transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[16/9] bg-white/5">
                  <Image
                    src={getImageSrc(study.featuredImage || '/images/placeholder-hero.svg', true)}
                    alt={study.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 340px"
                    unoptimized={true}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      const placeholderSrc = getImageSrc('/images/placeholder-hero.svg', true)
                      if (!target.src.includes('placeholder-hero')) {
                        target.src = placeholderSrc
                      }
                    }}
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-primary-light">
                    {study.industry}
                  </div>
                  <p className="text-sm font-semibold text-white line-clamp-2">{study.title}</p>
                  <p className="text-xs text-gray-300 line-clamp-2">{study.summary}</p>
                  <Link
                    href={`/resources/case-studies/${study.slug}`}
                    className="inline-flex items-center text-primary-light text-sm font-semibold"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            TRUSTED BY LEADING TECHNOLOGY PARTNERS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['Cisco', 'Juniper', 'Arista', 'Palo Alto', 'AWS', 'Azure'].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-2xl font-bold text-gray-300 hover:text-primary transition-colors"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}

