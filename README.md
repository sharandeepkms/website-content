# PalC Networks - Enterprise Website

A modern, enterprise-grade website for PalC Networks built with Next.js 14, TypeScript, Tailwind CSS, and ShadCN UI.

## 🚀 Features

- **Modern Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Enterprise UI**: Clean, professional design with ShadCN UI components
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **SEO Optimized**: Complete SEO setup with metadata, OpenGraph, and Schema.org
- **Fully Responsive**: Mobile-first design that works on all devices
- **Form Handling**: React Hook Form with Zod validation
- **API Routes**: Contact, careers, and lead capture endpoints

## 📁 Project Structure

```
/app
  /components         # Reusable UI components
    /ui               # ShadCN UI base components
  /solutions          # Solutions pages
    /[slug]           # Dynamic solution detail pages
  /services           # Services page
  /about              # About page
  /careers            # Careers & job listings
    /apply            # Job application form
  /contact            # Contact page
  /api                # API routes
    /contact          # Contact form handler
    /careers/apply    # Job application handler
    /lead             # Lead capture handler
  /data               # Data files (solutions, services, jobs)
/data                 # JSON storage for form submissions
/lib                  # Utility functions
/public               # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI + Radix UI
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🎨 Design System

### Colors
- **Primary Blue**: #0041C2
- **Primary Dark**: #002B7B
- **Cyan Accent**: #00C2FF
- **Navy**: #001B47

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold/Semibold weights
- Body: Regular weight

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/palcnetworks/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero, solutions preview, services, industries |
| Solutions | `/solutions` | All solutions listing |
| Solution Detail | `/solutions/[slug]` | Individual solution with inner solutions |
| Services | `/services` | All services with additional offerings |
| About | `/about` | Company story, mission, leadership, partners |
| Careers | `/careers` | Job listings with expandable details |
| Apply | `/careers/apply` | Job application form |
| Contact | `/contact` | Contact form with map |

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Contact form submissions |
| `/api/careers/apply` | POST | Job applications |
| `/api/lead` | POST | Newsletter/lead capture |

## 🎯 Solutions

1. Open & Disaggregated Networking
2. Data & Network Analytics
3. Cloud & Modern Applications
4. Cybersecurity & IAM
5. Telecom & Edge Infrastructure
6. AI-Ready Infrastructure
7. Enterprise IT Modernization

## 🛎️ Services

1. Network Engineering Services
2. Cloud & DevOps Services
3. Software Development Services
4. Security Engineering Services
5. System Integration Services
6. Testing, QA & Validation
7. Managed Support Services

### Additional Offerings
- OpenLab – 24×7 Network Lab
- Product Engineering & Custom Development
- Training & Knowledge Transfer

## 📦 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Environment Variables

Create a `.env.local` file:
```env
# Add any required environment variables
NEXT_PUBLIC_SITE_URL=https://palcnetworks.ai
```

## 📄 License

Copyright © 2024 PalC Networks. All rights reserved.

---

Built with ❤️ by PalC Networks

