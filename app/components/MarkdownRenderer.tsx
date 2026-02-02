"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Split content into blocks (paragraphs, headers, lists, tables, code blocks)
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const blocks: React.ReactNode[] = []
    const lines = text.split('\n')
    let currentBlock: string[] = []
    let inCodeBlock = false
    let codeBlockLanguage = ''
    let codeBlockContent: string[] = []
    let blockIndex = 0

    const processBlock = (blockLines: string[]) => {
      if (blockLines.length === 0) return null

      const blockText = blockLines.join('\n').trim()
      if (!blockText) return null

      // Headers
      if (blockText.startsWith('# ')) {
        return (
          <h1 key={blockIndex++} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
            {renderInlineMarkdown(blockText.replace(/^#\s+/, ''))}
          </h1>
        )
      }
      if (blockText.startsWith('## ')) {
        return (
          <h2 key={blockIndex++} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
            {renderInlineMarkdown(blockText.replace(/^##\s+/, ''))}
          </h2>
        )
      }
      if (blockText.startsWith('### ')) {
        return (
          <h3 key={blockIndex++} className="text-xl font-semibold text-gray-900 mt-4 mb-2">
            {renderInlineMarkdown(blockText.replace(/^###\s+/, ''))}
          </h3>
        )
      }

      // Code blocks
      if (blockText.startsWith('```')) {
        const match = blockText.match(/^```(\w+)?\n([\s\S]*?)```$/)
        if (match) {
          const language = match[1] || ''
          const code = match[2]
          return (
            <div key={blockIndex++} className="my-6">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {language && (
                  <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-mono">
                    {language}
                  </div>
                )}
                <pre className="p-4 overflow-x-auto">
                  <code className={`text-sm text-gray-100 font-mono ${language ? `language-${language}` : ''}`}>
                    {code}
                  </code>
                </pre>
              </div>
            </div>
          )
        }
      }

      // Tables
      if (blockText.includes('|') && blockText.split('\n').length > 1) {
        const tableLines = blockText.split('\n').filter(line => {
          const trimmed = line.trim()
          return trimmed.includes('|') && trimmed.length > 0
        })
        
        if (tableLines.length >= 2) {
          const headerRow = tableLines[0]
          const separatorRow = tableLines[1]
          
          // Check if separator row contains dashes (markdown table separator)
          if (separatorRow.includes('-') || separatorRow.match(/^\|[\s\-:]+\|/)) {
            const headers = parseTableRow(headerRow)
            const rows = tableLines.slice(2)
              .filter(line => line.trim().includes('|'))
              .map(line => parseTableRow(line))
              .filter(row => row.length > 0)
            
            if (headers.length > 0 && rows.length > 0) {
              return (
                <div key={blockIndex++} className="my-6 overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gradient-primary">
                          <tr>
                            {headers.map((header, idx) => (
                              <th
                                key={idx}
                                className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                              >
                                {renderInlineMarkdown(header.trim())}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                              {row.map((cell, cellIdx) => (
                                <td
                                  key={cellIdx}
                                  className="px-6 py-4 text-sm text-gray-700"
                                >
                                  {renderInlineMarkdown(cell.trim())}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            }
          }
        }
      }

      // Lists
      if (blockText.trim().startsWith('- ') || blockText.trim().startsWith('* ')) {
        const items = blockText.split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '))
        return (
          <ul key={blockIndex++} className="list-disc list-inside space-y-2 my-4 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700">
                {renderInlineMarkdown(item.replace(/^[-*]\s+/, ''))}
              </li>
            ))}
          </ul>
        )
      }

      if (blockText.trim().match(/^\d+\.\s/)) {
        const items = blockText.split('\n').filter(line => line.trim().match(/^\d+\.\s/))
        return (
          <ol key={blockIndex++} className="list-decimal list-inside space-y-2 my-4 ml-4">
            {items.map((item, itemIndex) => (
              <li key={itemIndex} className="text-gray-700">
                {renderInlineMarkdown(item.replace(/^\d+\.\s+/, ''))}
              </li>
            ))}
          </ol>
        )
      }

      // Regular paragraphs
      return (
        <p key={blockIndex++} className="text-gray-700 mb-4 leading-relaxed">
          {renderInlineMarkdown(blockText)}
        </p>
      )
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          codeBlockContent.push(line)
          const codeBlockText = codeBlockContent.join('\n')
          const match = codeBlockText.match(/^```(\w+)?\n([\s\S]*?)```$/)
          if (match) {
            const language = match[1] || ''
            const code = match[2]
            blocks.push(
              <div key={blockIndex++} className="my-6">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  {language && (
                    <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-mono">
                      {language}
                    </div>
                  )}
                  <pre className="p-4 overflow-x-auto">
                    <code className={`text-sm text-gray-100 font-mono ${language ? `language-${language}` : ''}`}>
                      {code}
                    </code>
                  </pre>
                </div>
              </div>
            )
          }
          codeBlockContent = []
          inCodeBlock = false
          codeBlockLanguage = ''
        } else {
          // Start of code block
          if (currentBlock.length > 0) {
            const block = processBlock(currentBlock)
            if (block) blocks.push(block)
            currentBlock = []
          }
          inCodeBlock = true
          const match = line.match(/^```(\w+)?/)
          codeBlockLanguage = match ? (match[1] || '') : ''
          codeBlockContent = [line]
        }
        continue
      }

      if (inCodeBlock) {
        codeBlockContent.push(line)
        continue
      }

      // Check if this line starts a new block type
      const trimmedLine = line.trim()
      const isEmpty = trimmedLine === ''

      // Check if line starts a table (contains |)
      if (trimmedLine.includes('|')) {
        // If we have accumulated content that's not part of a table, process it first
        if (currentBlock.length > 0 && !currentBlock.some(l => l.trim().includes('|'))) {
          const block = processBlock(currentBlock)
          if (block) blocks.push(block)
          currentBlock = []
        }
        currentBlock.push(line)
        continue
      }

      // If empty line, check if we're in a table block
      if (isEmpty) {
        // If we're in a table block, check if next non-empty line continues the table
        if (currentBlock.length > 0 && currentBlock.some(l => l.trim().includes('|'))) {
          // Look ahead to see if next line is part of table
          let nextNonEmptyLine = ''
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].trim()) {
              nextNonEmptyLine = lines[j].trim()
              break
            }
          }
          // If next line is part of table, continue adding to current block
          if (nextNonEmptyLine.includes('|')) {
            currentBlock.push(line) // Add empty line to preserve spacing
            continue
          } else {
            // End of table, process it
            const block = processBlock(currentBlock)
            if (block) blocks.push(block)
            currentBlock = []
            continue
          }
        }
        // Not in table, process current block
        if (currentBlock.length > 0) {
          const block = processBlock(currentBlock)
          if (block) blocks.push(block)
          currentBlock = []
        }
        continue
      }

      // Check if line starts a list
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || trimmedLine.match(/^\d+\.\s/)) {
        // If we have accumulated content that's not a list, process it first
        if (currentBlock.length > 0 && !currentBlock[0].trim().match(/^[-*\d]/)) {
          const block = processBlock(currentBlock)
          if (block) blocks.push(block)
          currentBlock = []
        }
        currentBlock.push(line)
        continue
      }

      // Check if line starts a header
      if (trimmedLine.startsWith('#') && (trimmedLine.startsWith('# ') || trimmedLine.startsWith('## ') || trimmedLine.startsWith('### '))) {
        // Process accumulated content first
        if (currentBlock.length > 0) {
          const block = processBlock(currentBlock)
          if (block) blocks.push(block)
          currentBlock = []
        }
        // Process header immediately
        const block = processBlock([line])
        if (block) blocks.push(block)
        continue
      }

      // Regular content line
      currentBlock.push(line)
    }

    // Process remaining block
    if (currentBlock.length > 0) {
      const block = processBlock(currentBlock)
      if (block) blocks.push(block)
    }

    return blocks
  }

  // Render inline markdown (bold, italic, code, links)
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = []
    let currentIndex = 0
    let key = 0

    // Pattern to match: **bold**, *italic*, `code`, [link](url)
    const patterns = [
      { regex: /\*\*([^*]+)\*\*/g, type: 'bold' },
      { regex: /\*([^*]+)\*/g, type: 'italic' },
      { regex: /`([^`]+)`/g, type: 'code' },
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' },
    ]

    const matches: Array<{ start: number; end: number; type: string; content: string; url?: string }> = []

    patterns.forEach(({ regex, type }) => {
      let match
      regex.lastIndex = 0
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          type,
          content: match[1],
          url: match[2],
        })
      }
    })

    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start)

    // Remove overlapping matches (keep the first one)
    const filteredMatches: typeof matches = []
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i]
      let overlaps = false
      for (let j = 0; j < filteredMatches.length; j++) {
        const existing = filteredMatches[j]
        if (
          (current.start >= existing.start && current.start < existing.end) ||
          (current.end > existing.start && current.end <= existing.end) ||
          (current.start <= existing.start && current.end >= existing.end)
        ) {
          overlaps = true
          break
        }
      }
      if (!overlaps) {
        filteredMatches.push(current)
      }
    }

    filteredMatches.forEach((match) => {
      // Add text before match
      if (match.start > currentIndex) {
        parts.push(text.substring(currentIndex, match.start))
      }

      // Add matched content
      switch (match.type) {
        case 'bold':
          parts.push(<strong key={key++} className="font-bold text-gray-900">{match.content}</strong>)
          break
        case 'italic':
          parts.push(<em key={key++} className="italic">{match.content}</em>)
          break
        case 'code':
          parts.push(
            <code key={key++} className="bg-gray-100 text-primary px-1.5 py-0.5 rounded text-sm font-mono">
              {match.content}
            </code>
          )
          break
        case 'link':
          parts.push(
            <a
              key={key++}
              href={match.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {match.content}
            </a>
          )
          break
      }

      currentIndex = match.end
    })

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex))
    }

    return parts.length > 0 ? <>{parts}</> : text
  }

  // Parse table row
  const parseTableRow = (row: string): string[] => {
    return row
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0)
  }

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-strong:text-gray-900">
      {parseMarkdown(content)}
    </div>
  )
}

