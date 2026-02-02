"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  User,
  Building,
  Calendar,
  Globe,
  MapPin,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Download,
  Edit,
  Save,
  X,
  Phone,
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { getApiUrl } from '@/lib/api-utils'
import { checkAdminAuth, clearAdminAuth, getAdminToken } from '@/app/utils/admin-auth'
import { LoginForm } from '../../email-logs/LoginForm'
import Link from 'next/link'

interface Submission {
  id: string
  type: 'lead' | 'contact' | 'career'
  email: string
  name?: string
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
  submittedAt?: string
  timestamp?: string
  createdAt?: string
  status?: string
  pageURL?: string
  ipAddress?: string
  [key: string]: any
}

export function SubmissionDetails({ submissionId }: { submissionId: string }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [loading, setLoading] = useState(true)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [editingStatus, setEditingStatus] = useState(false)
  const [status, setStatus] = useState<string>('new')

  // Check authentication
  const checkAuth = useCallback(async () => {
    const result = await checkAdminAuth()
    setAuthenticated(result.authenticated)
    setCheckingAuth(false)
    return result.authenticated
  }, [])

  // Fetch submission details
  const fetchSubmission = useCallback(async () => {
    if (!authenticated) return

    const token = getAdminToken()
    if (!token) {
      setAuthenticated(false)
      clearAdminAuth()
      return
    }

    setLoading(true)
    try {
      const url = `${getApiUrl(`/api/admin/submissions/${submissionId}`)}?t=${Date.now()}`
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
        setSubmission(result.data)
        setStatus(result.data.status || 'new')
      }
    } catch (error: any) {
      console.error('Failed to fetch submission:', error)
    } finally {
      setLoading(false)
    }
  }, [authenticated, submissionId])

  // Update submission status
  const updateStatus = async () => {
    if (!submission) return

    const token = getAdminToken()
    if (!token) return

    try {
      const response = await fetch(getApiUrl(`/api/admin/submissions/${submissionId}/status`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setEditingStatus(false)
        await fetchSubmission()
      }
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Fetch data when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchSubmission()
    }
  }, [authenticated, fetchSubmission])

  // Handle login success
  const handleLoginSuccess = useCallback(async () => {
    setCheckingAuth(true)
    setTimeout(async () => {
      const isAuthenticatedNow = await checkAuth()
      if (isAuthenticatedNow) {
        await fetchSubmission()
      }
    }, 50)
  }, [checkAuth, fetchSubmission])

  const formatDate = (timestamp: string) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submission Not Found</h2>
          <p className="text-gray-600 mb-4">The submission you're looking for doesn't exist.</p>
          <Link href={getApiUrl('/admin/submissions')}>
            <Button>Back to Submissions</Button>
          </Link>
        </div>
      </div>
    )
  }

  const name = submission.name || 
               (submission.firstName && submission.lastName ? `${submission.firstName} ${submission.lastName}` : '') || 
               submission.firstName || 
               'Unknown'

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

        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href={getApiUrl('/admin/submissions')}>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Submission Details</h1>
                <p className="text-sm text-white/80">View full submission information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getTypeBadge(submission.type)}
              {getStatusBadge(submission.status)}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                {!editingStatus && (
                  <Button variant="outline" size="sm" onClick={() => setEditingStatus(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Status
                  </Button>
                )}
              </div>
              
              {editingStatus ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <option value="new">New</option>
                      <option value="processed">Processed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={updateStatus}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setEditingStatus(false)
                      setStatus(submission.status || 'new')
                    }}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="text-base font-medium text-gray-900">{name}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-base font-medium text-gray-900">{submission.email || 'N/A'}</div>
                    </div>
                  </div>
                  {submission.company && (
                    <div className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Company</div>
                        <div className="text-base font-medium text-gray-900">{submission.company}</div>
                      </div>
                    </div>
                  )}
                  {submission.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="text-base font-medium text-gray-900">{submission.phone}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Additional Fields */}
            {Object.keys(submission).filter(key => 
              !['id', 'type', 'email', 'name', 'firstName', 'lastName', 'company', 'phone', 'submittedAt', 'timestamp', 'createdAt', 'status', 'pageURL', 'ipAddress'].includes(key)
            ).length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                <div className="space-y-3">
                  {Object.entries(submission)
                    .filter(([key]) => 
                      !['id', 'type', 'email', 'name', 'firstName', 'lastName', 'company', 'phone', 'submittedAt', 'timestamp', 'createdAt', 'status', 'pageURL', 'ipAddress'].includes(key)
                    )
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-sm text-gray-900">{String(value) || 'N/A'}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Metadata */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Metadata</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Submitted At</div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(submission.submittedAt || submission.timestamp || submission.createdAt || '')}
                    </div>
                  </div>
                </div>
                {submission.pageURL && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Page URL</div>
                      <a href={submission.pageURL} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline break-all">
                        {submission.pageURL}
                      </a>
                    </div>
                  </div>
                )}
                {submission.ipAddress && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">IP Address</div>
                      <div className="text-sm font-medium text-gray-900">{submission.ipAddress}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = `mailto:${submission.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Link href={getApiUrl('/admin/email-logs')} className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Email Logs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

