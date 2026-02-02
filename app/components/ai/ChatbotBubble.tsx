"use client"

import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatbotBubbleProps {
  className?: string
}

// Component to render message content with markdown links and bold text
function MessageContent({ content }: { content: string }) {
  // Parse markdown: links [text](href) and bold **text**
  // Note: Next.js Link component automatically handles basePath from next.config.js
  // So we should NOT manually prepend basePath to relative URLs
  const parts: React.ReactNode[] = []
  let remainingContent = content
  let key = 0

  // Process content in order: links first, then bold
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
        if (textBefore.trim()) {
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
        // Next.js Link automatically handles basePath, so pass href as-is for relative paths
        // Only handle external URLs differently
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
      if (remainingContent.trim()) {
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

export function ChatbotBubble({ className }: ChatbotBubbleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m PalC AI Assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [leadRequested, setLeadRequested] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [leadData, setLeadData] = useState({ email: '', phone: '' })
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages container when new messages arrive
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
        }
      })
    }
  }, [])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const userMessageCount = useMemo(
    () => messages.filter((m) => m.role === 'user').length,
    [messages]
  )

  const buildPrompt = (userText: string, history: Message[]) => {
    const context = `You are PalC Networks AI assistant. Be concise, friendly, and specific to PalC Networks offerings: SONiC-first networking, EVPN-VXLAN fabrics, data center modernization, AI fabrics, cloud & hybrid cloud, network observability, automation & tooling (Terraform/Ansible/CI/CD), protocol/system development, and professional/managed services. Offer to connect them to the team.`
    const previous = history
      .slice(-5)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n')
    return `${context}\nRecent chat:\n${previous}\nUser: ${userText}\nAssistant:`
  }

  const handleSend = async () => {
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
      // If we're waiting for lead info, detect email/phone and confirm without calling API
      if (leadRequested && !leadCaptured) {
        const emailMatch = input.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
        const phoneMatch = input.match(/(\+?\d[\d\-\s]{6,}\d)/)
        if (emailMatch) {
          setLeadData({ email: emailMatch[0], phone: phoneMatch?.[0] || '' })
          setLeadCaptured(true)
          // Fire-and-forget lead capture - use dynamic basePath from next.config.js
          const leadBasePath = (typeof window !== 'undefined' && (window as any).__NEXT_DATA__?.basePath !== undefined) 
            ? (window as any).__NEXT_DATA__.basePath 
            : (process.env.NEXT_PUBLIC_BASE_PATH || '')
          fetch(`${leadBasePath}/api/lead`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: emailMatch[0],
              phone: phoneMatch?.[0],
              source: 'chatbot',
            }),
                  }).catch((err) => {
                    if (process.env.NODE_ENV === 'development') {
                      // eslint-disable-next-line no-console
                      console.error('Lead capture from chat failed:', err)
                    }
                  })
          setMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 2).toString(),
              role: 'assistant',
              content: `Thanks! We captured ${emailMatch[0]}${phoneMatch ? ` and ${phoneMatch[0]}` : ''}. Our team will reach out with next steps.`,
              timestamp: new Date()
            }
          ])
          return
        }
      }

      // Get basePath for API calls - reads from next.config.js
      const getBasePath = () => {
        if (typeof window !== 'undefined') {
          // Try Next.js __NEXT_DATA__ first
          const nextData = (window as any).__NEXT_DATA__
          if (nextData?.basePath !== undefined) {
            return nextData.basePath
          }
        }
        // Fallback to environment variable from next.config.js
        return process.env.NEXT_PUBLIC_BASE_PATH || ''
      }

      const basePath = getBasePath()
      const response = await fetch(`${basePath}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(({ role, content }) => ({ role, content })),
          prompt: buildPrompt(input, messages),
        }),
      })

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`
        let fallbackContent: string | undefined
        try {
          const errorData = await response.json()
          errorMessage = errorData?.error || errorData?.message || errorMessage
          // If API provides a fallback message, use it
          fallbackContent = errorData?.message || errorData?.answer || errorData?.text
        } catch (parseError) {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }
        
        // If we have fallback content, show it instead of error
        if (fallbackContent) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fallbackContent,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, assistantMessage])
          return
        }
        
        throw new Error(errorMessage)
      }

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Failed to parse JSON response:', parseError)
        }
        throw new Error('Invalid response from server')
      }
      
      // Check if response has an error but also has a fallback message
      if (data.error) {
        // If there's a fallback message, use it instead of throwing error
        const fallbackContent = data?.message || data?.answer || data?.text
        if (fallbackContent && typeof fallbackContent === 'string') {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fallbackContent,
            timestamp: new Date()
          }
          setMessages(prev => [...prev, assistantMessage])
          return
        }
        throw new Error(data.error)
      }

      // Ensure we have valid content
      const content = data?.message || data?.answer || data?.text
      if (!content || typeof content !== 'string') {
        throw new Error('Invalid response format')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: content,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Chat error:', error)
        }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      
      // Provide a helpful fallback message based on the query
      let fallbackMessage = 'Sorry, I encountered an error. Please try again.'
      
      if (errorMessage.includes('status')) {
        fallbackMessage = 'Sorry, I had trouble connecting to the server. Please check your connection and try again.'
      } else if (errorMessage.includes('JSON') || errorMessage.includes('parse')) {
        fallbackMessage = 'Sorry, I received an invalid response. Please try again.'
      } else if (errorMessage.includes('Invalid response')) {
        fallbackMessage = 'Sorry, I received an unexpected response format. Please try rephrasing your question.'
      }
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: fallbackMessage,
          timestamp: new Date()
        }
      ])
    } finally {
      setIsLoading(false)
      if (!leadCaptured && !leadRequested && userMessageCount + 1 >= 5) {
        setLeadRequested(true)
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 4).toString(),
            role: 'assistant',
            content: 'Happy to keep helping. If you want a tailored follow-up, share your work email (and optional phone).',
            timestamp: new Date()
          }
        ])
      }
    }
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-primary rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow",
          className
        )}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-soft">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">PalC AI Assistant</h3>
                    <p className="text-xs text-gray-600">Powered by RAG</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2",
                        message.role === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      )}
                    >
                      <MessageContent content={message.content} />
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-gray-600">U</span>
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    </div>
                  </div>
                )}
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

