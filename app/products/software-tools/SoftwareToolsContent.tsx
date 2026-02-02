"use client"

import Link from 'next/link'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Network, Activity } from 'lucide-react'

const softwareTools = [
  {
    name: 'NetPro',
    href: '/products/software-tools/netpro',
    icon: Network,
    description: 'Comprehensive network management and monitoring platform.',
  },
  {
    name: 'Packet Broker',
    href: '/products/software-tools/packet-broker',
    icon: Activity,
    description: 'Intelligent packet brokering and traffic analysis solution.',
  },
  {
    name: 'Guardian',
    href: '/products/software-tools/guardian',
    icon: Shield,
    description: 'Network security and threat detection platform.',
  },
]

export function SoftwareToolsContent() {
  return (
    <>
      <PageHero
        title="Software Tools"
        subtitle="Comprehensive network management, monitoring, and security software tools designed to simplify operations and enhance visibility."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Software Tools' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Our Software Tools"
            title="Network Management & Monitoring"
            subtitle="Powerful software tools to manage, monitor, and secure your network infrastructure."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {softwareTools.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={tool.href}>
                  <div className="group p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-hover hover:border-primary/20 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mb-6">{tool.description}</p>
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
    </>
  )
}

