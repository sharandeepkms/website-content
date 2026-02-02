/** @type {import('next').NextConfig} */

/**
 * BASE PATH CONFIGURATION (Single Source of Truth)
 * 
 * Change this value to deploy at different paths:
 * - "/palc-staging" for AWS deployment at /palc-staging
 * - "" (empty string) for Vercel/root deployment at /
 * 
 * All other files in the project read this value dynamically.
 */
const BASE_PATH = "";

// Allow environment variable override (useful for CI/CD)
const basePath = (
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH.trim()
    : BASE_PATH
).trim();

const nextConfig = {
  // Base path for subpath deployment (e.g., /palc-staging)
  basePath,

  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports - tree-shake heavy libraries
    optimizePackageImports: ['framer-motion', 'lucide-react', '@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-navigation-menu', '@radix-ui/react-tabs', 'recharts'],
  },

  // Generate unique build ID to prevent chunk loading errors
  // This ensures each build has a unique identifier, preventing stale chunk references
  generateBuildId: async () => {
    // Use timestamp for build ID (can also use git commit hash)
    return `build-${Date.now()}`
  },

  // Note: assetPrefix is not needed when using basePath - Next.js handles it automatically
  // Setting assetPrefix can cause CSS loading issues in development
  // assetPrefix: basePath,

  /**
   * Disable Next.js image optimization completely.
   * This avoids `sharp` + standalone runtime issues on EC2/PM2.
   * Images will be served as-is (recommended for server deployments).
   */
  images: {
    unoptimized: true,

    // Allow external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  /**
   * Webpack aliases
   */
  webpack: (config) => {
    const path = require("path");
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      "@/components": path.resolve(__dirname, "app/components"),
      "@/app/components": path.resolve(__dirname, "app/components"),
    };
    return config;
  },

  /**
   * Staging-safe build settings
   * NOTE: These are temporarily enabled for staging deployment.
   * In production, these should be set to false and all errors should be fixed.
   * TODO: Fix all TypeScript and ESLint errors, then set these to false
   */
  typescript: {
    // TODO: Set to false after fixing all TypeScript errors
    ignoreBuildErrors: true,
  },

  eslint: {
    // TODO: Set to false after fixing all ESLint errors
    ignoreDuringBuilds: true,
  },

  /**
   * Environment variables available on both client and server
   * NEXT_PUBLIC_BASE_PATH is set here so all files can access it dynamically
   */
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  /**
   * Redirects for canonical routes
   * Redirect old /company/* routes to new canonical routes
   */
  async redirects() {
    return [
      {
        source: '/company/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/company/contact',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/company/careers',
        destination: '/careers',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

