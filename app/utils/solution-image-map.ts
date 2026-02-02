/**
 * Solution Image Mapping
 * Maps solution pages to their actual image files (with fallbacks)
 */

export const solutionImageMap: Record<string, string> = {
  // Pages with existing JPG/SVG files
  'data-center-modernization-ai-fabrics': '/images/solutions/dc-ai-fabric-hero.jpg',
  'cloud-hybrid-cloud': '/images/solutions/cloud-hybrid-hero.jpg',
  'sonic-open-networking': '/images/solutions/sonic-hero.jpg',
  
  // Pages that need PNG generation (use SVG fallback for now)
  'telecom-edge': '/images/solutions/telecom-edge-5g-hero.png',
  'data-center-modernization': '/images/solutions/data-center-modernization-hero.png',
  'network-observability-visibility': '/images/solutions/network-observability-hero.png',
  'network-observability': '/images/solutions/network-observability-general-hero.png',
  'identity-access-management': '/images/solutions/iam-zero-trust-hero.png',
  'iam': '/images/solutions/iam-general-hero.png',
}

/**
 * Get solution image with automatic fallback
 */
export function getSolutionImage(solutionSlug: string, specifiedPath?: string): string {
  // If a path is specified, use it
  if (specifiedPath) {
    return specifiedPath
  }
  
  // Otherwise, use the mapping
  return solutionImageMap[solutionSlug] || '/images/placeholder-hero.svg'
}

