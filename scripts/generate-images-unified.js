/**
 * Unified Image Generation Script
 * Tries multiple providers in order: Replicate (best quality/cost) -> Hugging Face SDK -> Hugging Face API
 * 
 * Usage:
 *   node scripts/generate-images-unified.js --provider replicate --token YOUR_TOKEN
 *   node scripts/generate-images-unified.js --provider hf-sdk --token YOUR_HF_TOKEN
 *   node scripts/generate-images-unified.js --provider hf-api --token YOUR_HF_TOKEN
 */

const fs = require('fs');
const path = require('path');

// Import prompts from existing script
let imagePrompts;
try {
  imagePrompts = require('./generate-images-hf-sdk.js').imagePrompts;
} catch (e) {
  console.error('Error: Could not load image prompts. Make sure generate-images-hf-sdk.js exists.');
  process.exit(1);
}

// Configuration
const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  width: 1024,
  height: 576, // 16:9 aspect ratio
};

// Try Replicate first (best quality/cost ratio)
async function generateWithReplicate(prompt, filepath, token) {
  try {
    const Replicate = require('replicate');
    const replicate = new Replicate({ auth: token });
    
    const output = await replicate.run(
      'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
      {
        input: {
          prompt: prompt,
          width: config.width,
          height: config.height,
          num_inference_steps: 35,
          guidance_scale: 7.5,
          negative_prompt: 'blurry, low quality, distorted, watermark, text overlay, logo, signature'
        }
      }
    );

    // Download the image
    const response = await fetch(output[0]);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (error) {
    throw new Error(`Replicate error: ${error.message}`);
  }
}

// Try Hugging Face SDK
async function generateWithHFSDK(prompt, filepath, token) {
  try {
    const { HfInference } = require('@huggingface/inference');
    const hf = new HfInference(token);
    
    const result = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
      parameters: {
        width: config.width,
        height: config.height,
        num_inference_steps: 35,
        guidance_scale: 7.5,
        negative_prompt: 'blurry, low quality, distorted, watermark, text overlay, logo, signature'
      }
    });

    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filepath, result);
    return true;
  } catch (error) {
    throw new Error(`HF SDK error: ${error.message}`);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  let provider = 'replicate'; // Default: best quality/cost
  let token = '';
  
  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' && args[i + 1]) {
      provider = args[i + 1];
      i++;
    } else if (args[i] === '--token' && args[i + 1]) {
      token = args[i + 1];
      i++;
    }
  }
  
  // Try environment variables
  if (!token) {
    if (provider === 'replicate') {
      token = process.env.REPLICATE_API_TOKEN || '';
    } else {
      token = process.env.HUGGINGFACE_API_TOKEN || '';
    }
  }
  
  if (!token) {
    console.error('\n❌ Error: API token required\n');
    console.error('Get tokens:');
    console.error('  Replicate (recommended): https://replicate.com/account/api-tokens (~$0.07 for all images)');
    console.error('  Hugging Face: https://huggingface.co/settings/tokens (free tier available)\n');
    console.error('Usage:');
    console.error(`  node scripts/generate-images-unified.js --provider ${provider} --token YOUR_TOKEN`);
    console.error('\nOr set environment variable:');
    console.error(`  REPLICATE_API_TOKEN=your_token node scripts/generate-images-unified.js`);
    console.error(`  HUGGINGFACE_API_TOKEN=your_token node scripts/generate-images-unified.js --provider hf-sdk\n`);
    process.exit(1);
  }
  
  console.log(`\n🚀 Using provider: ${provider.toUpperCase()}`);
  console.log(`📁 Output directory: ${config.outputDir}`);
  console.log(`📊 Total images to generate: ${Object.values(imagePrompts).flat().length}\n`);
  
  // Ensure output directories exist
  ['blog', 'case-studies', 'whitepapers', 'events'].forEach(dir => {
    const dirPath = path.join(config.outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  let successCount = 0;
  let failCount = 0;
  const failed = [];
  
  // Generate all images
  for (const [category, images] of Object.entries(imagePrompts)) {
    console.log(`\n📁 Generating ${category} images (${images.length} images)...`);
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fullPath = path.join(config.outputDir, category === 'case-studies' ? 'case-studies' : category, image.filename);
      
      // Skip if already exists
      if (fs.existsSync(fullPath)) {
        console.log(`  ⏭️  [${i + 1}/${images.length}] Skipping (exists): ${image.filename}`);
        successCount++;
        continue;
      }
      
      try {
        console.log(`  [${i + 1}/${images.length}] Generating ${image.filename}...`);
        
        if (provider === 'replicate') {
          await generateWithReplicate(image.prompt, fullPath, token);
        } else if (provider === 'hf-sdk') {
          await generateWithHFSDK(image.prompt, fullPath, token);
        } else {
          throw new Error(`Unknown provider: ${provider}`);
        }
        
        console.log(`  ✓ Generated: ${image.filename}`);
        successCount++;
        
        // Rate limiting delay
        if (i < images.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`  ✗ Failed: ${image.filename}`);
        console.error(`    Error: ${error.message}`);
        failCount++;
        failed.push({ filename: image.filename, error: error.message });
        
        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  
  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`📊 Generation Summary:`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed images:`);
    failed.forEach(f => console.log(`  - ${f.filename}: ${f.error}`));
  }
  
  console.log(`\n📁 Images saved to: ${config.outputDir}`);
  console.log(`\n💡 Tip: Re-run the script to retry failed images (existing images will be skipped).\n`);
}

if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { generateWithReplicate, generateWithHFSDK, imagePrompts };

