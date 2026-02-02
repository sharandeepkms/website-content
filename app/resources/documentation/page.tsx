import { Metadata } from 'next'
import { DocumentationContent } from './DocumentationContent'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Comprehensive documentation for PalC Networks products, solutions, and services.',
  openGraph: {
    title: 'Documentation | PalC Networks',
    description: 'Product and solution documentation.',
  },
}

export default function DocumentationPage() {
  return <DocumentationContent />
}
