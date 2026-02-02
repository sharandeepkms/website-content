# Hero Slider Images - Generation Instructions

## Required Images

The homepage slider requires 4 ultra-premium hero banner images:

1. **slider-1.png** - SONiC Datacenter Networking
2. **slider-2.png** - Multi-Cloud & Infrastructure Automation  
3. **slider-3.png** - AI-Ready High-Performance Fabrics
4. **slider-4.png** - Secure & Observable Cloud Networking

## Specifications

- **Resolution**: 3000×1700 pixels (widescreen)
- **Format**: PNG
- **Style**: Dark navy-to-teal gradient UI, glowing neon cyber lines, holographic elements
- **No text, no logos** - visuals only

## Image Descriptions

### 1. slider-1.png - SONiC Datacenter Networking
- Glowing SONiC switches as minimal neon rectangles
- Interconnecting spine-leaf links in cyan/green glowing curves
- Subtle cloud + edge icons as soft holographic orbs
- Telemetry signals, flowing packets, observability lines
- Premium enterprise feel, smooth gradients, elegant neon lighting

### 2. slider-2.png - Multi-Cloud & Infrastructure Automation
- Abstract clouds with AWS/Azure/GCP color cues (no text)
- Interconnect pipelines as blue/purple flowing lines
- Automation triggers, GitOps arrows, IaC pipeline rings
- Elegant glowing spherical nodes traveling across layers
- Modern orchestration + infrastructure automation aesthetic

### 3. slider-3.png - AI-Ready High-Performance Fabrics
- RoCEv2-inspired high-performance links
- AI workload topology nodes connected by fast neon green/blue fiber lines
- Advanced latency-optimized network mesh
- Soft glowing computational waves and deep-learning curves
- Futuristic, fast, high-performance visual energy

### 4. slider-4.png - Secure & Observable Cloud Networking
- Segmentation rings, trust boundaries, layered circles
- Inline telemetry beams scanning through nodes
- Security signals as glowing shields and pulses
- Cloud-edge hybrid topology
- Strong secure blue tones with subtle teal accents

## Generation Methods

### Option 1: OpenAI DALL-E 3 (Recommended)
The script `scripts/generate-hero-slider-images.js` is ready to use once API billing is resolved.

**Note**: The current API key has reached its billing limit. You'll need to:
1. Add credits to your OpenAI account
2. Run: `node scripts/generate-hero-slider-images.js`

### Option 2: Manual Generation
Use any AI image generation service (Midjourney, Stable Diffusion, etc.) with the prompts provided in the script.

### Option 3: Professional Designer
Hire a designer to create custom hero banners matching the specifications.

## Placement

Once generated, place the images in:
```
public/images/slider-1.png
public/images/slider-2.png
public/images/slider-3.png
public/images/slider-4.png
```

The HomeSlider component will automatically use these PNG images once they're available.

## Current Status

The slider currently uses SVG fallback images. Once PNG images are placed in `public/images/`, they will automatically be used instead.

