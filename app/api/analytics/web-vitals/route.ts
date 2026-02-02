import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface WebVitalsMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  url: string
  path: string
  timestamp: number
  userAgent?: string
  connection?: {
    effectiveType?: string
    downlink?: number
    rtt?: number
  }
}

const METRICS_FILE = path.join(process.cwd(), 'data', 'web-vitals.json')

function loadMetrics(): WebVitalsMetric[] {
  if (!fs.existsSync(METRICS_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(METRICS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error loading web vitals metrics:', error)
    }
    return []
  }
}

function saveMetrics(metrics: WebVitalsMetric[]) {
  const dataDir = path.dirname(METRICS_FILE)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  
  // Keep only last 10,000 metrics to prevent file from growing too large
  const limitedMetrics = metrics.slice(-10000)
  
  fs.writeFileSync(METRICS_FILE, JSON.stringify(limitedMetrics, null, 2), 'utf-8')
}

export async function POST(request: NextRequest) {
  try {
    const metric: WebVitalsMetric = await request.json()

    // Validate metric data
    if (!metric.name || typeof metric.value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      )
    }

    // Load existing metrics
    const metrics = loadMetrics()

    // Add new metric
    metrics.push({
      ...metric,
      timestamp: metric.timestamp || Date.now(),
    })

    // Save metrics
    saveMetrics(metrics)

    return NextResponse.json({ success: true })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error saving web vitals metric:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const limit = parseInt(searchParams.get('limit') || '1000', 10)

    const metrics = loadMetrics()

    // Filter by path if provided
    let filtered = metrics
    if (path) {
      filtered = metrics.filter(m => m.path === path)
    }

    // Get latest metrics
    const latest = filtered.slice(-limit)

    // Calculate aggregated stats
    const stats = {
      total: filtered.length,
      byMetric: {} as Record<string, {
        count: number
        avg: number
        min: number
        max: number
        good: number
        needsImprovement: number
        poor: number
      }>,
      byPath: {} as Record<string, number>,
      recent: latest.slice(-100), // Last 100 metrics
    }

    // Aggregate by metric name
    filtered.forEach(metric => {
      if (!stats.byMetric[metric.name]) {
        stats.byMetric[metric.name] = {
          count: 0,
          avg: 0,
          min: Infinity,
          max: -Infinity,
          good: 0,
          needsImprovement: 0,
          poor: 0,
        }
      }

      const stat = stats.byMetric[metric.name]
      stat.count++
      stat.avg += metric.value
      stat.min = Math.min(stat.min, metric.value)
      stat.max = Math.max(stat.max, metric.value)

      if (metric.rating === 'good') stat.good++
      else if (metric.rating === 'needs-improvement') stat.needsImprovement++
      else if (metric.rating === 'poor') stat.poor++

      // Count by path
      if (!stats.byPath[metric.path]) {
        stats.byPath[metric.path] = 0
      }
      stats.byPath[metric.path]++
    })

    // Calculate averages
    Object.keys(stats.byMetric).forEach(name => {
      const stat = stats.byMetric[name]
      stat.avg = stat.count > 0 ? stat.avg / stat.count : 0
      if (stat.min === Infinity) stat.min = 0
      if (stat.max === -Infinity) stat.max = 0
    })

    return NextResponse.json({
      success: true,
      stats,
      metrics: latest,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error loading web vitals metrics:', error)
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

