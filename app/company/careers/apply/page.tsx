import { Metadata } from 'next'
import { ApplyContent } from '@/app/careers/apply/ApplyContent'

export const metadata: Metadata = {
  title: 'Apply for Position',
  description: 'Submit your application to join the PalC Networks team.',
}

export default function ApplyPage() {
  return <ApplyContent />
}

