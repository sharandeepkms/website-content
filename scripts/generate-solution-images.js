/**
 * Generate Solution Page Hero Images
 * 
 * Generates all 9 solution hero images with optimized prompts.
 * All images are 16:9, photorealistic, with right-side composition.
 */

const { HfInference } = require('@huggingface/inference')
const fs = require('fs')
const path = require('path')

// Solution hero image prompts
const solutionImages = [
  {
    filename: 'sonic-open-networking-hero.png',
    prompt: 'Photorealistic 3D data center with open-source SONiC network switches on whitebox hardware, glowing blue and cyan network fabric connections showing leaf-spine architecture, server racks in background, ethernet cables and fiber optics, open networking concept with disaggregated infrastructure. Main visual elements on the right 60% of frame, left side dark and minimal for text overlay. Dark enterprise theme with deep blue (#050B18) and cyan (#00C2FF) accents, professional networking visualization, 16:9 aspect ratio, high quality, photorealistic style, cinematic lighting, no text, no logos'
  },
  {
    filename: 'cloud-hybrid-hero.png',
    prompt: 'Photorealistic hybrid cloud architecture visualization showing on-premises data center connected via secure tunnels to AWS, Azure, and GCP cloud logos, interconnected with glowing blue fiber-optic pathways, Kubernetes clusters spanning both environments, hybrid network topology. Main visual cluster on the right side, left side clean and dark. Deep blue cinematic theme with purple cloud accents, enterprise multi-cloud concept, 16:9 aspect ratio, photorealistic, high quality, cinematic lighting, no text, no logos'
  },
  {
    filename: 'dc-ai-fabric-hero.png',
    prompt: 'Photorealistic AI-ready data center fabric with GPU clusters, high-performance switching infrastructure with 400GbE ports, neural network pathways visualized as glowing blue and cyan light flows between GPU nodes, RoCE-optimized fabric with ultra-low latency design, server racks with GPU servers, high-speed networking cables. Right-focused composition with AI fabric elements on right 60%, left side clean and dark. Futuristic blue/cyan palette (#00C2FF, #0041C2), enterprise AI infrastructure, 16:9 aspect ratio, photorealistic, ultra-modern tech aesthetic, cinematic lighting, no text, no logos'
  },
  {
    filename: 'iam-zero-trust-hero.png',
    prompt: 'Photorealistic zero trust security architecture visualization with identity verification gates, access control layers, biometric authentication interfaces, secure network segmentation zones, shield-style glowing geometric shapes representing security boundaries, encrypted tunnels, holographic identity dashboards. Visuals heavily on the right side, left side dark and minimal for text overlay. Enterprise security concept with dark blue (#050B18) background and cyan (#00C2FF) security highlights, 16:9 aspect ratio, professional security visualization, cinematic lighting, no text, no logos'
  },
  {
    filename: 'network-observability-hero.png',
    prompt: 'Photorealistic network observability dashboard visualization with holographic monitoring screens showing network topology maps, telemetry streams as glowing blue data flows, network analytics graphs, real-time performance metrics, distributed tracing visualizations, gNMI and OpenConfig telemetry pathways. Main visual elements on right 60%, left side dark for text overlay. Dark blue background with cyan data visualization accents, enterprise network monitoring concept, 16:9 aspect ratio, high-tech observability aesthetic, cinematic lighting, no text, no logos'
  },
  {
    filename: 'telecom-edge-5g-hero.png',
    prompt: 'Photorealistic 5G and O-RAN infrastructure visualization with cellular towers, radio access network (RAN) equipment, edge computing nodes, 5G core network elements, OpenRAN architecture components, fiber-optic backhaul connections, edge data centers. Main visual cluster on right side, left side clean and dark. Deep blue telecom theme with neon cyan 5G signal waves, enterprise telecom infrastructure, 16:9 aspect ratio, photorealistic, high quality, cinematic lighting, no text, no logos'
  },
  {
    filename: 'data-center-modernization-hero.png',
    prompt: 'Photorealistic modern data center transformation visualization showing legacy infrastructure transitioning to modern architecture, leaf-spine network fabric, high-density server racks, automated infrastructure management, cloud-native technologies integration, modernization pathways. Right-focused composition, left side dark for text. Dark blue enterprise theme with cyan modernization accents, data center transformation concept, 16:9 aspect ratio, photorealistic, high quality, cinematic lighting, no text, no logos'
  },
  {
    filename: 'network-observability-general-hero.png',
    prompt: 'Photorealistic network observability and monitoring visualization with advanced telemetry systems, network performance dashboards, streaming data analytics, network topology visualization, real-time monitoring interfaces, observability platform screens. Main elements on right 60%, left clean for text. Dark blue observability theme with cyan monitoring highlights, enterprise network visibility concept, 16:9 aspect ratio, photorealistic, high-tech aesthetic, cinematic lighting, no text, no logos'
  },
  {
    filename: 'iam-general-hero.png',
    prompt: 'Photorealistic identity and access management system visualization with identity verification interfaces, access control mechanisms, authentication workflows, identity governance dashboards, secure access gates, zero trust architecture elements. Visuals on right side, left dark for text. Enterprise security theme with dark blue background and cyan identity highlights, IAM concept, 16:9 aspect ratio, professional security visualization, cinematic lighting, no text, no logos'
  }
]

const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images', 'solutions'),
  width: 768, // Faster generation - can upscale later if needed
  height: 432, // 16:9 aspect ratio
}

async function generateSolutionImage(hf, image, retries = 3) {
  const fullPath = path.join(config.outputDir, image.filename)
  
  // Check if already exists
  if (fs.existsSync(fullPath)) {
    console.log(`  ⏭️  Skipping (already exists): ${image.filename}`)
    return true
  }

  // Ensure directory exists
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true })
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`  ⏳ Generating (optimized for speed, ~30-60s per image)...`)
      
      const result = await hf.textToImage({
        model: 'stabilityai/stable-diffusion-xl-base-1.0',
        inputs: image.prompt,
        parameters: {
          width: config.width,
          height: config.height,
          num_inference_steps: 20, // Reduced from 40 for faster generation
          guidance_scale: 7.0, // Slightly reduced for speed
          negative_prompt: 'blurry, low quality, distorted, watermark, text overlay, logo, signature, cartoon, illustration, sketch, vector art, SVG'
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
        const waitTime = 20000 * (attempt + 1) // Reduced wait time
        console.log(`  ⏳ Model loading, waiting ${waitTime / 1000}s...`)
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
  let token = process.env.HUGGINGFACE_API_TOKEN || ''
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--token' && args[i + 1]) {
      token = args[i + 1]
      i++
    }
  }

  if (!token) {
    console.error('\n❌ Error: Hugging Face API token required\n')
    console.error('Usage:')
    console.error('  node scripts/generate-solution-images.js --token YOUR_TOKEN')
    console.error('\nOr set environment variable:')
    console.error('  HUGGINGFACE_API_TOKEN=your_token node scripts/generate-solution-images.js\n')
    process.exit(1)
  }

  const hf = new HfInference(token)

  console.log(`\n🎨 Generating Solution Page Hero Images`)
  console.log(`Provider: Hugging Face SDK`)
  console.log(`Model: stabilityai/stable-diffusion-xl-base-1.0`)
  console.log(`Output: ${config.outputDir}`)
  console.log(`Resolution: ${config.width}x${config.height} (16:9)`)
  console.log(`\n⚠️  Note: Each image takes 3-7 minutes. Total time: ~30-60 minutes for all 9 images.\n`)

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < solutionImages.length; i++) {
    const image = solutionImages[i]
    try {
      console.log(`[${i + 1}/${solutionImages.length}] ${image.filename}...`)
      await generateSolutionImage(hf, image)
      successCount++
      
      // Minimal delay for faster generation
      if (i < solutionImages.length - 1) {
        console.log(`  ⏳ Waiting 1s before next image...\n`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error(`  ✗ Failed: ${image.filename}`)
      console.error(`    Error: ${error.message}\n`)
      failCount++
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
  }

  console.log(`\n${'='.repeat(60)}`)
  console.log(`📊 Generation Summary:`)
  console.log(`✓ Success: ${successCount}/${solutionImages.length}`)
  console.log(`✗ Failed: ${failCount}/${solutionImages.length}`)

  if (successCount === solutionImages.length) {
    console.log(`\n✅ All solution hero images generated!`)
    console.log(`\nNext steps:`)
    console.log(`1. Images saved to: ${config.outputDir}`)
    console.log(`2. Update solution pages to use new PNG files instead of SVG`)
    console.log(`3. Verify images display correctly on pages\n`)
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

module.exports = { solutionImages, generateSolutionImage }

