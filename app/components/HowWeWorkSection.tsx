"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Settings, Eye, Code2, CheckSquare, ArrowDown, ArrowRight, Network, Cloud, BarChart3 } from 'lucide-react'

export function HowWeWorkSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/2 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan/2 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-cyan/10 border-2 border-primary/20 mb-6 shadow-lg backdrop-blur-sm"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <GitBranch className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-primary tracking-wide">How We Work</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Design → Build → Validate →{' '}
            <span className="bg-gradient-to-r from-primary via-cyan to-primary bg-clip-text text-transparent">
              Operate
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Our proven methodology ensures every project delivers production-grade results with operational excellence from day one.
          </p>
        </motion.div>

        {/* Advanced 3-Step Vector Flow Diagram */}
        <div className="max-w-7xl mx-auto">
          {/* Main Diagram Container */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-200/40 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 shadow-2xl overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]"></div>
            
            {/* Vector Flow Diagram */}
            <div className="relative z-10 space-y-12">
              
              {/* Step 1: Your Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Dotted Border Container */}
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/5 via-transparent to-cyan/5">
                  {/* Animated Dotted Border Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-primary/30 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">Step 1: Your Requirements</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">Zero implementation cycles. Zero code changes. Full coverage - out of the box.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto relative">
                      {[
                        { label: 'Business Goals', color: 'bg-blue-500' },
                        { label: 'Requirements', color: 'bg-primary' },
                        { label: 'Constraints', color: 'bg-cyan' },
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="group relative"
                        >
                          {/* Enhanced Dotted Connecting Lines Between Cards - Thicker */}
                          {idx < 2 && (
                            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 z-10 translate-x-[9px]">
                              <div className="h-full w-full animate-dots-horizontal text-primary/50"></div>
                            </div>
                          )}
                          
                          <div className="relative p-6 rounded-2xl bg-white border-2 border-gray-200/60 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                            {/* Top Accent */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                            
                            <span className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors block text-center">{item.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Animated Dotted Flow Line - Requirements to Engineering */}
              <div className="flex justify-center my-4">
                <div className="relative w-1 h-24 flex items-center justify-center">
                  {/* Main Dotted Line with Flowing Animation - Thicker */}
                  <div className="w-1 h-full animate-dots-vertical text-primary/50"></div>
                  {/* Professional Arrow Indicator - SVG Style */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-primary/60 flex items-center justify-center shadow-lg">
                      <ArrowDown className="w-4 h-4 text-primary/70" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: PalC Engineering Process - Professional Redesign */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 border-4 border-primary/30 shadow-2xl overflow-hidden">
                  {/* Enhanced Animated Glow Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-cyan/15 to-primary/15 rounded-3xl blur-3xl opacity-60"></div>
                  <div className="absolute inset-[3px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[21px]"></div>
                  
                  {/* Professional Header */}
                  <div className="relative z-10 text-center mb-8">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 border-2 border-white/30 mb-4 sm:mb-6 shadow-lg backdrop-blur-sm">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white">Step 2: PalC Engineering Process</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight px-4 sm:px-0">
                      Production-Grade Delivery
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                      Heighten security; minimize costs - keep all of your data on your premises.
                    </p>
                  </div>

                  {/* Professional Process Steps - Enhanced Vector Flow */}
                  <div className="relative z-10">
                    {/* Enhanced Steps Grid */}
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                      {[
                        {
                          step: '01',
                          title: 'Design',
                          description: 'Architecture, requirements, and technical specifications aligned with your business goals.',
                          gradient: 'from-blue-500 via-primary to-cyan',
                          icon: Eye,
                        },
                        {
                          step: '02',
                          title: 'Build',
                          description: 'Implementation, integration, and customization with engineering excellence and best practices.',
                          gradient: 'from-cyan via-primary to-blue-500',
                          icon: Code2,
                        },
                        {
                          step: '03',
                          title: 'Validate',
                          description: 'Testing, performance validation, and quality assurance to ensure production readiness.',
                          gradient: 'from-primary via-cyan to-blue-600',
                          icon: CheckSquare,
                        },
                        {
                          step: '04',
                          title: 'Operate',
                          description: 'Ongoing support, monitoring, optimization, and continuous improvement for long-term success.',
                          gradient: 'from-blue-600 via-primary to-cyan',
                          icon: Settings,
                        },
                      ].map((item, idx) => {
                        const IconComponent = item.icon
                        return (
                          <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="group relative"
                          >
                            {/* Enhanced Dotted Connecting Line with Flowing Animation - Thicker */}
                            {idx < 3 && (
                              <div className="hidden lg:block absolute top-1/2 -right-5 w-10 h-1 z-20 translate-x-[9px]">
                                <div className="h-full w-full animate-dots-horizontal text-primary/50 relative">
                                  {/* Professional Arrow - SVG Style */}
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                                    <div className="w-5 h-5 rounded-full bg-white/95 border-2 border-primary/60 flex items-center justify-center shadow-md backdrop-blur-sm">
                                      <ArrowRight className="w-3 h-3 text-primary/80" strokeWidth={2.5} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Professional Step Card */}
                            <div className="relative h-full p-4 sm:p-6 lg:p-7 rounded-xl sm:rounded-2xl bg-white/8 backdrop-blur-md border-2 border-white/15 hover:border-primary/40 transition-all duration-500 overflow-hidden group-hover:bg-white/12 group-hover:shadow-2xl">
                              {/* Professional Icon */}
                              <div className="mb-4 sm:mb-5 mt-1 sm:mt-2">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/30 to-cyan/30 border-2 border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:from-primary/50 group-hover:to-cyan/50 transition-all duration-300 shadow-lg">
                                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                </div>
                              </div>
                              
                              {/* Enhanced Content */}
                              <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan transition-colors leading-tight">{item.title}</h4>
                              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{item.description}</p>
                              
                              {/* Enhanced Glow on Hover */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-2xl`}></div>
                              
                              {/* Subtle Shine Effect */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Professional Integrations Footer */}
                  <div className="relative z-10 mt-8 pt-6 border-t-2 border-white/15">
                    <div className="text-center mb-4">
                      <p className="text-base font-semibold text-white/90 mb-4">Integrated Capabilities</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      {[
                        { label: 'SONiC Integration', icon: Network },
                        { label: 'Cloud Integrations', icon: Cloud },
                        { label: 'IaC/GitOps', icon: Code2 },
                        { label: 'Observability', icon: BarChart3 },
                      ].map((item, idx) => {
                        const IconComponent = item.icon
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/8 backdrop-blur-sm border border-white/15 hover:bg-white/15 hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            <IconComponent className="w-4 h-4 text-white/80" />
                            <span className="text-xs font-semibold text-white/90">{item.label}</span>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Animated Dotted Flow Line - Engineering to Outcomes */}
              <div className="flex justify-center my-4">
                <div className="relative w-1 h-24 flex items-center justify-center">
                  {/* Main Dotted Line with Flowing Animation - Thicker */}
                  <div className="w-1 h-full animate-dots-vertical text-primary/50"></div>
                  {/* Professional Arrow Indicator - SVG Style */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-primary/60 flex items-center justify-center shadow-lg">
                      <ArrowDown className="w-4 h-4 text-primary/70" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Production Outcomes - Enhanced With Dotted Border */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                {/* Enhanced Dotted Border Container */}
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border-2 border-dashed border-cyan/40 bg-gradient-to-br from-cyan/5 via-transparent to-primary/5">
                  {/* Animated Dotted Border Effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-cyan/30 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-cyan/10 border border-cyan/20 mb-3 sm:mb-4">
                        <span className="text-xs sm:text-sm font-bold text-cyan uppercase tracking-wider">Step 3: Production Outcomes</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">Infrastructure to application monitoring, in one crisp and blazing fast interface.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto relative">
                      {[
                        { label: 'Production Infrastructure', color: 'bg-green-500' },
                        { label: 'Operational Excellence', color: 'bg-primary' },
                        { label: 'Continuous Support', color: 'bg-cyan' },
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="group relative"
                        >
                          {/* Enhanced Dotted Connecting Lines Between Cards - Thicker */}
                          {idx < 2 && (
                            <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 z-10 translate-x-[9px]">
                              <div className="h-full w-full animate-dots-horizontal text-primary/50"></div>
                            </div>
                          )}
                          
                          <div className="relative p-6 rounded-2xl bg-white border-2 border-gray-200/60 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                            {/* Top Accent */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${item.color} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                            
                            <span className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors block text-center">{item.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

