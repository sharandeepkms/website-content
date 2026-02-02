"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SolutionCard } from '../components/SolutionCard'
import { CTASection } from '../components/CTASection'
import { SectionHeading } from '../components/SectionHeading'
import { PartnersSection } from '../components/PartnersSection'
import { ArrowRight, Server, Network, BarChart3, Cloud, Shield, Check, Layers, Sparkles, Gauge, GitBranch, Eye, Code2, CheckSquare, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getImageSrc } from '@/app/utils/image-path'

// Solutions matching navbar menu items
interface NavbarSolution {
  name: string
  href: string
  icon: LucideIcon
  description: string
  tag?: string
}

const navbarSolutions: NavbarSolution[] = [
  { 
    name: 'Data Center Modernization & AI Fabrics', 
    href: '/solutions/data-center-modernization-ai-fabrics',
    icon: Server,
    description: 'AI-optimized fabrics for high-performance ML workloads',
    tag: 'AI/ML'
  },
  { 
    name: 'SONiC & Open Networking', 
    href: '/solutions/sonic-open-networking',
    icon: Network,
    description: 'Open-source networking with disaggregated infrastructure',
    tag: 'Open Source'
  },
  { 
    name: 'Network Observability & Visibility', 
    href: '/solutions/network-observability-visibility',
    icon: BarChart3,
    description: 'Complete network visibility with telemetry and analytics',
    tag: 'Monitoring'
  },
  { 
    name: 'Cloud & Hybrid Cloud', 
    href: '/solutions/cloud-hybrid-cloud',
    icon: Cloud,
    description: 'Multi-cloud and hybrid cloud transformation',
    tag: 'Cloud'
  },
  { 
    name: 'Identity & Access Management (IAM)', 
    href: '/solutions/identity-access-management',
    icon: Shield,
    description: 'Zero trust security and identity governance',
    tag: 'Security'
  },
]

const solutionHighlights = [
  { 
    title: 'SONiC-First Architecture', 
    detail: 'Open-source networking with disaggregated infrastructure, reducing costs by 40-60% while gaining vendor independence.' 
  },
  { 
    title: 'AI-Ready Fabrics', 
    detail: 'High-performance network fabrics optimized for GPU clusters and ML workloads with RoCE tuning and low-latency designs.' 
  },
  { 
    title: 'Cloud-Native Solutions', 
    detail: 'Multi-cloud and hybrid cloud transformation with automation-first approaches and consistent operations across providers.' 
  },
  { 
    title: 'Complete Observability', 
    detail: 'Real-time network visibility with streaming telemetry, gNMI, INT, and sFlow for proactive operations and SLO-based management.' 
  },
]

const solutionIndustries = [
  { title: 'AI & Machine Learning', blurb: 'GPU cluster networking, RoCE optimization, and high-performance fabrics for ML training workloads.' },
  { title: 'Cloud Providers', blurb: 'Multi-cloud interconnect, transit hubs, and scalable infrastructure for cloud-scale operations.' },
  { title: 'Enterprise', blurb: 'Campus modernization, zero-trust security, and network automation for digital transformation.' },
]

const solutionCapabilities = [
  'EVPN-VXLAN fabric design with BGP-EVPN control plane for scalable multi-tenant networks',
  'SONiC deployment and configuration with custom features and performance optimization',
  'AI fabric architecture with RoCE tuning, buffer management, and congestion control',
  'Cloud infrastructure automation with Terraform, Ansible, and GitOps workflows',
  'Network observability with streaming telemetry, INT, and comprehensive analytics',
  'Zero-trust security implementation with IAM, micro-segmentation, and compliance frameworks',
]

const solutionBenefits = [
  { title: 'Cost Reduction', detail: 'Lower TCO by 40-60% with open networking and disaggregated infrastructure.' },
  { title: 'Vendor Independence', detail: 'Avoid lock-in with open-source solutions and multi-vendor validated patterns.' },
  { title: 'Performance', detail: 'Optimized for AI/ML workloads with sub-microsecond latency and zero packet loss.' },
  { title: 'Automation', detail: 'Infrastructure as Code and CI/CD pipelines reduce deployment time by 70%.' },
]

const solutionUseCases = [
  'Data center modernization and AI fabric deployment',
  'SONiC-based open networking implementation',
  'Cloud migration and hybrid cloud architecture',
  'Network observability and telemetry deployment',
  'Zero-trust security and IAM implementation',
  '5G and edge infrastructure deployment',
]

export function SolutionsContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding pt-32 lg:pt-40 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Solutions for Modern Networks and Distributed Systems
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              As networks and platforms evolve to support open systems, AI workloads, and distributed environments, complexity shifts from individual components to overall system behavior and operations. PalC's solutions address these challenges at a system level.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 hover:scale-[1.01] hover:shadow-primary/40 transition"
              >
                Talk to an Infrastructure Expert <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What This Page Covers - Overview Section */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Logo/Badge - Premium Design */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-primary via-primary to-cyan shadow-lg shadow-primary/20 border border-primary/20 overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Icon */}
                <Network className="w-10 h-10 text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-primary/30 blur-xl opacity-50"></div>
              </div>
              
              {/* Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Overview
              </h2>
              
              {/* Body Text */}
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  PalC solutions are built to solve infrastructure problems that emerge at scale -where performance, reliability, and operational simplicity become critical.
                </p>
                <p>
                  We address these challenges through a combination of system architecture, deep engineering, automation-first implementation, and ongoing operational support. Our solutions enable organizations to modernize networks, deploy AI-ready infrastructure, and operate complex environments with consistency and control.
                </p>
                <p>
                  Each solution area below represents a repeatable, production-proven approach, with dedicated pages that outline the technical context, design considerations, and execution models behind each solution.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Advanced Elegant Widget */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:mt-8"
            >
              {/* Premium Card Container */}
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200/50 overflow-hidden group">
                {/* Advanced Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-cyan/3"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.08),transparent_50%)]"></div>
                
                {/* Animated Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                  }}
                ></div>
                
                {/* Logo Icon - Top Left (Decorative) */}
                <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                  <Image
                    src={getImageSrc('/images/logo/Logo_Icon_Left.png', true)}
                    alt="PalC Logo Icon"
                    width={64}
                    height={64}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    unoptimized
                  />
                </div>
                
                {/* Logo Icon - Bottom Right (Decorative) */}
                <div className="absolute bottom-6 right-6 opacity-10 group-hover:opacity-15 transition-opacity duration-500">
                  <Image
                    src={getImageSrc('/images/logo/Logo_Icon_Right.png', true)}
                    alt="PalC Logo Icon"
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                    unoptimized
                  />
                </div>
                
                {/* Content Container */}
                <div className="relative z-10">
                  {/* Quote Icon - Elegant Design */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl  flex items-center justify-center ">
                      
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"></div>
                  </div>
                  
                  {/* Main Quote Text */}
                  <blockquote className="mb-8">
                    <p className="text-lg lg:text-xl xl:text-2xl text-gray-900 leading-relaxed font-medium italic">
                      By addressing networking and system challenges at a system level, we help organizations build infrastructure that remains{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 font-semibold text-primary">reliable</span>
                        <span className="absolute bottom-0 left-0 right-0 h-2 bg-primary/10 -z-0"></span>
                      </span>
                      ,{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 font-semibold text-cyan-600">observable</span>
                        <span className="absolute bottom-0 left-0 right-0 h-2 bg-cyan-500/10 -z-0"></span>
                      </span>
                      , and{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 font-semibold text-primary">adaptable</span>
                        <span className="absolute bottom-0 left-0 right-0 h-2 bg-primary/10 -z-0"></span>
                      </span>
                      {' '}as environments evolve.
                    </p>
                  </blockquote>
                  
                  {/* Elegant Divider */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/30"></div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                  </div>
                  
                  {/* Attribution - Enhanced Design */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center border border-primary/20">
                        <Network className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg leading-tight">
                          PalC Networks
                        </p>
                        <p className="text-sm text-gray-600 font-medium">
                          System-Level Infrastructure Engineering
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Accent Line */}
                  
                </div>
                
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Areas Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Solution Areas
            </h2>
          </motion.div>

          {/* Solution Areas Grid */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Scaling Modern Network Foundations',
                description: 'Many network designs perform well initially but become difficult to operate as environments grow and traffic patterns change.',
                focus: 'This area focuses on evolving network foundations so they can scale, adapt, and remain manageable over time.',
                link: 'Data Center Modernization & AI Fabrics',
                href: '/solutions/data-center-modernization-ai-fabrics',
                icon: Server,
              },
              {
                title: 'Operating Open Networking Platforms',
                description: 'Open networking platforms increase flexibility and control, but they also shift responsibility to operators.',
                focus: 'This area focuses on making open networking practical and reliable in real production environments.',
                link: 'SONiC & Open Networking',
                href: '/solutions/sonic-open-networking',
                icon: Network,
              },
              {
                title: 'Understanding Network Behavior',
                description: 'As networks grow, lack of visibility becomes a major source of downtime and operational friction.',
                focus: 'This area focuses on observing traffic patterns, performance behavior, and system state across complex networks.',
                link: 'Networking Visibility & Monitoring',
                href: '/solutions/network-observability-visibility',
                icon: Eye,
              },
              {
                title: 'Maintaining Consistency Across Hybrid Environments',
                description: 'As systems span on-premises and cloud platforms, networking models often fragment.',
                focus: 'This area focuses on maintaining consistency and control across hybrid and multi-environment deployments.',
                link: 'Cloud & Hybrid Cloud',
                href: '/solutions/cloud-hybrid-cloud',
                icon: Cloud,
              },
              {
                title: 'Managing Identity Across Platforms',
                description: 'Identity and access systems often evolve separately from networks and platforms.',
                focus: 'This area focuses on aligning identity models with modern systems and operational workflows.',
                link: 'Identity & Access Management',
                href: '/solutions/identity-access-management',
                icon: Shield,
              },
            ].map((area, index) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-cyan/20 transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {area.description}
                      </p>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {area.focus}
                      </p>
                      <Link
                        href={area.href}
                        className="inline-flex items-center text-primary font-semibold hover:text-cyan transition-colors group/link"
                      >
                        → {area.link}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How PalC Approaches Solutions Section */}
      <section className="section-padding bg-gradient-to-br from-white via-primary/5 to-cyan/5 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/5 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              How PalC Approaches These Challenges
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              PalC approaches these challenges as system-level engineering problems, not isolated configuration or deployment tasks.
            </p>
          </motion.div>

          {/* Highlight Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Workload & Platform Analysis',
                description: 'We analyze workload characteristics, traffic patterns, scaling behavior, and platform requirements across data centers, AI systems, and open networking environments.',
                icon: Gauge,
              },
              {
                title: 'Architecture & Operability Design',
                description: 'Network and system architectures are designed with operability in mind, including fault domains, observability, upgrade paths, and long-term maintainability.',
                icon: GitBranch,
              },
              {
                title: 'Platform Engineering & System Integration',
                description: 'We engineer, extend, and integrate platforms such as SONiC with hardware, automation frameworks, and operational tooling to build cohesive, production-ready systems.',
                icon: Code2,
              },
              {
                title: 'Validation, Deployment & Lifecycle Support',
                description: 'Solutions are validated against real traffic, failure scenarios, and operational workflows, then supported through deployment, optimization, and ongoing change.',
                icon: CheckSquare,
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-white border-2 border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-cyan/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-cyan/20 transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              This approach ensures networks and systems are not only built correctly, but remain reliable, observable, and adaptable as environments evolve.
            </p>
          </motion.div>
        </div>
      </section>

      <PartnersSection />

      {/* Final CTA Section */}
      <CTASection 
        title="Exploring how to evolve your network or platform environment?"
        subtitle="Talk to an Infrastructure Expert to discuss how PalC can help you build production-grade, open networking solutions."
        primaryButtonText="Talk to an Infrastructure Expert"
        primaryButtonHref="/contact"
      />
    </>
  )
}

