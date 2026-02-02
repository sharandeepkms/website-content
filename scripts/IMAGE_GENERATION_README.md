# Image Generation Guide

This guide explains how to generate all required featured images for PalC Networks resources using AI image generation.

## Quick Start

### Option 1: Using OpenAI DALL-E 3 (Recommended)

1. **Get an OpenAI API Key:**
   - Sign up at https://platform.openai.com/
   - Navigate to API Keys section
   - Create a new secret key
   - Copy the key

2. **Set the API Key:**
   ```bash
   # Windows PowerShell
   $env:OPENAI_API_KEY="your-api-key-here"
   
   # Windows CMD
   set OPENAI_API_KEY=your-api-key-here
   
   # Linux/Mac
   export OPENAI_API_KEY="your-api-key-here"
   ```

3. **Run the Generation Script:**
   ```bash
   node scripts/generate-images.js --provider openai
   ```

### Option 2: Using Stability AI

1. **Get a Stability AI API Key:**
   - Sign up at https://platform.stability.ai/
   - Get your API key from the dashboard

2. **Run with Stability AI:**
   ```bash
   node scripts/generate-images.js --provider stability --api-key YOUR_STABILITY_KEY
   ```

## What Gets Generated

The script will generate **36 PNG images** in the following directories:

- `/public/images/blog/` - 10 blog featured images
- `/public/images/case-studies/` - 10 case study featured images  
- `/public/images/whitepapers/` - 8 whitepaper cover images
- `/public/images/events/` - 8 event banner images

## Image Specifications

- **Format**: PNG
- **Size**: 1792x1024px (16:9 aspect ratio)
- **Style**: Enterprise-grade, modern, PalC Networks branding
- **Theme**: Dark blue/cyan gradients, network/tech visuals

## Cost Estimate

- **OpenAI DALL-E 3**: ~$0.04 per image × 36 images = ~$1.44 total
- **Stability AI**: Varies by plan (check their pricing)

## Troubleshooting

### Rate Limits
The script includes a 2-second delay between requests to respect API rate limits. If you hit rate limits:
- Increase the delay in the script (line with `setTimeout(resolve, 2000)`)
- Use a higher-tier API plan

### API Errors
- Verify your API key is correct
- Check your API account has sufficient credits
- Ensure you have internet connectivity

### Missing Images
If some images fail to generate:
- Check the error messages in the console
- Re-run the script (it will skip already-generated images)
- Manually generate failed images using the prompts in the script

## Manual Generation

If you prefer to generate images manually using AI image generators:

1. Use the prompts from `scripts/generate-images.js`
2. Each image has a detailed prompt in the `imagePrompts` object
3. Use services like:
   - DALL-E 3 (via OpenAI)
   - Midjourney
   - Stable Diffusion
   - Adobe Firefly

## Alternative: Using Free Services

For free image generation, you can:
1. Use Hugging Face Spaces (free but slower)
2. Use local Stable Diffusion (requires GPU)
3. Use Replicate API (pay-per-use, very affordable)

Let me know if you'd like me to create a script for any of these alternatives!

