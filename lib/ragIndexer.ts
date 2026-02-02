/**
 * RAG Indexer
 * 
 * Scans markdown files in /content directory and indexes them for RAG
 * 
 * Usage:
 *   - Run this script to index all content files
 *   - Can be run as a build step or scheduled job
 *   - Integrates with vector database (Pinecone, Supabase Vector, etc.)
 */

import fs from 'fs'
import path from 'path'
// TODO: Install gray-matter: npm install gray-matter
// import matter from 'gray-matter'
import { upsertDocument } from './ragClient'

interface FrontmatterData {
  title?: string
  category?: string
  tags?: string[]
  [key: string]: string | string[] | undefined
}

// Temporary matter parser until gray-matter is installed
function parseFrontmatter(content: string): { data: FrontmatterData; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (match) {
    const frontmatter: FrontmatterData = {}
    const frontmatterText = match[1]
    const body = match[2]
    
    // Simple YAML parsing (basic key-value pairs)
    frontmatterText.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim()
        const cleanValue = value.replace(/^["']|["']$/g, '')
        const trimmedKey = key.trim()
        
        // Handle array values (tags, etc.)
        if (trimmedKey === 'tags' && cleanValue.startsWith('[')) {
          frontmatter[trimmedKey] = cleanValue
            .replace(/[\[\]]/g, '')
            .split(',')
            .map(tag => tag.trim().replace(/^["']|["']$/g, ''))
        } else {
          frontmatter[trimmedKey] = cleanValue
        }
      }
    })
    
    return { data: frontmatter, content: body }
  }
  
  return { data: {}, content }
}

interface ContentFile {
  id: string
  content: string
  metadata: {
    title: string
    href: string
    contextId: string
    type: 'solution' | 'service' | 'tech' | 'documentation'
    tags: string[]
    category?: string
    lastModified: string
  }
}

/**
 * Extract context ID from file path
 */
function extractContextId(filePath: string): string {
  // Extract from path like: content/solutions/sonic-open-networking/overview.md
  const parts = filePath.split(path.sep)
  if (parts.includes('solutions')) {
    const solutionIndex = parts.indexOf('solutions')
    return parts[solutionIndex + 1] || 'unknown'
  }
  if (parts.includes('services')) {
    const serviceIndex = parts.indexOf('services')
    return parts[serviceIndex + 1] || 'unknown'
  }
  if (parts.includes('tech')) {
    return 'technical-docs'
  }
  return 'general'
}

/**
 * Determine content type from file path
 */
function getContentType(filePath: string): ContentFile['metadata']['type'] {
  if (filePath.includes('solutions')) return 'solution'
  if (filePath.includes('services')) return 'service'
  if (filePath.includes('tech')) return 'tech'
  return 'documentation'
}

/**
 * Generate href from file path
 */
function generateHref(filePath: string): string {
  // Convert content/solutions/sonic-open-networking/overview.md
  // to /solutions/sonic-open-networking
  const parts = filePath.split(path.sep)
  const contentIndex = parts.indexOf('content')
  if (contentIndex >= 0) {
    const pathParts = parts.slice(contentIndex + 1, -1) // Remove 'content' and filename
    return '/' + pathParts.join('/')
  }
  return '/'
}

/**
 * Extract tags from frontmatter or content
 */
function extractTags(frontmatter: FrontmatterData, content: string): string[] {
  const tags: string[] = []
  
  if (frontmatter.tags && Array.isArray(frontmatter.tags)) {
    tags.push(...frontmatter.tags)
  }
  
  // Extract common technical terms
  const technicalTerms = [
    'SONiC', 'EVPN', 'VXLAN', 'PFC', 'ECN', 'RoCE', 'NVMe-oF',
    'Kubernetes', 'Terraform', 'Ansible', 'BGP', 'RDMA'
  ]
  
  technicalTerms.forEach(term => {
    if (content.includes(term) && !tags.includes(term)) {
      tags.push(term)
    }
  })
  
  return tags
}

/**
 * Process a single markdown file
 */
async function processMarkdownFile(filePath: string): Promise<ContentFile | null> {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = parseFrontmatter(fileContent)
    
    const contextId = extractContextId(filePath)
    const contentType = getContentType(filePath)
    const href = generateHref(filePath)
    const tags = extractTags(frontmatter, content)
    
    const stats = fs.statSync(filePath)
    
    return {
      id: path.basename(filePath, '.md') + '-' + contextId,
      content: content.trim(),
      metadata: {
        title: frontmatter.title || path.basename(filePath, '.md'),
        href,
        contextId,
        type: contentType,
        tags,
        category: frontmatter.category,
        lastModified: stats.mtime.toISOString(),
      },
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
    return null
  }
}

/**
 * Recursively find all markdown files in directory
 */
function findMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        files.push(...findMarkdownFiles(fullPath))
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  
  return files
}

/**
 * Index all content files
 */
export async function indexAllContent(contentDir: string = 'content'): Promise<void> {
  const contentPath = path.join(process.cwd(), contentDir)
  
  if (!fs.existsSync(contentPath)) {
    console.warn(`Content directory not found: ${contentPath}`)
    return
  }
  
  console.log(`Indexing content from: ${contentPath}`)
  
  const markdownFiles = findMarkdownFiles(contentPath)
  console.log(`Found ${markdownFiles.length} markdown files`)
  
  let indexed = 0
  let failed = 0
  
  for (const filePath of markdownFiles) {
    const contentFile = await processMarkdownFile(filePath)
    
    if (contentFile) {
      try {
        await upsertDocument(contentFile)
        indexed++
        console.log(`✓ Indexed: ${contentFile.metadata.title}`)
      } catch (error) {
        failed++
        console.error(`✗ Failed to index: ${filePath}`, error)
      }
    } else {
      failed++
    }
  }
  
  console.log(`\nIndexing complete: ${indexed} succeeded, ${failed} failed`)
}

/**
 * Index a single file (for incremental updates)
 */
export async function indexFile(filePath: string): Promise<void> {
  const contentFile = await processMarkdownFile(filePath)
  
  if (contentFile) {
    try {
      await upsertDocument(contentFile)
      console.log(`✓ Indexed: ${contentFile.metadata.title}`)
    } catch (error) {
      console.error(`✗ Failed to index: ${filePath}`, error)
      throw error
    }
  } else {
    throw new Error(`Failed to process file: ${filePath}`)
  }
}

// Run indexing if called directly (Node.js environment check)
// This check is safe in Node.js runtime but not in browser/edge runtime
if (typeof require !== 'undefined' && require.main === module) {
  indexAllContent().catch(console.error)
}

