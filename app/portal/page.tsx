import { Metadata } from 'next'
import { PortalDashboard } from './PortalDashboard'

export const metadata: Metadata = {
  title: 'Partner Portal | PalC Networks',
  description: 'Access your partner resources, documentation, and support tools.',
}

export default function PortalPage() {
  return <PortalDashboard />
}

