"use client"

import React from 'react'
import { ResourceHero } from '@/app/components/ResourceHero'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, Calendar, BookMarked, Image as ImageIcon } from 'lucide-react'

const resourceCategories = [
  {
    title: 'Blog',
    description: 'Insights, news, and articles on enterprise networking, cloud solutions, and technology trends.',
    href: '/resources/blog',
    icon: BookOpen,
    color: 'bg-blue-500',
    count: 'Latest Articles',
  },
  {
    title: 'Case Studies',
    description: 'Real-world success stories showcasing how we\'ve helped organizations transform their technology infrastructure.',
    href: '/resources/case-studies',
    icon: FileText,
    color: 'bg-green-500',
    count: 'Success Stories',
  },
  {
    title: 'Whitepapers',
    description: 'In-depth technical guides and whitepapers on enterprise technology, best practices, and industry insights.',
    href: '/resources/whitepapers',
    icon: BookMarked,
    color: 'bg-purple-500',
    count: 'Technical Guides',
  },
  {
    title: 'Events',
    description: 'Join our webinars, conferences, workshops, and meetups to learn about the latest trends in enterprise networking.',
    href: '/resources/events',
    icon: Calendar,
    color: 'bg-orange-500',
    count: 'Upcoming Events',
  },
  {
    title: 'Documentation',
    description: 'Comprehensive documentation for our products, solutions, and services. Find guides, API references, and technical resources.',
    href: '/resources/documentation',
    icon: FileText,
    color: 'bg-indigo-500',
    count: 'Technical Docs',
  },
  {
    title: 'Image Gallery',
    description: 'Browse our collection of images, diagrams, and visual resources related to networking, cloud, and technology.',
    href: '/resources/images-gallery',
    icon: ImageIcon,
    color: 'bg-pink-500',
    count: 'Visual Resources',
  },
]

export function ResourcesContent() {
  return (
    <>
      <ResourceHero
        title="Resources"
        subtitle="Explore our comprehensive collection of technical resources, guides, case studies, and insights to help you succeed with enterprise networking and cloud solutions."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources' },
        ]}
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.title}
                  className="h-full hover:shadow-hover transition-all duration-200 group overflow-hidden"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`${category.color} p-3 rounded-xl text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{category.title}</CardTitle>
                        <p className="text-xs text-gray-500">{category.count}</p>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      <Link href={category.href}>
                        Explore {category.title}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/resources/blog"
                className="p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      Latest Blog Posts
                    </h3>
                    <p className="text-sm text-gray-600">
                      Stay updated with the latest insights and trends
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link
                href="/resources/case-studies"
                className="p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      Case Studies
                    </h3>
                    <p className="text-sm text-gray-600">
                      Learn from real-world implementations
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link
                href="/resources/whitepapers"
                className="p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      Technical Whitepapers
                    </h3>
                    <p className="text-sm text-gray-600">
                      Deep dive into technical topics and best practices
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link
                href="/resources/events"
                className="p-6 rounded-xl border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      Upcoming Events
                    </h3>
                    <p className="text-sm text-gray-600">
                      Join webinars, workshops, and conferences
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

