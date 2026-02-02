import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Network Observability & Visibility',
  description: 'Achieve complete network visibility with advanced observability solutions including telemetry, monitoring, analytics, and real-time insights.',
  openGraph: {
    title: 'Network Observability & Visibility | PalC Networks',
    description: 'Complete network visibility and observability solutions.',
  },
}

export default function NetworkObservabilityPage() {
  return (
    <DetailPageTemplate
      title="Network Observability & Visibility"
      subtitle="Gain deep insights into your network with comprehensive observability solutions. From real-time telemetry to predictive analytics, understand every aspect of your network infrastructure."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Network Observability & Visibility' },
      ]}
      overview="Network observability is critical for modern infrastructure operations. Our solutions provide complete visibility into network behavior, performance, and health through streaming telemetry, distributed tracing, metrics collection, and intelligent analytics. We help organizations move from reactive troubleshooting to proactive optimization."
      capabilities={[
        'Streaming Telemetry (gNMI, OpenConfig)',
        'Network Observability Platforms',
        'Distributed Tracing & Correlation',
        'Real-time Performance Monitoring',
        'Anomaly Detection & Alerting',
        'Network Analytics & Insights',
        'Log Aggregation & Analysis',
        'Custom Dashboard Development',
      ]}
      benefits={[
        'Reduce mean time to resolution by 70%',
        'Proactive issue detection before impact',
        'Data-driven capacity planning',
        'Enhanced security posture',
        'Improved application performance',
        'Better resource utilization',
      ]}
      useCases={[
        'Network operations center (NOC) modernization',
        'Application performance monitoring',
        'Security operations center (SOC) enhancement',
        'Capacity planning and optimization',
        'Troubleshooting and root cause analysis',
        'Compliance and audit reporting',
      ]}
      heroImage="/images/solutions/network-observability-visibility-banner.png"
      heroImageAlt="Network Observability Architecture"
      customSections={<PartnersSection />}
    />
  )
}

