/**
 * Check for missing images referenced in data files
 */

const fs = require('fs')
const path = require('path')

// Read data files (simplified - in production you'd use a proper parser)
const dataFiles = [
  { path: 'app/data/blog.ts', type: 'blog' },
  { path: 'app/data/case-studies.ts', type: 'case-studies' },
  { path: 'app/data/whitepapers.ts', type: 'whitepapers' },
  { path: 'app/data/events.ts', type: 'events' },
]

const missingImages = []
const foundImages = []

// Extract image paths from file content
function extractImagePaths(content, type) {
  const images = []
  
  // Match featuredImage and cover paths
  const patterns = [
    /featuredImage:\s*['"`]([^'"`]+)['"`]/g,
    /cover:\s*['"`]([^'"`]+)['"`]/g,
    /avatar:\s*['"`]([^'"`]+)['"`]/g,
  ]
  
  patterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      const imagePath = match[1]
      if (imagePath.startsWith('/images/')) {
        images.push({
          path: imagePath,
          type: type,
          publicPath: path.join('public', imagePath),
        })
      }
    }
  })
  
  return images
}

// Check all data files
dataFiles.forEach(({ path: filePath, type }) => {
  const fullPath = path.join(__dirname, '..', filePath)
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8')
    const images = extractImagePaths(content, type)
    
    images.forEach(img => {
      if (fs.existsSync(img.publicPath)) {
        foundImages.push(img)
      } else {
        missingImages.push(img)
      }
    })
  }
})

// Report results
console.log('\n📊 Image Check Results\n')
console.log('='.repeat(60))
console.log(`✓ Found: ${foundImages.length} images`)
console.log(`✗ Missing: ${missingImages.length} images\n`)

if (missingImages.length > 0) {
  console.log('Missing Images:')
  console.log('─'.repeat(60))
  
  const grouped = missingImages.reduce((acc, img) => {
    if (!acc[img.type]) acc[img.type] = []
    acc[img.type].push(img)
    return acc
  }, {})
  
  Object.entries(grouped).forEach(([type, images]) => {
    console.log(`\n${type.toUpperCase()}:`)
    images.forEach(img => {
      console.log(`  - ${img.path}`)
      console.log(`    Expected: ${img.publicPath}`)
    })
  })
  
  console.log('\n' + '='.repeat(60))
  console.log('\n💡 To generate missing images, run:')
  console.log('   node scripts/generate-images-unified.js --provider hf-sdk --token YOUR_TOKEN\n')
} else {
  console.log('✅ All images are present!\n')
}

// Summary by type
console.log('\nSummary by Type:')
console.log('─'.repeat(60))
const typeCounts = {}
foundImages.forEach(img => {
  typeCounts[img.type] = (typeCounts[img.type] || 0) + 1
})
missingImages.forEach(img => {
  typeCounts[img.type] = (typeCounts[img.type] || 0) - 0.001 // Mark as missing
})

Object.entries(typeCounts).forEach(([type, count]) => {
  const missing = missingImages.filter(img => img.type === type).length
  const found = foundImages.filter(img => img.type === type).length
  const total = found + missing
  const status = missing === 0 ? '✅' : '⚠️'
  console.log(`${status} ${type.padEnd(15)} ${found}/${total} found`)
})

console.log('\n')

