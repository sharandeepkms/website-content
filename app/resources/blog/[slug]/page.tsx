import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getRelatedPosts } from '@/app/data/blog'
import { BlogDetailContent } from './BlogDetailContent'
import { getCanonicalUrl } from '@/app/utils/canonical'

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

// ISR: Revalidate every 24 hours
export const revalidate = 86400

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const canonicalUrl = getCanonicalUrl(`/resources/blog/${slug}`)

  return {
    title: `${post.title} | PalC Networks Blog`,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  return <BlogDetailContent post={post} relatedPosts={relatedPosts} />
}

