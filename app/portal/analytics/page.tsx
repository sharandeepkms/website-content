import { Metadata } from 'next'
import { PageHero } from '@/app/components/PageHero'
import { Card, CardContent } from '@/app/components/ui/card'
import { BarChart3, TrendingUp, Users, Activity } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

export const metadata: Metadata = {
  title: 'Analytics | PalC Networks',
  description: 'View usage statistics and performance metrics.',
}

export default function PortalAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Analytics"
        subtitle="View usage statistics and performance metrics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Portal', href: '/portal' },
          { label: 'Analytics' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-semibold mb-2">Coming Soon</p>
            <h2 className="heading-2 mb-4">Analytics Dashboard</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a comprehensive analytics dashboard with usage statistics, performance metrics, and insights. 
              This will be available soon for portal users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Usage Statistics', icon: BarChart3, description: 'Track resource usage and access patterns' },
              { title: 'Performance Metrics', icon: TrendingUp, description: 'Monitor system performance and response times' },
              { title: 'User Activity', icon: Users, description: 'View user engagement and activity logs' },
              { title: 'System Health', icon: Activity, description: 'Monitor system status and availability' },
            ].map((metric) => (
              <Card key={metric.title} className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{metric.title}</h3>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/portal">
                Back to Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

