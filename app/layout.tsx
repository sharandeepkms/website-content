import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Toaster } from './components/ui/toaster'
import { ErrorBoundary } from './components/ErrorBoundary'
import { WebVitals } from './components/analytics/WebVitals'
import { ChunkErrorHandler } from './components/ChunkErrorHandler'
import NextTopLoader from 'nextjs-toploader'
import dynamic from 'next/dynamic'

// Lazy load heavy components to improve initial page load
const ChatbotBubble = dynamic(() => import('./components/ai/ChatbotBubble').then(mod => ({ default: mod.ChatbotBubble })), {
  ssr: false,
  loading: () => null, // Don't show loading indicator for chatbot
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://palcnetworks.ai'),
  title: {
    default: 'PalC Networks | Enterprise Network Solutions & Cloud Services',
    template: '%s | PalC Networks'
  },
  description: 'PalC Networks delivers cutting-edge enterprise network solutions, cloud services, cybersecurity, and AI-ready infrastructure for global businesses. Transform your digital infrastructure with our expert team.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://palcnetworks.ai'}${process.env.NEXT_PUBLIC_BASE_PATH || ''}`,
  },
  keywords: [
    'network solutions',
    'cloud services',
    'cybersecurity',
    'enterprise IT',
    'AI infrastructure',
    'telecom solutions',
    'disaggregated networking',
    'network analytics',
    'digital transformation',
    'managed services',
  ],
  authors: [{ name: 'PalC Networks' }],
  creator: 'PalC Networks',
  publisher: 'PalC Networks',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://palcnetworks.ai',
    siteName: 'PalC Networks',
    title: 'PalC Networks | Enterprise Network Solutions & Cloud Services',
    description: 'Transform your digital infrastructure with PalC Networks - Leaders in enterprise networking, cloud solutions, and AI-ready infrastructure.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PalC Networks - Enterprise Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PalC Networks | Enterprise Network Solutions',
    description: 'Transform your digital infrastructure with PalC Networks',
    images: ['/og-image.png'],
    creator: '@palcnetworks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/site.webmanifest',
}

// JSON-LD Schema for Organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PalC Networks',
  url: 'https://palcnetworks.ai',
  logo: 'https://palcnetworks.ai/images/logo/palc-logo-black.svg',
  description: 'Enterprise network solutions, cloud services, and AI-ready infrastructure provider.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Unit 8, 5th Floor, Navigator Building, ITPB, Whitefield',
    addressLocality: 'Bangalore',
    addressRegion: 'KA',
    postalCode: '560066',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-80-40905088',
    contactType: 'customer support',
    availableLanguage: ['English'],
  },
  sameAs: [
    'https://linkedin.com/company/palcnetworks',
    'https://twitter.com/palcnetworks',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Early chunk error detection - runs before React loads */}
        {/* Disabled to prevent false positives causing multiple reloads */}
        {/* ChunkErrorHandler component handles this more reliably */}
      </head>
      <body className="min-h-screen bg-white font-sans antialiased overflow-x-hidden w-full">
        <NextTopLoader 
          color="#0041C2" 
          height={3} 
          showSpinner={false}
          initialPosition={0.3}
          crawlSpeed={200}
          speed={300}
          easing="ease-out"
          shadow="0 0 10px #0041C2,0 0 5px #0041C2"
        />
        <ErrorBoundary>
          <ChunkErrorHandler />
          <WebVitals />
          <div className="relative flex min-h-screen flex-col w-full" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Navbar />
            <main className="flex-1 w-full" role="main" style={{ maxWidth: '100%' }}>{children}</main>
            <Footer />
            <ChatbotBubble />
          </div>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}

