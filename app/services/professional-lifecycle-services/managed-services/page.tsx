import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Managed Services (NOC/SOC)',
  description: '24/7 NOC/SOC with SRE rigor: observability, incident response, change governance, and automation for network, cloud, and security stacks.',
  openGraph: {
    title: 'Managed Services (NOC/SOC) | PalC Networks',
    description: 'Managed NOC/SOC with SRE practices, automation, and security.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Managed Services (NOC/SOC)',
  tagline: '24/7 NOC/SOC with SRE-grade observability, incident response, change governance, and automation.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Managed Services (NOC/SOC)' },
      ],
  overview: 'We operate your network, cloud, and security stacks with 24/7 NOC/SOC coverage. Our model blends observability, SRE practices, automation, and security response to keep uptime high, MTTR low, and compliance intact.',
  overviewDetails: [
    'Scope: Network, cloud, security, and platform operations with 24/7 follow-the-sun coverage.',
    'Protocols & integrations: BGP/EVPN/VXLAN, K8s, firewalls/WAF, SIEM/SOAR, ITSM/chatops hooks.',
    'Security & compliance: Playbooks, change windows, approvals, RBAC, MFA, audit-ready evidence.',
    'Observability: Metrics/logs/traces, SLOs/error budgets, synthetic tests, flow and packet insights.',
    'Automation: Runbooks-as-code, remediation, drift/conformance checks, and safe change workflows.',
    'Performance: Capacity and performance baselines with monthly service reviews and optimization.',
  ],
  capabilities: [
    { title: '24/7 NOC', description: 'Network/cloud monitoring, triage, escalation, and remediation.', iconKey: 'network' },
    { title: '24/7 SOC', description: 'SIEM/SOAR pipelines, threat detection, incident response, and forensics.', iconKey: 'shield' },
    { title: 'Incident & Problem Mgmt', description: 'Runbooks, comms, root-cause, and corrective actions.', iconKey: 'zap' },
    { title: 'Change Governance', description: 'CAB-aligned, approvals, pre/post checks, and audit trails.', iconKey: 'cloud' },
    { title: 'Observability & SLOs', description: 'SLO/error budgets, dashboards, alert hygiene, synthetic tests.', iconKey: 'database' },
    { title: 'Automation & Runbooks', description: 'Remediation automation, drift/conformance, chatops triggers.', iconKey: 'code' },
  ],
  architectureDiagram: {
    type: 'reactflow',
    preset: 'cloud-hybrid',
    title: 'Managed Ops Architecture',
    description: 'Integrated NOC/SOC with observability, runbooks, automation, and governed change flows.',
  },
  useCases: [
    { title: 'Managed NOC', description: 'Proactive monitoring, triage, and remediation for network/cloud platforms.' },
    { title: 'Managed SOC', description: 'Threat detection/response with SIEM/SOAR and forensics support.' },
    { title: 'Compliance & Governance', description: 'Audit-ready change, evidence, and reporting for regulated environments.' },
    { title: 'Capacity & Reliability', description: 'Performance baselining, SLOs, and optimization reviews.' },
  ],
  benefits: [
    { title: 'Higher Uptime, Lower MTTR', description: '24/7 coverage, playbooks, and automation reduce incident impact.' },
    { title: 'Security-Forward Ops', description: 'Integrated NOC/SOC with SIEM/SOAR and controlled changes.' },
    { title: 'Audit-Ready Evidence', description: 'Approvals, logs, and reports aligned to change governance.' },
    { title: 'Predictable Operations', description: 'SLOs, service reviews, and capacity planning baked in.' },
  ],
  technicalSpecs: {
    title: 'Service Coverage',
    items: [
      { category: 'Networks/Cloud', details: ['BGP/EVPN/VXLAN', 'K8s/containers', 'Load balancers/WAF', 'Firewalls/VPN/SD-WAN'] },
      { category: 'Security', details: ['SIEM/SOAR integrations', 'Runbooks for detection/response', 'Threat intel/IOC handling'] },
      { category: 'Tooling', details: ['ITSM/chatops', 'Observability stacks (Prom/Grafana/ELK/APM)', 'Config/asset CMDB'] },
      { category: 'Governance', details: ['Change windows', 'CAB approvals', 'Audit trails and reporting'] },
    ],
  },
  kpis: [
    { metric: 'Availability', value: '99.9%+', description: 'Targeted across covered services with SLOs.' },
    { metric: 'MTTR', value: '<30 min P1', description: 'Runbooks + automation for critical incidents.' },
    { metric: 'Detection to Response', value: '<10 min', description: 'SIEM/SOAR + analyst triage for priority alerts.' },
    { metric: 'Change Success', value: '>98%', description: 'Pre/post checks and approvals reduce change risk.' },
  ],
  cta: {
    title: 'Put Your Operations on Autopilot',
    description: 'Run 24/7 with SRE-grade NOC/SOC, automation, and strong governance.',
    primaryButton: { text: 'Schedule an Ops Review', href: '/contact' },
    secondaryButton: { text: 'View All Services', href: '/services' },
  },
  ragContextId: 'services:managed-services',
}

export default function ManagedServicesPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

