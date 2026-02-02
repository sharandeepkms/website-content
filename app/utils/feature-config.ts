export interface Feature {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'analytics' | 'management' | 'content' | 'system' | 'custom'
  icon?: string
  component?: string
  settings?: Record<string, any>
  order?: number
}

export interface FeatureConfig {
  features: Feature[]
  lastUpdated: string
}

const DEFAULT_FEATURES: Feature[] = [
  {
    id: 'email-trends',
    name: 'Email Trends Chart',
    description: 'Display email volume and success/failure trends over time',
    enabled: true,
    category: 'analytics',
    icon: 'TrendingUp',
    order: 1,
  },
  {
    id: 'submission-analytics',
    name: 'Submission Analytics',
    description: 'Show submission breakdown by type, peak times, and sources',
    enabled: true,
    category: 'analytics',
    icon: 'BarChart3',
    order: 2,
  },
  {
    id: 'recent-activity',
    name: 'Recent Activity Feed',
    description: 'Display recent email and form submission activity',
    enabled: true,
    category: 'management',
    icon: 'Activity',
    order: 3,
  },
  {
    id: 'email-logs',
    name: 'Email Logs Viewer',
    description: 'View and filter all email logs (success and failed)',
    enabled: true,
    category: 'management',
    icon: 'Mail',
    order: 4,
  },
  {
    id: 'form-submissions',
    name: 'Form Submissions Manager',
    description: 'View and manage all form submissions',
    enabled: true,
    category: 'management',
    icon: 'FileText',
    order: 5,
  },
  {
    id: 'content-overview',
    name: 'Content Overview',
    description: 'Display blog posts, events, whitepapers, and case studies stats',
    enabled: true,
    category: 'content',
    icon: 'BookOpen',
    order: 6,
  },
  {
    id: 'export-reports',
    name: 'Export & Reports',
    description: 'Export dashboard data and generate reports',
    enabled: true,
    category: 'management',
    icon: 'Download',
    order: 7,
  },
  {
    id: 'notifications',
    name: 'Notifications System',
    description: 'Get alerts for important events and failures',
    enabled: false,
    category: 'system',
    icon: 'Bell',
    order: 8,
  },
  {
    id: 'user-management',
    name: 'User Management',
    description: 'Manage admin users and permissions',
    enabled: false,
    category: 'system',
    icon: 'Users',
    order: 9,
  },
  {
    id: 'api-monitoring',
    name: 'API Monitoring',
    description: 'Monitor API health and performance metrics',
    enabled: false,
    category: 'system',
    icon: 'Activity',
    order: 10,
  },
]

let featureConfig: FeatureConfig = {
  features: DEFAULT_FEATURES,
  lastUpdated: new Date().toISOString(),
}

/**
 * Get all features
 */
export function getFeatures(): Feature[] {
  return featureConfig.features.sort((a, b) => (a.order || 999) - (b.order || 999))
}

/**
 * Get enabled features
 */
export function getEnabledFeatures(): Feature[] {
  return getFeatures().filter(f => f.enabled)
}

/**
 * Get feature by ID
 */
export function getFeature(id: string): Feature | undefined {
  return featureConfig.features.find(f => f.id === id)
}

/**
 * Check if feature is enabled
 * Server-side safe: only uses in-memory config
 * Client-side should use useFeatures hook for localStorage access
 */
export function isFeatureEnabled(id: string): boolean {
  // Always use in-memory config - this is safe for server-side
  // Client-side code should use useFeatures hook which fetches from API
  const feature = getFeature(id)
  return feature?.enabled ?? false
}

/**
 * Enable/disable a feature
 */
export function toggleFeature(id: string, enabled: boolean): void {
  const feature = getFeature(id)
  if (feature) {
    feature.enabled = enabled
    featureConfig.lastUpdated = new Date().toISOString()
    saveFeatureConfig()
  }
}

/**
 * Add a custom feature
 */
export function addCustomFeature(feature: Omit<Feature, 'id' | 'category'> & { category?: Feature['category'] }): Feature {
  const newFeature: Feature = {
    ...feature,
    id: `custom-${Date.now()}`,
    category: feature.category || 'custom',
    enabled: feature.enabled ?? true,
  }
  
  featureConfig.features.push(newFeature)
  featureConfig.lastUpdated = new Date().toISOString()
  saveFeatureConfig()
  
  return newFeature
}

/**
 * Update a feature
 */
export function updateFeature(id: string, updates: Partial<Feature>): Feature | null {
  const feature = getFeature(id)
  if (feature) {
    Object.assign(feature, updates)
    featureConfig.lastUpdated = new Date().toISOString()
    saveFeatureConfig()
    return feature
  }
  return null
}

/**
 * Delete a feature (only custom features can be deleted)
 */
export function deleteFeature(id: string): boolean {
  const feature = getFeature(id)
  if (feature && feature.id.startsWith('custom-')) {
    featureConfig.features = featureConfig.features.filter(f => f.id !== id)
    featureConfig.lastUpdated = new Date().toISOString()
    saveFeatureConfig()
    return true
  }
  return false
}

/**
 * Save feature configuration to file (for persistence)
 */
function saveFeatureConfig(): void {
  // Only save on server-side to avoid SSR issues
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs')
      const path = require('path')
      const configPath = path.join(process.cwd(), 'data', 'feature-config.json')
      const dataDir = path.dirname(configPath)
      
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      
      fs.writeFileSync(configPath, JSON.stringify(featureConfig, null, 2))
    } catch (error) {
      // Silently fail - this is not critical
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to save feature config:', error)
      }
    }
  }
  // Don't save to localStorage here - let the client-side code handle it
}

/**
 * Load feature configuration from file (server-side only)
 */
export function loadFeatureConfig(): void {
  // Only load on server-side to avoid SSR issues
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs')
      const path = require('path')
      const configPath = path.join(process.cwd(), 'data', 'feature-config.json')
      
      if (fs.existsSync(configPath)) {
        const fileContent = fs.readFileSync(configPath, 'utf-8')
        const loaded = JSON.parse(fileContent) as FeatureConfig
        
        // Merge with defaults (in case new features were added)
        const defaultIds = new Set(DEFAULT_FEATURES.map(f => f.id))
        const loadedIds = new Set(loaded.features.map(f => f.id))
        
        // Add new default features
        DEFAULT_FEATURES.forEach(defaultFeature => {
          if (!loadedIds.has(defaultFeature.id)) {
            loaded.features.push(defaultFeature)
          } else {
            // Update existing feature but preserve enabled state
            const existing = loaded.features.find(f => f.id === defaultFeature.id)
            if (existing) {
              Object.assign(existing, {
                ...defaultFeature,
                enabled: existing.enabled, // Preserve user's choice
              })
            }
          }
        })
        
        // Remove features that no longer exist in defaults (unless custom)
        loaded.features = loaded.features.filter(f => 
          defaultIds.has(f.id) || f.id.startsWith('custom-')
        )
        
        featureConfig = loaded
      }
    } catch (error) {
      // Silently fail - will use defaults
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to load feature config:', error)
      }
    }
  }
  // Client-side loading is handled by useFeatures hook
}

// Load config on module initialization (server-side only)
// Client-side will load via API and useFeatures hook
if (typeof window === 'undefined') {
  try {
    loadFeatureConfig()
  } catch (error) {
    // Silently fail - will use defaults
  }
}

