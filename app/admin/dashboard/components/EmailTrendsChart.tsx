"use client"

import { useState } from 'react'
import { Calendar, TrendingUp } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

interface DailyStat {
  date: string
  success: number
  failed: number
  total: number
}

interface EmailTrendsChartProps {
  dailyStats: DailyStat[]
}

export function EmailTrendsChart({ dailyStats }: EmailTrendsChartProps) {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [chartType, setChartType] = useState<'line' | 'bar'>('line')

  // Filter data by date range
  const filteredData = dailyStats.filter(stat => {
    if (dateFrom && stat.date < dateFrom) return false
    if (dateTo && stat.date > dateTo) return false
    return true
  }).map(stat => ({
    ...stat,
    date: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Email Trends</h3>
          <p className="text-sm text-gray-500">Email volume over time</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
          >
            Line
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
          >
            Bar
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <Input
            type="date"
            placeholder="From"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-40"
          />
        </div>
        <span className="text-gray-400">to</span>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            placeholder="To"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-40"
          />
        </div>
        {(dateFrom || dateTo) && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setDateFrom('')
              setDateTo('')
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Chart */}
      {filteredData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <TrendingUp className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-lg font-medium mb-1">No Email Data Available</p>
          <p className="text-sm text-gray-400">
            {dailyStats.length === 0 
              ? 'Email trends will appear here once emails are sent' 
              : 'No data matches the selected date range'}
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'line' ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="success" stroke="#10b981" name="Successful" strokeWidth={2} />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" name="Failed" strokeWidth={2} />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" name="Total" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" fill="#10b981" name="Successful" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
            </BarChart>
          )}
        </ResponsiveContainer>
      )}
    </div>
  )
}

