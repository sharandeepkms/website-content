import { Metadata } from 'next'
import { DashboardViewer } from './DashboardViewer'

export const metadata: Metadata = {
  title: 'Admin Dashboard | PalC Networks Admin',
  description: 'Admin dashboard with overview of emails, forms, and content',
}

export default function AdminDashboardPage() {
  return <DashboardViewer />
}

