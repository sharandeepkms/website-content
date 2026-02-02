/**
 * Image Generation Script using Replicate API
 * Very affordable: ~$0.002 per image = ~$0.07 for all 36 images
 * 
 * Get API token at: https://replicate.com/account/api-tokens
 * Usage: node scripts/generate-images-replicate.js --token YOUR_TOKEN
 */

const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');

// Same image prompts
const imagePrompts = require('./generate-images-hf-sdk.js').imagePrompts;

const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  model: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b', // SDXL
  width: 1024,
  height: 576
};

async function generateImage(replicate, prompt, filepath) {
  try {
    const output = await replicate.run(config.model, {
      input: {
        prompt: prompt,
        width: config.width,
        height: config.height,
        num_inference_steps: 30,
        guidance_scale: 7.5,
        negative_prompt: 'blurry, low quality, distorted, watermark, text overlay, logo, signature'
      }
    });

    // Download the image
    const response = await fetch(output[0]);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the image
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filepath, buffer);
    return true;
  } catch (error) {
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  let token = process.env.REPLICATE_API_TOKEN || '';
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--token' && args[i + 1]) {
      token = args[i + 1];
      i++;
    }
  }

  if (!token) {
    console.error('Error: Replicate API token required');
    console.error('Get one at: https://replicate.com/account/api-tokens');
    console.error('Usage: node scripts/generate-images-replicate.js --token YOUR_TOKEN');
    process.exit(1);
  }

  const replicate = new Replicate({ auth: token });

  console.log(`Using Replicate model: ${config.model}`);
  console.log(`Generating ${Object.values(imagePrompts).flat().length} images...`);
  console.log(`Estimated cost: ~$0.07 total\n`);

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
    console.log(`\n📁 Generating ${category} images...`);
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fullPath = path.join(config.outputDir, category === 'case-studies' ? 'case-studies' : category, image.filename);
      
      try {
        // Add delay to respect rate limits
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        console.log(`  [${i + 1}/${images.length}] Generating ${image.filename}...`);
        await generateImage(replicate, image.prompt, fullPath);
        console.log(`  ✓ Generated: ${image.filename}`);
        successCount++;
      } catch (error) {
        console.error(`  ✗ Failed: ${image.filename}`);
        console.error(`    Error: ${error.message}`);
        failCount++;
        failed.push({ filename: image.filename, error: error.message });
      }
    }
  }

  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`Generation Summary:`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  
  if (failed.length > 0) {
    console.log(`\nFailed images:`);
    failed.forEach(f => console.log(`  - ${f.filename}: ${f.error}`));
  }
  
  console.log(`\n📁 Images saved to: ${config.outputDir}`);
}

if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { generateImage, imagePrompts };

