import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'
import { generateSolutionMetadata } from '@/app/utils/solution-metadata'

// ISR: Revalidate every 7 days
export const revalidate = 604800

export const metadata: Metadata = generateSolutionMetadata({
  title: 'Cloud and Hybrid Platforms Built for Control, Performance, and Compliance',
  description: 'PalC designs and delivers cloud and hybrid platforms that combine on-premises control with cloud-like agility—enabling organizations to run modern workloads while meeting performance, security, and sovereignty requirements.',
  path: '/solutions/cloud-hybrid-cloud',
})

export default function CloudHybridCloudPage() {
  return (
    <DetailPageTemplate
      title="Cloud and Hybrid Platforms Built for Control, Performance, and Compliance"
      tagline="PalC designs and delivers cloud and hybrid platforms that combine on-premises control with cloud-like agility—enabling organizations to run modern workloads while meeting performance, security, and sovereignty requirements."
      heroImage="/images/solutions/cloud-hybrid-cloud-banner.png"
      heroImageAlt="Cloud and Hybrid Cloud Architecture"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Cloud & Hybrid Cloud', href: '/solutions/cloud-hybrid-cloud' },
      ]}
      overview="Cloud and hybrid platforms are essential for organizations that need cloud-like flexibility while maintaining control over data, networking, and operations. PalC delivers comprehensive cloud and hybrid solutions that enable organizations to run modern workloads while meeting performance, security, and sovereignty requirements."
      overviewDetails={[
        'Planning & Platform Architecture: Understanding workload requirements, compliance needs, and operational constraints before defining the cloud or hybrid architecture.',
        'Engineering & Platform Build: Engineering cloud platforms by integrating compute, networking, orchestration, and security into a unified system.',
        'Commissioning & Validation: Validating platform behavior under real workloads, scale conditions, and security scenarios.',
        'Deployment & Operations Support: Supporting rollout, day-2 operations, upgrades, and controlled evolution of cloud environments.',
        'This approach ensures cloud platforms remain secure, performant, and manageable as demands grow.',
      ]}
      capabilities={[
        {
          title: 'Private & Sovereign Cloud Platforms',
          description: 'Design and deployment of on-premises cloud platforms that provide cloud-like flexibility while maintaining full control over data, networking, and operations.',
          iconKey: 'cloud',
        },
        {
          title: 'Hybrid Cloud Architecture',
          description: 'Consistent networking and platform models across on-premises and cloud environments, enabling seamless workload placement and movement.',
          iconKey: 'network',
        },
        {
          title: 'Cloud-Native Networking',
          description: 'Advanced networking for cloud environments, including virtual networks, load balancing, traffic segmentation, and secure connectivity.',
          iconKey: 'network',
        },
        {
          title: 'Kubernetes & Platform Orchestration',
          description: 'Design and operation of Kubernetes-based platforms with integrated networking, security, and observability.',
          iconKey: 'server',
        },
        {
          title: 'Security-First Cloud Design',
          description: 'Built-in security using encryption, identity, policy enforcement, and workload isolation aligned with compliance and regulatory requirements.',
          iconKey: 'shield',
        },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Architecture Overview',
        description: 'PalC\'s cloud and hybrid platforms are built around a modular, system-oriented architecture. Key architectural elements include: Centralized cloud orchestration for regions, zones, tenants, and workloads, Kubernetes-based compute orchestration with integrated networking and security, High-performance networking using SmartNICs, DPUs, and accelerated data paths, Secure connectivity using IPSec, policy enforcement, and identity integration, Observability and control integrated across networking and platform layers. This architecture enables cloud platforms to scale predictably while maintaining security and operational clarity.',
      }}
      benefits={[
        {
          title: 'Full control over cloud infrastructure and data',
          description: 'Organizations adopting PalC\'s cloud and hybrid platforms achieve full control over cloud infrastructure and data.',
        },
        {
          title: 'Reduced dependency on commercial cloud providers',
          description: 'Reduce dependency on commercial cloud providers while maintaining cloud-like capabilities.',
        },
        {
          title: 'Improved performance for latency-sensitive workloads',
          description: 'Achieve improved performance for latency-sensitive workloads through optimized on-premises infrastructure.',
        },
        {
          title: 'Stronger security and compliance posture',
          description: 'Maintain stronger security and compliance posture with full control over data and infrastructure.',
        },
        {
          title: 'Cloud-like agility without sacrificing sovereignty',
          description: 'Enjoy cloud-like agility without sacrificing sovereignty, control, or compliance requirements.',
        },
      ]}
      useCases={[
        {
          title: 'Government & Sovereign Environments',
          description: 'Cloud platforms designed to meet data sovereignty, regulatory, and national infrastructure requirements.',
          industry: 'Government',
        },
        {
          title: 'Enterprises with Sensitive Workloads',
          description: 'Organizations requiring on-premises control for security, compliance, or performance reasons.',
          industry: 'Enterprise',
        },
        {
          title: 'Hybrid Application Platforms',
          description: 'Environments running workloads across on-premises and public cloud platforms.',
          industry: 'Enterprise',
        },
        {
          title: 'AI & Data-Intensive Platforms',
          description: 'Cloud platforms supporting GPU workloads, AI pipelines, and large-scale data processing.',
          industry: 'Technology',
        },
      ]}
      technicalSpecs={{
        title: 'Key Architectural Elements',
        items: [
          {
            category: 'Cloud Orchestration',
            details: [
              'Centralized cloud orchestration for regions, zones, tenants, and workloads',
            ],
          },
          {
            category: 'Kubernetes Orchestration',
            details: [
              'Kubernetes-based compute orchestration with integrated networking and security',
            ],
          },
          {
            category: 'High-Performance Networking',
            details: [
              'High-performance networking using SmartNICs, DPUs, and accelerated data paths',
            ],
          },
          {
            category: 'Secure Connectivity',
            details: [
              'Secure connectivity using IPSec, policy enforcement, and identity integration',
            ],
          },
          {
            category: 'Observability & Control',
            details: [
              'Observability and control integrated across networking and platform layers',
            ],
          },
        ],
      }}
      configExamples={[
        {
          title: 'Terraform VPC Module',
          type: 'terraform',
          description: 'AWS VPC with public and private subnets',
          code: `module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b"]
  
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]
}`,
        },
        {
          title: 'Kubernetes EKS Cluster',
          type: 'terraform',
          description: 'EKS cluster with node groups',
          code: `resource "aws_eks_cluster" "main" {
  name     = "main-cluster"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"
  
  vpc_config {
    subnet_ids = var.subnet_ids
  }
}`,
        },
      ]}
      kpis={[
        {
          metric: 'Availability',
          value: '99.9%',
          description: 'Uptime SLA',
        },
        {
          metric: 'Latency',
          value: '< 10ms',
          description: 'On-prem to cloud',
        },
        {
          metric: 'Cost Savings',
          value: '30-50%',
          description: 'Through optimization',
        },
        {
          metric: 'Recovery Time',
          value: '< 1 hour',
          description: 'RTO for DR',
        },
      ]}
      resources={[
        {
          title: 'Sovereign Cloud Platform for On-Premises Environments',
          type: 'case-study',
          href: '/resources/case-studies/vishanti-sovereign-cloud',
        },
      ]}
      ragContextId="cloud-hybrid-cloud"
      cta={{
        title: 'Exploring private, sovereign, or hybrid cloud platforms for your organization?',
        description: '',
        primaryButton: {
          text: 'Talk to an Infrastructure Expert',
          href: '/contact',
        },
      }}
      customSections={<PartnersSection />}
    />
  )
}
