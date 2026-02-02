import { Metadata } from 'next'
import { PageHero } from '@/app/components/PageHero'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { HelpCircle, Mail, MessageSquare, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support Center | PalC Networks',
  description: 'Get help from our technical support team.',
}

export default function PortalSupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Support Center"
        subtitle="Get help from our technical support team"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Portal', href: '/portal' },
          { label: 'Support' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Support Portal</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access our comprehensive support portal with ticket management, knowledge base, and live chat.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Knowledge Base & Support Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Access our comprehensive knowledge base, submit support tickets, and get help from our technical team.
                </p>
                <Button asChild className="w-full">
                  <a 
                    href="https://support.palcnetworks.com/portal/en/home" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open Support Portal
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-6">Or reach out to us through the following channels:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Send us an email and we'll respond within 24-48 hours.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href="mailto:support@palcnetworks.com">
                    support@palcnetworks.com
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Contact Form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Use our contact form for general inquiries and support requests.
                </p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="/contact">
                    Go to Contact Page
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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

