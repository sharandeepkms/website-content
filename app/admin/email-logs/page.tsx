import { Metadata } from 'next'
import { EmailLogsViewer } from './EmailLogsViewer'

export const metadata: Metadata = {
  title: 'Email Logs | PalC Networks Admin',
  description: 'View all email logs (success and failed)',
}

export default function EmailLogsPage() {
  return <EmailLogsViewer />
}

