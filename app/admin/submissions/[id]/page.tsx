import { Metadata } from 'next'
import { SubmissionDetails } from './SubmissionDetails'

export const metadata: Metadata = {
  title: 'Submission Details | Admin Dashboard | PalC Networks',
  description: 'View detailed information about a form submission.',
}

export default function SubmissionDetailPage({ params }: { params: { id: string } }) {
  return <SubmissionDetails submissionId={params.id} />
}

