"use client"

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  MessageCircle, 
  Send, 
  Loader2, 
  Sparkles,
  X,
  ChevronRight,
  ExternalLink,
  FileText
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

// Component to render message content with markdown links and bold text
function MessageContent({ content }: { content: string }) {
  const parts: React.ReactNode[] = []
  let remainingContent = content
  let key = 0

  // Process content: links [text](href) and bold **text**
  while (remainingContent.length > 0) {
    // Find next link
    const linkMatch = remainingContent.match(/\[([^\]]+)\]\(([^)]+)\)/)
    // Find next bold
    const boldMatch = remainingContent.match(/\*\*([^*]+)\*\*/)
    
    // Determine which comes first
    let nextMatch: { type: 'link' | 'bold'; index: number; match: RegExpMatchArray } | null = null
    
    if (linkMatch && boldMatch) {
      if (linkMatch.index! < boldMatch.index!) {
        nextMatch = { type: 'link', index: linkMatch.index!, match: linkMatch }
      } else {
        nextMatch = { type: 'bold', index: boldMatch.index!, match: boldMatch }
      }
    } else if (linkMatch) {
      nextMatch = { type: 'link', index: linkMatch.index!, match: linkMatch }
    } else if (boldMatch) {
      nextMatch = { type: 'bold', index: boldMatch.index!, match: boldMatch }
    }

    if (nextMatch) {
      // Add text before the match
      if (nextMatch.index! > 0) {
        const textBefore = remainingContent.substring(0, nextMatch.index!)
        if (textBefore.length > 0) {
          parts.push(
            <span key={`text-${key++}`} className="whitespace-pre-wrap">
              {textBefore}
            </span>
          )
        }
      }

      // Add the matched element
      if (nextMatch.type === 'link') {
        const linkText = nextMatch.match[1]
        const linkHref = nextMatch.match[2]
        const isExternal = linkHref.startsWith('http')
        parts.push(
          <Link
            key={`link-${key++}`}
            href={linkHref}
            className="text-primary font-semibold underline hover:text-primary-dark transition-colors inline"
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          >
            {linkText}
          </Link>
        )
      } else {
        // Bold text
        parts.push(
          <strong key={`bold-${key++}`} className="font-semibold">
            {nextMatch.match[1]}
          </strong>
        )
      }

      // Update remaining content
      remainingContent = remainingContent.substring(nextMatch.index! + nextMatch.match[0].length)
    } else {
      // No more matches, add remaining text
      if (remainingContent.length > 0) {
        parts.push(
          <span key={`text-${key++}`} className="whitespace-pre-wrap">
            {remainingContent}
          </span>
        )
      }
      break
    }
  }

  // If no markdown found, render as plain text
  if (parts.length === 0) {
    return <p className="text-sm whitespace-pre-wrap">{content}</p>
  }

  return <div className="text-sm leading-relaxed">{parts}</div>
}

interface RAGWidgetProps {
  contextId: string
  className?: string
  customPrompts?: SuggestedPrompt[]
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: Array<{
    title: string
    href: string
    excerpt: string
  }>
  timestamp: Date
  type?: 'answer' | 'lead'
}

interface SuggestedPrompt {
  text: string
  category: string
}

// Default suggested prompts (general)
const defaultSuggestedPrompts: SuggestedPrompt[] = [
  { text: 'What is SONiC and how does PalC implement it?', category: 'SONiC' },
  { text: 'How does PalC help with AI fabric architecture design?', category: 'AI Fabrics' },
  { text: 'What are the benefits of EVPN-VXLAN in data centers?', category: 'Networking' },
  { text: 'How does PalC optimize RoCE and buffer tuning?', category: 'Performance' },
  { text: 'What cloud infrastructure services does PalC offer?', category: 'Cloud' },
  { text: 'How does PalC support data center modernization?', category: 'Modernization' },
  { text: 'What network automation solutions are available?', category: 'Automation' },
  { text: 'How does PalC handle network security and compliance?', category: 'Security' },
]

// Solution-specific suggested prompts
const solutionsPagePrompts: SuggestedPrompt[] = [
  { text: 'What solutions does PalC offer for data center modernization?', category: 'Data Center' },
  { text: 'How can SONiC and open networking reduce infrastructure costs?', category: 'Open Networking' },
  { text: 'What is included in PalC\'s AI fabric solutions?', category: 'AI Fabrics' },
  { text: 'How does network observability improve operations?', category: 'Observability' },
  { text: 'What telecom and edge solutions are available?', category: 'Telecom' },
  { text: 'How does PalC help with cloud and hybrid cloud transformation?', category: 'Cloud' },
  { text: 'What identity and access management solutions are offered?', category: 'Security' },
  { text: 'How can I get started with PalC solutions?', category: 'Getting Started' },
]

// Helper function to get basePath dynamically (set in next.config.js)
function getBasePath(): string {
  // Client-side: Try Next.js __NEXT_DATA__ first (most reliable)
  if (typeof window !== 'undefined') {
    try {
      const nextData = (window as any).__NEXT_DATA__
      if (nextData?.basePath !== undefined) {
        return String(nextData.basePath).trim()
      }
    } catch (e) {
      // Ignore errors
    }
  }
  
  // Server-side or fallback: Use environment variable from next.config.js
  return (process.env.NEXT_PUBLIC_BASE_PATH || '').trim()
}

export function RAGWidget({ contextId, className, customPrompts }: RAGWidgetProps) {
  // Determine which prompts to use based on contextId or customPrompts
  const getSuggestedPrompts = (): SuggestedPrompt[] => {
    if (customPrompts && customPrompts.length > 0) {
      return customPrompts
    }
    
    // Check if we're on the solutions page
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      if (pathname.includes('/solutions') || contextId === 'solutions') {
        return solutionsPagePrompts
      }
    }
    
    // Default prompts
    return defaultSuggestedPrompts
  }
  
  const suggestedPrompts = getSuggestedPrompts()
  
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [relatedDocs, setRelatedDocs] = useState<Array<{
    title: string
    href: string
    excerpt: string
    relevance: number
  }>>([])
  const [leadRequested, setLeadRequested] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [leadData, setLeadData] = useState({ email: '', phone: '' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputSectionRef = useRef<HTMLDivElement>(null)
  const lastAssistantMessageRef = useRef<HTMLDivElement>(null)
  const previousMessagesLength = useRef(0)

  // Scroll to start of assistant message when new answer arrives
  const scrollToAnswerStart = useCallback(() => {
    if (lastAssistantMessageRef.current && messagesContainerRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (lastAssistantMessageRef.current && messagesContainerRef.current) {
          const messageRect = lastAssistantMessageRef.current.getBoundingClientRect()
          const containerRect = messagesContainerRef.current.getBoundingClientRect()
          const scrollTop = messagesContainerRef.current.scrollTop
          const relativeTop = messageRect.top - containerRect.top + scrollTop
          
          // Scroll to the start of the answer message
          messagesContainerRef.current.scrollTo({
            top: relativeTop - 20, // 20px offset from top
            behavior: 'smooth'
          })
        }
      })
    }
  }, [])

  // Scroll to answer start when new assistant message is added
  useEffect(() => {
    const currentMessagesLength = messages.length
    const lastMessage = messages[messages.length - 1]
    
    // Check if a new assistant message was added (and loading is complete)
    if (
      currentMessagesLength > previousMessagesLength.current &&
      lastMessage &&
      lastMessage.role === 'assistant'
    ) {
      // Wait for loading to complete, then scroll to answer start
      if (!isLoading) {
        // Small delay to ensure DOM has fully rendered the new message
        const scrollTimeout = setTimeout(() => {
          scrollToAnswerStart()
        }, 200)
        
        return () => clearTimeout(scrollTimeout)
      }
    }
    
    previousMessagesLength.current = currentMessagesLength
  }, [messages, isLoading, scrollToAnswerStart])

  // Scroll to input section when widget opens
  useEffect(() => {
    if (isOpen && inputSectionRef.current) {
      // Wait for animation to complete, then scroll
      const scrollTimeout = setTimeout(() => {
        if (inputSectionRef.current) {
          // Get the position of the input section
          const inputRect = inputSectionRef.current.getBoundingClientRect()
          const scrollY = window.scrollY + inputRect.top - 100 // 100px offset from top
          
          // Smooth scroll to the input section
          window.scrollTo({
            top: scrollY,
            behavior: 'smooth'
          })
          
          // Also focus the input for better UX
          const input = inputSectionRef.current.querySelector('input') as HTMLInputElement
          if (input) {
            setTimeout(() => {
              input.focus()
            }, 400)
          }
        }
      }, 300) // Wait for animation to start
      
      return () => clearTimeout(scrollTimeout)
    }
  }, [isOpen])

  const handleSend = useCallback(async () => {
    const basePath = getBasePath()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Inline lead capture
      if (leadRequested && !leadCaptured) {
        const emailMatch = input.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
        const phoneMatch = input.match(/(\+?\d[\d\-\s]{6,}\d)/)
        if (emailMatch) {
          const email = emailMatch[0]
          const phone = phoneMatch?.[0] || ''
          setLeadCaptured(true)
          setLeadData({ email, phone })
                  fetch(`${basePath}/api/lead`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, phone, source: `rag:${contextId}` }),
                  }).catch((err) => {
                    if (process.env.NODE_ENV === 'development') {
                      // eslint-disable-next-line no-console
                      console.error('Lead capture from technical assistant failed:', err)
                    }
                  })
          setMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              content: `Thanks! We captured ${email}${phone ? ` and ${phone}` : ''}. Our team will reach out with next steps.`,
              timestamp: new Date(),
              type: 'lead'
            }
          ])
          setIsLoading(false)
          return
        }
      }

      // Ensure basePath is properly formatted (no trailing spaces, proper slashes)
      const cleanBasePath = basePath.trim().replace(/\/+$/, '') // Remove trailing slashes
      const apiUrl = `${cleanBasePath}/api/rag`.replace(/\/+/g, '/') // Normalize multiple slashes
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[RAGWidget] API URL:', apiUrl)
        console.log('[RAGWidget] Query:', input)
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input,
          contextId,
          filters: {}
        })
      })

      // Check if response is OK before parsing
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        console.error('[RAGWidget] API error:', response.status, response.statusText)
        console.error('[RAGWidget] Error response:', errorText.substring(0, 200))
        throw new Error(`RAG API error: ${response.status} ${response.statusText}`)
      }
      
      // Check content type to ensure it's JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('[RAGWidget] Non-JSON response received. Content-Type:', contentType)
        console.error('[RAGWidget] Response preview:', text.substring(0, 200))
        throw new Error('RAG API returned non-JSON response. Check API URL and server configuration.')
      }
      
      let data
      try {
        data = await response.json()
        // Log response for debugging
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[RAGWidget] RAG API response:', { 
            ok: response.ok, 
            status: response.status,
            hasAnswer: !!data?.answer,
            hasError: !!data?.error,
            dataKeys: data ? Object.keys(data) : []
          })
        }
      } catch (parseError) {
        console.error('[RAGWidget] Failed to parse RAG response:', parseError)
        // Try to get the response text for debugging
        try {
          const text = await response.clone().text()
          console.error('[RAGWidget] Response text:', text.substring(0, 500))
        } catch (e) {
          // Ignore
        }
        // Provide a helpful fallback answer
        const fallbackAnswer = `PalC Networks provides comprehensive enterprise network solutions and services. Here's how we can help:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallbackAnswer,
          sources: [
            {
              title: 'Solutions Overview',
              href: '/solutions',
              excerpt: 'Explore all PalC solutions and services.'
            }
          ],
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
        return
      }

      // Check if response has an error
      if (!response.ok) {
        // If we have a fallback answer in the error response, use it
        if (data && data.answer) {
          // Continue with the fallback answer
        } else {
          // No fallback answer, provide a generic one
          const fallbackAnswer = `I apologize for the technical issue. PalC Networks provides comprehensive enterprise network solutions:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`
          
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fallbackAnswer,
            sources: data?.sources || [],
            timestamp: new Date()
          }
          setMessages(prev => [...prev, assistantMessage])
          return
        }
      }

              // Ensure we have a valid data object
              if (!data || typeof data !== 'object') {
                if (process.env.NODE_ENV === 'development') {
                  // eslint-disable-next-line no-console
                  console.error('Invalid response format - data is not an object:', data)
                }
        const fallbackAnswer = `PalC Networks provides comprehensive enterprise network solutions and services. Here's how we can help:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: fallbackAnswer,
          sources: [],
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
        return
      }

      // Get answer from response - check multiple possible fields
      let enhancedAnswer = data.answer || data.message || data.text || ''
      
              // If response has an error but also has a fallback answer, use it
              if (data.error && enhancedAnswer) {
                // Use the fallback answer - continue processing
                if (process.env.NODE_ENV === 'development') {
                  // eslint-disable-next-line no-console
                  console.log('Using fallback answer from error response')
                }
              } else if (data.error && !enhancedAnswer) {
                // Error without fallback answer - provide one
                if (process.env.NODE_ENV === 'development') {
                  // eslint-disable-next-line no-console
                  console.log('Error response without answer, providing fallback')
                }
        enhancedAnswer = `I apologize for the technical issue. PalC Networks provides comprehensive enterprise network solutions:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`
      }
      
      // Ensure we always have a valid answer string
      if (!enhancedAnswer || typeof enhancedAnswer !== 'string' || enhancedAnswer.trim().length === 0) {
                  if (process.env.NODE_ENV === 'development') {
                    // eslint-disable-next-line no-console
                    console.log('No valid answer found, using fallback')
                  }
        enhancedAnswer = `PalC Networks provides comprehensive enterprise network solutions and services. Based on your question about "${input}", here's how we can help:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`
      }
      
      // Add contextual follow-ups based on question type
      const queryLower = input.toLowerCase()
      if (queryLower.includes('sonic') || queryLower.includes('open networking')) {
        enhancedAnswer += '\n\n💡 **PalC specializes in SONiC-based solutions.** We provide custom SONiC configurations, deployment services, and ongoing support for enterprise data centers. Would you like to know more about our SONiC implementation services?'
      } else if (queryLower.includes('ai fabric') || queryLower.includes('ai') || queryLower.includes('machine learning')) {
        enhancedAnswer += '\n\n🚀 **PalC designs and deploys AI-ready network fabrics** optimized for high-performance computing and ML workloads. Our solutions include RoCE optimization, buffer tuning, and low-latency architectures. Interested in learning about our AI fabric solutions?'
      } else if (queryLower.includes('cloud') || queryLower.includes('hybrid')) {
        enhancedAnswer += '\n\n☁️ **PalC offers comprehensive cloud infrastructure services** including hybrid cloud design, multi-cloud connectivity, and cloud-native networking. We help organizations modernize their infrastructure for cloud-first strategies.'
      } else if (queryLower.includes('evpn') || queryLower.includes('vxlan') || queryLower.includes('overlay')) {
        enhancedAnswer += '\n\n🔗 **EVPN-VXLAN is a core technology** in modern data center networks. PalC provides end-to-end EVPN-VXLAN design, implementation, and optimization services for scalable, multi-tenant environments.'
      } else if (queryLower.includes('security') || queryLower.includes('compliance')) {
        enhancedAnswer += '\n\n🔒 **Network security is fundamental** to PalC\'s solutions. We implement zero-trust architectures, micro-segmentation, and compliance frameworks to protect your infrastructure.'
      } else if (queryLower.includes('automation') || queryLower.includes('iac') || queryLower.includes('infrastructure as code')) {
        enhancedAnswer += '\n\n⚙️ **PalC leverages Infrastructure as Code (IaC)** and automation tools to streamline network deployment and management. We provide templates, playbooks, and CI/CD pipelines for network automation.'
      }

      // Ensure sources is always an array
      const sources = Array.isArray(data.sources) ? data.sources : []
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: enhancedAnswer,
        sources: sources,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      
      if (data.related && Array.isArray(data.related) && data.related.length > 0) {
        setRelatedDocs(data.related)
      }
            } catch (error) {
              if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.error('RAG error:', error)
              }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      // Always provide a helpful fallback with useful information instead of generic error
      const fallbackContent = `I apologize for the technical issue. PalC Networks provides comprehensive enterprise network solutions:

**Our Core Offerings:**

• **SONiC & Open Networking**: Disaggregated infrastructure with open-source NOS
• **Data Center Modernization**: AI-ready fabrics and high-performance networking
• **Cloud & Hybrid Cloud**: Multi-cloud infrastructure and automation
• **Network Observability**: Complete visibility with telemetry and analytics
• **Automation & Tooling**: Infrastructure as Code and CI/CD pipelines

**Based on your question**, here's how we can help:

• **SONiC Implementation**: We provide end-to-end SONiC deployment services, including architecture design, configuration, optimization, and ongoing support
• **AI Fabrics**: We design and deploy high-performance network fabrics optimized for GPU clusters and ML workloads
• **Data Center Modernization**: We help organizations migrate from proprietary systems to open, scalable infrastructure

For more specific information, please visit our [Solutions](/solutions) page or [Contact Us](/contact) for a detailed consultation.`
      
      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackContent,
        sources: [
          {
            title: 'Solutions Overview',
            href: '/solutions',
            excerpt: 'Explore all PalC solutions and services.'
          },
          {
            title: 'SONiC & Open Networking',
            href: '/solutions/sonic-open-networking',
            excerpt: 'Comprehensive SONiC deployment and configuration services.'
          }
        ],
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessageObj])
    } finally {
      setIsLoading(false)
      if (!leadCaptured && !leadRequested && messages.filter(m => m.role === 'user').length + 1 >= 4) {
        setLeadRequested(true)
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 3).toString(),
            role: 'assistant',
            content: 'If you want a tailored follow-up, share your work email (and optional phone).',
            timestamp: new Date(),
            type: 'lead'
          }
        ])
      }
    }
  }, [input, isLoading, contextId, messages, leadCaptured, leadRequested])

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt)
    setIsOpen(true)
    // Scroll to input will be handled by the useEffect when isOpen changes
  }

  return (
    <div className={cn("w-full max-w-full overflow-hidden", className)}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI-Powered Technical Assistant
        </div>
        <h2 className="heading-2 mb-4">Ask PalC AI</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get instant answers about PalC&apos;s solutions, SONiC networking, AI fabrics, cloud infrastructure, and technical specifications powered by our AI assistant.
        </p>
      </div>

      {/* Suggested Prompts */}
      <div className="mb-8 w-full overflow-hidden">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggested Questions:</h3>
        <div className="flex flex-wrap gap-2 w-full">
          {suggestedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedPrompt(prompt.text)}
              type="button"
              className="text-xs sm:text-sm whitespace-normal break-words text-left h-auto min-h-[2.5rem] py-2 px-2 sm:px-3 rounded-md border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white transition-all duration-200 font-semibold"
              style={{ 
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
                whiteSpace: 'normal',
                flex: '1 1 auto',
                minWidth: 'min-content',
                maxWidth: '100%'
              }}
            >
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <Card className="border-2 w-full max-w-full overflow-hidden">
        <CardHeader 
          className="bg-gradient-soft border-b cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Technical Assistant</CardTitle>
                <p className="text-xs text-gray-600">Context: {contextId}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(!isOpen)
              }}
              className="flex-shrink-0"
            >
              {isOpen ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="p-0">
                {/* Messages */}
                <div 
                  ref={messagesContainerRef}
                  className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 overscroll-contain w-full max-w-full overflow-x-hidden"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <MessageCircle className="w-12 h-12 text-gray-300 mb-4" />
                      <p className="text-gray-500 mb-2">Start a conversation</p>
                      <p className="text-sm text-gray-400">
                        Ask questions about PalC&apos;s solutions, SONiC, AI fabrics, cloud infrastructure, or technical specifications
                      </p>
                    </div>
                  ) : (
                    messages.map((message, index) => {
                      const isLastAssistantMessage = 
                        message.role === 'assistant' && 
                        index === messages.length - 1
                      
                      return (
                      <div
                        key={message.id}
                        ref={isLastAssistantMessage ? lastAssistantMessageRef : null}
                        className={cn(
                          "flex gap-3",
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[80%] sm:max-w-[80%] rounded-2xl px-4 py-3 break-words overflow-wrap-anywhere",
                            message.role === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-white border border-gray-200 text-gray-900'
                          )}
                          style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                        >
                          <div className={cn("mb-2", message.type === 'lead' && 'text-primary')}>
                            <MessageContent content={message.content} />
                          </div>
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-xs font-semibold text-gray-600 mb-2">Sources:</p>
                              <div className="space-y-1">
                                {message.sources.map((source, idx) => {
                                  const isExternal = source.href.startsWith('http')
                                  return (
                                    <Link
                                      key={idx}
                                      href={source.href}
                                      target={isExternal ? '_blank' : undefined}
                                      rel={isExternal ? 'noopener noreferrer' : undefined}
                                      className="flex items-start gap-2 text-xs text-primary hover:underline"
                                    >
                                      <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p className="font-medium">{source.title}</p>
                                        <p className="text-gray-500 line-clamp-1">{source.excerpt}</p>
                                      </div>
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-gray-600">U</span>
                          </div>
                        )}
                      </div>
                      )
                    })
                  )}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                      </div>
                    </div>
                  )}
                  {/* Invisible element to scroll to */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div 
                  ref={inputSectionRef}
                  className="p-4 border-t border-gray-200 bg-white w-full max-w-full overflow-hidden"
                >
                  <div className="flex items-center gap-2 w-full max-w-full min-w-0">
                    <Input
                      type="text"
                      placeholder="Ask about PalC solutions, SONiC, AI fabrics, cloud infrastructure, or technical specs..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      className="flex-1 min-w-0"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      size="icon"
                      className="flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Related Documents */}
      {relatedDocs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Related Documents:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedDocs.map((doc, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {Math.round(doc.relevance * 100)}% relevant
                    </Badge>
                    <FileText className="w-4 h-4 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">{doc.title}</h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">{doc.excerpt}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link 
                      href={doc.href} 
                      target={doc.href.startsWith('http') ? '_blank' : undefined}
                      rel={doc.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      View Document
                      <ChevronRight className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

