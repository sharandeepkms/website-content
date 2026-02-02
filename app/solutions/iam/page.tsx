import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Identity & Access Management (IAM)',
  description: 'Protect your enterprise with comprehensive IAM solutions, zero trust architecture, and identity governance for secure access management.',
  openGraph: {
    title: 'Identity & Access Management (IAM) | PalC Networks',
    description: 'Enterprise IAM and zero trust security solutions.',
  },
}

export default function IAMPage() {
  return (
    <DetailPageTemplate
      title="Identity & Access Management (IAM)"
      subtitle="Build a robust security posture with comprehensive identity and access management solutions. From zero trust implementation to identity governance, protect your critical assets."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Identity & Access Management (IAM)' },
      ]}
      overview="Identity and Access Management is the foundation of modern security. Our IAM solutions provide secure, seamless access across applications and resources while maintaining strict control and compliance. We implement zero trust architectures that verify every access request, regardless of source or location."
      capabilities={[
        'Enterprise IAM Implementation',
        'Zero Trust Architecture',
        'Single Sign-On (SSO) & Federation',
        'Multi-Factor Authentication (MFA)',
        'Identity Governance & Administration',
        'Privileged Access Management',
        'Compliance Automation',
        'Identity Analytics & Reporting',
      ]}
      benefits={[
        'Reduce security breach risk',
        'Streamline user access management',
        'Achieve regulatory compliance',
        'Enable secure remote work',
        'Improve audit readiness',
        'Reduce IT support burden',
      ]}
      useCases={[
        'Enterprise security transformation',
        'Regulatory compliance initiatives (SOC2, GDPR, HIPAA)',
        'Cloud security implementation',
        'Workforce identity management',
        'Customer identity and access management (CIAM)',
        'API security and access control',
      ]}
      heroImage="/images/solutions/identity-access-management-banner.png"
      heroImageAlt="IAM & Zero Trust Architecture"
      customSections={<PartnersSection />}
    />
  )
}

