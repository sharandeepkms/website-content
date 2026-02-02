/**
 * Quick Status Check for Image Generation
 * 
 * Run this to see which images have been generated and which are still pending.
 */

const fs = require('fs')
const path = require('path')

const expectedImages = {
  slider: [
    'slider-1.png',
    'slider-2.png',
    'slider-3.png',
    'slider-4.png',
  ],
  solutions: [
    'sonic-open-networking-hero.png',
    'cloud-hybrid-hero.png',
    'dc-ai-fabric-hero.png',
    'iam-zero-trust-hero.png',
    'network-observability-hero.png',
    'telecom-edge-5g-hero.png',
    'data-center-modernization-hero.png',
    'network-observability-general-hero.png',
    'iam-general-hero.png',
  ]
}

function checkStatus() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images')
  const solutionsDir = path.join(imagesDir, 'solutions')

  console.log('\n📊 Image Generation Status Check\n')
  console.log('='.repeat(60))

  // Check slider images
  console.log('\n🏠 Homepage Slider Images:')
  console.log('-'.repeat(60))
  let sliderCount = 0
  expectedImages.slider.forEach(img => {
    const filePath = path.join(imagesDir, img)
    const exists = fs.existsSync(filePath)
    const status = exists ? '✅' : '⏳'
    const size = exists ? `(${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB)` : ''
    console.log(`  ${status} ${img} ${size}`)
    if (exists) sliderCount++
  })
  console.log(`\n  Progress: ${sliderCount}/${expectedImages.slider.length} complete`)

  // Check solution images
  console.log('\n🛠️  Solution Hero Images:')
  console.log('-'.repeat(60))
  let solutionsCount = 0
  expectedImages.solutions.forEach(img => {
    const filePath = path.join(solutionsDir, img)
    const exists = fs.existsSync(filePath)
    const status = exists ? '✅' : '⏳'
    const size = exists ? `(${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB)` : ''
    console.log(`  ${status} ${img} ${size}`)
    if (exists) solutionsCount++
  })
  console.log(`\n  Progress: ${solutionsCount}/${expectedImages.solutions.length} complete`)

  // Summary
  const totalExpected = expectedImages.slider.length + expectedImages.solutions.length
  const totalGenerated = sliderCount + solutionsCount
  const percentage = ((totalGenerated / totalExpected) * 100).toFixed(1)

  console.log('\n' + '='.repeat(60))
  console.log(`📈 Overall Progress: ${totalGenerated}/${totalExpected} (${percentage}%)`)

  if (totalGenerated === totalExpected) {
    console.log('\n✅ All images generated successfully!')
    console.log('🎉 Your website is ready with all new images!\n')
  } else {
    console.log(`\n⏳ Still generating... ${totalExpected - totalGenerated} images remaining`)
    console.log('💡 Run this script again in a few minutes to check progress.\n')
  }
}

checkStatus()

