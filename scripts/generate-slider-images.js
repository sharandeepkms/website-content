/**
 * Generate Homepage Slider Images
 * 
 * This script generates 4 high-resolution PNG images for the homepage slider.
 * All images are 16:9, photorealistic, with main visuals on the right side.
 * 
 * Usage:
 *   node scripts/generate-slider-images.js --provider hf-sdk --token YOUR_TOKEN
 *   node scripts/generate-slider-images.js --provider replicate --token YOUR_TOKEN
 */

const fs = require('fs')
const path = require('path')
const { HfInference } = require('@huggingface/inference')

// Slider image prompts - optimized for right-side composition
const sliderImages = [
  {
    filename: 'slider-1.png',
    prompt: 'Photorealistic 3D data center with SONiC switches, glowing blue leaf-spine network fabric connecting server racks, cyber lighting effects, dark blue and cyan color scheme. Main visual elements concentrated on the right 60% of the frame, left side kept dark and minimal with subtle gradients. Professional enterprise networking visualization, 16:9 aspect ratio, high quality, photorealistic style, cinematic lighting, no text, no logos'
  },
  {
    filename: 'slider-2.png',
    prompt: 'Multi-cloud architecture visualization with AWS, Azure, and GCP abstract cloud nodes interconnected with glowing fiber-optic pathways, automation workflow diagrams, deep-blue cinematic theme with purple accents. Main visual cluster heavily weighted on the right side of the frame, left side clean and dark for text overlay. Enterprise cloud automation concept, 16:9 aspect ratio, photorealistic, high quality, cinematic lighting, no text, no logos'
  },
  {
    filename: 'slider-3.png',
    prompt: 'AI-ready high-performance networking fabric with GPU clusters, neural network pathways visualized as glowing blue and cyan light flows, high-performance switching pulses and data streams, futuristic tech aesthetic. Right-focused composition with main AI fabric elements on the right 60%, left side clean and dark. Enterprise AI infrastructure visualization, 16:9 aspect ratio, photorealistic, ultra-modern tech aesthetic, cinematic lighting, no text, no logos'
  },
  {
    filename: 'slider-4.png',
    prompt: 'Secure and observable cloud networking visualization with encrypted network tunnels, holographic security dashboards with glowing data streams, shield-style glowing geometric shapes, secure cloud interconnect grid, zero-trust architecture elements. Visuals heavily concentrated on the right side of the frame, left side dark and minimal for text overlay. Enterprise security and observability concept, 16:9 aspect ratio, photorealistic, high-tech security aesthetic, cinematic lighting, no text, no logos'
  }
]

const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  width: 768, // Faster generation - can upscale later if needed
  height: 432, // 16:9 aspect ratio
}

async function generateSliderImageWithHF(hf, image, retries = 3) {
  const fullPath = path.join(config.outputDir, image.filename)
  
  // Check if already exists
  if (fs.existsSync(fullPath)) {
    console.log(`  ⏭️  Skipping (already exists): ${image.filename}`)
    return true
  }

  // Ensure directory exists
  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await hf.textToImage({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        inputs: image.prompt,
        parameters: {
          width: config.width,
          height: config.height,
          num_inference_steps: 20, // Reduced from 35 for faster generation
          guidance_scale: 7.0, // Slightly reduced for speed
          negative_prompt: 'blurry, low quality, distorted, watermark, text overlay, logo, signature, cartoon, illustration, sketch'
        }
      })

      fs.writeFileSync(fullPath, result)
      console.log(`  ✓ Generated: ${image.filename}`)
      return true
    } catch (error) {
      const isLastAttempt = attempt === retries - 1
      
      if (isLastAttempt) {
        throw error
      }

      // Check if it's a model loading error
      if (error.message.includes('503') || error.message.includes('loading') || error.message.includes('unavailable')) {
        const waitTime = 30000 * (attempt + 1) // Exponential backoff
        console.log(`  ⏳ Model loading (this can take 30-60s), waiting ${waitTime / 1000}s...`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
      } else {
        const waitTime = 5000 * (attempt + 1)
        console.log(`  ⚠️  Retry ${attempt + 1}/${retries} after ${waitTime / 1000}s...`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
  }
}

async function main() {
  const args = process.argv.slice(2)
  
  let provider = 'hf-sdk' // Default
  let token = ''
  
  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' && args[i + 1]) {
      provider = args[i + 1]
      i++
    } else if (args[i] === '--token' && args[i + 1]) {
      token = args[i + 1]
      i++
    }
  }
  
  // Try environment variables
  if (!token) {
    if (provider === 'replicate') {
      token = process.env.REPLICATE_API_TOKEN || ''
    } else {
      token = process.env.HUGGINGFACE_API_TOKEN || ''
    }
  }
  
  if (!token) {
    console.error('\n❌ Error: API token required\n')
    console.error('Usage:')
    console.error(`  node scripts/generate-slider-images.js --provider ${provider} --token YOUR_TOKEN`)
    console.error('\nOr set environment variable:')
    console.error(`  REPLICATE_API_TOKEN=your_token node scripts/generate-slider-images.js --provider replicate`)
    console.error(`  HUGGINGFACE_API_TOKEN=your_token node scripts/generate-slider-images.js --provider hf-sdk\n`)
    process.exit(1)
  }
  
  console.log(`\n🎨 Generating Homepage Slider Images`)
  console.log(`Provider: ${provider.toUpperCase()}`)
  console.log(`Output: ${config.outputDir}`)
  console.log(`Resolution: ${config.width}x${config.height} (16:9)\n`)
  
  let hf
  if (provider === 'hf-sdk') {
    hf = new HfInference(token)
    console.log(`Using model: stabilityai/stable-diffusion-xl-base-1.0\n`)
  }
  
  let successCount = 0
  let failCount = 0
  
  for (let i = 0; i < sliderImages.length; i++) {
    const image = sliderImages[i]
    try {
      console.log(`[${i + 1}/${sliderImages.length}] Generating ${image.filename}...`)
      console.log(`  💡 This may take 2-5 minutes per image. Please wait...`)
      
      if (provider === 'hf-sdk') {
        await generateSliderImageWithHF(hf, image)
      } else {
        throw new Error(`Provider ${provider} not yet supported for slider images. Use hf-sdk.`)
      }
      
      successCount++
      
      // Minimal delay between images for faster generation
      if (i < sliderImages.length - 1) {
        console.log(`  ⏳ Waiting 1s before next image...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error(`  ✗ Failed: ${image.filename}`)
      console.error(`    Error: ${error.message}`)
      failCount++
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }
  
  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 Generation Summary:`)
  console.log(`✓ Success: ${successCount}/${sliderImages.length}`)
  console.log(`✗ Failed: ${failCount}/${sliderImages.length}`)
  
  if (successCount === sliderImages.length) {
    console.log(`\n✅ All slider images generated!`)
    console.log(`\nNext steps:`)
    console.log(`1. Verify images are in: ${config.outputDir}`)
    console.log(`2. The slider component will automatically use them`)
    console.log(`3. Images are configured with object-fit: contain and object-position: right center\n`)
  } else {
    console.log(`\n⚠️  Some images failed. Re-run to retry failed images.\n`)
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message)
    process.exit(1)
  })
}

module.exports = { sliderImages, generateSliderImageWithHF }

