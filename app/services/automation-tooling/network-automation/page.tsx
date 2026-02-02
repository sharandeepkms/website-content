import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Network Automation',
  description: 'Network automation for multi-vendor fabrics: IaC/GitOps, ZTP, change validation, telemetry, and closed-loop ops.',
  openGraph: {
    title: 'Network Automation Services | PalC Networks',
    description: 'IaC/GitOps, ZTP, validation, telemetry, and closed-loop automation for networks.',
  },
}

export default function NetworkAutomationPage() {
  return (
    <DetailPageTemplate
      pageType="service"
      title="Network Automation"
      subtitle="IaC/GitOps, ZTP, validation, telemetry, and closed-loop automation for multi-vendor networks."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Network Automation' },
      ]}
      overview="We automate the full network lifecycle: ZTP, config generation, change validation, deployment, and continuous assurance. Our automations are API-first, vendor-agnostic, and anchored in observability and SRE practices."
      overviewDetails={[
        'Deployment models: On-prem, colocation, and cloud VPC/VNet fabrics with consistent automation flows.',
        'Protocols & integrations: gNMI/NETCONF/REST, BGP/EVPN/VXLAN, SRv6/MPLS, SONiC and traditional NOS.',
        'Pipelines: IaC/GitOps with golden configs, pre/post checks, drift/conformance tests, and safe rollouts.',
        'Observability: Streaming telemetry, health/SLO dashboards, alert hygiene, and closed-loop hooks.',
        'Security & compliance: RBAC, policy-as-code, approvals, audit-ready change records.',
      ]}
      capabilities={[
        { title: 'ZTP & Provisioning', description: 'Zero-touch bring-up with inventory, bootstrap, and golden images/configs.', iconKey: 'server' },
        { title: 'Config Generation & Templates', description: 'Declarative models, golden configs, and service templates.', iconKey: 'code' },
        { title: 'Validation & Testing', description: 'Pre/post checks, synthetic probes, conformance, and drift detection.', iconKey: 'shield' },
        { title: 'Change Automation', description: 'Pipelines with approvals, canary/blue-green, and automated rollback.', iconKey: 'zap' },
        { title: 'Observability & SRE', description: 'Telemetry ingestion, SLOs, alert hygiene, runbooks, and closed-loop actions.', iconKey: 'database' },
        { title: 'Multi-Vendor & SONiC', description: 'Vendor-neutral workflows with SONiC, EVPN/VXLAN, SRv6/MPLS support.', iconKey: 'network' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'Automation & NetOps Architecture',
        description: 'Pipelines, controllers/APIs, validation, and observability feeding closed-loop automation.',
      }}
      useCases={[
        { title: 'Campus/DC ZTP', description: 'Automated onboarding with inventory-driven bootstrap and validation.' },
        { title: 'EVPN/VXLAN Rollouts', description: 'Golden configs, pre/post checks, and canary deployments for fabrics.' },
        { title: 'Multi-Cloud Networking', description: 'Consistent policy and connectivity automation across AWS/Azure/GCP.' },
        { title: 'Compliance & Audit', description: 'Policy-as-code, approvals, and full change audit trails.' },
        { title: 'SRE Operations', description: 'Runbooks, chatops, SLO burn-downs, and automated remediation.' },
      ]}
      benefits={[
        { title: 'Speed with Safety', description: 'CI/CD-style changes with pre/post validation and rollback readiness.' },
        { title: 'Consistency', description: 'Golden configs and templates reduce drift and defects.' },
        { title: 'Observability-First', description: 'Telemetry and SLOs tied directly into pipelines and alert hygiene.' },
        { title: 'Vendor Neutral', description: 'SONiC and traditional NOS supported through API-first design.' },
        { title: 'Audit & Compliance', description: 'RBAC, approvals, and evidence for every change.' },
      ]}
      technicalSpecs={{
        title: 'Supported Stack',
        items: [
          { category: 'Protocols', details: ['gNMI/NETCONF/REST', 'BGP/EVPN/VXLAN', 'SRv6/MPLS', 'Anycast GW'] },
          { category: 'Automation', details: ['IaC/GitOps pipelines', 'Pre/post checks', 'Drift & conformance', 'Canary/blue-green'] },
          { category: 'Observability', details: ['Streaming telemetry', 'Health/SLO dashboards', 'Alert hygiene', 'Closed-loop hooks'] },
          { category: 'Security', details: ['RBAC', 'Policy-as-code', 'Approvals & audit trails'] },
        ],
      }}
      kpis={[
        { metric: 'Change Success', value: '99%+', description: 'Validated with pre/post checks and rollback paths.' },
        { metric: 'Mean Time to Deploy', value: 'Minutes', description: 'Pipelines and ZTP accelerate turn-up.' },
        { metric: 'Drift Detected', value: '<10 min', description: 'Continuous conformance checks.' },
      ]}
      resources={[
        { title: 'NetDevOps Automation Guide', type: 'whitepaper', href: '/resources/whitepapers/netdevops-automation-guide' },
        { title: 'Automation for EVPN Fabrics', type: 'blog', href: '/resources/blog/netdevops-pipelines-evpn' },
        { title: 'Compliance & Audit Patterns', type: 'documentation', href: '/resources/documentation/security' },
      ]}
      cta={{
        title: 'Automate Your Network Safely',
        description: 'Deploy consistent, observable, and auditable network changes with automation-first patterns.',
        primaryButton: { text: 'Book an Automation Review', href: '/contact' },
        secondaryButton: { text: 'Explore Automation Services', href: '/services/automation-tooling' },
      }}
      ragContextId="services:network-automation"
      customSections={<PartnersSection />}
    />
  )
}

