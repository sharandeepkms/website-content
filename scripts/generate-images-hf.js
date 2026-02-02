/**
 * Image Generation Script for PalC Networks Resources
 * Using Hugging Face Inference API (Free Tier)
 * 
 * This script generates all required featured images using Hugging Face's
 * free Stable Diffusion models via their Inference API.
 * 
 * Usage:
 *   node scripts/generate-images-hf.js
 *   node scripts/generate-images-hf.js --token YOUR_HF_TOKEN
 * 
 * Get a free token at: https://huggingface.co/settings/tokens
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Hugging Face Configuration
const HF_CONFIG = {
  // Using Stable Diffusion v1.5 for faster generation (free tier)
  model: 'runwayml/stable-diffusion-v1-5',
  // Alternative models:
  // 'stabilityai/stable-diffusion-xl-base-1.0' (better quality but slower)
  // 'CompVis/stable-diffusion-v1-4' (older but stable)
  apiUrl: 'https://router.huggingface.co/models',
  timeout: 90000, // 90 seconds timeout for generation (model loading can take time)
  retryDelay: 10000, // 10 seconds between retries
  maxRetries: 5 // More retries for model loading
};

// Image generation prompts for each resource
const imagePrompts = {
  blog: [
    {
      filename: 'future-of-open-networking.png',
      prompt: 'Modern enterprise data center with SONiC open networking switches, glowing blue network fabric connections, high-tech server racks, dark blue and cyan gradient background, professional enterprise networking visualization, 16:9 aspect ratio, photorealistic style, high quality, detailed'
    },
    {
      filename: 'ai-ready-infrastructure-guide.png',
      prompt: 'AI-ready data center infrastructure with GPU clusters, neural network pathways visualized as glowing blue connections, high-performance computing nodes, futuristic tech aesthetic, dark blue and cyan color scheme, enterprise-grade visualization, 16:9 aspect ratio, high quality'
    },
    {
      filename: 'zero-trust-security-implementation.png',
      prompt: 'Zero trust security architecture visualization with multiple security layers, identity verification gates, network segmentation zones, shield and lock icons, dark blue background with cyan security highlights, enterprise security concept, 16:9 aspect ratio, professional design'
    },
    {
      filename: 'evpn-srv6-design-patterns.png',
      prompt: 'Leaf-spine network fabric architecture with EVPN/VXLAN overlays and SRv6 underlay, network topology diagram, interconnected switches and routers, blue and cyan network paths, professional network design visualization, 16:9 aspect ratio, technical diagram style'
    },
    {
      filename: 'ai-fabrics-roce-ecn.png',
      prompt: 'High-performance AI fabric network with RoCE optimization, ECN tuning visualization, GPU interconnect pathways, ultra-low latency network design, glowing blue and cyan tech aesthetic, enterprise AI infrastructure, 16:9 aspect ratio, futuristic tech'
    },
    {
      filename: 'netdevops-pipelines-evpn.png',
      prompt: 'NetDevOps CI/CD pipeline visualization with GitOps workflows, automated network configuration, code to deployment flow, blue and cyan tech diagrams, modern DevOps automation concept, enterprise networking automation, 16:9 aspect ratio, workflow diagram'
    },
    {
      filename: 'observability-int-gnmi.png',
      prompt: 'Network observability dashboard with telemetry streams, INT and gNMI data flows, monitoring visualization, network visibility metrics, dark blue background with cyan data visualizations, enterprise network monitoring, 16:9 aspect ratio, dashboard style'
    },
    {
      filename: 'multi-cloud-transit-architecture.png',
      prompt: 'Multi-cloud architecture with AWS, Azure, and GCP interconnected, transit networks connecting clouds, secure cloud connectivity, blue and cyan cloud visualization, enterprise multi-cloud design, 16:9 aspect ratio, cloud architecture diagram'
    },
    {
      filename: 'campus-modernization-evpn.png',
      prompt: 'Modern campus network with EVPN segmentation, identity-driven policy visualization, interconnected campus buildings, blue network pathways, enterprise campus modernization, 16:9 aspect ratio, network topology style'
    },
    {
      filename: 'ztna-architecture-guide.png',
      prompt: 'Zero Trust Network Access (ZTNA) architecture with secure access points, identity-based connections, hybrid enterprise network, dark blue security visualization with cyan highlights, enterprise ZTNA design, 16:9 aspect ratio, security architecture'
    }
  ],
  'case-studies': [
    {
      filename: 'data-center-modernization-fortune-500.png',
      prompt: 'Fortune 500 financial services data center modernization, modern SONiC infrastructure, cost reduction metrics visualized, professional enterprise transformation, dark blue and cyan corporate aesthetic, 16:9 aspect ratio, business success visualization'
    },
    {
      filename: '5g-network-deployment-service-provider.png',
      prompt: '5G network infrastructure deployment for telecommunications, O-RAN architecture, service provider network towers, blue and cyan 5G visualization, enterprise telecom deployment, 16:9 aspect ratio, telecom infrastructure'
    },
    {
      filename: 'cloud-migration-enterprise.png',
      prompt: 'Enterprise cloud migration visualization, hybrid cloud architecture, digital transformation journey, blue cloud connectivity, enterprise technology migration, 16:9 aspect ratio, transformation visualization'
    },
    {
      filename: 'ai-fabric-for-research-cloud.png',
      prompt: 'AI research cloud infrastructure with RoCE-optimized fabric, GPU clusters for research, high-performance computing, blue and cyan research visualization, enterprise research cloud, 16:9 aspect ratio, research infrastructure'
    },
    {
      filename: 'multi-cloud-transit-finserv.png',
      prompt: 'Financial services multi-cloud transit architecture, secure cloud connectivity, hub/spoke and mesh networks, blue financial services tech visualization, enterprise fintech infrastructure, 16:9 aspect ratio, fintech architecture'
    },
    {
      filename: 'zero-trust-campus.png',
      prompt: 'Zero trust campus network modernization, identity-driven segmentation, campus security visualization, blue campus network design, enterprise campus security, 16:9 aspect ratio, campus network topology'
    },
    {
      filename: 'orchestration-automation-telco.png',
      prompt: 'Telecommunications orchestration and automation, OSS/BSS integration, telco core network automation, blue telco infrastructure visualization, enterprise telecom automation, 16:9 aspect ratio, automation workflow'
    },
    {
      filename: 'sdwan-modernization-retail.png',
      prompt: 'SD-WAN modernization for retail, unified network management, retail store connectivity, blue retail network visualization, enterprise retail networking, 16:9 aspect ratio, retail network architecture'
    },
    {
      filename: 'observability-platform-fintech.png',
      prompt: 'FinTech observability platform with telemetry lake, SLO dashboards, unified monitoring, blue fintech visualization, enterprise financial services monitoring, 16:9 aspect ratio, monitoring platform'
    },
    {
      filename: 'automation-for-manufacturing-edge.png',
      prompt: 'Manufacturing edge automation, IT/OT segmentation, edge computing infrastructure, blue manufacturing tech visualization, enterprise industrial automation, 16:9 aspect ratio, industrial automation'
    }
  ],
  whitepapers: [
    {
      filename: 'open-networking-complete-guide.png',
      prompt: 'Professional whitepaper cover design for open networking guide, SONiC logo and networking elements, dark blue background with cyan accents, enterprise document design, 16:9 aspect ratio, clean professional layout, document cover style'
    },
    {
      filename: 'ai-infrastructure-best-practices.png',
      prompt: 'Professional whitepaper cover for AI infrastructure guide, GPU and AI elements, dark blue tech background, enterprise document design, 16:9 aspect ratio, modern tech aesthetic, document cover'
    },
    {
      filename: 'zero-trust-security-architecture.png',
      prompt: 'Professional whitepaper cover for zero trust security, security shield and network elements, dark blue security theme, enterprise document design, 16:9 aspect ratio, professional security visualization, document cover'
    },
    {
      filename: 'evpn-srv6-fabric-blueprint.png',
      prompt: 'Professional whitepaper cover for EVPN/SRv6 fabric blueprint, network topology diagram, dark blue network design theme, enterprise document layout, 16:9 aspect ratio, technical network visualization, document cover'
    },
    {
      filename: 'ai-fabric-design-guide.png',
      prompt: 'Professional whitepaper cover for AI fabric design guide, AI network fabric visualization, dark blue AI tech theme, enterprise document design, 16:9 aspect ratio, high-tech AI aesthetic, document cover'
    },
    {
      filename: 'netdevops-automation-guide.png',
      prompt: 'Professional whitepaper cover for NetDevOps automation guide, CI/CD pipeline visualization, dark blue DevOps theme, enterprise document design, 16:9 aspect ratio, modern automation aesthetic, document cover'
    },
    {
      filename: 'multi-cloud-networking-strategy.png',
      prompt: 'Professional whitepaper cover for multi-cloud networking strategy, cloud connectivity visualization, dark blue cloud theme, enterprise document design, 16:9 aspect ratio, professional cloud architecture, document cover'
    },
    {
      filename: 'observability-slo-handbook.png',
      prompt: 'Professional whitepaper cover for observability and SLO handbook, monitoring dashboard visualization, dark blue observability theme, enterprise document design, 16:9 aspect ratio, professional monitoring aesthetic, document cover'
    }
  ],
  events: [
    {
      filename: 'future-of-open-networking-2024.png',
      prompt: 'Professional webinar event banner for open networking event, SONiC and networking elements, dark blue event design, webinar presentation aesthetic, 16:9 aspect ratio, modern tech event visualization, event banner style'
    },
    {
      filename: 'ai-infrastructure-summit-2024.png',
      prompt: 'Professional conference banner for AI infrastructure summit, conference hall visualization, dark blue tech conference theme, enterprise event design, 16:9 aspect ratio, professional summit aesthetic, event banner'
    },
    {
      filename: 'zero-trust-security-workshop.png',
      prompt: 'Professional workshop banner for zero trust security, hands-on training visualization, dark blue workshop theme, enterprise training design, 16:9 aspect ratio, interactive workshop aesthetic, event banner'
    },
    {
      filename: 'ai-fabrics-live-lab.png',
      prompt: 'Professional live lab banner for AI fabrics session, hands-on demonstration visualization, dark blue lab theme, enterprise training design, 16:9 aspect ratio, technical lab aesthetic, event banner'
    },
    {
      filename: 'netdevops-day.png',
      prompt: 'Professional webinar banner for NetDevOps day, automation and DevOps elements, dark blue DevOps event theme, enterprise webinar design, 16:9 aspect ratio, modern DevOps aesthetic, event banner'
    },
    {
      filename: 'multi-cloud-strategy-briefing.png',
      prompt: 'Professional briefing banner for multi-cloud strategy, cloud architecture visualization, dark blue briefing theme, enterprise event design, 16:9 aspect ratio, professional strategy session aesthetic, event banner'
    },
    {
      filename: 'observability-slo-workshop.png',
      prompt: 'Professional workshop banner for observability and SLO training, monitoring and telemetry visualization, dark blue workshop theme, enterprise training design, 16:9 aspect ratio, technical workshop aesthetic, event banner'
    },
    {
      filename: 'edge-automation-lab.png',
      prompt: 'Professional lab banner for edge automation, edge computing visualization, dark blue lab theme, enterprise training design, 16:9 aspect ratio, technical edge computing aesthetic, event banner'
    }
  ]
};

// Configuration
const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  width: 1024,
  height: 576, // 16:9 aspect ratio (1024x576)
  numInferenceSteps: 30,
  guidanceScale: 7.5
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    token: process.env.HUGGINGFACE_API_TOKEN || '',
    model: HF_CONFIG.model
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--token' && args[i + 1]) {
      parsed.token = args[i + 1];
      i++;
    } else if (args[i] === '--model' && args[i + 1]) {
      parsed.model = args[i + 1];
      i++;
    }
  }

  return parsed;
}

// Generate image using Hugging Face Inference API
async function generateWithHF(prompt, filename, token, model) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      inputs: prompt,
      parameters: {
        width: config.width,
        height: config.height,
        num_inference_steps: config.numInferenceSteps,
        guidance_scale: config.guidanceScale,
        negative_prompt: 'blurry, low quality, distorted, watermark, text overlay, logo, signature'
      }
    });

    const modelPath = model.replace('/', '--');
    const options = {
      hostname: 'api-inference.huggingface.co',
      path: `/models/${model}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Length': data.length
      },
      timeout: HF_CONFIG.timeout
    };

    // Remove undefined headers
    Object.keys(options.headers).forEach(key => {
      if (options.headers[key] === undefined) {
        delete options.headers[key];
      }
    });

    const req = https.request(options, (res) => {
      let responseData = Buffer.alloc(0);

      res.on('data', (chunk) => {
        responseData = Buffer.concat([responseData, chunk]);
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          // Check if response is an image (PNG/JPEG) or JSON error
          const contentType = res.headers['content-type'] || '';
          
          if (contentType.startsWith('image/')) {
            // It's an image, save it
            const filepath = path.join(config.outputDir, filename.split('/').pop().split('\\').pop());
            const dir = path.dirname(filepath);
            
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(filepath, responseData);
            console.log(`✓ Generated: ${filename}`);
            resolve(filepath);
          } else {
            // Try to parse as JSON error
            try {
              const error = JSON.parse(responseData.toString());
              if (error.error) {
                reject(new Error(`HF API Error: ${error.error}`));
              } else if (error.estimated_time) {
                // Model is loading, need to wait
                reject(new Error(`Model loading, estimated time: ${error.estimated_time}s`));
              } else {
                reject(new Error(`Unknown response: ${responseData.toString().substring(0, 200)}`));
              }
            } catch (e) {
              reject(new Error(`Invalid response: ${responseData.toString().substring(0, 200)}`));
            }
          }
        } else if (res.statusCode === 503) {
          // Model is loading
          try {
            const error = JSON.parse(responseData.toString());
            const waitTime = error.estimated_time || 20;
            reject(new Error(`Model loading, wait ${waitTime}s`));
          } catch (e) {
            reject(new Error(`Service unavailable (503), model may be loading`));
          }
        } else {
          try {
            const error = JSON.parse(responseData.toString());
            reject(new Error(`API Error ${res.statusCode}: ${error.error || error.message || JSON.stringify(error)}`));
          } catch (e) {
            reject(new Error(`API Error ${res.statusCode}: ${responseData.toString().substring(0, 200)}`));
          }
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(data);
    req.end();
  });
}

// Retry wrapper with exponential backoff
async function generateWithRetry(prompt, filename, token, model, retries = HF_CONFIG.maxRetries) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await generateWithHF(prompt, filename, token, model);
    } catch (error) {
      const isLastAttempt = attempt === retries - 1;
      const isModelLoading = error.message.includes('Model loading') || error.message.includes('estimated_time');
      
      if (isLastAttempt) {
        throw error;
      }

      if (isModelLoading) {
        // Extract wait time if available
        const waitMatch = error.message.match(/(\d+)s/);
        const waitTime = waitMatch ? Math.max(parseInt(waitMatch[1]) * 1000, 20000) : Math.max(HF_CONFIG.retryDelay * (attempt + 1), 20000);
        console.log(`⏳ Model loading, waiting ${waitTime / 1000}s before retry ${attempt + 1}/${retries}...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        const delay = HF_CONFIG.retryDelay * (attempt + 1);
        console.log(`⚠️  Retry ${attempt + 1}/${retries} after ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}

// Main execution
async function main() {
  const args = parseArgs();
  
  console.log(`Using Hugging Face model: ${args.model}`);
  if (args.token) {
    console.log(`Using API token: ${args.token.substring(0, 10)}...`);
  } else {
    console.log(`⚠️  No API token provided. Using public API (rate limited).`);
    console.log(`   Get a free token at: https://huggingface.co/settings/tokens`);
  }
  console.log(`Generating ${Object.values(imagePrompts).flat().length} images...\n`);

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
      const fullPath = path.join(category === 'case-studies' ? 'case-studies' : category, image.filename);
      
      try {
        // Add delay to respect rate limits (free tier: ~30 requests/minute)
        if (i > 0) {
          const delay = args.token ? 2000 : 3000; // Longer delay without token
          await new Promise(resolve => setTimeout(resolve, delay));
        }
        
        console.log(`  [${i + 1}/${images.length}] Generating ${image.filename}...`);
        await generateWithRetry(image.prompt, fullPath, args.token, args.model);
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
    console.log(`\n💡 Tip: Some failures may be due to rate limits.`);
    console.log(`   Wait a few minutes and re-run the script to retry failed images.`);
  }
  
  console.log(`\n📁 Images saved to: ${config.outputDir}`);
}

// Run if executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  });
}

module.exports = { generateWithHF, imagePrompts };

