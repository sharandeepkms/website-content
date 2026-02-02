import { Metadata } from 'next'
import { IndustryAssociationsContent } from './IndustryAssociationsContent'

export const metadata: Metadata = {
  title: 'Industry Associations',
  description: 'PalC Networks is actively engaged with leading industry associations and open networking communities, contributing to the advancement of open-source technologies and standards.',
  openGraph: {
    title: 'Industry Associations | PalC Networks',
    description: 'Learn about our partnerships with TIP, OCP, Linux Foundation, IETF, IEEE, and ONF.',
  },
}

export default function IndustryAssociationsPage() {
  return <IndustryAssociationsContent />
}

