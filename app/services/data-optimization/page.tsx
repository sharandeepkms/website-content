import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Data Optimization Services | PalC Networks',
  description: 'Maximize the performance, efficiency, and cost-effectiveness of your data infrastructure with comprehensive optimization services.',
  openGraph: {
    title: 'Data Optimization Services | PalC Networks',
    description: 'Storage tiering, caching strategies, and analytics pipeline optimization.',
  },
}

export default function DataOptimizationPage() {
  return (
    <DetailPageTemplate
      pageType="service"
      title="Data Optimization Services"
      tagline="Maximize the performance, efficiency, and cost-effectiveness of your data infrastructure with comprehensive optimization services covering storage tiering, caching strategies, indexing optimization, and analytics pipeline tuning."
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Data Optimization', href: '/services/data-optimization' },
      ]}
      overview="Our data optimization services help organizations maximize the value of their data infrastructure through intelligent storage tiering, advanced caching strategies, optimized indexing, and efficient analytics pipelines. We analyze your data access patterns and workloads to design optimal data architectures."
      overviewDetails={[
        'Multi-tier storage architecture (Hot/Warm/Cold)',
        'Intelligent caching strategies for performance',
        'Optimized indexing for search and analytics',
        'Efficient ETL/ELT pipelines',
        'Cost optimization through data lifecycle management',
      ]}
      capabilities={[
        {
          title: 'Storage Tiering',
          description: 'Hot NVMe, warm SSD, cold object storage optimization',
          iconKey: 'storage',
        },
        {
          title: 'Caching Strategies',
          description: 'Redis, Memcached, and CDN integration',
          iconKey: 'zap',
        },
        {
          title: 'Indexing Optimization',
          description: 'Elasticsearch, database indexes, and search optimization',
          iconKey: 'network',
        },
        {
          title: 'Analytics Pipelines',
          description: 'Spark, Flink, Kafka for data processing',
          iconKey: 'code',
        },
        {
          title: 'Performance Tuning',
          description: 'I/O optimization and query performance',
          iconKey: 'server',
        },
        {
          title: 'Cost Management',
          description: 'Optimize storage and compute costs',
          iconKey: 'database',
        },
      ]}
      architectureDiagram={{
        type: 'reactflow',
        preset: 'data-optimization',
        title: 'Data Optimization Flow',
        description: 'Multi-tier storage architecture with intelligent data placement and analytics pipelines',
      }}
      benefits={[
        {
          title: 'Faster Data Access',
          description: 'Sub-millisecond access for hot datasets via NVMe + cache',
        },
        {
          title: 'Lower Storage Spend',
          description: '30-50% cost reduction with automated hot/warm/cold tiering',
        },
        {
          title: 'Petabyte Scale',
          description: 'Scale to PBs with predictable performance envelopes',
        },
        {
          title: 'Query Acceleration',
          description: '10-40% faster queries via index tuning and pushdown',
        },
        {
          title: 'High Cache Hit Rates',
          description: '90%+ cache hit rate targets for repeat access patterns',
        },
        {
          title: 'Operational Efficiency',
          description: 'Automated lifecycle, backups, and policy enforcement',
        },
      ]}
      useCases={[
        {
          title: 'Analytics/Data Lakes',
          description: 'Tiered storage and indexing for large-scale analytics platforms',
          industry: 'Analytics',
        },
        {
          title: 'AI/ML Pipelines',
          description: 'Fast NVMe and cache layers for training and feature stores',
          industry: 'AI/ML',
        },
        {
          title: 'Real-time Analytics',
          description: 'Low-latency streaming and OLAP workloads',
          industry: 'E-commerce',
        },
        {
          title: 'Content & Media',
          description: 'Edge/CDN caching and origin offload for media delivery',
          industry: 'Media',
        },
      ]}
      technicalSpecs={{
        title: 'Service Specifications',
        items: [
          {
            category: 'Storage Tiers',
            details: [
              'Hot: NVMe SSDs, < 100μs latency',
              'Warm: SATA SSDs, < 1ms latency',
              'Cold: Object storage, < 100ms latency',
            ],
          },
          {
            category: 'Caching',
            details: [
              'Redis for application caching',
              'Memcached for distributed caching',
              'CDN for edge caching',
            ],
          },
          {
            category: 'Indexing',
            details: [
              'Elasticsearch/OpenSearch',
              'Database indexes (B-tree, columnar)',
              'Search optimization',
            ],
          },
          {
            category: 'Analytics',
            details: [
              'Apache Spark for batch processing',
              'Apache Flink for stream processing',
              'Kafka for event streaming',
            ],
          },
        ],
      }}
      configExamples={[
        {
          title: 'Storage Tiering Policy',
          type: 'terraform',
          description: 'Automated data tiering configuration',
          code: `resource "aws_s3_bucket_lifecycle_configuration" "data_tiering" {
  bucket = aws_s3_bucket.data.id
  
  rule {
    id     = "hot-to-warm"
    status = "Enabled"
    
    transition {
      days          = 30
      storage_class = "STANDARD_IA"
    }
  }
  
  rule {
    id     = "warm-to-cold"
    status = "Enabled"
    
    transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }
}`,
        },
        {
          title: 'Redis Cache Configuration',
          type: 'kubernetes',
          description: 'Redis deployment for caching',
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis-cache
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"`,
        },
      ]}
      kpis={[
        {
          metric: 'Cache Hit Rate',
          value: '> 90%',
          description: 'Application cache efficiency',
        },
        {
          metric: 'Query Latency',
          value: '< 10ms',
          description: 'P95 query response time',
        },
        {
          metric: 'Cost per TB',
          value: '< $20',
          description: 'Storage cost optimization',
        },
        {
          metric: 'Data Access Speed',
          value: '10x faster',
          description: 'Compared to baseline',
        },
      ]}
      resources={[
        {
          title: 'Data Optimization Specifications',
          type: 'documentation',
          href: '/content/services/data-optimization/specs',
        },
        {
          title: 'Storage Tiering Best Practices',
          type: 'whitepaper',
          href: '/resources/whitepapers/storage-tiering',
        },
      ]}
      ragContextId="data-optimization"
      cta={{
        title: 'Optimize Your Data Infrastructure',
        description: 'Work with our data optimization experts to maximize performance and reduce costs.',
        primaryButton: {
          text: 'Schedule Consultation',
          href: '/contact',
        },
        secondaryButton: {
          text: 'View Specifications',
          href: '/content/services/data-optimization/specs',
        },
      }}
      customSections={<PartnersSection />}
    />
  )
}

