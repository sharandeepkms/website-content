"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Gauge, 
  Zap, 
  Clock,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { getApiUrl } from '@/lib/api-utils'

interface WebVitalsStats {
  total: number
  byMetric: Record<string, {
    count: number
    avg: number
    min: number
    max: number
    good: number
    needsImprovement: number
    poor: number
  }>
  byPath: Record<string, number>
  recent: Array<{
    name: string
    value: number
    rating: 'good' | 'needs-improvement' | 'poor'
    path: string
    timestamp: number
  }>
}

interface WebVitalsData {
  success: boolean
  stats: WebVitalsStats
  metrics: any[]
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint (ms) - replaces FID in v5
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  FID: { good: 100, poor: 300 }, // First Input Delay (ms) - deprecated but kept for backward compatibility
}

function getRatingColor(rating: string) {
  switch (rating) {
    case 'good':
      return 'text-green-600 bg-green-50'
    case 'needs-improvement':
      return 'text-yellow-600 bg-yellow-50'
    case 'poor':
      return 'text-red-600 bg-red-50'
    default:
      return 'text-gray-600 bg-gray-50'
  }
}

function getRatingIcon(rating: string) {
  switch (rating) {
    case 'good':
      return <CheckCircle2 className="w-4 h-4" />
    case 'needs-improvement':
      return <AlertCircle className="w-4 h-4" />
    case 'poor':
      return <AlertCircle className="w-4 h-4" />
    default:
      return null
  }
}

function formatMetricValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(3)
  }
  if (name === 'FID' || name === 'FCP' || name === 'LCP' || name === 'TTFB') {
    return `${Math.round(value)}ms`
  }
  return value.toString()
}

export function WebVitalsDashboard() {
  const [data, setData] = useState<WebVitalsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPath, setSelectedPath] = useState<string>('all')

  const fetchData = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const url = selectedPath !== 'all' 
        ? `${getApiUrl('/api/analytics/web-vitals')}?path=${encodeURIComponent(selectedPath)}&limit=1000`
        : `${getApiUrl('/api/analytics/web-vitals')}?limit=1000`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch web vitals:', error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [selectedPath])

  if (loading && !data) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (!data || !data.stats || data.stats.total === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Core Web Vitals
          </h2>
          <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="text-center py-12 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No Web Vitals data collected yet.</p>
          <p className="text-sm mt-2">Metrics will appear as users visit your site.</p>
        </div>
      </div>
    )
  }

  const { stats } = data
  // Prioritize INP over FID (INP is the new Core Web Vital in v5)
  const metrics = Object.keys(stats.byMetric).filter(m => ['LCP', 'INP', 'CLS', 'FCP', 'TTFB', 'FID'].includes(m))
    .sort((a, b) => {
      // Sort to show Core Web Vitals first: LCP, INP, CLS
      const order = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB', 'FID']
      return order.indexOf(a) - order.indexOf(b)
    })

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Core Web Vitals Performance
        </h2>
        <div className="flex items-center gap-2">
          {Object.keys(stats.byPath).length > 1 && (
            <select
              value={selectedPath}
              onChange={(e) => setSelectedPath(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white"
            >
              <option value="all">All Pages</option>
              {Object.keys(stats.byPath).map(path => (
                <option key={path} value={path}>{path}</option>
              ))}
            </select>
          )}
          <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-xl">
          <div className="text-sm text-blue-600 mb-1">Total Metrics</div>
          <div className="text-2xl font-bold text-blue-700">{stats.total.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-green-50 rounded-xl">
          <div className="text-sm text-green-600 mb-1">Good Ratings</div>
          <div className="text-2xl font-bold text-green-700">
            {metrics.reduce((sum, m) => sum + (stats.byMetric[m]?.good || 0), 0).toLocaleString()}
          </div>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl">
          <div className="text-sm text-purple-600 mb-1">Pages Tracked</div>
          <div className="text-2xl font-bold text-purple-700">{Object.keys(stats.byPath).length}</div>
        </div>
      </div>

      {/* Core Web Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metrics.map((metricName) => {
          const metric = stats.byMetric[metricName]
          if (!metric) return null

          const goodPercentage = metric.count > 0 
            ? Math.round((metric.good / metric.count) * 100) 
            : 0
          const needsImprovementPercentage = metric.count > 0
            ? Math.round((metric.needsImprovement / metric.count) * 100)
            : 0
          const poorPercentage = metric.count > 0
            ? Math.round((metric.poor / metric.count) * 100)
            : 0

          return (
            <motion.div
              key={metricName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">{metricName}</h3>
                </div>
                <div className="text-xs text-gray-500">{metric.count} samples</div>
              </div>
              
              <div className="mb-3">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatMetricValue(metricName, metric.avg)}
                </div>
                <div className="text-xs text-gray-600">
                  Avg: {formatMetricValue(metricName, metric.avg)} • 
                  Min: {formatMetricValue(metricName, metric.min)} • 
                  Max: {formatMetricValue(metricName, metric.max)}
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600 font-medium">Good</span>
                  <span className="text-gray-600">{goodPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${goodPercentage}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-600 font-medium">Needs Improvement</span>
                  <span className="text-gray-600">{needsImprovementPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${needsImprovementPercentage}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-red-600 font-medium">Poor</span>
                  <span className="text-gray-600">{poorPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all"
                    style={{ width: `${poorPercentage}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Metrics */}
      {stats.recent && stats.recent.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Metrics</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {stats.recent.slice(-20).reverse().map((metric, index) => (
              <motion.div
                key={`${metric.name}-${metric.timestamp}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRatingColor(metric.rating)}`}>
                    {getRatingIcon(metric.rating)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                    <div className="text-xs text-gray-600">{metric.path}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatMetricValue(metric.name, metric.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(metric.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

