/**
 * Fast Image Generation - Optimized for AWS Deployment
 * 
 * Generates all 13 images (4 slider + 9 solution) with optimized settings for speed.
 * Resolution: 768x432 (can be upscaled later)
 * Inference steps: 20 (faster)
 * 
 * Usage:
 *   node scripts/generate-all-images-fast.js --token YOUR_TOKEN
 */

const { spawn } = require('child_process')
const path = require('path')

async function runCommand(command, args, label) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 ${label}...`)
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true
    })

    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${label} completed\n`)
        resolve()
      } else {
        console.error(`❌ ${label} failed with code ${code}\n`)
        reject(new Error(`${label} failed`))
      }
    })

    proc.on('error', (error) => {
      console.error(`❌ Error running ${label}:`, error.message)
      reject(error)
    })
  })
}

async function main() {
  const args = process.argv.slice(2)
  let token = ''

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--token' && args[i + 1]) {
      token = args[i + 1]
      i++
    }
  }

  if (!token) {
    token = process.env.HUGGINGFACE_API_TOKEN || ''
  }

  if (!token) {
    console.error('\n❌ Error: Hugging Face API token required\n')
    console.error('Usage:')
    console.error('  node scripts/generate-all-images-fast.js --token YOUR_TOKEN')
    console.error('\nOr set:')
    console.error('  HUGGINGFACE_API_TOKEN=your_token node scripts/generate-all-images-fast.js\n')
    process.exit(1)
  }

  console.log('\n' + '='.repeat(60))
  console.log('⚡ FAST IMAGE GENERATION FOR AWS DEPLOYMENT')
  console.log('='.repeat(60))
  console.log('\n⚙️  Optimizations:')
  console.log('  • Resolution: 768x432 (16:9)')
  console.log('  • Inference steps: 20 (faster)')
  console.log('  • Total images: 13 (4 slider + 9 solution)')
  console.log('  • Estimated time: ~10-20 minutes for all')
  console.log('\n' + '='.repeat(60) + '\n')

  try {
    // Generate slider images
    await runCommand(
      'node',
      [path.join(__dirname, 'generate-slider-images.js'), '--provider', 'hf-sdk', '--token', token],
      'Generating Slider Images (4 images)'
    )

    // Generate solution images
    await runCommand(
      'node',
      [path.join(__dirname, 'generate-solution-images.js'), '--token', token],
      'Generating Solution Hero Images (9 images)'
    )

    console.log('\n' + '='.repeat(60))
    console.log('✅ ALL IMAGES GENERATED!')
    console.log('='.repeat(60))
    console.log('\n📊 Final Status:')
    console.log('  • Slider images: /public/images/slider-*.png')
    console.log('  • Solution images: /public/images/solutions/*-hero.png')
    console.log('\n✨ Ready for AWS deployment!\n')

  } catch (error) {
    console.error('\n❌ Generation failed:', error.message)
    console.error('\n💡 You can retry failed images by running individual scripts:\n')
    console.error('  node scripts/generate-slider-images.js --provider hf-sdk --token YOUR_TOKEN')
    console.error('  node scripts/generate-solution-images.js --token YOUR_TOKEN\n')
    process.exit(1)
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message)
    process.exit(1)
  })
}

