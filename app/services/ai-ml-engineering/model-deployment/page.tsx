import { Metadata } from 'next'
import { DetailPageTemplate } from '@/app/components/DetailPageTemplate'
import { PartnersSection } from '@/app/components/PartnersSection'

export const metadata: Metadata = {
  title: 'Model Deployment',
  description: 'Deploy machine learning models to production with MLOps, containerization, and scalable inference infrastructure.',
  openGraph: {
    title: 'Model Deployment Services | PalC Networks',
    description: 'Expert ML model deployment and MLOps services.',
  },
}

const pageConfig = {
  pageType: 'service' as const,
  title: 'Model Deployment',
  tagline: 'Deploy machine learning models to production with MLOps practices, containerization, scalable inference, and automated monitoring.',
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Model Deployment' },
      ],
  overview: 'Model deployment is critical for bringing machine learning models into production. We help you deploy models with proper MLOps practices, ensuring scalability, reliability, and continuous monitoring.',
  overviewDetails: [
    'Model Packaging: Containerization with Docker, model serialization, and dependency management.',
    'Deployment Strategies: Blue-green, canary, A/B testing, and gradual rollouts for model updates.',
    'Inference Infrastructure: Real-time and batch inference, auto-scaling, load balancing, and caching.',
    'MLOps Integration: CI/CD for models, automated testing, versioning, and rollback capabilities.',
    'Monitoring & Observability: Model performance tracking, prediction monitoring, and drift detection.',
    'Serving Frameworks: TensorFlow Serving, TorchServe, Triton, or custom serving solutions.',
  ],
  capabilities: [
    'Production Model Deployment',
    'MLOps Pipeline Setup',
    'Model Serving Infrastructure',
    'Real-time Inference Systems',
    'Batch Prediction Systems',
    'Model Versioning & Management',
    'A/B Testing & Canary Deployments',
    'Model Performance Monitoring',
  ],
  benefits: [
    'Faster model deployment cycles',
    'Reduced deployment risk',
    'Better model performance tracking',
    'Automated model updates',
    'Scalable inference infrastructure',
    'Improved model reliability',
  ],
  useCases: [
    'Real-time prediction services',
    'Batch scoring systems',
    'Edge model deployment',
    'Multi-model serving platforms',
    'Large language model deployment',
    'Computer vision inference systems',
  ],
  imagePlaceholder: 'Model Deployment Architecture',
}

export default function ModelDeploymentPage() {
  return <DetailPageTemplate {...pageConfig} customSections={<PartnersSection />} />
}

