import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Cloud Infrastructure Engineering | PalC Networks',
  description: 'Cloud and hybrid infrastructure with IaC, Kubernetes, security guardrails, observability, and SRE operations.',
  openGraph: {
    title: 'Cloud Infrastructure Engineering | PalC Networks',
    description: 'Cloud/hybrid engineering with IaC, K8s, security, observability, and SRE.',
  },
}

export default function CloudInfrastructureEngineeringPage() {
  return (
    <DetailPageTemplate
      pageType="service"
      title="Cloud Infrastructure Engineering"
      subtitle="Cloud and hybrid infrastructure with IaC/GitOps, Kubernetes, security guardrails, observability, and SRE operations."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Cloud Infrastructure Engineering', href: '/services/cloud-infrastructure-engineering' },
      ]}
      overview="We design, land, and operate production-ready cloud and hybrid foundations across AWS, Azure, and GCP. We use IaC/GitOps, Kubernetes blueprints, security guardrails, observability, and SRE practices to deliver reliable, secure, and cost-optimized platforms."
      overviewDetails={[
        'Architecture: Landing zones, VPC/VNet, private connectivity, shared services, identity/PKI/DNS foundations.',
        'Deployment models: Cloud-native, hybrid (DC/colo + cloud), active-active or pilot-light DR across regions/providers.',
        'Protocols & integrations: BGP/EVPN/VXLAN for cloud/DC interconnects; APIs for IAM, networking, and K8s control planes.',
        'Kubernetes: EKS/AKS/GKE blueprints with CNI (Cilium/Calico), service mesh, Ingress, and GitOps (Argo/Flux).',
        'Security & compliance: IAM/SO, encryption, policy-as-code, ZTNA/SASE edges, audit-ready change flows.',
        'Observability & SRE: Metrics/logs/traces, SLOs, alert hygiene, runbooks, and closed-loop remediation.',
        'Cost & performance: Right-sizing, autoscale, spot/preemptible where safe, savings plans/commits.',
      ]}
      capabilities={[
        { title: 'Landing Zones', description: 'VPC/VNet, identity, DNS/PKI, shared services, guardrails.', iconKey: 'cloud' },
        { title: 'IaC & GitOps', description: 'Terraform/Pulumi/CFN/ARM, modules, pipelines, drift/conformance.', iconKey: 'code' },
        { title: 'Kubernetes Blueprints', description: 'EKS/AKS/GKE, CNI/mesh, Ingress, GitOps, policy-as-code.', iconKey: 'server' },
        { title: 'Security & Compliance', description: 'IAM, encryption, ZTNA/SASE, audit-ready change flows.', iconKey: 'shield' },
        { title: 'Observability & SRE', description: 'Metrics/logs/traces, SLOs, alert hygiene, runbooks, automation.', iconKey: 'database' },
        { title: 'Cost & Performance', description: 'Right-sizing, autoscale, spot/preemptible, savings plans/commits.', iconKey: 'zap' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Cloud & Hybrid Architecture',
        description: 'Landing zones, connectivity (DC/colo/cloud), K8s, security, observability, and automation layers.',
      }}
      useCases={[
        { title: 'Cloud Landing Zones', description: 'Guardrailed AWS/Azure/GCP foundations with identity, DNS/PKI, and networking.' },
        { title: 'Kubernetes at Scale', description: 'EKS/AKS/GKE blueprints with GitOps, policy, and observability baked in.' },
        { title: 'Multi-Cloud/Hybrid Interconnect', description: 'DC/colo to cloud, active/active or pilot-light DR, BGP/EVPN/VXLAN connectivity.' },
        { title: 'DevSecOps & Compliance', description: 'Policy-as-code, CI/CD, scanning, and audit-ready change flows.' },
        { title: 'AI/ML Platforms', description: 'GPU-aware clusters, storage/networking tuned for AI pipelines with SLOs.' },
      ]}
      benefits={[
        { title: 'Faster Time-to-Prod', description: 'IaC/GitOps modules and pipelines accelerate repeatable builds.' },
        { title: 'Security by Design', description: 'Guardrails, identity, encryption, and policy-as-code from day one.' },
        { title: 'Observable & Reliable', description: 'SLOs, alert hygiene, and runbooks keep uptime and MTTR in check.' },
        { title: 'Cost Awareness', description: 'Right-sizing, autoscale, and savings plans embedded in designs.' },
      ]}
      technicalSpecs={{
        title: 'Service Specifications',
        items: [
          {
            category: 'Cloud Providers',
            details: [
              'AWS, Azure, GCP',
              'Hybrid (DC/colo + cloud)',
              'Regional HA/DR patterns',
            ],
          },
          {
            category: 'IaC/Automation',
            details: [
              'Terraform/Pulumi/CFN/ARM',
              'GitOps (Argo/Flux)',
              'Drift/conformance, pre/post checks',
            ],
          },
          {
            category: 'Kubernetes',
            details: [
              'EKS, AKS, GKE',
              'CNI (Cilium, Calico)',
              'Service mesh, Ingress/Gateway',
            ],
          },
          {
            category: 'Networking',
            details: [
              'VPC/VNet design',
              'BGP/EVPN/VXLAN interconnect',
              'Private connectivity (TGW/VPN/Direct Connect/ExpressRoute)',
            ],
          },
          {
            category: 'Observability',
            details: [
              'Cloud-native telemetry',
              'Prom/Grafana/ELK',
              'Tracing and SLO dashboards',
            ],
          },
          {
            category: 'Security',
            details: [
              'IAM/SO',
              'Encryption (KMS/HSM)',
              'ZTNA/SASE edges',
              'Policy-as-code',
            ],
          },
        ],
      }}
      configExamples={[
        {
          title: 'Terraform VPC Module',
          type: 'terraform',
          description: 'Reusable VPC module',
          code: `module "vpc" {
  source  = "./modules/vpc"
  vpc_cidr = "10.0.0.0/16"
  azs      = ["us-east-1a", "us-east-1b"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24"]
}`,
        },
        {
          title: 'Kubernetes EKS Cluster',
          type: 'terraform',
          description: 'EKS cluster with node groups',
          code: `resource "aws_eks_cluster" "main" {
  name     = "main-cluster"
  version  = "1.28"
  role_arn = aws_iam_role.cluster.arn
  vpc_config { subnet_ids = var.subnet_ids }
}`,
        },
      ]}
      kpis={[
        { metric: 'Time to Provision', value: '<1 day', description: 'Landing zone + baseline K8s with IaC/GitOps modules.' },
        { metric: 'Availability', value: '99.9%+', description: 'Multi-AZ/region HA for core services and K8s control planes.' },
        { metric: 'Cost Optimization', value: '10–25%', description: 'Right-sizing, autoscale, spot/preemptible, and commits.' },
        { metric: 'Security', value: 'Guardrails', description: 'IAM/SO, encryption, policy-as-code, approvals, audit trails.' },
        { metric: 'Observability', value: 'SLO-driven', description: 'Metrics/logs/traces, SLO dashboards, alert hygiene, runbooks.' },
      ]}
      cta={{
        title: 'Build Your Cloud & Hybrid Foundation',
        description: 'Design and land secure, observable, and cost-aware infrastructure with IaC and SRE best practices.',
        primaryButton: { text: 'Schedule a Consultation', href: '/contact' },
        secondaryButton: { text: 'View Services', href: '/services' },
      }}
      ragContextId="services:cloud-infrastructure-engineering"
      customSections={<PartnersSection />}
    />
  )
}

