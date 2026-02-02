"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Network, Code, Cpu, Zap, HeadphonesIcon, Layers, Sparkles, Gauge, Shield, Server, Eye, Cloud, Building2 } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { CTASection } from '../components/CTASection'
import { Button } from '../components/ui/button'
import { LeadCaptureModal } from '../components/LeadCaptureModal'
import { PartnersSection } from '../components/PartnersSection'
import type { LucideIcon } from 'lucide-react'

// Services matching navbar menu items
interface NavbarService {
  name: string
  href: string
  icon: LucideIcon
  description: string
  subItems?: Array<{ name: string; href: string }>
}

const navbarServices: NavbarService[] = [
  {
    name: 'Networking Engineering',
    href: '/services/networking-engineering',
    icon: Network,
    description: 'Expert network design, implementation, and optimization',
    subItems: [
      { name: 'IP Networking', href: '/services/networking-engineering/ip-networking' },
      { name: 'Packet Optical Networks', href: '/services/networking-engineering/packet-optical-nos' },
      { name: 'SDN & NFV', href: '/services/networking-engineering/sdn-nfv' },
    ],
  },
  {
    name: 'Cloud & Platform Engineering',
    href: '/services/cloud-platform-engineering',
    icon: Cloud,
    description: 'Cloud infrastructure, platforms, and DevOps services',
    subItems: [
      { name: 'Private & Hybrid Cloud', href: '/services/cloud-platform-engineering/private-hybrid-cloud' },
      { name: 'Cloud-Native Applications', href: '/services/software-platform-engineering/cloud-native-development' },
      { name: 'DevOps & Platform Engineering', href: '/services/software-platform-engineering/devops-platform-engineering' },
      { name: 'CI/CD & Build-Time Optimization', href: '/services/automation-tooling/cicd-automation' },
      { name: 'CDN & Real-Time Streaming Platforms', href: '/services/cloud-platform-engineering/cdn-streaming' },
    ],
  },
  {
    name: 'Security, Visibility & Analytics',
    href: '/services/security-visibility-analytics',
    icon: Shield,
    description: 'Security, identity management, and network analytics',
    subItems: [
      { name: 'Identity & Access Management', href: '/services/security-visibility-analytics/identity-access-management' },
      { name: 'Security Engineering', href: '/services/security-visibility-analytics/security-engineering' },
      { name: 'Network & Data Analytics', href: '/services/security-visibility-analytics/network-data-analytics' },
    ],
  },
  {
    name: 'Industry-Focused Engineering',
    href: '/services/industry-focused-engineering',
    icon: Building2,
    description: 'Specialized solutions for specific industries',
    subItems: [
      { name: 'Banking, Financial Services & Insurance', href: '/services/industry-focused-engineering/bfsi' },
      { name: 'Telecom & Edge Networks', href: '/services/industry-focused-engineering/telecom-edge' },
      { name: 'Enterprise & Digital Platforms', href: '/services/industry-focused-engineering/enterprise-digital' },
    ],
  },
  {
    name: 'Engagement & Delivery Models',
    href: '/services/engagement-delivery-models',
    icon: HeadphonesIcon,
    description: 'Flexible service delivery and engagement options',
    subItems: [
      { name: 'CPDaaS – Customized Product Development', href: '/services/engagement-delivery-models/cpdaas' },
      { name: 'PDaaS – Protocol Development', href: '/services/protocol-system-development/protocol-development' },
      { name: 'PTaaS – Protocol Testing & Validation', href: '/services/protocol-system-development/protocol-testing' },
      { name: 'SaaS – Support as a Service', href: '/services/professional-lifecycle-services/support-maintenance' },
    ],
  },
]

const serviceHighlights = [
  { 
    title: 'Comprehensive Expertise', 
    detail: 'Full-stack engineering services covering networking, software platforms, protocols, AI/ML, automation, and professional services.' 
  },
  { 
    title: 'End-to-End Solutions', 
    detail: 'From initial design and development to implementation, validation, and ongoing lifecycle management.' 
  },
  { 
    title: 'Technology-Agnostic Approach', 
    detail: 'Expertise across open and proprietary technologies, adaptable to your infrastructure and business requirements.' 
  },
  { 
    title: 'Lifecycle Support', 
    detail: 'Complete service portfolio from consulting and development to managed services with 24/7 operational support.' 
  },
]

const serviceIndustries = [
  { title: 'Cloud Providers', blurb: 'Multi-cloud interconnect, transit hubs, and scalable infrastructure services.' },
  { title: 'AI/ML Platforms', blurb: 'AI fabric design, GPU cluster networking, and ML workload optimization.' },
  { title: 'Enterprises', blurb: 'Network modernization, campus upgrades, and digital transformation services.' },
  { title: 'Telecom', blurb: '5G infrastructure, OpenRAN deployment, and edge computing solutions.' },
]

const serviceCapabilities = [
  'Network architecture design and implementation for data center and enterprise environments',
  'Software platform engineering including cloud-native development and microservices',
  'Protocol and system development for networking and infrastructure systems',
  'Infrastructure automation with Infrastructure as Code, GitOps, and CI/CD pipelines',
  'Observability and monitoring deployment with telemetry and analytics',
  'AI/ML engineering services including model deployment and optimization',
  'Custom tooling and automation for development and operations workflows',
  'Managed services with SRE practices, 24/7 support, and lifecycle management',
]

const serviceBenefits = [
  { title: 'Accelerated Delivery', detail: 'Faster time-to-market through proven methodologies, expert engineering, and efficient project execution.' },
  { title: 'Cost Optimization', detail: 'Reduce total cost of ownership through efficient design and operational practices.' },
  { title: 'Technical Excellence', detail: 'Access to deep expertise across networking, software, protocols, AI/ML, and automation technologies.' },
  { title: 'Operational Excellence', detail: 'SRE practices and SLO-based operations improve reliability and reduce downtime.' },
]

const serviceWorkflow = [
  'Assess current infrastructure, requirements, and business objectives',
  'Design architecture and create comprehensive implementation blueprint',
  'Implement solution following industry best practices and methodologies',
  'Validate and optimize performance against defined success criteria',
  'Provide ongoing support, monitoring, and continuous improvement',
]

const engagementModels = [
  {
    title: 'Project-Based',
    description: 'Defined scope and outcomes',
    features: ['Clear scope and milestones', 'Fixed pricing', 'Defined deliverables', 'Project management'],
  },
  {
    title: 'Time & Materials',
    description: 'Embedded engineering support',
    features: ['Flexible scope', 'Pay for actual effort', 'Scalable team size', 'Agile methodology'],
  },
  {
    title: 'Managed Services',
    description: 'SLA-backed, 24×7 operations',
    features: ['24/7 support', 'SLA-backed services', 'Proactive monitoring', 'Continuous improvement'],
  },
]

export function ServicesContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        {/* Advanced Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        
        <div className="container-custom relative z-10">
          {/* Top Section - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 items-start mb-8 lg:mb-12">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 sm:space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-primary-300" />
                <span>Engineering-Led Services</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Engineering-led services for{' '}
                <span className="text-primary-300">
                  production-grade infrastructure
                </span>
              </h1>
              
              {/* Content */}
              <div className="space-y-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                <p className="text-lg sm:text-xl md:text-2xl text-white font-medium">
                  PalC delivers end-to-end services for the design, implementation, and operation of complex infrastructure environments.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-300">
                  We focus on building systems that perform reliably at scale, remain operable under failure conditions, and meet the demands of modern cloud and AI workloads.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 lg:space-y-5"
            >
              {/* Key Highlights Cards */}
              <div className="grid grid-cols-1 gap-4 lg:gap-5">
                {[
                  { label: 'Design', value: 'Architecture & Planning', icon: Layers, gradient: 'from-blue-500/20 to-blue-600/20' },
                  { label: 'Implementation', value: 'Build & Deploy', icon: Code, gradient: 'from-primary/20 to-primary/30' },
                  { label: 'Operation', value: 'Support & Optimize', icon: Server, gradient: 'from-cyan-500/20 to-cyan-600/20' },
                ].map((item, idx) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                      className="group relative p-6 lg:p-7 rounded-xl lg:rounded-2xl bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-800/90 backdrop-blur-md border border-gray-700/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
                    >
                      {/* Gradient Overlay on Hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center gap-4 lg:gap-5">
                        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br from-cyan-400/50 via-cyan-300/40 to-cyan-500/50 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-400/30 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-7 h-7 lg:w-8 lg:h-8 text-white group-hover:text-cyan-50 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs lg:text-sm font-semibold text-gray-300 group-hover:text-gray-200 uppercase tracking-wide mb-1.5 lg:mb-2 transition-colors">{item.label}</p>
                          <p className="text-sm sm:text-base lg:text-lg font-bold text-white leading-tight">{item.value}</p>
                        </div>
                      </div>
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Last Paragraph */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                Our services support organizations running mission-critical networks, platforms, and data-intensive environments — where{' '}
                <span className="text-white font-semibold">engineering depth</span>,{' '}
                <span className="text-white font-semibold">operational discipline</span>, and{' '}
                <span className="text-white font-semibold">long-term reliability</span> are essential.
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="group inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/30 hover:scale-[1.02] hover:shadow-primary/40 transition-all duration-300"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="services-hero"
        title="Get Started with PalC Services"
        subtitle="Tell us about your infrastructure needs and we'll connect you with the right expert."
      />

      {/* Core Service Domains */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Core Service Domains
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                One Integrated Engineering Model
              </p>
            </motion.div>
          </div>

          <div className="space-y-16">
            {[
              {
                title: 'Network Engineering & Architecture',
                subtitle: 'High-Scale, Open, and Performant Networks',
                description: 'We design and deploy modern networks for data centers, enterprises, cloud providers, and AI platforms — with a strong focus on open and disaggregated architectures.',
                icon: Network,
                href: '/services/networking-engineering',
                whatWeDeliver: [
                  'Data center and IP network architecture',
                  'EVPN/VXLAN and routed fabric designs',
                  'Open networking and SONiC-based deployments',
                  'Packet-optical and transport integration',
                  'Campus and wireless modernization',
                  'Network optimization and failure-domain design',
                ],
                whyItMatters: 'Your network should scale without re-architecture, survive failures gracefully, and remain operable by real teams — not just experts.',
              },
              {
                title: 'Software, Systems & Platform Engineering',
                subtitle: 'Where Infrastructure Meets Code',
                description: 'Modern infrastructure is software-driven. We help teams build the platforms and systems that control, automate, and observe it.',
                icon: Code,
                href: '/services/software-platform-engineering',
                whatWeDeliver: [
                  'Cloud-native and platform engineering',
                  'Control-plane and management systems',
                  'Infrastructure management platforms',
                  'API-driven and event-based architectures',
                  'Integration with existing tools and workflows',
                ],
                whyItMatters: 'Without strong platform engineering, automation breaks, visibility is lost, and operations become fragile.',
              },
              {
                title: 'Protocol & Low-Level Systems Development',
                subtitle: 'Engineering Below the Abstraction Layer',
                description: 'For organizations building serious infrastructure products or platforms, we provide deep systems expertise that is rarely available externally.',
                icon: Cpu,
                href: '/services/protocol-system-development',
                whatWeDeliver: [
                  'L2/L3 protocol development and enhancement',
                  'Protocol validation and interoperability testing',
                  'NOS and kernel-level optimizations',
                  'Data-plane development using P4 and eBPF',
                  'Performance and scalability tuning',
                ],
                whyItMatters: 'These layers define performance, stability, and long-term viability — and mistakes here are expensive to fix later.',
              },
              {
                title: 'Automation & Infrastructure Tooling',
                subtitle: 'Designed for Scale, Not Demos',
                description: 'Automation is not optional — but it must be designed, not patched together.',
                icon: Zap,
                href: '/services/automation-tooling',
                whatWeDeliver: [
                  'Infrastructure as Code (Terraform, Ansible)',
                  'Network automation and ZTP workflows',
                  'CI/CD pipelines for infra and platforms',
                  'GitOps-based operational models',
                  'Custom internal tools for engineering teams',
                ],
                whyItMatters: 'Automation done wrong increases risk. Done right, it enables speed, consistency, and confidence.',
              },
              {
                title: 'AI / ML Infrastructure Services',
                subtitle: 'Built Specifically for AI Workloads',
                description: 'AI infrastructure fails when treated like traditional data centers. We design networks and systems explicitly for AI and GPU-driven environments.',
                icon: Cpu,
                href: '/services/ai-ml-engineering',
                whatWeDeliver: [
                  'AI fabric and topology design',
                  'RoCE configuration, tuning, and validation',
                  'GPU cluster networking optimization',
                  'Lossless Ethernet and buffer management',
                  'Performance benchmarking and readiness testing',
                ],
                whyItMatters: 'AI workloads demand predictable latency, zero loss, and high utilization — anything less wastes expensive compute.',
              },
              {
                title: 'Observability & Reliability Engineering',
                subtitle: 'Visibility Is an Engineering Discipline',
                description: "You can't operate what you can't see. We build observability systems that serve both engineering and operations.",
                icon: Eye,
                href: '#',
                whatWeDeliver: [
                  'Streaming telemetry pipelines',
                  'Network and system observability platforms',
                  'SLO and reliability dashboards',
                  'Proactive alerting and anomaly detection',
                  'Capacity and performance analytics',
                ],
                whyItMatters: 'Good observability shortens outages, improves decisions, and keeps teams in control as systems scale.',
              },
              {
                title: 'Professional, Managed & Lifecycle Services',
                subtitle: 'Beyond Go-Live',
                description: 'Infrastructure success is measured months and years after deployment, not on launch day.',
                icon: HeadphonesIcon,
                href: '/services/professional-lifecycle-services',
                whatWeDeliver: [
                  'Architecture reviews and advisory services',
                  'Hands-on implementation and integration',
                  'Validation, testing, and production readiness',
                  'Managed services aligned with SRE practices',
                  '24×7 support, upgrades, and optimization',
                ],
                whyItMatters: 'Stable operations require engineering continuity — not handoffs between disconnected teams.',
              },
            ].map((domain, index) => {
              const IconComponent = domain.icon
              return (
                <motion.div
                  key={domain.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{domain.title}</h3>
                      <p className="text-lg font-semibold text-primary mb-3">{domain.subtitle}</p>
                      <p className="text-gray-700 leading-relaxed">{domain.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">What we deliver</h4>
                      <ul className="space-y-2">
                        {domain.whatWeDeliver.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3">Why it matters</h4>
                      <p className="text-gray-700 leading-relaxed">{domain.whyItMatters}</p>
                    </div>
                  </div>

                  {domain.href !== '#' && (
                    <div className="mt-6">
                      <Link
                        href={domain.href}
                        className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Who We Work With
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Our services are built for organizations that operate at scale:
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cloud Providers', description: 'Multi-cloud infrastructure, interconnects, automation' },
              { title: 'AI / ML Platforms', description: 'GPU clusters, AI fabrics, performance optimization' },
              { title: 'Enterprises', description: 'Network modernization and digital transformation' },
              { title: 'Telecom & Service Providers', description: '5G, Open RAN, edge and transport networks' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Organizations Choose PalC */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Organizations Choose PalC
              </h2>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              'Engineering-first culture',
              'Deep expertise across networking, cloud, and AI',
              'Open and vendor-neutral approach',
              'Automation and reliability at the core',
              'Proven experience in real production environments',
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border-2 border-gray-200 bg-white hover:border-primary/40 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base font-semibold text-gray-900 leading-relaxed">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How We Work
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold">
                A Proven Delivery Model
              </p>
            </motion.div>
          </div>

          {/* Structured Process Flow */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: 'Design', 
                  description: 'Architect with scale and failure in mind',
                  icon: Layers
                },
                { 
                  title: 'Build', 
                  description: 'Repeatable, testable implementations',
                  icon: Code
                },
                { 
                  title: 'Operate', 
                  description: 'Continuous optimization and support',
                  icon: Server
                },
              ].map((step, idx) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative"
                  >
                    {/* Step Card */}
                    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                      {/* Icon */}
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Connecting Arrow */}
                      {idx < 2 && (
                        <div className="hidden md:block absolute -right-4 top-1/2 transform translate-x-full -translate-y-1/2 z-10">
                          <ArrowRight className="w-8 h-8 text-primary/40" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Engagement Models
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto font-semibold">
                Flexible, Transparent, Engineering-Led
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-hover hover:border-primary/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {model.title}
                </h3>
                <p className="text-gray-600 mb-6">{model.description}</p>
                <ul className="space-y-2">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PartnersSection />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary/90 to-blue-500 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Let's Build Infrastructure That Holds Up Under Pressure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Talk to PalC about designing, building, or operating infrastructure that is ready for scale, failure, and growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white text-primary font-semibold px-6 py-3 shadow-lg hover:scale-[1.01] transition"
              >
                Contact Us
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Explore Services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

