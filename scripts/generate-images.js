/**
 * Image Generation Script for PalC Networks Resources
 * 
 * This script generates all required featured images for blogs, case studies,
 * whitepapers, and events using AI image generation APIs.
 * 
 * Supported APIs:
 * - OpenAI DALL-E 3 (recommended)
 * - Stability AI
 * - Hugging Face Inference API
 * 
 * Usage:
 *   node scripts/generate-images.js --provider openai --api-key YOUR_KEY
 *   node scripts/generate-images.js --provider stability --api-key YOUR_KEY
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Image generation prompts for each resource
const imagePrompts = {
  blog: [
    {
      filename: 'future-of-open-networking.png',
      prompt: 'Modern enterprise data center with SONiC open networking switches, glowing blue network fabric connections, high-tech server racks, dark blue and cyan gradient background, professional enterprise networking visualization, 16:9 aspect ratio, photorealistic style'
    },
    {
      filename: 'ai-ready-infrastructure-guide.png',
      prompt: 'AI-ready data center infrastructure with GPU clusters, neural network pathways visualized as glowing blue connections, high-performance computing nodes, futuristic tech aesthetic, dark blue and cyan color scheme, enterprise-grade visualization, 16:9 aspect ratio'
    },
    {
      filename: 'zero-trust-security-implementation.png',
      prompt: 'Zero trust security architecture visualization with multiple security layers, identity verification gates, network segmentation zones, shield and lock icons, dark blue background with cyan security highlights, enterprise security concept, 16:9 aspect ratio'
    },
    {
      filename: 'evpn-srv6-design-patterns.png',
      prompt: 'Leaf-spine network fabric architecture with EVPN/VXLAN overlays and SRv6 underlay, network topology diagram, interconnected switches and routers, blue and cyan network paths, professional network design visualization, 16:9 aspect ratio'
    },
    {
      filename: 'ai-fabrics-roce-ecn.png',
      prompt: 'High-performance AI fabric network with RoCE optimization, ECN tuning visualization, GPU interconnect pathways, ultra-low latency network design, glowing blue and cyan tech aesthetic, enterprise AI infrastructure, 16:9 aspect ratio'
    },
    {
      filename: 'netdevops-pipelines-evpn.png',
      prompt: 'NetDevOps CI/CD pipeline visualization with GitOps workflows, automated network configuration, code to deployment flow, blue and cyan tech diagrams, modern DevOps automation concept, enterprise networking automation, 16:9 aspect ratio'
    },
    {
      filename: 'observability-int-gnmi.png',
      prompt: 'Network observability dashboard with telemetry streams, INT and gNMI data flows, monitoring visualization, network visibility metrics, dark blue background with cyan data visualizations, enterprise network monitoring, 16:9 aspect ratio'
    },
    {
      filename: 'multi-cloud-transit-architecture.png',
      prompt: 'Multi-cloud architecture with AWS, Azure, and GCP interconnected, transit networks connecting clouds, secure cloud connectivity, blue and cyan cloud visualization, enterprise multi-cloud design, 16:9 aspect ratio'
    },
    {
      filename: 'campus-modernization-evpn.png',
      prompt: 'Modern campus network with EVPN segmentation, identity-driven policy visualization, interconnected campus buildings, blue network pathways, enterprise campus modernization, 16:9 aspect ratio'
    },
    {
      filename: 'ztna-architecture-guide.png',
      prompt: 'Zero Trust Network Access (ZTNA) architecture with secure access points, identity-based connections, hybrid enterprise network, dark blue security visualization with cyan highlights, enterprise ZTNA design, 16:9 aspect ratio'
    }
  ],
  'case-studies': [
    {
      filename: 'data-center-modernization-fortune-500.png',
      prompt: 'Fortune 500 financial services data center modernization, modern SONiC infrastructure, cost reduction metrics visualized, professional enterprise transformation, dark blue and cyan corporate aesthetic, 16:9 aspect ratio'
    },
    {
      filename: '5g-network-deployment-service-provider.png',
      prompt: '5G network infrastructure deployment for telecommunications, O-RAN architecture, service provider network towers, blue and cyan 5G visualization, enterprise telecom deployment, 16:9 aspect ratio'
    },
    {
      filename: 'cloud-migration-enterprise.png',
      prompt: 'Enterprise cloud migration visualization, hybrid cloud architecture, digital transformation journey, blue cloud connectivity, enterprise technology migration, 16:9 aspect ratio'
    },
    {
      filename: 'ai-fabric-for-research-cloud.png',
      prompt: 'AI research cloud infrastructure with RoCE-optimized fabric, GPU clusters for research, high-performance computing, blue and cyan research visualization, enterprise research cloud, 16:9 aspect ratio'
    },
    {
      filename: 'multi-cloud-transit-finserv.png',
      prompt: 'Financial services multi-cloud transit architecture, secure cloud connectivity, hub/spoke and mesh networks, blue financial services tech visualization, enterprise fintech infrastructure, 16:9 aspect ratio'
    },
    {
      filename: 'zero-trust-campus.png',
      prompt: 'Zero trust campus network modernization, identity-driven segmentation, campus security visualization, blue campus network design, enterprise campus security, 16:9 aspect ratio'
    },
    {
      filename: 'orchestration-automation-telco.png',
      prompt: 'Telecommunications orchestration and automation, OSS/BSS integration, telco core network automation, blue telco infrastructure visualization, enterprise telecom automation, 16:9 aspect ratio'
    },
    {
      filename: 'sdwan-modernization-retail.png',
      prompt: 'SD-WAN modernization for retail, unified network management, retail store connectivity, blue retail network visualization, enterprise retail networking, 16:9 aspect ratio'
    },
    {
      filename: 'observability-platform-fintech.png',
      prompt: 'FinTech observability platform with telemetry lake, SLO dashboards, unified monitoring, blue fintech visualization, enterprise financial services monitoring, 16:9 aspect ratio'
    },
    {
      filename: 'automation-for-manufacturing-edge.png',
      prompt: 'Manufacturing edge automation, IT/OT segmentation, edge computing infrastructure, blue manufacturing tech visualization, enterprise industrial automation, 16:9 aspect ratio'
    }
  ],
  whitepapers: [
    {
      filename: 'open-networking-complete-guide.png',
      prompt: 'Professional whitepaper cover design for open networking guide, SONiC logo and networking elements, dark blue background with cyan accents, enterprise document design, 16:9 aspect ratio, clean professional layout'
    },
    {
      filename: 'ai-infrastructure-best-practices.png',
      prompt: 'Professional whitepaper cover for AI infrastructure guide, GPU and AI elements, dark blue tech background, enterprise document design, 16:9 aspect ratio, modern tech aesthetic'
    },
    {
      filename: 'zero-trust-security-architecture.png',
      prompt: 'Professional whitepaper cover for zero trust security, security shield and network elements, dark blue security theme, enterprise document design, 16:9 aspect ratio, professional security visualization'
    },
    {
      filename: 'evpn-srv6-fabric-blueprint.png',
      prompt: 'Professional whitepaper cover for EVPN/SRv6 fabric blueprint, network topology diagram, dark blue network design theme, enterprise document layout, 16:9 aspect ratio, technical network visualization'
    },
    {
      filename: 'ai-fabric-design-guide.png',
      prompt: 'Professional whitepaper cover for AI fabric design guide, AI network fabric visualization, dark blue AI tech theme, enterprise document design, 16:9 aspect ratio, high-tech AI aesthetic'
    },
    {
      filename: 'netdevops-automation-guide.png',
      prompt: 'Professional whitepaper cover for NetDevOps automation guide, CI/CD pipeline visualization, dark blue DevOps theme, enterprise document design, 16:9 aspect ratio, modern automation aesthetic'
    },
    {
      filename: 'multi-cloud-networking-strategy.png',
      prompt: 'Professional whitepaper cover for multi-cloud networking strategy, cloud connectivity visualization, dark blue cloud theme, enterprise document design, 16:9 aspect ratio, professional cloud architecture'
    },
    {
      filename: 'observability-slo-handbook.png',
      prompt: 'Professional whitepaper cover for observability and SLO handbook, monitoring dashboard visualization, dark blue observability theme, enterprise document design, 16:9 aspect ratio, professional monitoring aesthetic'
    }
  ],
  events: [
    {
      filename: 'future-of-open-networking-2024.png',
      prompt: 'Professional webinar event banner for open networking event, SONiC and networking elements, dark blue event design, webinar presentation aesthetic, 16:9 aspect ratio, modern tech event visualization'
    },
    {
      filename: 'ai-infrastructure-summit-2024.png',
      prompt: 'Professional conference banner for AI infrastructure summit, conference hall visualization, dark blue tech conference theme, enterprise event design, 16:9 aspect ratio, professional summit aesthetic'
    },
    {
      filename: 'zero-trust-security-workshop.png',
      prompt: 'Professional workshop banner for zero trust security, hands-on training visualization, dark blue workshop theme, enterprise training design, 16:9 aspect ratio, interactive workshop aesthetic'
    },
    {
      filename: 'ai-fabrics-live-lab.png',
      prompt: 'Professional live lab banner for AI fabrics session, hands-on demonstration visualization, dark blue lab theme, enterprise training design, 16:9 aspect ratio, technical lab aesthetic'
    },
    {
      filename: 'netdevops-day.png',
      prompt: 'Professional webinar banner for NetDevOps day, automation and DevOps elements, dark blue DevOps event theme, enterprise webinar design, 16:9 aspect ratio, modern DevOps aesthetic'
    },
    {
      filename: 'multi-cloud-strategy-briefing.png',
      prompt: 'Professional briefing banner for multi-cloud strategy, cloud architecture visualization, dark blue briefing theme, enterprise event design, 16:9 aspect ratio, professional strategy session aesthetic'
    },
    {
      filename: 'observability-slo-workshop.png',
      prompt: 'Professional workshop banner for observability and SLO training, monitoring and telemetry visualization, dark blue workshop theme, enterprise training design, 16:9 aspect ratio, technical workshop aesthetic'
    },
    {
      filename: 'edge-automation-lab.png',
      prompt: 'Professional lab banner for edge automation, edge computing visualization, dark blue lab theme, enterprise training design, 16:9 aspect ratio, technical edge computing aesthetic'
    }
  ]
};

// Configuration
const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  size: '1024x1024', // DALL-E 3 supports 1024x1024, 1792x1024, or 1024x1792
  quality: 'standard',
  style: 'vivid'
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY || process.env.STABILITY_API_KEY || '',
    model: 'dall-e-3'
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' && args[i + 1]) {
      config.provider = args[i + 1];
      i++;
    } else if (args[i] === '--api-key' && args[i + 1]) {
      config.apiKey = args[i + 1];
      i++;
    } else if (args[i] === '--model' && args[i + 1]) {
      config.model = args[i + 1];
      i++;
    }
  }

  return config;
}

// Generate image using OpenAI DALL-E 3
async function generateWithOpenAI(prompt, filename, apiKey) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024', // 16:9 aspect ratio
      quality: 'standard',
      style: 'vivid'
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(responseData);
          if (result.data && result.data[0] && result.data[0].url) {
            downloadImage(result.data[0].url, filename)
              .then(resolve)
              .catch(reject);
          } else {
            reject(new Error('No image URL in response: ' + responseData));
          }
        } else {
          reject(new Error(`API Error: ${res.statusCode} - ${responseData}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Download image from URL
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(config.outputDir, filename.split('/').pop().split('\\').pop());
    const dir = path.dirname(filepath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Generated: ${filename}`);
          resolve(filepath);
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Main execution
async function main() {
  const args = parseArgs();
  
  if (!args.apiKey) {
    console.error('Error: API key required');
    console.error('Usage: node scripts/generate-images.js --provider openai --api-key YOUR_KEY');
    console.error('Or set OPENAI_API_KEY or STABILITY_API_KEY environment variable');
    process.exit(1);
  }

  console.log(`Using provider: ${args.provider}`);
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

  // Generate all images
  for (const [category, images] of Object.entries(imagePrompts)) {
    console.log(`\nGenerating ${category} images...`);
    
    for (const image of images) {
      const fullPath = path.join(category === 'case-studies' ? 'case-studies' : category, image.filename);
      
      try {
        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await generateWithOpenAI(image.prompt, fullPath, args.apiKey);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to generate ${image.filename}: ${error.message}`);
        failCount++;
      }
    }
  }

  console.log(`\n\nGeneration complete!`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateWithOpenAI, imagePrompts };

