import { Metadata } from 'next'
import { ProductsContent } from './ProductsContent'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our comprehensive product portfolio including switches, servers, NICs/DPUs, transceivers, cables, and software tools.',
  openGraph: {
    title: 'Products | PalC Networks',
    description: 'Hardware and software products for enterprise networking.',
  },
}

export default function ProductsPage() {
  return <ProductsContent />
}

