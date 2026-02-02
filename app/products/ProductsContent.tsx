"use client"

import Link from 'next/link'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Server,
  Network,
  Cpu,
  Cable,
  Code,
  Cloud,
  Shield,
  Gauge,
  Sparkles,
  Layers,
  Boxes,
  CircuitBoard,
  Activity,
} from 'lucide-react'

// Products matching navbar menu items
const productFamilies = [
  {
    title: 'Switches',
    href: '/products/switches',
    icon: Network,
    description: '1G–400G open switching, EVPN/VXLAN, SRv6, AI-ready leaf/spine/super-spine.',
    tags: ['SONiC-ready', 'AI fabrics', 'EVPN/VXLAN'],
  },
  {
    title: 'Servers',
    href: '/products/servers',
    icon: Server,
    description: 'Cloud/edge servers with GPU/DPU options, secure boot, telemetry, and automation.',
    tags: ['AI/GPU', 'Edge', 'Secure boot'],
  },
  {
    title: 'NICs / DPUs',
    href: '/products/nics-dpus',
    icon: Cpu,
    description: 'RoCE/RDMA SmartNICs & DPUs for offload, inline security, and virtualization.',
    tags: ['RDMA', 'Offload', 'Inline security'],
  },
  {
    title: 'Transceivers',
    href: '/products/transceivers',
    icon: Cable,
    description: '10G–400G optics plus DAC/AOC/breakouts validated for AI and cloud fabrics.',
    tags: ['SR/LR/ZR', 'CWDM/DWDM', 'DAC/AOC'],
  },
  {
    title: 'High-Speed Cables',
    href: '/products/high-speed-cables',
    icon: Cable,
    description: 'High-speed DAC, AOC, and breakout cables for data center and AI fabric connectivity.',
    tags: ['DAC', 'AOC', 'Breakout'],
  },
  {
    title: 'Software Tools',
    href: '/products/software-tools',
    icon: Code,
    description: 'NetPro (ops), Guardian (NDR), Packet Broker (traffic), with APIs and automation.',
    tags: ['Observability', 'Automation', 'Security'],
  },
]

const highlights = [
  { title: 'Cloud + SONiC First', detail: 'Open networking with SONiC validation, EVPN/VXLAN, SR/SRv6.' },
  { title: 'AI-Ready Fabrics', detail: 'RoCE/IB tuning, ECN/PFC profiles, deep buffers, microburst visibility.' },
  { title: 'Automation Built-In', detail: 'IaC/GitOps modules, pre/post checks, drift/conformance, rollbacks.' },
  { title: 'Observability & Assurance', detail: 'gNMI/INT/sFlow, SLO dashboards, alert hygiene, closed-loop ops.' },
]

const industries = [
  { title: 'AI & HPC', blurb: 'GPU clusters with deterministic low-latency fabrics and RoCE tuning.' },
  { title: 'Cloud & SaaS', blurb: 'Multi-cloud interconnects, transit hubs, and policy-consistent fabrics.' },
  { title: 'Enterprise', blurb: 'Campus/core with automation, segmentation, and observability.' },
  { title: 'Telco & Edge', blurb: '5G transport, edge POPs, slicing-ready with assured QoS.' },
]

const architecture = [
  'Leaf/spine/super-spine with EVPN/VXLAN, SR/SRv6 underlay.',
  'AI fabric mode with RoCEv2, ECN/PFC tuning, and QoS/AQM profiles.',
  'Controllers & automation: NetPro, GitOps pipelines, pre/post checks, rollbacks.',
  'Observability: gNMI/INT/sFlow, SLO dashboards, alert hygiene, closed-loop hooks.',
]

const whyPalc = [
  { title: 'Open + SONiC', detail: 'Avoid lock-in with validated SONiC builds and open APIs.' },
  { title: 'Cloud-Scale DNA', detail: 'Architectures patterned after hyperscale fabrics and automation.' },
  { title: 'AI Performance', detail: 'Buffer/QoS/ECN profiles tuned for GPU clusters and RoCE fabrics.' },
  { title: 'Automation & SRE', detail: 'IaC/GitOps, SLOs, and runbooks to cut MTTR and change risk.' },
]

export function ProductsContent() {
  return (
    <>
      <PageHero
        title="Products"
        subtitle="Cloud, SONiC, and AI-ready platforms—switches, servers, NICs/DPUs, optics, and software engineered for open networking and automated operations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products' },
        ]}
      />

      <section className="section-padding bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full bg-white/10 text-primary-50 ring-1 ring-white/10">
              Cloud + SONiC + AI Fabrics
            </p>
            <h2 className="heading-2 text-white">
              Open, AI-ready portfolio for leaf/spine, edge, and cloud interconnects
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              Build deterministic, observable fabrics with SONiC-first switching, GPU-friendly servers, RoCE-tuned
              SmartNICs/DPUs, optics/cabling, and controllers that automate lifecycle and assurance.
            </p>
            <div className="flex flex-wrap gap-3">
              {['SONiC-ready switches', 'AI/ML fabrics', 'NetPro + Guardian', 'RoCE/ECN tuning', 'Open APIs'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-sm text-white ring-1 ring-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products/configurator"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-white shadow-lg shadow-primary/30 hover:scale-[1.01] hover:shadow-primary/40 transition"
              >
                Launch Configurator <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href="mailto:info@palcnetworks.com?subject=Sales Inquiry - Products Page"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Talk to Sales
              </a>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-100">
              {[
                { label: 'Switching', value: '1G–400G, SONiC, EVPN/VXLAN, SR/SRv6' },
                { label: 'AI Fabrics', value: 'RoCEv2, ECN/PFC/AQM, deep buffers' },
                { label: 'Servers', value: 'GPU/DPU options, secure boot, telemetry' },
                { label: 'NICs/DPUs', value: 'Offload, RDMA, inline crypto, SR-IOV' },
                { label: 'Optics/Cables', value: 'SR/LR/ER/ZR, CWDM/DWDM, DAC/AOC' },
                { label: 'Software', value: 'NetPro, Guardian, Packet Broker, APIs' },
              ].map(item => (
                <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-gray-300">{item.label}</p>
                  <p className="text-sm font-semibold text-white mt-1 leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Product Families"
            title="Cloud, SONiC, and AI-focused portfolio"
            subtitle="Modular products you can mix-and-match for open, automated fabrics."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productFamilies.map((product, index) => (
              <motion.div
                key={product.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={product.href}>
                  <div className="group p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <product.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Tools Detail Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Software Tools"
            title="Network Management & Security Software"
            subtitle="Comprehensive software tools for network operations, monitoring, and security."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'NetPro',
                href: '/products/software-tools/netpro',
                icon: Network,
                description: 'Multi-vendor network management with topology, configuration, observability, and automation.',
              },
              {
                name: 'Packet Broker',
                href: '/products/software-tools/packet-broker',
                icon: Activity,
                description: 'Intelligent packet brokering and traffic analysis solution for monitoring and security tools.',
              },
              {
                name: 'Guardian',
                href: '/products/software-tools/guardian',
                icon: Shield,
                description: 'Network detection and response with threat analytics, zero-trust visibility, and SOAR-ready automation.',
              },
            ].map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={tool.href}>
                  <div className="group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      <span className="mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Feature Highlights"
            title="Built for cloud, SONiC, and AI fabrics"
            subtitle="Enterprise-grade performance, automation, and observability across the stack."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-hover transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{cap.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{cap.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Industries"
            title="Designed for demanding industries"
            subtitle="AI, cloud, enterprise, and telco workloads with assured performance and visibility."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-hover transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.blurb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Architecture"
            title="Architecture snapshot"
            subtitle="How switching, servers, NICs/DPUs, optics, and software come together."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {architecture.map(line => (
                <div key={line} className="flex items-start gap-3">
                  <Layers className="w-5 h-5 text-primary mt-1" />
                  <p className="text-sm text-gray-700">{line}</p>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                {[
                  { label: 'SONiC + Open NOS', value: 'Validated builds, EVPN/VXLAN, SR/SRv6' },
                  { label: 'AI Fabric Mode', value: 'RoCEv2, ECN/PFC/AQM, deep buffers' },
                  { label: 'Automation', value: 'GitOps/IaC, pre/post checks, rollbacks' },
                  { label: 'Observability', value: 'gNMI/INT/sFlow, SLO dashboards' },
                  { label: 'Security', value: 'MACsec/PHYsec options, RBAC, audit trails' },
                  { label: 'Interconnect', value: 'Optics/DAC/AOC validated for reach & thermals' },
                ].map(item => (
                  <div key={item.label} className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1 leading-snug">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Why PalC"
            title="Open networking + cloud performance"
            subtitle="Enterprise-ready delivery with automation, assurance, and AI fabric expertise."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPalc.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-hover transition-all"
              >
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary/90 to-blue-500 text-white">
        <div className="container-custom flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Ready to build</p>
            <h3 className="heading-3 text-white mt-2">Design an open, AI-ready fabric</h3>
            <p className="text-white/90 mt-3 max-w-2xl">
              Use the configurator for a guided BOM, or talk to our team for a design session covering SONiC builds,
              optics, power/airflow, and automation.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products/configurator"
              className="inline-flex items-center justify-center rounded-lg bg-white text-primary font-semibold px-5 py-3 shadow-lg hover:scale-[1.01] transition"
            >
              Launch Configurator
            </Link>
            <a
              href="mailto:info@palcnetworks.com?subject=Sales Inquiry - Products Page"
              className="inline-flex items-center justify-center rounded-lg border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

