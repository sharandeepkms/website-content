import { Metadata } from 'next'
import { SoftwareToolsContent } from './SoftwareToolsContent'

export const metadata: Metadata = {
  title: 'Software Tools',
  description: 'Network management and monitoring software tools including NetPro, Packet Broker, and Guardian for comprehensive network operations.',
  openGraph: {
    title: 'Software Tools | PalC Networks',
    description: 'Network management and monitoring software.',
  },
}

export default function SoftwareToolsPage() {
  return <SoftwareToolsContent />
}

