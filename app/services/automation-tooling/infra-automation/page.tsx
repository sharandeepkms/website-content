import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Infra Automation (Terraform/Ansible)',
  description: 'Infrastructure automation services using Terraform, Ansible, and other IaC tools for automated provisioning and configuration management.',
  openGraph: {
    title: 'Infrastructure Automation Services | PalC Networks',
    description: 'Infrastructure as Code and automation services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Infra Automation (Terraform/Ansible)',
  tagline: 'Automate infrastructure provisioning and management with Infrastructure as Code. Leverage Terraform, Ansible, and other tools to build scalable, repeatable infrastructure.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Infra Automation (Terraform/Ansible)' },
      ],
  overview: 'Infrastructure automation enables organizations to provision and manage infrastructure as code, reducing manual effort and ensuring consistency. Our services help you implement Terraform, Ansible, and other automation tools effectively.',
  capabilities: [
    'Terraform Infrastructure Provisioning',
    'Ansible Configuration Management',
    'Cloud Infrastructure Automation',
    'Multi-Cloud IaC',
    'Infrastructure State Management',
    'Configuration Drift Detection',
    'Automated Compliance',
    'Infrastructure Testing',
  ],
  benefits: [
    'Reduced manual effort',
    'Consistent infrastructure',
    'Faster provisioning',
    'Version-controlled infrastructure',
    'Better compliance',
    'Cost optimization',
  ],
  useCases: [
    'Cloud infrastructure provisioning',
    'Multi-cloud deployments',
    'Configuration management',
    'Infrastructure refresh',
    'Disaster recovery automation',
    'Environment standardization',
  ],
  imagePlaceholder: 'Infrastructure Automation Architecture',
}

export default function InfraAutomationPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

