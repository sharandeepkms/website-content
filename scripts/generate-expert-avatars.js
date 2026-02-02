/**
 * Generate placeholder expert avatar images
 * These are simple colored squares with initials - replace with real photos later
 */

const fs = require('fs')
const path = require('path')

// Create experts directory if it doesn't exist
const expertsDir = path.join(__dirname, '..', 'public', 'images', 'experts')
if (!fs.existsSync(expertsDir)) {
  fs.mkdirSync(expertsDir, { recursive: true })
}

// Expert information
const experts = [
  {
    name: 'john-smith',
    displayName: 'John Smith',
    initials: 'JS',
    color: '#0041C2', // Primary blue
  },
  {
    name: 'michael-chen',
    displayName: 'Michael Chen',
    initials: 'MC',
    color: '#00C2FF', // Primary light
  },
  {
    name: 'alex-martinez',
    displayName: 'Alex Martinez',
    initials: 'AM',
    color: '#0066CC', // Blue variant
  },
  {
    name: 'sarah-johnson',
    displayName: 'Sarah Johnson',
    initials: 'SJ',
    color: '#007ACC', // Blue variant
  },
  {
    name: 'emily-davis',
    displayName: 'Emily Davis',
    initials: 'ED',
    color: '#0088FF', // Blue variant
  },
]

// Generate SVG placeholder avatars
experts.forEach(expert => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="${expert.color}"/>
  <text x="200" y="250" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${expert.initials}</text>
</svg>`

  // For now, save as SVG. In production, convert to PNG using a library like sharp
  const svgPath = path.join(expertsDir, `${expert.name}.svg`)
  fs.writeFileSync(svgPath, svg)
  
  console.log(`✓ Created: ${expert.name}.svg`)
})

console.log(`\n✅ Generated ${experts.length} expert avatar placeholders`)
console.log(`\n💡 Note: These are SVG placeholders. For production, replace with real JPG photos.`)
console.log(`   Files created in: ${expertsDir}\n`)

