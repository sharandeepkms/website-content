"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Download,
  Filter,
  Search,
  Calendar,
  LogOut,
  ArrowUpDown,
  X
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Badge } from '@/app/components/ui/badge'
import { getApiUrl } from '@/lib/api-utils'
import { LoginForm } from './LoginForm'

interface EmailLog {
  id: string
  timestamp: string
  status: 'success' | 'failed'
  from: string
  to: string | string[]
  cc?: string | string[]
  subject: string
  errorCode?: string
  errorMessage?: string
  formType?: 'lead' | 'contact' | 'career' | 'other'
  submissionId?: string
}

export function EmailLogsViewer() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [logs, setLogs] = useState<EmailLog[]>([])
  const [filteredLogs, setFilteredLogs] = useState<EmailLog[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'timestamp' | 'status' | 'subject' | 'from'>('timestamp')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  // Function to check authentication
  const checkAuth = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('admin_token')
    const authTime = localStorage.getItem('admin_auth_time')
    
    // Check if token exists and is not expired (24 hours)
    if (token && authTime) {
      const age = Date.now() - parseInt(authTime)
      if (age < 24 * 60 * 60 * 1000) {
        // Verify token with server
        try {
          const response = await fetch(getApiUrl('/api/admin/auth'), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Send token in header
            },
            credentials: 'include',
          })
          
          if (response.status === 200) {
            const data = await response.json()
            if (data.authenticated === true) {
              setAuthenticated(true)
              setCheckingAuth(false)
              return
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error)
        }
      } else {
        // Expired, clear localStorage
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_auth_time')
      }
    }
    
    // If we get here, not authenticated
    setAuthenticated(false)
    setCheckingAuth(false)
  }

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Handle successful login
  const handleLoginSuccess = () => {
    // Immediately set authenticated and re-check
    setCheckingAuth(true)
    // Small delay to ensure token is stored
    setTimeout(() => {
      checkAuth()
    }, 100)
  }

  const handleLogout = async () => {
    // Clear localStorage
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_auth_time')
    setAuthenticated(false)
    
    // Optional: call logout API (but not required since we're using tokens)
    try {
      await fetch(getApiUrl('/api/admin/auth'), {
        method: 'DELETE',
        credentials: 'include',
      })
    } catch (error) {
      // Ignore errors - localStorage is already cleared
    }
  }

  const fetchLogs = async () => {
    if (!authenticated) return
    
    // Get token from localStorage
    const token = localStorage.getItem('admin_token')
    if (!token) {
      setAuthenticated(false)
      return
    }
    
    setLoading(true)
    try {
      const url = statusFilter === 'all' 
        ? getApiUrl('/api/admin/email-logs')
        : getApiUrl(`/api/admin/email-logs?status=${statusFilter}`)
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in header
        },
        credentials: 'include',
      })
      const data = await response.json()
      
      if (data.success) {
        setLogs(data.data || [])
        setFilteredLogs(data.data || [])
      } else if (data.message?.includes('Unauthorized')) {
        // Token invalid, clear and logout
        localStorage.removeItem('admin_token')
        localStorage.removeItem('admin_auth_time')
        setAuthenticated(false)
      }
    } catch (error) {
      console.error('Failed to fetch email logs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchLogs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, authenticated])

  useEffect(() => {
    let filtered = [...logs]

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter)
    }

    // Apply date range filter
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      fromDate.setHours(0, 0, 0, 0)
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp)
        logDate.setHours(0, 0, 0, 0)
        return logDate >= fromDate
      })
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp)
        return logDate <= toDate
      })
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(log => 
        log.subject.toLowerCase().includes(query) ||
        log.from.toLowerCase().includes(query) ||
        (typeof log.to === 'string' ? log.to.toLowerCase().includes(query) : log.to.some(email => email.toLowerCase().includes(query))) ||
        log.formType?.toLowerCase().includes(query) ||
        log.errorMessage?.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case 'timestamp':
          aValue = new Date(a.timestamp).getTime()
          bValue = new Date(b.timestamp).getTime()
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        case 'subject':
          aValue = a.subject.toLowerCase()
          bValue = b.subject.toLowerCase()
          break
        case 'from':
          aValue = a.from.toLowerCase()
          bValue = b.from.toLowerCase()
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    setFilteredLogs(filtered)
  }, [searchQuery, logs, statusFilter, sortBy, sortOrder, dateFrom, dateTo])

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatRecipients = (recipients: string | string[]) => {
    if (typeof recipients === 'string') {
      return recipients
    }
    return recipients.join(', ')
  }

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Status', 'From', 'To', 'CC', 'Subject', 'Form Type', 'Error Code', 'Error Message'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.status,
        log.from,
        formatRecipients(log.to),
        log.cc ? formatRecipients(log.cc) : '',
        `"${log.subject.replace(/"/g, '""')}"`,
        log.formType || '',
        log.errorCode || '',
        log.errorMessage ? `"${log.errorMessage.replace(/"/g, '""')}"` : '',
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    failed: logs.filter(l => l.status === 'failed').length,
  }

  // Show login form if not authenticated
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

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
              <pattern id="email-logs-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#email-logs-grid)" />
          </svg>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Email Logs</h1>
                <p className="text-white/80 text-sm md:text-base">View all email activity (success and failed)</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button 
                onClick={fetchLogs} 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button 
                onClick={exportLogs} 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
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

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="text-sm text-white/80 mb-2">Total Emails</div>
              <div className="text-3xl font-bold text-white">{stats.total}</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-5 border border-green-400/30">
              <div className="text-sm text-green-100 mb-2">Successful</div>
              <div className="text-3xl font-bold text-green-50">{stats.success}</div>
            </div>
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-5 border border-red-400/30">
              <div className="text-sm text-red-100 mb-2">Failed</div>
              <div className="text-3xl font-bold text-red-50">{stats.failed}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="space-y-4">
            {/* Search and Status Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by subject, email, form type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'success' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('success')}
                  className="text-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Success
                </Button>
                <Button
                  variant={statusFilter === 'failed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter('failed')}
                  className="text-red-700"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Failed
                </Button>
              </div>
            </div>

            {/* Date Range and Sort Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              {/* Date Range */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    From Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="pl-10"
                    />
                    {dateFrom && (
                      <button
                        onClick={() => setDateFrom('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    To Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      min={dateFrom}
                      className="pl-10"
                    />
                    {dateTo && (
                      <button
                        onClick={() => setDateTo('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div className="flex gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'timestamp' | 'status' | 'subject' | 'from')}
                    className="h-11 px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-transparent"
                  >
                    <option value="timestamp">Date</option>
                    <option value="status">Status</option>
                    <option value="subject">Subject</option>
                    <option value="from">From</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Order
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="h-11 px-4"
                  >
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    {sortOrder === 'asc' ? 'Asc' : 'Desc'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(dateFrom || dateTo || searchQuery) && (
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setDateFrom('')
                    setDateTo('')
                    setSearchQuery('')
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Loading email logs...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No email logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Form Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <motion.tr
                      key={log.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.status === 'success' ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Success
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Failed
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(log.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.from}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {formatRecipients(log.to)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        <div className="truncate" title={log.subject}>
                          {log.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {log.formType && (
                          <Badge variant="outline" className="capitalize">
                            {log.formType}
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-red-600 max-w-xs">
                        {log.status === 'failed' && (
                          <div>
                            <div className="font-medium">{log.errorCode || 'Unknown'}</div>
                            <div className="text-xs text-gray-500 truncate" title={log.errorMessage}>
                              {log.errorMessage}
                            </div>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

