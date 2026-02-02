"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ArrowRight, Server, Network, BarChart3, Radio, Cloud, Shield, Code, Cpu, Zap, HeadphonesIcon, Cable } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResourceSidebarProps {
  className?: string
}

// Quick links matching navbar menu items
const solutions = [
  { 
    name: 'Data Center Modernization & AI Fabrics', 
    href: '/solutions/data-center-modernization-ai-fabrics',
    icon: Server,
  },
  { 
    name: 'SONiC & Open Networking', 
    href: '/solutions/sonic-open-networking',
    icon: Network,
  },
  { 
    name: 'Network Observability & Visibility', 
    href: '/solutions/network-observability-visibility',
    icon: BarChart3,
  },
  { 
    name: 'Cloud & Hybrid Cloud', 
    href: '/solutions/cloud-hybrid-cloud',
    icon: Cloud,
  },
]

const services = [
  {
    name: 'Networking Engineering',
    href: '/services/networking-engineering',
    icon: Network,
  },
  {
    name: 'Software & Platform Engineering',
    href: '/services/software-platform-engineering',
    icon: Code,
  },
  {
    name: 'AI/ML Engineering',
    href: '/services/ai-ml-engineering',
    icon: Cpu,
  },
  {
    name: 'Automation & Tooling',
    href: '/services/automation-tooling',
    icon: Zap,
  },
]

const products = [
  {
    name: 'Switches',
    href: '/products/switches',
    icon: Network,
  },
  {
    name: 'Servers',
    href: '/products/servers',
    icon: Server,
  },
  {
    name: 'Software Tools',
    href: '/products/software-tools',
    icon: Code,
  },
  {
    name: 'NICs / DPUs',
    href: '/products/nics-dpus',
    icon: Cpu,
  },
]

export function ResourceSidebar({ className }: ResourceSidebarProps) {
  return (
    <div className={cn("space-y-6 sticky top-24 self-start z-0", className)}>
      {/* Solutions Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            Solutions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {solutions.map((solution) => {
            const Icon = solution.icon
            return (
              <Link
                key={solution.href}
                href={solution.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {solution.name}
                  </p>
                </div>
              </Link>
            )
          })}
          <Button variant="outline" className="w-full mt-2" asChild>
            <Link href="/solutions">
              View All Solutions
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Services Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Services
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.href}
                href={service.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {service.name}
                  </p>
                </div>
              </Link>
            )
          })}
          <Button variant="outline" className="w-full mt-2" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Products Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" />
            Products
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {products.map((product) => {
            const Icon = product.icon
            return (
              <Link
                key={product.href}
                href={product.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </p>
                </div>
              </Link>
            )
          })}
          <Button variant="outline" className="w-full mt-2" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* CTA Card */}
      <Card className="bg-gradient-primary text-white border-0">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
          <p className="text-sm text-white/90 mb-4">
            Our experts can help you implement similar solutions for your organization.
          </p>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/contact">
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

