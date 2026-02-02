/**
 * Generate Professional Placeholder Images
 * Creates high-quality placeholder images with gradients, icons, and text
 * These can be replaced with AI-generated images later
 */

const { createCanvas, loadFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Image prompts with titles for placeholders
const imageData = {
  blog: [
    { filename: 'future-of-open-networking.png', title: 'Future of Open Networking', subtitle: 'SONiC & Disaggregated Infrastructure' },
    { filename: 'ai-ready-infrastructure-guide.png', title: 'AI-Ready Infrastructure', subtitle: 'GPU Clusters & ML Workloads' },
    { filename: 'zero-trust-security-implementation.png', title: 'Zero Trust Security', subtitle: 'Identity-Driven Architecture' },
    { filename: 'evpn-srv6-design-patterns.png', title: 'EVPN & SRv6 Patterns', subtitle: 'Leaf-Spine Fabric Design' },
    { filename: 'ai-fabrics-roce-ecn.png', title: 'AI Fabrics Tuning', subtitle: 'RoCE & ECN Optimization' },
    { filename: 'netdevops-pipelines-evpn.png', title: 'NetDevOps Pipelines', subtitle: 'GitOps & Automation' },
    { filename: 'observability-int-gnmi.png', title: 'Network Observability', subtitle: 'INT, gNMI & Telemetry' },
    { filename: 'multi-cloud-transit-architecture.png', title: 'Multi-Cloud Transit', subtitle: 'Hub/Spoke & Mesh' },
    { filename: 'campus-modernization-evpn.png', title: 'Campus Modernization', subtitle: 'EVPN Segmentation' },
    { filename: 'ztna-architecture-guide.png', title: 'ZTNA Architecture', subtitle: 'Zero Trust Network Access' }
  ],
  'case-studies': [
    { filename: 'data-center-modernization-fortune-500.png', title: 'Data Center Modernization', subtitle: 'Fortune 500 Financial Services' },
    { filename: '5g-network-deployment-service-provider.png', title: '5G Network Deployment', subtitle: 'Telecommunications Provider' },
    { filename: 'cloud-migration-enterprise.png', title: 'Cloud Migration', subtitle: 'Enterprise Transformation' },
    { filename: 'ai-fabric-for-research-cloud.png', title: 'AI Fabric for Research', subtitle: 'RoCE-Optimized Cloud' },
    { filename: 'multi-cloud-transit-finserv.png', title: 'Multi-Cloud Transit', subtitle: 'Financial Services' },
    { filename: 'zero-trust-campus.png', title: 'Zero Trust Campus', subtitle: 'Identity-Driven Segmentation' },
    { filename: 'orchestration-automation-telco.png', title: 'Telco Automation', subtitle: 'OSS/BSS Integration' },
    { filename: 'sdwan-modernization-retail.png', title: 'SD-WAN Modernization', subtitle: 'Retail Network' },
    { filename: 'observability-platform-fintech.png', title: 'Observability Platform', subtitle: 'FinTech Monitoring' },
    { filename: 'automation-for-manufacturing-edge.png', title: 'Edge Automation', subtitle: 'Manufacturing IT/OT' }
  ],
  whitepapers: [
    { filename: 'open-networking-complete-guide.png', title: 'Open Networking Guide', subtitle: 'SONiC & Disaggregated Infrastructure' },
    { filename: 'ai-infrastructure-best-practices.png', title: 'AI Infrastructure', subtitle: 'Best Practices Guide' },
    { filename: 'zero-trust-security-architecture.png', title: 'Zero Trust Security', subtitle: 'Architecture Guide' },
    { filename: 'evpn-srv6-fabric-blueprint.png', title: 'EVPN & SRv6 Blueprint', subtitle: 'Fabric Design Patterns' },
    { filename: 'ai-fabric-design-guide.png', title: 'AI Fabric Design', subtitle: 'RoCE & ECN Tuning' },
    { filename: 'netdevops-automation-guide.png', title: 'NetDevOps Automation', subtitle: 'GitOps & CI/CD' },
    { filename: 'multi-cloud-networking-strategy.png', title: 'Multi-Cloud Strategy', subtitle: 'Networking Architecture' },
    { filename: 'observability-slo-handbook.png', title: 'Observability & SLOs', subtitle: 'Telemetry Handbook' }
  ],
  events: [
    { filename: 'future-of-open-networking-2024.png', title: 'Future of Open Networking', subtitle: 'Webinar 2024' },
    { filename: 'ai-infrastructure-summit-2024.png', title: 'AI Infrastructure Summit', subtitle: 'Conference 2024' },
    { filename: 'zero-trust-security-workshop.png', title: 'Zero Trust Workshop', subtitle: 'Hands-On Training' },
    { filename: 'ai-fabrics-live-lab.png', title: 'AI Fabrics Live Lab', subtitle: 'RoCE/ECN Tuning' },
    { filename: 'netdevops-day.png', title: 'NetDevOps Day', subtitle: 'Automation Webinar' },
    { filename: 'multi-cloud-strategy-briefing.png', title: 'Multi-Cloud Briefing', subtitle: 'Strategy Session' },
    { filename: 'observability-slo-workshop.png', title: 'Observability Workshop', subtitle: 'SLO & Telemetry' },
    { filename: 'edge-automation-lab.png', title: 'Edge Automation Lab', subtitle: 'Hands-On Training' }
  ]
};

const config = {
  outputDir: path.join(__dirname, '..', 'public', 'images'),
  width: 1200,
  height: 675 // 16:9 aspect ratio
};

function createPlaceholderImage(title, subtitle, filepath) {
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');

  // Dark blue gradient background
  const gradient = ctx.createLinearGradient(0, 0, config.width, config.height);
  gradient.addColorStop(0, '#050B18');
  gradient.addColorStop(0.5, '#0A1734');
  gradient.addColorStop(1, '#050B18');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, config.width, config.height);

  // Add subtle grid pattern
  ctx.strokeStyle = 'rgba(0, 194, 255, 0.1)';
  ctx.lineWidth = 1;
  for (let x = 0; x < config.width; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, config.height);
    ctx.stroke();
  }
  for (let y = 0; y < config.height; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(config.width, y);
    ctx.stroke();
  }

  // Add network nodes pattern
  ctx.fillStyle = 'rgba(0, 194, 255, 0.2)';
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * config.width;
    const y = Math.random() * config.height;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add connecting lines between nodes
  ctx.strokeStyle = 'rgba(0, 194, 255, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 15; i++) {
    const x1 = Math.random() * config.width;
    const y1 = Math.random() * config.height;
    const x2 = Math.random() * config.width;
    const y2 = Math.random() * config.height;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Title text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Word wrap for long titles
  const words = title.split(' ');
  const lines = [];
  let currentLine = words[0];
  
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + ' ' + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > config.width - 200) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);

  // Draw title lines
  const titleY = config.height / 2 - (lines.length - 1) * 30;
  lines.forEach((line, index) => {
    ctx.fillText(line, config.width / 2, titleY + index * 60);
  });

  // Subtitle
  ctx.fillStyle = '#00C2FF';
  ctx.font = '24px Arial';
  ctx.fillText(subtitle, config.width / 2, config.height / 2 + (lines.length * 30) + 20);

  // Add PalC Networks branding
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = '14px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('PalC Networks', config.width - 30, config.height - 20);

  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filepath, buffer);
}

async function main() {
  console.log('Generating professional placeholder images...\n');

  // Ensure output directories exist
  ['blog', 'case-studies', 'whitepapers', 'events'].forEach(dir => {
    const dirPath = path.join(config.outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  let count = 0;
  const total = Object.values(imageData).flat().length;

  for (const [category, images] of Object.entries(imageData)) {
    console.log(`📁 Generating ${category} images...`);
    
    for (const image of images) {
      const fullPath = path.join(
        config.outputDir,
        category === 'case-studies' ? 'case-studies' : category,
        image.filename
      );
      
      createPlaceholderImage(image.title, image.subtitle, fullPath);
      count++;
      console.log(`  ✓ [${count}/${total}] ${image.filename}`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`✓ Successfully generated ${count} placeholder images!`);
  console.log(`📁 Images saved to: ${config.outputDir}`);
  console.log(`\n💡 These are professional placeholders. You can replace them with AI-generated images later.`);
}

if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { createPlaceholderImage, imageData };

