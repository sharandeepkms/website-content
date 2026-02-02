"use client"

import { useMemo } from 'react'
import { Clock, Globe, TrendingUp } from 'lucide-react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

interface Submission {
  type: 'lead' | 'contact' | 'career'
  submittedAt?: string
  timestamp?: string
  createdAt?: string
  pageURL?: string
}

interface SubmissionAnalyticsProps {
  submissions: Submission[]
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981']

export function SubmissionAnalytics({ submissions }: SubmissionAnalyticsProps) {
  // By Form Type
  const byType = useMemo(() => {
    const types = submissions.reduce((acc, sub) => {
      acc[sub.type] = (acc[sub.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return [
      { name: 'Leads', value: types.lead || 0 },
      { name: 'Contacts', value: types.contact || 0 },
      { name: 'Careers', value: types.career || 0 },
    ]
  }, [submissions])

  // Peak Submission Times (by hour)
  const peakTimes = useMemo(() => {
    const hours = Array(24).fill(0).map((_, i) => ({ hour: i, count: 0 }))
    
    submissions.forEach(sub => {
      const date = new Date(sub.submittedAt || sub.timestamp || sub.createdAt || '')
      if (!isNaN(date.getTime())) {
        const hour = date.getHours()
        hours[hour].count++
      }
    })
    
    return hours.filter(h => h.count > 0).sort((a, b) => b.count - a.count).slice(0, 10)
  }, [submissions])

  // Submission Sources (by page URL)
  const sources = useMemo(() => {
    const sourceMap = new Map<string, number>()
    
    submissions.forEach(sub => {
      if (sub.pageURL) {
        try {
          const url = new URL(sub.pageURL)
          const path = url.pathname
          sourceMap.set(path, (sourceMap.get(path) || 0) + 1)
        } catch {
          sourceMap.set(sub.pageURL, (sourceMap.get(sub.pageURL) || 0) + 1)
        }
      }
    })
    
    return Array.from(sourceMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
  }, [submissions])

  const hasSubmissions = submissions.length > 0

  return (
    <div className="space-y-6">
      {/* By Form Type */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Submissions by Type</h3>
        {!hasSubmissions ? (
          <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
            <TrendingUp className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-lg font-medium mb-1">No Submission Data</p>
            <p className="text-sm text-gray-400">Analytics will appear here once form submissions are received</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={byType}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {byType.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        )}
      </div>

      {/* Peak Times */}
      {peakTimes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Peak Submission Times</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={peakTimes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" label={{ value: 'Hour of Day', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Submissions', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Submission Sources */}
      {sources.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Submission Sources</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sources} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

