import {
  Network,
  Cloud,
  Code,
  Shield,
  Settings,
  TestTube,
  HeadphonesIcon,
  Server,
  GraduationCap,
  ClipboardCheck,
  LucideIcon,
} from 'lucide-react'

export interface Service {
  id: string
  slug: string
  title: string
  pillar?: string
  description: string
  overview: string
  icon: LucideIcon
  features: string[]
  architecture: string
  workflow: string[]
  benefits: string[]
  useCases: string[]
  industries: string[]
  differentiators: string[]
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'network-engineering',
    title: 'Network Engineering Services',
    pillar: 'Data Center & Campus Fabric Architecture',
    description: 'SONiC-first, cloud-scale network design, implementation, and optimization for data center, campus, and provider fabrics.',
    overview: 'We architect deterministic, low-latency fabrics using open networking (SONiC), EVPN/VXLAN, and segment routing. Designs emphasize scale-out leaf-spine, telemetry-rich observability, and day-2 automation.',
    icon: Network,
    features: [
      'EVPN/VXLAN & SRv6 fabric design with underlay/overlay KPIs',
      'SONiC-based switching with BGP-EVPN control-plane hardening',
      'QoS, congestion management, ECN/RED tuning for AI/ML east-west flows',
      'Inline visibility with streaming telemetry, gNMI, sFlow, and INT',
      'Brownfield migration blueprints with parallel underlay cutovers',
      'Resiliency testing: failure domains, blast-radius isolation, chaos runs',
    ],
    architecture:
      'Reference designs cover Tier-Leaf/Spine, super-spines, and L3 edge with EVPN/VXLAN overlays, SRv6 underlay, dual-stack IPv4/IPv6, and policy-based routing. Designs include structured cabling, optics profiles, buffer profiles, and QoS templates for AI traffic.',
    workflow: [
      'Assess & simulate: traffic modeling, failure scenarios, buffer and queue design',
      'Blueprint: fabric topology, BGP-EVPN policy, SR policies, QoS classes',
      'Implement: zero-touch provisioning, golden configs, automated validation',
      'Optimize: telemetry-driven tuning, intent checks, drift detection',
    ],
    benefits: [
      'Deterministic latency with lossless or near-lossless fabrics for AI/ML',
      'Freedom from lock-in via open, multi-vendor validated patterns',
      'Operational speed with automated turn-up and day-2 drift checks',
      'Improved visibility with real-time telemetry and proactive SLOs',
    ],
    useCases: [
      'AI and HPC data center fabrics',
      'Cloud edge and colocation PoPs',
      'Campus modernization with EVPN/VXLAN',
      'Enterprise core refresh with SRv6',
    ],
    industries: ['Cloud Providers', 'Enterprises', 'Telcos', 'AI/ML Platforms'],
    differentiators: [
      'SONiC-first expertise with multi-vendor validation',
      'Reference blueprints for AI fabrics with RoCE tuning',
      'Observability baked-in (INT/gNMI/flow + SLO dashboards)',
      'Migration patterns that avoid downtime and lock-in',
    ],
  },
  {
    id: '2',
    slug: 'cloud-devops',
    title: 'Cloud, Multi-Cloud & NetDevOps',
    pillar: 'Automation-First Cloud Networking',
    description: 'Design, land, and operate secure multi-cloud and hybrid fabrics with pipeline-driven automation.',
    overview: 'We design cloud network topologies, landing zones, and SDN overlays, then codify everything as pipelines (IaC + GitOps). NetOps/DevOps workflows are unified for consistent policy, identity, and connectivity.',
    icon: Cloud,
    features: [
      'Cloud landing zones with hub-spoke/mesh and private connectivity',
      'IaC/GitOps for network + security (Terraform, Ansible, ArgoCD)',
      'Transit/SD-WAN integration, Cloud WAN/Transit Gateway patterns',
      'Service mesh + north-south/east-west policy harmonization',
      'Automated guardrails: policy-as-code, drift detection, compliance',
      'SRE playbooks with SLOs, error budgets, and runbooks',
    ],
    architecture:
      'Reference patterns for AWS/Azure/GCP with shared services hubs, TGW/VRF segmentation, private link, DNS, and identity integration. Layered security with zero-trust ingress/egress, microsegmentation, and observability wiring.',
    workflow: [
      'Discover & model: cloud network inventory, policies, identity flows',
      'Design: hub/spoke or mesh, segmentation, DNS/PKI, service insertion',
      'Automate: IaC modules, pipelines, policy-as-code, drift/health checks',
      'Operate: SRE dashboards, runbooks, continuous optimization',
    ],
    benefits: [
      'Consistent networking and security across clouds and regions',
      'Repeatable landing zones with policy and guardrails baked-in',
      'Reduced MTTR via observability and SRE-grade runbooks',
      'Lower TCO with automated provisioning and rightsizing',
    ],
    useCases: [
      'Multi-cloud interconnect and shared services hubs',
      'Cloud migration with zero-trust overlays',
      'Platform engineering for app teams with self-service',
      'Distributed AI/ML pipelines across regions',
    ],
    industries: ['Cloud Providers', 'Enterprises', 'SaaS', 'Financial Services'],
    differentiators: [
      'NetDevOps accelerators with reusable IaC modules',
      'Policy-as-code enforcement aligned to zero trust',
      'Platform SRE focus with SLOs and golden signals',
      'Multi-cloud patterns proven in production at scale',
    ],
  },
  {
    id: '3',
    slug: 'software-development',
    title: 'Network & Platform Software Engineering',
    pillar: 'Automation & Observability Tooling',
    description: 'Build control-plane, telemetry, and automation software tailored to your network and platform.',
    overview: 'We develop control/management plane software, observability pipelines, and operator portals. Focus is on reliability, API-first design, and secure automation that integrates with existing ecosystems.',
    icon: Code,
    features: [
      'Controller/portal development with RBAC and audit',
      'Telemetry pipelines (gNMI, SNMP, syslog) to data lakes',
      'Runbook automation & workflow engines',
      'Northbound/southbound API integrations',
      'UI/UX for NOC/SRE dashboards',
      'Plugin frameworks and SDKs for extensibility',
    ],
    architecture:
      'Microservices with event-driven pipelines, backed by TS/Go/Python stacks. APIs are documented (OpenAPI) with strong authN/Z, and data flows to observability stacks (Prometheus/ELK/OpenSearch).',
    workflow: [
      'Define intents and integrations; model data and APIs',
      'Build services, pipelines, and UI/UX with secure auth and RBAC',
      'Automate tests (contract, integration, performance) and CI/CD',
      'Operate with SLOs, tracing, and continuous feedback loops',
    ],
    benefits: [
      'Operator productivity through purpose-built tooling',
      'Visibility from line-rate telemetry to business KPIs',
      'Secure-by-design automation with audited actions',
      'Extensible platforms that avoid vendor lock-in',
    ],
    useCases: [
      'NetOps/SRE portals and automation runbooks',
      'Telemetry lake ingestion and analytics',
      'Customer self-service portals and APIs',
      'Network orchestrator integrations',
    ],
    industries: ['Enterprises', 'Service Providers', 'SaaS', 'Cloud Providers'],
    differentiators: [
      'Deep networking domain + software engineering in one team',
      'Secure, auditable automation aligned to ITSM/ITIL/SRE practices',
      'Telemetry-first design with measurable outcomes',
      'Reusable component library to accelerate delivery',
    ],
  },
  {
    id: '4',
    slug: 'security-engineering',
    title: 'Security Engineering Services',
    pillar: 'Zero Trust & Secure Networking',
    description: 'Design and enforce zero-trust, identity-driven security across data center, cloud, and edge.',
    overview: 'We implement identity-centric security with microsegmentation, strong authN/Z, and continuous verification. Architectures cover zero trust, secure access, and inline observability with compliance controls.',
    icon: Shield,
    features: [
      'Zero Trust blueprints (identity, device, network, workload, data)',
      'Microsegmentation (EVPN/VXLAN/NSX/Cilium) and policy enforcement',
      'Identity and access management with SSO/MFA and JIT/JEA',
      'Inline threat detection, NDR/IDS/IPS and flow analytics',
      'Security automation: SOAR playbooks, response runbooks',
      'Compliance controls and evidence automation',
    ],
    architecture:
      'Identity at the core (IdP + policy engine), microsegmentation via overlays, secure access (ZTNA/SASE), and pervasive telemetry feeding SIEM/SOAR. Policies expressed as code with continuous posture checks.',
    workflow: [
      'Assess: asset mapping, trust zones, crown-jewel identification',
      'Design: policy model, segmentation plan, control-plane hardening',
      'Implement: identity, ZTNA, microsegmentation, telemetry hooks',
      'Respond: SOAR playbooks, purple-team validation, continuous compliance',
    ],
    benefits: [
      'Reduced breach impact via granular segmentation',
      'Consistent policy across data center, cloud, and edge',
      'Faster response through automated playbooks and telemetry',
      'Audit-ready evidence with policy-as-code',
    ],
    useCases: [
      'Zero Trust adoption and SASE rollouts',
      'Cloud workload segmentation and E/W protection',
      'SOC modernization with SOAR and telemetry pipelines',
      'Regulated workloads with continuous compliance',
    ],
    industries: ['Financial Services', 'Healthcare', 'Telcos', 'Public Sector'],
    differentiators: [
      'Identity-driven architectures with policy-as-code',
      'Deep integration across networking, cloud, and security stacks',
      'Purple-team validation and measurable risk reduction',
      'Automated evidence for audits and compliance',
    ],
  },
  {
    id: '5',
    slug: 'system-integration',
    title: 'System Integration Services',
    pillar: 'Full-Stack Integration & Orchestration',
    description: 'Unify network, cloud, OSS/BSS, and observability platforms with hardened integrations and orchestration.',
    overview: 'We integrate controllers, ITSM/CMDB, telemetry stacks, and automation platforms to deliver unified operations and service assurance.',
    icon: Settings,
    features: [
      'OSS/BSS and ITSM integrations with closed-loop workflows',
      'Controller/orchestrator integrations (NETCONF/gNMI/REST)',
      'Data lake and observability pipeline stitching',
      'API gateways with auth, throttling, and auditing',
      'Legacy-to-modern interoperability bridges',
      'Service catalogs and self-service portals',
    ],
    architecture:
      'Event-driven integrations with message bus/ESB, normalized data models, API-first design, and observability hooks. Closed-loop automation flows link intent, telemetry, and remediation.',
    workflow: [
      'Map systems, data models, and desired intents',
      'Design APIs, events, and gateways with authN/Z and quotas',
      'Implement orchestrations, adapters, and data pipelines',
      'Validate with contract tests, simulators, and synthetic traffic',
    ],
    benefits: [
      'Unified operations and faster MTTR via closed-loop automation',
      'Consistent data models across OSS/BSS/ITSM/observability',
      'Fewer manual handoffs; higher accuracy and compliance',
      'Future-proof integrations with API-first approach',
    ],
    useCases: [
      'Automated service provisioning with ITSM/CMDB updates',
      'NOC/SOC observability consolidation and enrichment',
      'Edge/5G OSS/BSS mediation and service catalogs',
      'Telemetry-to-remediation closed-loop automation',
    ],
    industries: ['Telcos', 'Enterprises', 'Cloud Providers', 'SaaS'],
    differentiators: [
      'Closed-loop designs combining intent, telemetry, and remediation',
      'Event-driven, API-first integrations with strong security',
      'Experience across OSS/BSS, ITSM, and network controllers',
      'Simulation and contract testing to de-risk cutovers',
    ],
  },
  {
    id: '6',
    slug: 'testing-qa',
    title: 'Testing, QA & Validation',
    pillar: 'Validation, Scale, and Compliance',
    description: 'Full-stack validation for fabrics, cloud, and software: scale, performance, interoperability, and security.',
    overview: 'We build automated test harnesses and labs to validate fabrics, AI pipelines, cloud networks, and software releases. Focus on scale, latency, loss, and conformance.',
    icon: ClipboardCheck,
    features: [
      'Ffabric and protocol scale tests (BGP/EVPN/SRv6/Multicast)',
      'RoCE/AQP validation for AI workloads: ECN/RED/WRED/PAUSE',
      'Performance, soak, and failure/chaos testing',
      'Security and compliance testing (Zero Trust, segmentation)',
      'Interoperability and conformance across vendors',
      'Automated regression suites and CI pipelines',
    ],
    architecture:
      'Automated labs with traffic generators, fabric simulators, CI-triggered pipelines, and observability to capture KPIs (latency, jitter, loss, buffer occupancy).',
    workflow: [
      'Define success criteria and KPIs; model traffic profiles',
      'Automate testbeds, golden configs, and data collection',
      'Execute scale/perf/chaos suites; capture and analyze KPIs',
      'Publish reports with recommendations and remediation',
    ],
    benefits: [
      'Lower risk for production cutovers and releases',
      'Predictable performance for AI and latency-sensitive apps',
      'Continuous quality with automated regression',
      'Objective evidence for compliance and readiness',
    ],
    useCases: [
      'Pre-production fabric and AI workload validation',
      'Cloud network change validation',
      'Release readiness for controllers/portals/APIs',
      'Security posture and Zero Trust validation',
    ],
    industries: ['Cloud Providers', 'AI/ML Platforms', 'Telcos', 'Enterprises'],
    differentiators: [
      'AI/ML fabric expertise (RoCE tuning, congestion control)',
      'CI-integrated automated labs with reproducible runs',
      'Multi-vendor interoperability proof points',
      'Actionable reports with guardrails and runbooks',
    ],
  },
  {
    id: '7',
    slug: 'managed-support',
    title: 'Managed Support Services',
    pillar: 'SRE-Driven Operations',
    description: '24/7 SRE-grade managed services for networks, cloud, and platforms with SLO-backed commitments.',
    overview: 'We operate your fabrics, cloud connectivity, and platforms with SLOs, runbooks, and proactive observability. Ops-as-code, playbooks, and automation keep reliability high.',
    icon: HeadphonesIcon,
    features: [
      '24/7 monitoring with SLOs, error budgets, and alert hygiene',
      'Incident response with runbooks and blameless postmortems',
      'Change management with pre/post checks and canarying',
      'Capacity and performance management with forecasting',
      'Automation for routine ops and self-healing where safe',
      'Security and compliance checks integrated into ops',
    ],
    architecture:
      'Central observability (metrics/logs/traces/flow), event routing to on-call, runbooks and automations, and SLO dashboards. Integrations with ITSM/CMDB and chatops.',
    workflow: [
      'Onboard: runbooks, SLOs, alerts, dashboards, access controls',
      'Operate: monitor, triage, remediate with automation-first mindset',
      'Improve: postmortems, reliability drills, change templates',
      'Report: SLO burn, capacity, security posture to stakeholders',
    ],
    benefits: [
      'Higher uptime with SRE discipline and automation',
      'Predictable service quality with transparent SLOs',
      'Lower toil and faster MTTR via runbooks and chatops',
      'Audit-ready operations with change and access controls',
    ],
    useCases: [
      'Managed NOC/SRE for AI and cloud fabrics',
      'Ops-as-a-Service for SDN/NetDevOps platforms',
      'Global edge and interconnect monitoring',
      'Lifecycle ops for controllers, portals, and APIs',
    ],
    industries: ['Enterprises', 'Cloud Providers', 'Service Providers', 'AI/ML Platforms'],
    differentiators: [
      'SRE playbooks with SLOs, error budgets, and postmortems',
      'Ops-as-code with automation-first remediation',
      'Integrated security/compliance in daily operations',
      'Transparent reporting and stakeholder communication',
    ],
  },
]

export const additionalOfferings = [
  {
    id: 'openlab',
    slug: 'openlab',
    title: 'OpenLab – 24×7 Network Lab',
    description: 'Access our state-of-the-art network lab for testing, validation, and proof-of-concept deployments. Available 24/7 with expert support.',
    icon: Server,
    features: [
      'Multi-vendor equipment access',
      'Pre-configured test environments',
      'Remote lab access',
      'Expert lab support',
      'Custom topology setup',
      'Performance benchmarking',
    ],
  },
  {
    id: 'product-engineering',
    slug: 'product-engineering',
    title: 'Product Engineering & Custom Development',
    description: 'Partner with us to build custom network products, tools, and solutions tailored to your specific requirements.',
    icon: Code,
    features: [
      'Custom product development',
      'White-label solutions',
      'Product enhancement',
      'Technology prototyping',
      'MVP development',
      'Product support',
    ],
  },
  {
    id: 'training',
    slug: 'training',
    title: 'Training & Knowledge Transfer',
    description: 'Comprehensive training programs to upskill your team on modern networking technologies and best practices.',
    icon: GraduationCap,
    features: [
      'Customized training programs',
      'Hands-on lab exercises',
      'Certification preparation',
      'Technology workshops',
      'Knowledge transfer sessions',
      'Ongoing learning support',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

