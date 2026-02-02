"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Calendar,
  Mail,
  User,
  Building,
  Clock,
  ExternalLink,
  RefreshCw,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Badge } from '@/app/components/ui/badge'
import { getApiUrl } from '@/lib/api-utils'
import { checkAdminAuth, clearAdminAuth, getAdminToken } from '@/app/utils/admin-auth'
import { LoginForm } from '../email-logs/LoginForm'
import Link from 'next/link'

interface Submission {
  id: string
  type: 'lead' | 'contact' | 'career'
  email: string
  name?: string
  firstName?: string
  lastName?: string
  company?: string
  submittedAt?: string
  timestamp?: string
  createdAt?: string
  status?: string
  pageURL?: string
  ipAddress?: string
  [key: string]: any
}

export function SubmissionsViewer() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [formTypeFilter, setFormTypeFilter] = useState<'all' | 'lead' | 'contact' | 'career'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'processed' | 'archived'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  
  // Check authentication
  const checkAuth = useCallback(async () => {
    const result = await checkAdminAuth()
    setAuthenticated(result.authenticated)
    setCheckingAuth(false)
    return result.authenticated
  }, [])

  // Fetch submissions
  const fetchSubmissions = useCallback(async () => {
    if (!authenticated) return

    const token = getAdminToken()
    if (!token) {
      setAuthenticated(false)
      clearAdminAuth()
      return
    }

    setLoading(true)
    try {
      const url = `${getApiUrl('/api/admin/submissions')}?t=${Date.now()}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
        credentials: 'include',
      })

      if (response.status === 401) {
        setAuthenticated(false)
        clearAdminAuth()
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success && result.data) {
        setSubmissions(result.data)
      }
    } catch (error: any) {
      console.error('Failed to fetch submissions:', error)
    } finally {
      setLoading(false)
    }
  }, [authenticated])

  // Apply filters
  useEffect(() => {
    let filtered = [...submissions]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(sub => {
        const name = sub.name || (sub.firstName && sub.lastName ? `${sub.firstName} ${sub.lastName}` : '') || sub.firstName || ''
        const email = sub.email || ''
        const company = sub.company || ''
        return (
          name.toLowerCase().includes(query) ||
          email.toLowerCase().includes(query) ||
          company.toLowerCase().includes(query)
        )
      })
    }

    // Form type filter
    if (formTypeFilter !== 'all') {
      filtered = filtered.filter(sub => sub.type === formTypeFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => {
        const status = sub.status || 'new'
        return status === statusFilter
      })
    }

    // Date range filter
    if (dateFrom) {
      filtered = filtered.filter(sub => {
        const date = sub.submittedAt || sub.timestamp || sub.createdAt || ''
        return date >= dateFrom
      })
    }
    if (dateTo) {
      filtered = filtered.filter(sub => {
        const date = sub.submittedAt || sub.timestamp || sub.createdAt || ''
        return date <= dateTo + 'T23:59:59'
      })
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.submittedAt || a.timestamp || a.createdAt || 0).getTime()
      const dateB = new Date(b.submittedAt || b.timestamp || b.createdAt || 0).getTime()
      return dateB - dateA
    })

    setFilteredSubmissions(filtered)
  }, [submissions, searchQuery, formTypeFilter, statusFilter, dateFrom, dateTo])

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Fetch data when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchSubmissions()
      
      // Auto-refresh every 30 seconds
      const interval = setInterval(() => {
        fetchSubmissions()
      }, 30000)
      
      return () => clearInterval(interval)
    }
  }, [authenticated, fetchSubmissions])

  // Handle login success
  const handleLoginSuccess = useCallback(async () => {
    setCheckingAuth(true)
    setTimeout(async () => {
      const isAuthenticatedNow = await checkAuth()
      if (isAuthenticatedNow) {
        await fetchSubmissions()
      }
    }, 50)
  }, [checkAuth, fetchSubmissions])

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

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Email', 'Company', 'Submitted At', 'Status', 'Page URL', 'IP Address']
    const rows = filteredSubmissions.map(sub => {
      const name = sub.name || (sub.firstName && sub.lastName ? `${sub.firstName} ${sub.lastName}` : '') || sub.firstName || ''
      const date = sub.submittedAt || sub.timestamp || sub.createdAt || ''
      return [
        sub.id || '',
        sub.type || '',
        name,
        sub.email || '',
        sub.company || '',
        date,
        sub.status || 'new',
        sub.pageURL || '',
        sub.ipAddress || '',
      ]
    })

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `submissions-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (timestamp: string) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status?: string) => {
    const s = status || 'new'
    if (s === 'processed') {
      return <Badge className="bg-green-100 text-green-800">Processed</Badge>
    }
    if (s === 'archived') {
      return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>
    }
    return <Badge className="bg-blue-100 text-blue-800">New</Badge>
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      lead: 'bg-purple-100 text-purple-800',
      contact: 'bg-blue-100 text-blue-800',
      career: 'bg-green-100 text-green-800',
    }
    return <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{type}</Badge>
  }

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
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-deep">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Form Submissions</h1>
                <p className="text-sm text-white/80">View and manage all form submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href={getApiUrl('/admin/dashboard')}>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                  Dashboard
                </Button>
              </Link>
              <Button onClick={fetchSubmissions} variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm" className="bg-red-500/20 border-red-400/30 text-white hover:bg-red-500/30 backdrop-blur-sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="text-sm text-white/80 mb-1">Total Submissions</div>
              <div className="text-2xl font-bold text-white">{submissions.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="text-sm text-white/80 mb-1">Leads</div>
              <div className="text-2xl font-bold text-white">{submissions.filter(s => s.type === 'lead').length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="text-sm text-white/80 mb-1">Contacts</div>
              <div className="text-2xl font-bold text-white">{submissions.filter(s => s.type === 'contact').length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
              <div className="text-sm text-white/80 mb-1">Careers</div>
              <div className="text-2xl font-bold text-white">{submissions.filter(s => s.type === 'career').length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Filters & Search</h2>
            <div className="flex items-center gap-2">
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Form Type Filter */}
            <div>
              <select
                value={formTypeFilter}
                onChange={(e) => setFormTypeFilter(e.target.value as any)}
                className="w-full h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="all">All Types</option>
                <option value="lead">Leads</option>
                <option value="contact">Contacts</option>
                <option value="career">Careers</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="processed">Processed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <Input
                type="date"
                placeholder="From Date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div>
              <Input
                type="date"
                placeholder="To Date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          {(searchQuery || formTypeFilter !== 'all' || statusFilter !== 'all' || dateFrom || dateTo) && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setFormTypeFilter('all')
                  setStatusFilter('all')
                  setDateFrom('')
                  setDateTo('')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Submissions ({filteredSubmissions.length})
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No submissions found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => {
                    const name = submission.name || 
                                 (submission.firstName && submission.lastName ? `${submission.firstName} ${submission.lastName}` : '') || 
                                 submission.firstName || 
                                 'Unknown'
                    return (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getTypeBadge(submission.type)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{submission.email || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{submission.company || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(submission.submittedAt || submission.timestamp || submission.createdAt || '')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(submission.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link href={getApiUrl(`/admin/submissions/${submission.id}`)}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

