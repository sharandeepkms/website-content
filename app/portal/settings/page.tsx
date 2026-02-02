import { Metadata } from 'next'
import { PageHero } from '@/app/components/PageHero'
import { Card, CardContent } from '@/app/components/ui/card'
import { Settings, Bell, Shield, Globe, Palette } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

export const metadata: Metadata = {
  title: 'Settings | PalC Networks',
  description: 'Configure your portal preferences.',
}

export default function PortalSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Settings"
        subtitle="Configure your portal preferences"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Portal', href: '/portal' },
          { label: 'Settings' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-semibold mb-2">Coming Soon</p>
            <h2 className="heading-2 mb-4">Portal Settings</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a comprehensive settings portal where you can configure your preferences, 
              notifications, security, and more. This will be available soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'General Settings', icon: Settings, description: 'Configure general portal preferences' },
              { title: 'Notifications', icon: Bell, description: 'Manage notification preferences' },
              { title: 'Security', icon: Shield, description: 'Security settings and two-factor authentication' },
              { title: 'Language & Region', icon: Globe, description: 'Set language and regional preferences' },
              { title: 'Appearance', icon: Palette, description: 'Customize theme and display settings' },
            ].map((setting) => (
              <Card key={setting.title} className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <setting.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{setting.title}</h3>
                  <p className="text-sm text-gray-600">{setting.description}</p>
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

