import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getWhitepaperBySlug, getRelatedWhitepapers } from '@/app/data/whitepapers'
import { WhitepaperDetailContent } from './WhitepaperDetailContent'
import { getCanonicalUrl } from '@/app/utils/canonical'

interface WhitepaperPageProps {
  params: Promise<{ slug: string }>
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400

export async function generateMetadata({ params }: WhitepaperPageProps): Promise<Metadata> {
  const { slug } = await params
  const paper = getWhitepaperBySlug(slug)

  if (!paper) {
    return {
      title: 'Whitepaper Not Found',
    }
  }

  const canonicalUrl = getCanonicalUrl(`/resources/whitepapers/${slug}`)

  return {
    title: `${paper.title} | PalC Networks`,
    description: paper.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: paper.title,
      description: paper.summary,
      images: paper.cover ? [paper.cover] : [],
      type: 'article',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.title,
      description: paper.summary,
      images: paper.cover ? [paper.cover] : [],
    },
  }
}

export default async function WhitepaperDetailPage({ params }: WhitepaperPageProps) {
  const { slug } = await params
  const paper = getWhitepaperBySlug(slug)

  if (!paper) {
    notFound()
  }

  const relatedPapers = getRelatedWhitepapers(slug, 3)

  return <WhitepaperDetailContent paper={paper} relatedPapers={relatedPapers} />
}

