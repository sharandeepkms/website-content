"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Code, Users } from 'lucide-react'

export function StandardsContributionsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Standards & Industry Contributions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              PalC engineers have made notable contributions to the IETF, including work within the MPLS and TRILL working groups.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200">
            <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
              Our contributions include:
            </p>
            <ul className="space-y-4">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-base text-gray-700">Published RFCs</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex items-start gap-3"
              >
                <Code className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-base text-gray-700">Internet drafts</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-start gap-3"
              >
                <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-base text-gray-700">Active participation in protocol standardization</span>
              </motion.li>
            </ul>
            <p className="text-base sm:text-lg text-gray-700 mt-6 leading-relaxed">
              This ensures our solutions align with open standards and industry best practices.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

