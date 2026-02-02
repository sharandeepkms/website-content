"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Server, Network, Cpu, Cable } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

interface ConfigOption {
  id: string
  name: string
  description: string
  price?: number
  category: 'switch' | 'server' | 'nic' | 'dpu' | 'transceiver' | 'cable'
}

interface ConfiguratorWizardProps {
  productType: 'switch' | 'server' | 'nic' | 'dpu' | 'transceiver' | 'cable'
  onComplete?: (config: ConfigOption[]) => void
}

const mockOptions: Record<string, ConfigOption[]> = {
  switch: [
    { id: 'sw1', name: '48-Port 10GbE Switch', description: 'High-performance data center switch', price: 5000, category: 'switch' },
    { id: 'sw2', name: '100GbE Spine Switch', description: 'High-speed spine switch for leaf-spine architecture', price: 15000, category: 'switch' },
    { id: 'sw3', name: '32-Port 25GbE Leaf Switch', description: 'Leaf switch for AI/ML fabric deployments', price: 8000, category: 'switch' }
  ],
  server: [
    { id: 'srv1', name: '1U Rack Server', description: 'Compact 1U server with dual processors', price: 3000, category: 'server' },
    { id: 'srv2', name: '2U GPU Server', description: 'AI/ML optimized server with GPU support', price: 8000, category: 'server' },
    { id: 'srv3', name: '4U Storage Server', description: 'High-capacity storage server with NVMe support', price: 12000, category: 'server' }
  ],
  nic: [
    { id: 'nic1', name: '25GbE Network Card', description: 'Dual-port 25GbE PCIe network card', price: 500, category: 'nic' },
    { id: 'nic2', name: '100GbE Network Card', description: 'Dual-port 100GbE PCIe network card', price: 1200, category: 'nic' },
    { id: 'nic3', name: '200GbE Network Card', description: 'Dual-port 200GbE PCIe network card', price: 2500, category: 'nic' }
  ],
  dpu: [
    { id: 'dpu1', name: 'SmartNIC DPU', description: 'Data Processing Unit with offload capabilities', price: 2000, category: 'dpu' },
    { id: 'dpu2', name: 'AI Accelerator DPU', description: 'DPU optimized for AI/ML workloads', price: 3500, category: 'dpu' }
  ],
  transceiver: [
    { id: 'trx1', name: '100G QSFP28 SR4', description: '100Gbps short-range transceiver', price: 800, category: 'transceiver' },
    { id: 'trx2', name: '100G QSFP28 LR4', description: '100Gbps long-range transceiver', price: 1200, category: 'transceiver' },
    { id: 'trx3', name: '400G QSFP-DD SR8', description: '400Gbps short-range transceiver', price: 2500, category: 'transceiver' }
  ],
  cable: [
    { id: 'cbl1', name: 'DAC Cable 3m', description: 'Direct Attach Copper cable, 3 meters', price: 150, category: 'cable' },
    { id: 'cbl2', name: 'AOC Cable 10m', description: 'Active Optical Cable, 10 meters', price: 300, category: 'cable' },
    { id: 'cbl3', name: 'DAC Cable 5m', description: 'Direct Attach Copper cable, 5 meters', price: 200, category: 'cable' }
  ]
}

interface BOM {
  items: ConfigOption[]
  total: number
  estimatedDelivery: string
}

export function ConfiguratorWizard({ productType, onComplete }: ConfiguratorWizardProps) {
  const [step, setStep] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<ConfigOption[]>([])
  const [bom, setBom] = useState<BOM | null>(null)

  const options = mockOptions[productType] || []

  const handleSelect = (option: ConfigOption) => {
    setSelectedOptions(prev => {
      const exists = prev.find(o => o.id === option.id)
      if (exists) {
        return prev.filter(o => o.id !== option.id)
      }
      return [...prev, option]
    })
  }

  const handleNext = async () => {
    if (step === 1) {
      // Generate BOM
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/configurator/generate-bom', {
        //   method: 'POST',
        //   body: JSON.stringify({ options: selectedOptions })
        // })
        // const bomData = await response.json()
        
        // Mock BOM
        setBom({
          items: selectedOptions,
          total: selectedOptions.reduce((sum, opt) => sum + (opt.price || 0), 0),
          estimatedDelivery: '2-4 weeks'
        })
        setStep(2)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error('BOM generation error:', error)
          }
        }
      }
    } else if (step === 2) {
      onComplete?.(selectedOptions)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'switch': return Network
      case 'server': return Server
      case 'nic': case 'dpu': return Cpu
      case 'cable': case 'transceiver': return Cable
      default: return Network
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {step} of 2</span>
          <span className="text-sm text-gray-500">{Math.round((step / 2) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(step / 2) * 100}%` }}
            className="bg-primary h-2 rounded-full"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Configure {productType.charAt(0).toUpperCase() + productType.slice(1)}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">Select your preferred options</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {options.map((option) => {
                    const Icon = getCategoryIcon(option.category)
                    const isSelected = selectedOptions.some(o => o.id === option.id)
                    return (
                      <motion.div
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={cn(
                            "cursor-pointer transition-all",
                            isSelected ? "border-primary border-2 bg-primary/5" : "hover:border-primary/50"
                          )}
                          onClick={() => handleSelect(option)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              {isSelected && (
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{option.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                            {option.price && (
                              <Badge variant="outline" className="text-sm">
                                ${option.price.toLocaleString()}
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && bom && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Bill of Materials</CardTitle>
                <p className="text-sm text-gray-600 mt-2">Review your configuration</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bom.items.map((item: ConfigOption) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      {item.price && (
                        <span className="font-semibold text-gray-900">${item.price.toLocaleString()}</span>
                      )}
                    </div>
                  ))}
                  <div className="border-t pt-4 flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary">${bom.total.toLocaleString()}</span>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Estimated Delivery:</strong> {bom.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setStep(prev => Math.max(1, prev - 1))}
          disabled={step === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={step === 1 && selectedOptions.length === 0}
        >
          {step === 2 ? 'Complete' : 'Generate BOM'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

