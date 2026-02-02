# Documentation File Structure

## Overview
This document outlines the complete file structure for adding documentation to the PalC Networks website, following the same pattern as blogs, case studies, whitepapers, and events.

---

## File Structure

### 1. Data File
**Path**: `app/data/documentation.ts`

**Purpose**: Contains all documentation entries with metadata

**Structure**:
```typescript
export interface Documentation {
  id: string
  slug: string
  title: string
  summary: string
  featuredImage?: string
  category: string  // e.g., 'Product', 'API', 'Solution Guide', 'Security'
  tags: string[]
  date: string
  lastUpdated: string
  version?: string
  author?: {
    name: string
    title: string
    avatar?: string
  }
  content: string  // Markdown content or HTML
  pdfUrl?: string  // Optional PDF version
  tableOfContents?: Array<{ title: string; anchor: string }>
  relatedDocs?: string[]  // Array of slugs
}
```

---

### 2. Documentation Listing Page
**Path**: `app/resources/documentation/page.tsx`

**Status**: ✅ Already exists

**Purpose**: Main documentation listing page

---

### 3. Documentation Content Component
**Path**: `app/resources/documentation/DocumentationContent.tsx`

**Status**: ✅ Already exists

**Purpose**: Component for the documentation listing page

---

### 4. Individual Documentation Pages

#### Page Component
**Path**: `app/resources/documentation/[slug]/page.tsx`

**Purpose**: Dynamic route for individual documentation pages

**Example Structure**:
```typescript
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocumentationBySlug, getRelatedDocumentation } from '@/app/data/documentation'
import { DocumentationDetailContent } from './DocumentationDetailContent'
import { getCanonicalUrl } from '@/app/utils/canonical'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocumentationBySlug(slug)
  
  if (!doc) {
    return {}
  }
  
  return {
    title: `${doc.title} | Documentation | PalC Networks`,
    description: doc.summary,
    // ... other metadata
  }
}

export default async function DocumentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDocumentationBySlug(slug)
  const relatedDocs = getRelatedDocumentation(slug, 3)
  
  if (!doc) {
    notFound()
  }
  
  return <DocumentationDetailContent doc={doc} relatedDocs={relatedDocs} />
}
```

#### Detail Content Component
**Path**: `app/resources/documentation/[slug]/DocumentationDetailContent.tsx`

**Purpose**: Component that renders the documentation content

**Features**:
- Table of contents navigation
- Markdown/HTML content rendering
- Related documentation links
- PDF download button (if available)
- Version information
- Last updated date

---

### 5. PDF Files Location

**Base Directory**: `public/pdfs/documentation/`

**Naming Convention**: `{slug}.pdf`

**Examples**:
- `public/pdfs/documentation/sonic-installation-guide.pdf`
- `public/pdfs/documentation/api-reference-guide.pdf`
- `public/pdfs/documentation/network-configuration-guide.pdf`

---

### 6. Documentation Images

**Base Directory**: `public/images/documentation/`

**Naming Convention**: `{slug}.png` or `{slug}.jpg`

**Examples**:
- `public/images/documentation/sonic-installation-guide.png`
- `public/images/documentation/api-reference-guide.png`
- `public/images/documentation/network-configuration-guide.png`

---

## Complete File Paths Summary

### Data & Types
```
app/data/documentation.ts
```

### Pages
```
app/resources/documentation/page.tsx                          (✅ Exists)
app/resources/documentation/DocumentationContent.tsx          (✅ Exists)
app/resources/documentation/[slug]/page.tsx                   (❌ Need to create)
app/resources/documentation/[slug]/DocumentationDetailContent.tsx  (❌ Need to create)
```

### Assets
```
public/pdfs/documentation/{slug}.pdf                          (❌ Need to add PDFs)
public/images/documentation/{slug}.png                         (❌ Need to add images)
```

---

## Suggested Documentation Categories

Based on the existing structure, here are suggested categories:

1. **Product Documentation**
   - SONiC Installation Guide
   - Network Management Platform Guide
   - Hardware Configuration Manuals

2. **API Documentation**
   - REST API Reference
   - SDK Documentation
   - Integration Guides

3. **Solution Guides**
   - AI Fabric Setup Guide
   - Multi-Cloud Configuration
   - Network Automation Playbooks

4. **Security Documentation**
   - Security Best Practices
   - Zero Trust Configuration
   - Compliance Guides

---

## Example Documentation Entry Structure

```typescript
{
  id: '1',
  slug: 'sonic-installation-guide',
  title: 'SONiC Installation Guide',
  summary: 'Complete guide for installing and configuring SONiC on white-box switches.',
  featuredImage: '/images/documentation/sonic-installation-guide.png',
  category: 'Product Documentation',
  tags: ['SONiC', 'Installation', 'Configuration'],
  date: '2024-01-15',
  lastUpdated: '2024-12-01',
  version: '2.1',
  author: {
    name: 'John Smith',
    title: 'Senior Network Architect',
    avatar: '/images/experts/john-smith.svg',
  },
  content: '...', // Markdown content
  pdfUrl: '/pdfs/documentation/sonic-installation-guide.pdf',
  tableOfContents: [
    { title: 'Introduction', anchor: '#introduction' },
    { title: 'Prerequisites', anchor: '#prerequisites' },
    { title: 'Installation Steps', anchor: '#installation' },
    // ...
  ],
  relatedDocs: ['sonic-configuration-guide', 'sonic-troubleshooting'],
}
```

---

## Next Steps

1. ✅ Create `app/data/documentation.ts` with documentation entries
2. ✅ Create `app/resources/documentation/[slug]/page.tsx`
3. ✅ Create `app/resources/documentation/[slug]/DocumentationDetailContent.tsx`
4. ✅ Add PDF files to `public/pdfs/documentation/`
5. ✅ Add images to `public/images/documentation/`
6. ✅ Update navigation if needed
7. ✅ Test documentation pages

---

## File Naming Conventions

### Slugs
- Use lowercase
- Use hyphens for spaces
- Keep descriptive but concise
- Examples:
  - `sonic-installation-guide`
  - `api-reference-guide`
  - `network-configuration-manual`
  - `security-best-practices`

### PDF Files
- Match the slug exactly
- Format: `{slug}.pdf`
- Examples:
  - `sonic-installation-guide.pdf`
  - `api-reference-guide.pdf`

### Image Files
- Match the slug exactly
- Format: `{slug}.png` or `{slug}.jpg`
- Examples:
  - `sonic-installation-guide.png`
  - `api-reference-guide.png`

---

## URL Structure

**Base URL**: `/resources/documentation`

**Individual Docs**: `/resources/documentation/{slug}`

**Examples**:
- `/resources/documentation/sonic-installation-guide`
- `/resources/documentation/api-reference-guide`
- `/resources/documentation/network-configuration-manual`

