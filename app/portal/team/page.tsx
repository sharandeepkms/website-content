import { Metadata } from 'next'
import { PageHero } from '@/app/components/PageHero'
import { Card, CardContent } from '@/app/components/ui/card'
import { Users, UserPlus, Shield, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'

export const metadata: Metadata = {
  title: 'Team Management | PalC Networks',
  description: 'Manage team members and permissions.',
}

export default function PortalTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Team Management"
        subtitle="Manage team members and permissions"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Portal', href: '/portal' },
          { label: 'Team' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-semibold mb-2">Coming Soon</p>
            <h2 className="heading-2 mb-4">Team Management Portal</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a comprehensive team management portal where you can manage team members, 
              assign roles, and configure permissions. This will be available soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Team Members', icon: Users, description: 'View and manage your team members' },
              { title: 'Invite Users', icon: UserPlus, description: 'Invite new team members to the portal' },
              { title: 'Roles & Permissions', icon: Shield, description: 'Configure roles and access permissions' },
              { title: 'Team Settings', icon: Settings, description: 'Manage team preferences and configurations' },
            ].map((feature) => (
              <Card key={feature.title} className="h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
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

