import { Metadata } from 'next'
import { BlogContent } from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest insights, news, and articles from PalC Networks on enterprise networking, cloud solutions, and technology trends.',
  openGraph: {
    title: 'Blog | PalC Networks',
    description: 'Latest insights and articles on enterprise technology.',
  },
}

export default function BlogPage() {
  return <BlogContent />
}
