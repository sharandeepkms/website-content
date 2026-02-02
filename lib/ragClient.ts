/**
 * RAG Client Library
 * 
 * Client-side utilities for interacting with the RAG API
 */

export interface RAGQuery {
  query: string
  contextId?: string
  filters?: Record<string, string | number | boolean | string[]>
  maxResults?: number
}

export interface RAGResponse {
  answer: string
  sources: Array<{
    title: string
    href: string
    excerpt: string
    score?: number
  }>
  related?: Array<{
    title: string
    href: string
    excerpt: string
    relevance: number
  }>
  metadata?: {
    queryTime?: number
    totalResults?: number
  }
}

export interface EmbeddingResponse {
  embedding: number[]
  model: string
}

/**
 * Query the RAG engine
 */
export async function queryRAG(params: RAGQuery): Promise<RAGResponse> {
  try {
    const response = await fetch('/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error(`RAG query failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('RAG query error:', error)
    throw error
  }
}

/**
 * Generate embeddings for text
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResponse> {
  try {
    const response = await fetch('/api/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error(`Embedding generation failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Embedding generation error:', error)
    throw error
  }
}

/**
 * Upsert document to vector store
 */
export async function upsertDocument(
  document: {
    id: string
    content: string
    metadata: {
      title: string
      href: string
      contextId?: string
      type?: string
      tags?: string[]
    }
  }
): Promise<{ success: boolean; id: string }> {
  try {
    const response = await fetch('/api/vector-upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(document),
    })

    if (!response.ok) {
      throw new Error(`Vector upsert failed: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Vector upsert error:', error)
    throw error
  }
}

