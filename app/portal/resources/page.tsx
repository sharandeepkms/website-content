import { Metadata } from 'next'
import { PageHero } from '@/app/components/PageHero'
import { SectionHeading } from '@/app/components/SectionHeading'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { FileText, Book, Code, Settings } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portal Resources | PalC Networks',
  description: 'Access documentation, guides, and technical resources in the partner portal.',
}

export default function PortalResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero
        title="Portal Resources"
        subtitle="Access documentation, guides, and technical resources"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Portal', href: '/portal' },
          { label: 'Resources' },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm text-primary font-semibold mb-2">Coming Soon</p>
            <h2 className="heading-2 mb-4">Resources Portal</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a comprehensive resource portal with documentation, guides, and technical resources. 
              In the meantime, you can access our public resources below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Documentation', icon: FileText, href: '/resources/documentation', description: 'Technical documentation and guides' },
              { title: 'Case Studies', icon: Book, href: '/resources/case-studies', description: 'Real-world success stories' },
              { title: 'Whitepapers', icon: FileText, href: '/resources/whitepapers', description: 'In-depth technical papers' },
              { title: 'Blog', icon: Code, href: '/resources/blog', description: 'Latest insights and updates' },
            ].map((resource) => (
              <Card key={resource.title} className="h-full hover:shadow-hover transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={resource.href}>
                      View Resources
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
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

