import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getRelatedCaseStudies } from '@/app/data/case-studies'
import { CaseStudyDetailContent } from './CaseStudyDetailContent'
import { getCanonicalUrl } from '@/app/utils/canonical'

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return {
      title: 'Case Study Not Found',
    }
  }

  const canonicalUrl = getCanonicalUrl(`/resources/case-studies/${slug}`)

  return {
    title: `${study.title} | PalC Networks`,
    description: study.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: study.title,
      description: study.summary,
      images: study.featuredImage ? [study.featuredImage] : [],
      type: 'article',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: study.title,
      description: study.summary,
      images: study.featuredImage ? [study.featuredImage] : [],
    },
  }
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  const relatedStudies = getRelatedCaseStudies(slug, 3)

  return <CaseStudyDetailContent study={study} relatedStudies={relatedStudies} />
}

