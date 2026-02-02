"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Download, 
  HelpCircle,
  Bell,
  Search
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Badge } from '@/app/components/ui/badge'

interface PortalSection {
  id: string
  title: string
  description: string
  icon: React.ElementType
  href: string
  badge?: string
}

const portalSections: PortalSection[] = [
  {
    id: 'resources',
    title: 'Resources',
    description: 'Access documentation, guides, and technical resources',
    icon: FileText,
    href: '/portal/resources',
    badge: '12 new'
  },
  {
    id: 'support',
    title: 'Support Center',
    description: 'Get help from our technical support team',
    icon: HelpCircle,
    href: '/portal/support'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View usage statistics and performance metrics',
    icon: BarChart3,
    href: '/portal/analytics'
  },
  {
    id: 'team',
    title: 'Team Management',
    description: 'Manage team members and permissions',
    icon: Users,
    href: '/portal/team'
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure your portal preferences',
    icon: Settings,
    href: '/portal/settings'
  }
]

export function PortalDashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark Banner */}
      <div className="h-[45vh] bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="container-custom h-full flex flex-col justify-center relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Partner Portal</h1>
              <p className="text-gray-200 text-lg">Welcome back! Here&apos;s what&apos;s new.</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources, documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Team Members</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Support Tickets</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portal Sections */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portalSections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        {section.badge && (
                          <Badge variant="secondary">{section.badge}</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={section.href}>Access</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

