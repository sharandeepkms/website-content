"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { 
  ExternalLink,
  Users
} from 'lucide-react'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { getImageSrc } from '@/app/utils/image-path'

interface Association {
  name: string
  acronym: string
  description: string
  website: string
  logo: string
  color: string
  contributions?: string[]
}

const associations: Association[] = [
  {
    name: 'Telecom Infra Project',
    acronym: 'TIP',
    description: 'The Telecom Infra Project (TIP) is a global community of companies and organizations working together to accelerate the development and deployment of open, disaggregated, and standards-based technology solutions that deliver the high quality connectivity that the world needs – now and in the decades to come.',
    website: 'https://telecominfraproject.com',
    logo: '/images/industry-asociations/TIP.png',
    color: 'from-blue-500 to-cyan-500',
    contributions: ['O-RAN', 'OpenRAN', '5G Infrastructure'],
  },
  {
    name: 'Open Compute Project',
    acronym: 'OCP',
    description: 'The Open Compute Project (OCP) is a collaborative community focused on redesigning hardware technology to efficiently support the growing demands on compute infrastructure.',
    website: 'https://www.opencompute.org',
    logo: '/images/industry-asociations/OCP.png',
    color: 'from-orange-500 to-red-500',
    contributions: ['Open Hardware', 'Data Center Design', 'Networking Equipment'],
  },
  {
    name: 'SONiC',
    acronym: 'SONiC',
    description: 'Software for Open Networking in the Cloud (SONiC) is part of Linux Foundation projects. Its primarily focus on the software component of SONiC, and continue to partner with Open Compute Platform(OCP) on aligning hardware and specifications like SAI.',
    website: 'https://sonic-net.github.io',
    logo: '/images/industry-asociations/SONIC.png',
    color: 'from-purple-500 to-pink-500',
    contributions: ['SONiC Development', 'SAI Specifications', 'Network Operating Systems'],
  },
  {
    name: 'The Linux Foundation',
    acronym: 'LF',
    description: 'The Linux Foundation provides a neutral, trusted hub for developers and organizations to code, manage, and scale open technology projects and ecosystems.',
    website: 'https://www.linuxfoundation.org',
    logo: '/images/industry-asociations/LINUX.png',
    color: 'from-green-500 to-emerald-500',
    contributions: ['Open Source Projects', 'Community Building', 'Technology Standards'],
  },
  {
    name: 'Internet Engineering Task Force',
    acronym: 'IETF',
    description: 'The Internet Engineering Task Force (IETF) is a large open international community of network designers, operators, vendors, and researchers concerned with the evolution of the Internet architecture and the smooth operation of the Internet.',
    website: 'https://www.ietf.org',
    logo: '/images/industry-asociations/IETF.png',
    color: 'from-indigo-500 to-blue-500',
    contributions: ['Internet Standards', 'RFC Contributions', 'Protocol Development'],
  },
  {
    name: 'Institute of Electrical and Electronics Engineers',
    acronym: 'IEEE',
    description: 'IEEE is the world\'s largest technical professional organization dedicated to advancing technology for the benefit of humanity. IEEE and its members inspire a global community through its highly cited publications, conferences, technology standards, and professional and educational activities.',
    website: 'https://www.ieee.org',
    logo: '/images/industry-asociations/IEEE.png',
    color: 'from-yellow-500 to-orange-500',
    contributions: ['Technical Standards', 'Research Publications', 'Professional Development'],
  },
  {
    name: 'Open Networking Foundation',
    acronym: 'ONF',
    description: 'The Open Networking Foundation (ONF) is an operator-driven, community-led non-profit consortium fostering and democratizing innovation in software-defined programmable networks. Through ecosystem building, advocacy, research and education, ONF is accelerating the state-of-the-art in open networking and catalyzing creation and adoption of open disaggregated solutions leveraging open source software.',
    website: 'https://opennetworking.org',
    logo: '/images/industry-asociations/ONF.png',
    color: 'from-teal-500 to-cyan-500',
    contributions: ['VOLTHA', 'Goldstone NOS', 'SDN/NFV Standards'],
  },
]

export function IndustryAssociationsContent() {
  return (
    <>
      <PageHero
        title="Industry Associations"
        subtitle="Partnering with leading industry associations and open networking communities to advance the development and adoption of open-source technologies"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/about' },
          { label: 'Industry Associations' },
        ]}
      />

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Associates
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                PalC Networks has established relationships and partnerships with leading industry associations and open networking communities, working closely with them to advance the development and adoption of new technologies.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 md:p-10 border border-primary/20">
              <p className="text-gray-700 leading-relaxed text-lg">
                PalC Networks is actively engaged in open-source communities like the{' '}
                <span className="font-semibold text-primary">Open Networking Foundation (ONF)</span> and{' '}
                <span className="font-semibold text-primary">Telecom Infra Project (TIP)</span>, where we have made significant contributions and are a key participant. Our expertise in technology and customer-driven solutions is evident in our contributions to{' '}
                <span className="font-semibold text-primary">VOLTHA</span>,{' '}
                <span className="font-semibold text-primary">SONiC</span>, and{' '}
                <span className="font-semibold text-primary">Goldstone Network Operating Systems</span>, which have been developed and deployed in collaboration with these communities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Associations Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeading
            tag="Partnerships"
            title="Industry Associations & Communities"
            subtitle="We collaborate with leading organizations to drive innovation in open networking and technology standards"
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {associations.map((association, index) => {
              const logoPath = getImageSrc(association.logo, false)
              return (
                <motion.div
                  key={association.acronym}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
                    {/* Logo & Acronym */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-28 h-28 rounded-xl bg-white border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 p-2">
                        <Image
                          src={logoPath}
                          alt={association.name}
                          width={100}
                          height={100}
                          className="object-contain w-full h-full"
                          unoptimized={false}
                          onError={(e) => {
                            // Fallback to gradient background with acronym if logo fails
                            const target = e.target as HTMLImageElement
                            const parent = target.parentElement
                            if (parent) {
                              target.style.display = 'none'
                              const fallback = document.createElement('div')
                              fallback.className = `w-full h-full rounded-lg bg-gradient-to-br ${association.color} flex items-center justify-center`
                              fallback.innerHTML = `<span class="text-white font-bold text-lg">${association.acronym}</span>`
                              parent.appendChild(fallback)
                            }
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-400 tracking-wider">
                        {association.acronym}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {association.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                      {association.description}
                    </p>

                    {/* Contributions */}
                    {association.contributions && association.contributions.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Our Contributions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {association.contributions.map((contribution, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                            >
                              {contribution}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learn More Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-auto border-gray-300 text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      asChild
                    >
                      <a
                        href={association.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        Know More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Get Project Started!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Partner with us to leverage open networking technologies and industry-standard solutions.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}

