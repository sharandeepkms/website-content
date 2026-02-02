import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'

export const metadata: Metadata = {
  title: 'NetPro',
  description: 'NetPro gives multi-vendor network management with topology, config, observability, automation, and ITSM/chatops hooks.',
  openGraph: {
    title: 'NetPro - Network Management Platform | PalC Networks',
    description: 'Multi-vendor network management with observability and automation.',
  },
}

export default function NetProPage() {
  return (
    <DetailPageTemplate
      title="NetPro"
      subtitle="Multi-vendor network management with topology, configuration, observability, and automation in one platform."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Software Tools', href: '/products/software-tools' },
        { label: 'NetPro' },
      ]}
      overview="NetPro centralizes topology, config, observability, and automation for multi-vendor networks—data center, campus, WAN, and wireless. It ties inventory to change automation, SLO dashboards, and ITSM/chatops workflows to cut MTTR and improve compliance."
      overviewDetails={[
        'Topology & inventory: Automated discovery, L2/L3 topology, intent vs. state, and asset lifecycle tracking.',
        'Config & change: Golden configs, drift/conformance, pre/post checks, approvals, and rollbacks.',
        'Observability: Metrics/logs/flows, SLO dashboards, alert hygiene, and anomaly detection.',
        'Automation: Templates, pipelines, and task automation with RBAC and policy-as-code.',
        'Integrations: ITSM, chatops, SIEM, and API/SDK for custom workflows.',
      ]}
      capabilities={[
        { title: 'Multi-Vendor Management', description: 'Discovery, inventory, topology across DC/campus/WAN/wireless.', iconKey: 'network' },
        { title: 'Config & Drift', description: 'Golden configs, drift/conformance, pre/post checks.', iconKey: 'code' },
        { title: 'Observability', description: 'Metrics/logs/flows with SLO dashboards and alert hygiene.', iconKey: 'database' },
        { title: 'Automation', description: 'Templates, pipelines, and safe rollout/rollback with approvals.', iconKey: 'cloud' },
        { title: 'Governance', description: 'RBAC, audit trails, and policy-as-code for compliant changes.', iconKey: 'shield' },
        { title: 'Integrations', description: 'ITSM/chatops/SIEM plus open APIs/SDKs.', iconKey: 'zap' },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'cloud-hybrid',
        title: 'NetPro Operations Architecture',
        description: 'Discovery, config/drift, observability, and automation with ITSM/chatops integrations.',
      }}
      useCases={[
        { title: 'DC & Campus Ops', description: 'Unified topology, config, and SLO visibility across sites.' },
        { title: 'Change Automation', description: 'Pre/post checks, approvals, and rollbacks for safer changes.' },
        { title: 'Compliance & Audit', description: 'Drift/conformance, evidence, and audit trails.' },
        { title: 'NOC Efficiency', description: 'Correlated alerts, SLOs, and automation to reduce MTTR.' },
      ]}
      benefits={[
        { title: 'Lower MTTR', description: 'Correlated topology, telemetry, and automation cut resolution time.' },
        { title: 'Safer Changes', description: 'Approvals, pre/post checks, and rollbacks reduce risk.' },
        { title: 'Compliance Ready', description: 'Drift, evidence, and RBAC keep audits clean.' },
        { title: 'Faster Ops', description: 'Templates and pipelines reduce manual toil.' },
      ]}
      technicalSpecs={{
        title: 'Platform Snapshot',
        items: [
          { category: 'Discovery/Topology', details: ['L2/L3 discovery', 'Inventory CMDB', 'Intent vs. state'] },
          { category: 'Config/Change', details: ['Golden configs', 'Drift/conformance', 'Pre/post checks', 'Rollbacks'] },
          { category: 'Observability', details: ['Metrics/logs/flows', 'SLO dashboards', 'Alert hygiene/anomalies'] },
          { category: 'Integrations', details: ['ITSM', 'Chatops', 'SIEM', 'API/SDK'] },
          { category: 'Security', details: ['RBAC', 'Audit trails', 'Policy-as-code controls'] },
        ],
      }}
      kpis={[
        { metric: 'MTTR', value: '-30% to -50%', description: 'With correlated telemetry and automation.' },
        { metric: 'Change Success', value: '>98%', description: 'Pre/post checks and rollbacks reduce failures.' },
        { metric: 'Drift Resolution', value: '<15 min detection', description: 'Continuous conformance checks.' },
      ]}
      resources={[
        { title: 'NetOps Automation Guide', type: 'whitepaper', href: '/resources/whitepapers/netdevops-automation-guide' },
        { title: 'Topology & Drift Playbook', type: 'documentation', href: '/resources/documentation/products' },
      ]}
      cta={{
        title: 'Unify Your Network Operations',
        description: 'See NetPro manage topology, configs, and observability with automation and compliance baked in.',
        primaryButton: { text: 'Request a Demo', href: '/contact' },
        secondaryButton: { text: 'View Software Tools', href: '/products/software-tools' },
      }}
      ragContextId="products:netpro"
    />
  )
}

