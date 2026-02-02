"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  FileText,
  BookOpen,
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  LogOut,
  Activity,
  Users,
  BarChart3,
  Clock,
  ExternalLink,
  Filter,
  Download,
  Eye,
  Settings,
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { getApiUrl } from '@/lib/api-utils'
import { checkAdminAuth, clearAdminAuth, storeAdminToken } from '@/app/utils/admin-auth'
import { LoginForm } from '../email-logs/LoginForm'
import Link from 'next/link'
import { EmailTrendsChart } from './components/EmailTrendsChart'
import { SubmissionAnalytics } from './components/SubmissionAnalytics'
import { WebVitalsDashboard } from './components/WebVitalsDashboard'
import { useFeatures } from './hooks/useFeatures'

interface DashboardData {
  email: {
    total: number
    success: number
    failed: number
    successRate: string
    dailyStats: Array<{ date: string; success: number; failed: number; total: number }>
    byFormType: {
      lead: number
      contact: number
      career: number
      other: number
    }
    note?: string
  }
  forms: {
    total: number
    today: number
    byType: {
      lead: number
      contact: number
      career: number
    }
  }
  content: {
    blog: {
      total: number
      published: number
    }
    events: {
      total: number
      upcoming: number
    }
    whitepapers: number
    caseStudies: number
  }
  activity: Array<{
    type: 'email' | 'submission'
    action: string
    details: string
    timestamp: string
    id: string
    formType?: string
    status?: string
    email?: string
  }>
  submissions?: Array<{
    type: 'lead' | 'contact' | 'career'
    submittedAt?: string
    timestamp?: string
    createdAt?: string
    pageURL?: string
    [key: string]: any
  }>
}

export function DashboardViewer() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [activityFilter, setActivityFilter] = useState<'all' | 'email' | 'submission'>('all')
  const { isFeatureEnabled } = useFeatures()

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const result = await checkAdminAuth()
      setAuthenticated(result.authenticated)
      setCheckingAuth(false)
    }
    checkAuth()
  }, [])

  // Fetch dashboard data
  const fetchData = async () => {
    if (!authenticated) return
    
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setAuthenticated(false)
      return
    }
    
    setLoading(true)
    try {
      // Add cache-busting query parameter to ensure fresh data
      const url = `${getApiUrl('/api/admin/dashboard')}?t=${Date.now()}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
        credentials: 'include',
      })
      
      if (response.status === 401) {
        setAuthenticated(false)
        return
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.success && result.data) {
        setData(result.data)
        setLastUpdated(new Date())
      } else {
        console.error('Dashboard API returned error:', result.message || 'Unknown error')
        // Set empty data structure to prevent crash
        setData({
          email: {
            total: 0,
            success: 0,
            failed: 0,
            successRate: '0',
            dailyStats: [],
            byFormType: { lead: 0, contact: 0, career: 0, other: 0 },
          },
          forms: {
            total: 0,
            today: 0,
            byType: { lead: 0, contact: 0, career: 0 },
          },
          content: {
            blog: { total: 0, published: 0 },
            events: { total: 0, upcoming: 0 },
            whitepapers: 0,
            caseStudies: 0,
          },
          activity: [],
        })
      }
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error)
      // Set empty data structure to prevent crash
      setData({
        email: {
          total: 0,
          success: 0,
          failed: 0,
          successRate: '0',
          dailyStats: [],
          byFormType: { lead: 0, contact: 0, career: 0, other: 0 },
        },
        forms: {
          total: 0,
          today: 0,
          byType: { lead: 0, contact: 0, career: 0 },
        },
        content: {
          blog: { total: 0, published: 0 },
          events: { total: 0, upcoming: 0 },
          whitepapers: 0,
          caseStudies: 0,
        },
        activity: [],
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchData()
      
      // Auto-refresh every 30 seconds
      const interval = setInterval(() => {
        fetchData()
      }, 30000)
      
      return () => clearInterval(interval)
    }
  }, [authenticated])

  // Handle successful login
  const handleLoginSuccess = async () => {
    setCheckingAuth(true)
    setTimeout(async () => {
      const result = await checkAdminAuth()
      setAuthenticated(result.authenticated)
      setCheckingAuth(false)
    }, 100)
  }

  // Handle logout
  const handleLogout = async () => {
    clearAdminAuth()
    setAuthenticated(false)
    
    try {
      await fetch(getApiUrl('/api/admin/auth'), {
        method: 'DELETE',
        credentials: 'include',
      })
    } catch (error) {
      // Ignore errors
    }
  }

  // Format date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Show loading state
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  // Show login form if not authenticated
  if (!authenticated) {
    return <LoginForm onSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark Banner Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-deep">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dashboard-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dashboard-grid)" />
          </svg>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-white/80 text-sm md:text-base">
                  Overview of emails, forms, and content
                  {lastUpdated && (
                    <span className="ml-2 text-white/60">
                      • Updated {formatDate(lastUpdated.toISOString())}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={fetchData}
                variant="outline"
                size="sm"
                disabled={loading}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                onClick={() => window.location.href = getApiUrl('/admin/email-logs')}
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Logs
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                asChild
              >
                <Link href="/admin/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-red-500/20 border-red-400/30 text-white hover:bg-red-500/30 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        {loading && !data ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : data ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Email Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{data.email.total}</div>
                    <div className="text-sm text-gray-600">Total Emails</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {data.email.total > 0 ? (
                    <>
                      <span className="text-green-600 font-medium">{data.email.successRate}%</span>
                      <span className="text-gray-600">success rate</span>
                    </>
                  ) : (
                    <span className="text-gray-500">No emails sent</span>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {data.email.total > 0 ? (
                    <>
                      {data.email.success} successful, {data.email.failed} failed
                    </>
                  ) : (
                    data.forms.total > 0 ? `${data.forms.total} form submissions pending email` : 'No activity'
                  )}
                </div>
              </motion.div>

              {/* Form Submissions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{data.forms.total}</div>
                    <div className="text-sm text-gray-600">Form Submissions</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">+{data.forms.today}</span>
                  <span className="text-gray-600">today</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {data.forms.byType.lead} leads, {data.forms.byType.contact} contacts
                </div>
              </motion.div>

              {/* Content Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{data.content.blog.total}</div>
                    <div className="text-sm text-gray-600">Blog Posts</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">{data.content.events.total} events</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {data.content.whitepapers} whitepapers, {data.content.caseStudies} case studies
                </div>
              </motion.div>

              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">Online</div>
                    <div className="text-sm text-gray-600">System Status</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 font-medium">All Systems</span>
                  <span className="text-gray-600">operational</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Last email: {data.email.total > 0 ? formatDate(data.email.dailyStats[0]?.date || '') : 'N/A'}
                </div>
              </motion.div>
            </div>

            {/* Charts and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Email Performance */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Email Performance</h2>
                  {data.email.total === 0 && data.forms.total > 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      No emails sent yet
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                      <div className="text-2xl font-bold text-green-600">
                        {data.email.total > 0 ? `${data.email.successRate}%` : 'N/A'}
                      </div>
                    </div>
                    {data.email.total > 0 ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    ) : (
                      <Mail className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="text-sm text-blue-600 mb-1">Successful</div>
                      <div className="text-2xl font-bold text-blue-700">{data.email.success}</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <div className="text-sm text-red-600 mb-1">Failed</div>
                      <div className="text-2xl font-bold text-red-700">{data.email.failed}</div>
                    </div>
                  </div>
                  {data.email.note && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">{data.email.note}</p>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">By Form Type</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lead Forms</span>
                        <span className="font-medium">{data.email.byFormType.lead}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Contact Forms</span>
                        <span className="font-medium">{data.email.byFormType.contact}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Career Applications</span>
                        <span className="font-medium">{data.email.byFormType.career}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Overview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Content Overview</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <div className="text-sm text-purple-600 mb-1">Blog Posts</div>
                      <div className="text-2xl font-bold text-purple-700">{data.content.blog.total}</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="text-sm text-blue-600 mb-1">Events</div>
                      <div className="text-2xl font-bold text-blue-700">{data.content.events.total}</div>
                      <div className="text-xs text-blue-600 mt-1">{data.content.events.upcoming} upcoming</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl">
                      <div className="text-sm text-green-600 mb-1">Whitepapers</div>
                      <div className="text-2xl font-bold text-green-700">{data.content.whitepapers}</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl">
                      <div className="text-sm text-orange-600 mb-1">Case Studies</div>
                      <div className="text-2xl font-bold text-orange-700">{data.content.caseStudies}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-2">Form Submissions</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lead Forms</span>
                        <span className="font-medium">{data.forms.byType.lead}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Contact Forms</span>
                        <span className="font-medium">{data.forms.byType.contact}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Career Applications</span>
                        <span className="font-medium">{data.forms.byType.career}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section - Always show Email Trends */}
            <div className="mb-8">
              <EmailTrendsChart dailyStats={data.email.dailyStats || []} />
            </div>

            {/* Submission Analytics - Always show */}
            <div className="mb-8">
              <SubmissionAnalytics submissions={data.submissions || []} />
            </div>

            {/* Web Vitals Performance - Always show */}
            <div className="mb-8">
              <WebVitalsDashboard />
            </div>

            {/* Recent Activity (if enabled) */}
            {isFeatureEnabled('recent-activity') && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Filter Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={activityFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActivityFilter('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={activityFilter === 'email' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActivityFilter('email')}
                    >
                      <Mail className="w-3 h-3 mr-1" />
                      Emails
                    </Button>
                    <Button
                      variant={activityFilter === 'submission' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActivityFilter('submission')}
                    >
                      <FileText className="w-3 h-3 mr-1" />
                      Forms
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = getApiUrl('/admin/email-logs')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View All Logs
                  </Button>
                </div>
              </div>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {data.activity.filter(item => 
                  activityFilter === 'all' || item.type === activityFilter
                ).length > 0 ? (
                  data.activity
                    .filter(item => activityFilter === 'all' || item.type === activityFilter)
                    .map((item, index) => (
                      <motion.div
                        key={`${item.type}-${item.id}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          item.type === 'email' 
                            ? item.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                            : 'bg-blue-100'
                        }`}>
                          {item.type === 'email' ? (
                            <Mail className={`w-4 h-4 ${item.status === 'success' ? 'text-green-600' : 'text-red-600'}`} />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{item.action}</span>
                            {item.formType && (
                              <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded capitalize">
                                {item.formType}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 truncate">
                            {item.details}
                            {item.email && item.type === 'submission' && (
                              <span className="text-gray-400 ml-2">• {item.email}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.timestamp)}
                        </div>
                      </motion.div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No {activityFilter !== 'all' ? activityFilter : ''} activity found
                  </div>
                )}
              </div>
              {data.activity.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    Showing {data.activity.filter(item => activityFilter === 'all' || item.type === activityFilter).length} of {data.activity.length} activities
                  </p>
                </div>
              )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600">Failed to load dashboard data</p>
            <Button onClick={fetchData} className="mt-4">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

