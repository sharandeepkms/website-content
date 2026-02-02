"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Globe, 
  Award,
  CheckCircle2,
  Building2,
  Calendar,
  Rocket,
  TrendingUp,
  Zap
} from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { CTASection } from '../components/CTASection'
import { getImageSrc } from '../utils/image-path'

const stats = [
  { value: '500+', label: 'Enterprise Clients', numericValue: 500, suffix: '+' },
  { value: '50+', label: 'Countries Served', numericValue: 50, suffix: '+' },
  { value: '99.9%', label: 'Customer Satisfaction', numericValue: 99.9, suffix: '%' },
  { value: '9+', label: 'Years of Excellence', numericValue: 9, suffix: '+' },
]

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, delivering solutions that exceed expectations.',
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We operate with transparency and honesty, building trust with our clients and partners.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We believe in the power of teamwork, working closely with clients to achieve shared goals.',
  },
  {
    icon: Award,
    title: 'Innovation',
    description: 'We embrace new technologies and approaches to solve complex challenges.',
  },
]

const leadership = [
  {
    name: 'Kingston Smiler Selvaraj',
    role: 'CEO & Co-Founder',
    description: 'Our leadership team brings decades of experience in enterprise technology and consulting.',
  },
  {
    name: 'Technical Advisory',
    role: 'CTO & Architecture',
    description: 'Industry veterans leading our technical vision and innovation initiatives.',
  },
  {
    name: 'Operations',
    role: 'COO & Delivery',
    description: 'Ensuring operational excellence and successful project delivery worldwide.',
  },
  {
    name: 'Client Success',
    role: 'VP Client Relations',
    description: 'Dedicated to ensuring our clients achieve their business objectives.',
  },
]

// Partner images should be placed in public/images/partners/ directory
// Use PNG format for best results (transparent backgrounds preferred)
const partners = [
  { name: 'Aeverie', logo: '/images/partners/Aeverie.jpg' },
  { name: 'BENU Networks', logo: '/images/partners/BENU.jpg' },
  { name: 'Ciena', logo: '/images/partners/CIENA1.jpg' },
  { name: 'Supermicro', logo: '/images/partners/supermicro.png' },
  { name: 'IncepXion DNS', logo: '/images/partners/DNS-1.jpg' },
  { name: 'ECI Networks', logo: '/images/partners/ECI.jpg' },
  { name: 'Edge-core Networks', logo: '/images/partners/EDGECORE-1.jpg' },
  { name: 'EDTS', logo: '/images/partners/edts-1.jpg' },
  { name: 'Radisys', logo: '/images/partners/Radisys.jpg' },
  { name: 'STORDIS', logo: '/images/partners/Stordis.jpg' },
  { name: 'Ekinops', logo: '/images/partners/Ekinops.jpg' },
  { name: 'EPS', logo: '/images/partners/EPS.jpg' },
  { name: 'Falca', logo: '/images/partners/Falca.jpg' },
  { name: 'GlobalLogic', logo: '/images/partners/GlobalLogic.jpg' },
  { name: 'HFCL', logo: '/images/partners/HFCL-1.jpg' },
  { name: 'Arrcus', logo: '/images/partners/arrcus.png' },
  { name: 'D-Link', logo: '/images/partners/d-link.png' },
  { name: 'Extreme Networks', logo: '/images/partners/extreme-networks.png' },
  { name: 'Hexaware', logo: '/images/partners/Hexaware.jpg' },
  { name: 'IDrive', logo: '/images/partners/IDrive.jpg' },
  { name: 'IMS Asia', logo: '/images/partners/IMSAsia.jpg' },
  { name: 'Infinera', logo: '/images/partners/Infinera.jpg' },
  { name: 'Ruijie', logo: '/images/partners/ruijie.png' },
  { name: 'IPinfusion', logo: '/images/partners/IPinfusion.jpg' },
  { name: 'MICAS', logo: '/images/partners/MICAS-1.jpg' },
  { name: 'Aurcore', logo: '/images/partners/Aurcore.png' },
  { name: 'Canoga Perkins', logo: '/images/partners/canoga-perkins.png' },
  { name: 'NTT Electronics', logo: '/images/partners/NTT_Elce-1.jpg' },
  { name: 'Nuron', logo: '/images/partners/Nuron.png' },
  { name: 'Polaris Wireless', logo: '/images/partners/Polaris.jpg' },
  { name: 'Privafy', logo: '/images/partners/Privafy.jpg' },
  { name: 'RACOMM', logo: '/images/partners/RACOMM-1-1.jpg' },
]

const focusAreas = [
  {
    title: 'SONiC & Open Networking',
    detail: 'Disaggregated switching, EVPN/VXLAN/SRv6 fabrics, and open telemetry pipelines.',
  },
  {
    title: 'AI-Ready Infrastructure',
    detail: 'RoCEv2/ECN tuning, lossless fabrics, and GPU/accelerator performance optimization.',
  },
  {
    title: 'Cloud & NetDevOps',
    detail: 'Landing zones, automation pipelines, policy-as-code, and GitOps for network and security.',
  },
  {
    title: 'Security & Observability',
    detail: 'Zero trust, microsegmentation, INT/gNMI, and SLO-driven assurance with runbooks.',
  },
]

// Counter component for animated numbers
function Counter({ targetValue, suffix = '', duration = 2 }: { targetValue: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const startValue = 0
    const isDecimal = targetValue % 1 !== 0

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const elapsed = (currentTime - startTime) / 1000 // Convert to seconds
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (targetValue - startValue) * easeOutQuart
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(targetValue)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, targetValue, duration])

  return (
    <span ref={ref}>
      {targetValue % 1 === 0 ? Math.floor(count) : count.toFixed(1)}{suffix}
    </span>
  )
}

const journeyMilestones = [
  {
    year: '2017',
    title: 'Foundation',
    description: 'PalC Networks was born and incorporated with a handful of ambitious people in Bengaluru. Started operations from a single room, marking the beginning of our journey.',
    icon: Rocket,
    stats: {
      employees: '8',
      customers: '2',
      developmentCenters: '1',
    },
  },
  {
    year: '2018',
    title: 'Early Growth',
    description: 'PalC Networks starts hiring new employees to fulfill the requirement of its initial customers. Moves to a bigger apartment, expanding our operational capacity.',
    icon: TrendingUp,
    stats: {
      employees: '20',
      customers: '5',
      developmentCenters: '1',
    },
  },
  {
    year: '2019',
    title: 'Rapid Expansion',
    description: 'PalC Networks continues to grow in number both in customer and employees count, showing a growth of 100%. Moves into a new fully furnished Office in Whitefield, Bengaluru.',
    icon: Zap,
    stats: {
      employees: '40',
      customers: '11',
      developmentCenters: '1',
    },
  },
  {
    year: '2020-21',
    title: 'Resilient Growth',
    description: 'With pandemic hitting the world, PalC Networks continues to grow 100% and doubles the employee count. Opens a new Development Center in Guindy, Chennai, increasing its presence.',
    icon: Globe,
    stats: {
      employees: '80',
      customers: '24',
      developmentCenters: '2',
    },
  },
  {
    year: '2022',
    title: 'Global Presence',
    description: 'PalC Networks opens a new Sales office in San Francisco and moves into bigger IT campuses in both Bengaluru and Chennai. Changes its logo, reflecting our evolution and growth.',
    icon: Award,
    stats: {
      employees: '120',
      customers: '30',
      developmentCenters: '3',
    },
  },
]

export function AboutContent() {
  return (
    <>
      <PageHero
        title="About PalC Networks"
        subtitle="Empowering enterprises worldwide with innovative technology solutions and expert services since our founding."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      {/* Company Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Our Story
              </span>
              <h2 className="heading-2 text-gray-900 mb-6">
                Building the Future of Enterprise Technology
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  PalC Networks was founded with a vision to transform how enterprises 
                  approach technology infrastructure. We recognized that organizations 
                  needed a partner who understood both the technical complexities and 
                  business implications of modern IT.
                </p>
                <p>
                  Today, we serve hundreds of enterprises worldwide, helping them navigate 
                  the complexities of digital transformation. From open networking to 
                  AI-ready infrastructure, we deliver solutions that drive real business value.
                </p>
                <p>
                  Our team of certified experts brings deep expertise across vendor 
                  platforms and technologies, combined with a customer-first approach 
                  that ensures your success.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    <Counter 
                      targetValue={stat.numericValue} 
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="What We Do"
            title="Built for Modern, Open, and AI-Ready Networks"
            subtitle="Our delivery model mirrors the best of Cisco, Arista, and Juniper: clean architectures, automation-first operations, and measurable outcomes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-hover transition-all duration-300"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="heading-4 text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To empower enterprises with innovative technology solutions that drive 
                digital transformation, operational excellence, and sustainable growth. 
                We are committed to delivering exceptional value through expertise, 
                integrity, and customer-centric service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="heading-4 text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the global leader in enterprise technology services, recognized 
                for our innovation, expertise, and unwavering commitment to customer 
                success. We envision a world where technology empowers every organization 
                to achieve their full potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Our Values"
            title="What Drives Us"
            subtitle="Our core values guide everything we do and shape our culture."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Leadership"
            title="Meet Our Team"
            subtitle="Experienced leaders driving innovation and excellence."
          />

          {/* CEO Quote Section - Modern & Advanced */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="relative max-w-6xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-gray-700/50 overflow-hidden group min-h-[600px] lg:min-h-[700px]">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={getImageSrc('/images/team/ceo-bg.png', true)}
                  alt="Background"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              
              {/* Advanced Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan/10"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)]"></div>
              
              {/* Animated Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.1]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              ></div>
              
              {/* Logo Icon - Top Left (Decorative) */}
              <div className="absolute top-6 left-6 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
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
              <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <Image
                  src={getImageSrc('/images/logo/Logo_Icon_Right.png', true)}
                  alt="PalC Logo Icon"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                  unoptimized
                />
              </div>
              
              {/* 2-Column Layout: Image Left, Content Right */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                {/* Left Column - CEO Image */}
                <div className="order-1 h-full min-h-[400px] lg:min-h-full">
                  <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                    {/* Dark Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      {/* Animated Gradient Orbs */}
                      <motion.div
                        animate={{ 
                          x: [0, 50, 0],
                          y: [0, 30, 0],
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                      />
                      <motion.div
                        animate={{ 
                          x: [0, -40, 0],
                          y: [0, -20, 0],
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan/20 rounded-full blur-3xl"
                      />
                      <motion.div
                        animate={{ 
                          x: [0, 30, 0],
                          y: [0, -40, 0],
                          scale: [1, 1.1, 1],
                          opacity: [0.25, 0.45, 0.25]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
                      />
                      
                      {/* Animated Grid Pattern */}
                      <div 
                        className="absolute inset-0 opacity-[0.05]"
                        style={{
                          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                          backgroundSize: '40px 40px'
                        }}
                      />
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        animate={{ 
                          x: ['-100%', '200%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2"
                      />
                    </div>
                    
                    {/* CEO Image */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-8">
                      <Image
                        src={getImageSrc('/images/team/ceo.png', true)}
                        alt="Kingston Smiler Selvaraj - CEO & Co-Founder"
                        width={600}
                        height={800}
                        className="w-full h-full object-contain object-center drop-shadow-2xl"
                        onError={(e) => {
                          // Fallback to gradient placeholder if image doesn't exist
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const fallback = document.createElement('div')
                            fallback.className = 'w-full h-full bg-gradient-to-br from-primary/30 via-cyan/30 to-primary/30 flex items-center justify-center'
                            fallback.innerHTML = '<svg class="w-32 h-32 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'
                            parent.appendChild(fallback)
                          }
                        }}
                        unoptimized
                      />
                    </div>
                    
                    {/* Bottom Gradient Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900/50 via-gray-900/20 to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* Right Column - Content */}
                <div className="order-2 flex flex-col justify-center">
                  {/* Quote Header */}
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"></div>
                  </div>
                  
                  {/* Main Quote Text */}
                  <blockquote className="mb-8">
                    <p className="text-lg lg:text-xl xl:text-2xl text-white leading-[1.8] font-medium italic">
                      At PalC Networks, we believe that{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 font-semibold text-primary-light">technology infrastructure</span>
                        <span className="absolute bottom-0 left-0 right-0 h-2 bg-primary/30 -z-0"></span>
                      </span>
                      {' '}shouldn't be a barrier to innovation—it should be the foundation that enables it. Our mission is to help organizations build{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 font-semibold text-cyan-400">production-grade, scalable systems</span>
                        <span className="absolute bottom-0 left-0 right-0 h-2 bg-cyan-500/30 -z-0"></span>
                      </span>
                      {' '}that not only meet today's demands but evolve with tomorrow's challenges. We combine{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10 font-semibold text-primary-light">deep engineering expertise</span>
                        <span className="absolute bottom-0 left-0 right-0 h-2 bg-primary/30 -z-0"></span>
                      </span>
                      {' '}with a relentless focus on operational excellence, ensuring our clients can focus on what matters most—building their business.
                    </p>
                  </blockquote>
                  
                  {/* Elegant Divider */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent"></div>
                  </div>
                  
                  {/* Attribution - Enhanced Design */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-cyan/30 flex items-center justify-center border border-primary/40">
                        <Users className="w-5 h-5 text-primary-light" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg leading-tight">
                          Kingston Smiler Selvaraj
                        </p>
                        <p className="text-sm text-gray-300 font-medium leading-[1.6]">
                          CEO & Co-Founder, PalC Networks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Hover Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          </motion.div>

          {/* Leadership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:shadow-hover transition-shadow"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-center mb-1">
                  {leader.name}
                </h4>
                <p className="text-sm text-primary text-center mb-3">{leader.role}</p>
                <p className="text-sm text-gray-600 text-center">
                  {leader.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey - Glassmorphism Advanced Design */}
      <section id="journey" className="section-padding relative overflow-hidden">
        {/* Advanced Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl"
          />
        </div>
        
        {/* Glassmorphism overlay pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
          >
            <SectionHeading
              tag="Our Journey"
              title="Building Excellence Over the Years"
              subtitle="From humble beginnings to industry leadership, discover the milestones that shaped PalC Networks."
            />
          </motion.div>
          
          {/* Glassmorphism Stats Bar */}
          <div className="mt-10 mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Years', value: '9+', numericValue: 9, suffix: '+', icon: Calendar },
              { label: 'Clients', value: '500+', numericValue: 500, suffix: '+', icon: Users },
              { label: 'Countries', value: '50+', numericValue: 50, suffix: '+', icon: Globe },
              { label: 'Projects', value: '1000+', numericValue: 1000, suffix: '+', icon: Award },
            ].map((stat, idx) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Glassmorphism card */}
                  <div className="relative backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 text-center overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-all">
                        <StatIcon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1">
                        <Counter 
                          targetValue={stat.numericValue} 
                          suffix={stat.suffix}
                          duration={2}
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
          
          {/* Advanced Glassmorphism Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Glowing Central Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 blur-md" />
              
              {/* Main line with glassmorphism */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary origin-top backdrop-blur-sm"
              />
              
              {/* Inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-white/20 w-full" />
            </div>
            
            {/* Timeline Items - Advanced Glassmorphism */}
            <div className="space-y-16 md:space-y-20">
              {journeyMilestones.map((milestone, index) => {
                const Icon = milestone.icon
                const isEven = index % 2 === 0
                
                return (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: Math.min(index * 0.1, 0.6),
                      ease: [0.21, 1.11, 0.81, 0.99]
                    }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Advanced Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          delay: Math.min(index * 0.1 + 0.2, 0.7),
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="relative group"
                      >
                        {/* Outer glow rings */}
                        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                        <motion.div
                          animate={{ scale: [1, 1.3, 1.3], opacity: [0.3, 0, 0] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                          className="absolute inset-0 bg-gradient-primary rounded-full blur-lg"
                        />
                        
                        {/* Glassmorphism node container */}
                        <div className={`relative w-18 h-18 bg-gradient-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-white/80 backdrop-blur-sm`}>
                          {/* Inner glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                          
                          {/* Icon */}
                          <Icon className="w-8 h-8 text-white relative z-10 drop-shadow-lg" />
                          
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Advanced Glassmorphism Content Card */}
                    <div className={`flex-1 ml-24 md:ml-0 ${
                      isEven ? 'md:mr-auto md:pr-10 md:text-right' : 'md:ml-auto md:pl-10 md:text-left'
                    }`}>
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group relative"
                      >
                        {/* Card shadow layer */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Glassmorphism card */}
                        <div className="relative backdrop-blur-xl bg-white/80 border border-white/60 rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Animated border gradient */}
                          <div className="absolute inset-0 rounded-3xl bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm" />
                          <div className={`absolute inset-[1px] rounded-3xl bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-xl`} />
                          
                          {/* Content */}
                          <div className={`relative z-10 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                            {/* Year Badge - Glassmorphism */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-white text-xs font-bold mb-4 shadow-lg backdrop-blur-sm border border-white/30 relative overflow-hidden">
                              {/* Badge shine */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <Calendar className="w-3.5 h-3.5 relative z-10" />
                              <span className="relative z-10">{milestone.year}</span>
                            </div>
                            
                            {/* Title with gradient */}
                            <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-primary group-hover:via-primary/90 group-hover:to-primary transition-all duration-300">
                              {milestone.title}
                            </h3>
                            
                            {/* Stats Grid */}
                            {milestone.stats && (
                              <div className={`grid grid-cols-3 gap-3 mb-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                <div className="backdrop-blur-sm bg-white/50 rounded-lg p-2 border border-white/40">
                                  <div className="text-xs text-gray-600 mb-1">Employees</div>
                                  <div className="text-lg font-bold text-gray-900">{milestone.stats.employees}</div>
                                </div>
                                <div className="backdrop-blur-sm bg-white/50 rounded-lg p-2 border border-white/40">
                                  <div className="text-xs text-gray-600 mb-1">Customers</div>
                                  <div className="text-lg font-bold text-gray-900">{milestone.stats.customers}</div>
                                </div>
                                <div className="backdrop-blur-sm bg-white/50 rounded-lg p-2 border border-white/40">
                                  <div className="text-xs text-gray-600 mb-1">Dev Centers</div>
                                  <div className="text-lg font-bold text-gray-900">{milestone.stats.developmentCenters}</div>
                                </div>
                              </div>
                            )}
                            
                            {/* Description */}
                            <p className={`text-sm md:text-base text-gray-700 leading-relaxed ${
                              isEven ? 'md:text-right' : 'md:text-left'
                            }`}>
                              {milestone.description}
                            </p>
                            
                            {/* Decorative accent line */}
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: '100%' }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                              className="h-1 bg-gradient-primary rounded-full mt-4 opacity-30"
                              style={{ maxWidth: '120px', marginLeft: isEven ? 'auto' : '0', marginRight: isEven ? '0' : 'auto' }}
                            />
                          </div>
                          
                          {/* Shine sweep effect */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                          
                          {/* Connecting line to timeline - Glassmorphism */}
                          <div className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} w-12 md:w-16 h-0.5 bg-gradient-to-r ${isEven ? 'from-transparent via-primary/40 to-primary/40' : 'from-primary/40 via-primary/40 to-transparent'} transform ${isEven ? 'translate-x-full' : '-translate-x-full'} hidden md:block backdrop-blur-sm`} />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                )
              })}
            </div>
            
            {/* Advanced Future Section - Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-16 text-center"
            >
              <div className="relative inline-block">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl blur-2xl" />
                
                {/* Glassmorphism container */}
                <div className="relative backdrop-blur-2xl bg-white/60 border border-white/50 rounded-3xl p-8 md:p-10 shadow-2xl">
                  {/* Animated rocket */}
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white/60 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Rocket glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                    <Rocket className="w-8 h-8 text-white relative z-10 drop-shadow-lg" />
                    
                    {/* Particle effect */}
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-primary/30 rounded-2xl blur-md"
                    />
                  </motion.div>
                  
                  <h4 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                    The Journey Continues
                  </h4>
                  <p className="text-sm md:text-base text-gray-700 max-w-md mx-auto leading-relaxed">
                    We're committed to innovation and excellence as we shape the future of enterprise networking.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="section-padding bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <SectionHeading
            tag="Technology Partners"
            title="Strategic Partnerships"
            subtitle="We partner with leading technology vendors to deliver best-in-class solutions."
          />
          
          {/* Advanced Partners Grid */}
          <div className="mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
              {partners.map((partner, index) => {
                // Logos that appear larger (no built-in padding) - need smaller max dimensions
                const logosWithoutPadding = [
                  'd-link.png',
                  'arrcus.png',
                  'extreme-networks.png',
                  'ruijie.png',
                  'Aurcore.png',
                  'canoga-perkins.png',
                ]
                
                const hasNoPadding = logosWithoutPadding.some(logoName => 
                  partner.logo?.toLowerCase().includes(logoName.toLowerCase())
                )
                
                return (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.03,
                      ease: [0.21, 1.11, 0.81, 0.99]
                    }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                    className="group relative"
                  >
                    <div className="relative h-32 flex items-center justify-center p-6 rounded-2xl bg-white border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      {partner.logo ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={getImageSrc(partner.logo, true)}
                            alt={partner.name}
                            width={180}
                            height={80}
                            className="object-contain transition-all duration-300 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                            style={{
                              maxHeight: hasNoPadding ? '60px' : '80px',
                              maxWidth: hasNoPadding ? '140px' : '180px',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain',
                            }}
                            unoptimized={true}
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to text if image fails to load
                              const target = e.target as HTMLImageElement
                              const placeholderSrc = getImageSrc('/images/placeholder-hero.svg', true)
                              // Try placeholder first
                              if (!target.src.includes('placeholder-hero')) {
                                target.src = placeholderSrc
                                target.className = 'object-contain transition-all duration-300 opacity-50'
                                // If placeholder also fails, fallback to text (handled by second onError)
                                target.onerror = () => {
                                  const parent = target.parentElement?.parentElement
                                  if (parent) {
                                    parent.innerHTML = `<span class="text-sm font-semibold text-gray-400 text-center">${partner.name}</span>`
                                  }
                                }
                              } else {
                                // Placeholder failed, show text fallback
                                const parent = target.parentElement?.parentElement
                                if (parent) {
                                  parent.innerHTML = `<span class="text-sm font-semibold text-gray-400 text-center">${partner.name}</span>`
                                }
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-sm font-semibold text-gray-400 group-hover:text-primary transition-colors text-center">
                          {partner.name}
                        </span>
                      )}
                      
                      {/* Tooltip on hover */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                        {partner.name}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Additional decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-gray-500">
                Trusted by <span className="font-semibold text-primary">{partners.length}+</span> technology partners worldwide
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                tag="Global Presence"
                title="Serving Clients Worldwide"
              subtitle="With offices and delivery centers across the globe, we provide local expertise with global capabilities."
                centered={false}
              />
              <div className="space-y-4">
                {[
                'Bangalore, India — Unit 8, 5th Floor, Navigator Building, ITPB, Whitefield, 560066',
                'Chennai, India — Phase 1, Tower 2, 1st Floor, Chennai One IT SEZ Park, Thoraipakkam, 600097',
                'San Jose, USA — 2033 Gateway Place, Ste 500, San Jose, CA 95110',
                'Dubai, UAE — IFZA business park, Dubai Silicon Oasis, DDP Building A1',
                ].map((location, index) => (
                  <motion.div
                    key={location}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="text-gray-700">{location}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-deep rounded-2xl p-8 text-white"
            >
              <h3 className="heading-4 mb-6">24/7 Global Support</h3>
              <p className="text-gray-300 mb-6">
                Our follow-the-sun support model ensures you always have access to 
                expert assistance, regardless of your timezone.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  '24/7 NOC Operations',
                  'Multi-language Support',
                  'Local Account Teams',
                  'Global Delivery',
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        title="Join Our Journey"
        subtitle="Partner with PalC Networks to transform your technology infrastructure."
        primaryButtonText="Contact Us"
        primaryButtonHref="/contact"
        secondaryButtonText="View Careers"
        secondaryButtonHref="/careers"
      />
    </>
  )
}

