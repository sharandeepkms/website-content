"use client"

import { useState, useEffect } from 'react'
import { getApiUrl } from '@/lib/api-utils'

interface Feature {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'analytics' | 'management' | 'content' | 'system' | 'custom'
  icon?: string
  settings?: Record<string, any>
  order?: number
}

export function useFeatures() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(getApiUrl('/api/admin/features'), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        const featuresList = data.features || []
        setFeatures(featuresList)
        
        // Also save to localStorage for quick access
        try {
          localStorage.setItem('admin_feature_config', JSON.stringify({
            features: featuresList,
            lastUpdated: new Date().toISOString(),
          }))
        } catch (e) {
          // Ignore localStorage errors
        }
      }
    } catch (error) {
      console.error('Error fetching features:', error)
    } finally {
      setLoading(false)
    }
  }

  const isFeatureEnabled = (id: string): boolean => {
    const feature = features.find(f => f.id === id)
    return feature?.enabled ?? false
  }

  return {
    features,
    loading,
    isFeatureEnabled,
    refresh: fetchFeatures,
  }
}

