import { Metadata } from 'next'
import { ContactContent } from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with PalC Networks. Contact our team for enterprise network solutions, cloud services, and technology consulting.',
  openGraph: {
    title: 'Contact Us | PalC Networks',
    description: 'Contact our team for enterprise technology solutions.',
  },
}

export default function ContactPage() {
  return <ContactContent />
}

