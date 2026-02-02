import { Metadata } from 'next'
import { SubmissionsViewer } from './SubmissionsViewer'

export const metadata: Metadata = {
  title: 'Form Submissions | Admin Dashboard | PalC Networks',
  description: 'View and manage all form submissions.',
}

export default function SubmissionsPage() {
  return <SubmissionsViewer />
}

