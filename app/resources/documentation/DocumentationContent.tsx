"use client"

import { useState } from 'react'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { Book, Code, Settings, Shield, ArrowRight, FileText, Cpu, Network, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { withBasePath } from '@/app/utils/image-path'

const documentationCategories = [
  {
    title: 'Product Documentation',
    description: 'Complete guides for our hardware and software products.',
    icon: Settings,
    pdfUrl: '/pdfs/documentation/product-documentation.pdf',
  },
  {
    title: 'API Documentation',
    description: 'REST APIs and integration guides for developers.',
    icon: Code,
    pdfUrl: '/pdfs/documentation/api-documentation.pdf',
  },
  {
    title: 'Solution Guides',
    description: 'Step-by-step guides for implementing our solutions.',
    icon: Book,
    pdfUrl: '/pdfs/documentation/solution-guides.pdf',
  },
  {
    title: 'Security Documentation',
    description: 'Security best practices and configuration guides.',
    icon: Shield,
    pdfUrl: '/pdfs/documentation/security-documentation.pdf',
  },
]

export function DocumentationContent() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  
  return (
    <>
      <PageHero
        title="Documentation"
        subtitle="Comprehensive documentation for our products, solutions, and services. Find guides, API references, and technical resources."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Documentation' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            tag="Technical Resources"
            title="Documentation"
            subtitle="Find comprehensive guides and technical documentation for all our products and solutions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentationCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a
                  href={withBasePath(category.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="h-full hover:shadow-hover transition-shadow group cursor-pointer">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <category.icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <p className="text-gray-600 mt-2">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-primary font-medium">
                        <span className="mr-2">View Documentation</span>
                        <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Installation Guides', detail: 'Hardware bring-up, cabling, optics, SONiC imaging, and golden config flows.', icon: FileText },
              { title: 'AI Fabric Playbooks', detail: 'ECN/RED tuning, buffer profiles, RoCE validation, and performance SLOs.', icon: Cpu },
              { title: 'NetDevOps Pipelines', detail: 'Terraform/Ansible modules, pre/post checks, drift detection, and change windows.', icon: Network },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className="w-5 h-5 text-primary" />
                  <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                </div>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button variant="gradient" onClick={() => setIsLeadModalOpen(true)}>
              Request Implementation Help
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/resources/whitepapers">
                Download Architecture Guides
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        context="documentation"
        title="Request Implementation Help"
        subtitle="Connect with our technical team to get assistance with your implementation."
      />
    </>
  )
}

