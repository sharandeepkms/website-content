import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'AI Pipelines',
  description: 'Build end-to-end AI pipelines for data ingestion, preprocessing, model training, and inference with automated workflows.',
  openGraph: {
    title: 'AI Pipeline Development Services | PalC Networks',
    description: 'Expert AI pipeline development and automation services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'AI Pipelines',
  tagline: 'Design and implement end-to-end AI pipelines for data processing, model training, and inference with automated workflows and MLOps practices.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'AI Pipelines' },
      ],
  overview: 'AI pipelines automate the entire machine learning lifecycle from data ingestion to model deployment. We help you build robust, scalable pipelines that handle data preprocessing, feature engineering, model training, validation, and deployment.',
  overviewDetails: [
    'Data Pipeline: ETL/ELT processes, data validation, feature engineering, and data versioning.',
    'Training Pipeline: Automated model training, hyperparameter tuning, experiment tracking, and model versioning.',
    'Validation Pipeline: Model evaluation, A/B testing, performance monitoring, and drift detection.',
    'Deployment Pipeline: Model packaging, containerization, CI/CD integration, and automated rollouts.',
    'Monitoring Pipeline: Model performance tracking, data drift detection, and automated retraining triggers.',
    'Orchestration: Workflow management with Airflow, Kubeflow, or MLflow for pipeline coordination.',
  ],
  capabilities: [
    'End-to-End Pipeline Design',
    'Data Processing & ETL',
    'Feature Engineering Automation',
    'Model Training Pipelines',
    'MLOps Pipeline Integration',
    'Pipeline Orchestration',
    'Data Versioning & Lineage',
    'Automated Model Retraining',
  ],
  benefits: [
    'Faster time to production',
    'Reproducible ML workflows',
    'Automated model updates',
    'Better model governance',
    'Reduced manual effort',
    'Improved model quality',
  ],
  useCases: [
    'Automated model training workflows',
    'Real-time inference pipelines',
    'Batch prediction systems',
    'Continuous learning systems',
    'Multi-model pipeline orchestration',
    'Data science platform integration',
  ],
  imagePlaceholder: 'AI Pipeline Architecture',
}

export default function AIPipelinesPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

