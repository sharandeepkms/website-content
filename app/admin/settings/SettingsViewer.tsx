"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
  Save,
  RefreshCw,
  Search,
  Filter,
  LogOut,
  CheckCircle2,
  XCircle,
  Edit,
} from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Badge } from '@/app/components/ui/badge'
import { getApiUrl } from '@/lib/api-utils'
import { checkAdminAuth, clearAdminAuth } from '@/app/utils/admin-auth'
import { LoginForm } from '../email-logs/LoginForm'

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

const CATEGORY_COLORS: Record<string, string> = {
  analytics: 'bg-blue-100 text-blue-800',
  management: 'bg-green-100 text-green-800',
  content: 'bg-purple-100 text-purple-800',
  system: 'bg-orange-100 text-orange-800',
  custom: 'bg-gray-100 text-gray-800',
}

export function SettingsViewer() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null)
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    category: 'custom' as Feature['category'],
    enabled: true,
    icon: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const result = await checkAdminAuth()
      setAuthenticated(result.authenticated)
      setCheckingAuth(false)
    }
    checkAuth()
  }, [])

  // Load features
  useEffect(() => {
    if (authenticated) {
      fetchFeatures()
    }
  }, [authenticated])

  const fetchFeatures = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      const response = await fetch(getApiUrl('/api/admin/features'), {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        setFeatures(data.features || [])
      } else {
        console.error('Failed to fetch features')
      }
    } catch (error) {
      console.error('Error fetching features:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFeature = async (id: string, enabled: boolean) => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(getApiUrl(`/api/admin/features?id=${id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({ enabled }),
      })

      if (response.ok) {
        setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled } : f))
        showMessage('success', 'Feature updated successfully')
      } else {
        showMessage('error', 'Failed to update feature')
      }
    } catch (error) {
      console.error('Error toggling feature:', error)
      showMessage('error', 'Failed to update feature')
    }
  }

  const handleAddFeature = async () => {
    if (!newFeature.name || !newFeature.description) {
      showMessage('error', 'Name and description are required')
      return
    }

    try {
      setSaving(true)
      const token = localStorage.getItem('admin_token')
      const response = await fetch(getApiUrl('/api/admin/features'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(newFeature),
      })

      if (response.ok) {
        const data = await response.json()
        setFeatures(prev => [...prev, data.feature])
        setNewFeature({ name: '', description: '', category: 'custom', enabled: true, icon: '' })
        setShowAddForm(false)
        showMessage('success', 'Feature added successfully')
      } else {
        showMessage('error', 'Failed to add feature')
      }
    } catch (error) {
      console.error('Error adding feature:', error)
      showMessage('error', 'Failed to add feature')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteFeature = async (id: string) => {
    if (!confirm('Are you sure you want to delete this feature?')) {
      return
    }

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(getApiUrl(`/api/admin/features?id=${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      })

      if (response.ok) {
        setFeatures(prev => prev.filter(f => f.id !== id))
        showMessage('success', 'Feature deleted successfully')
      } else {
        showMessage('error', 'Failed to delete feature')
      }
    } catch (error) {
      console.error('Error deleting feature:', error)
      showMessage('error', 'Failed to delete feature')
    }
  }

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleLoginSuccess = async () => {
    setCheckingAuth(true)
    setTimeout(async () => {
      const result = await checkAdminAuth()
      setAuthenticated(result.authenticated)
      setCheckingAuth(false)
    }, 100)
  }

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

  // Filter features
  const filteredFeatures = features.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         f.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(features.map(f => f.category)))

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
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Feature Settings</h1>
                <p className="text-white/80 text-sm md:text-base">
                  Manage dashboard features and add custom features
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={fetchFeatures}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={handleLogout}
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
        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}

        {/* Filters and Add Button */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              onClick={() => {
                setShowAddForm(!showAddForm)
                setEditingFeature(null)
                setNewFeature({ name: '', description: '', category: 'custom', enabled: true, icon: '' })
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Feature
            </Button>
          </div>

          {/* Add Feature Form */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="font-semibold mb-4">Add New Feature</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Feature Name"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                />
                <Input
                  placeholder="Icon Name (optional)"
                  value={newFeature.icon}
                  onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
                />
                <div className="md:col-span-2">
                  <Input
                    placeholder="Description"
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  />
                </div>
                <select
                  value={newFeature.category}
                  onChange={(e) => setNewFeature({ ...newFeature, category: e.target.value as Feature['category'] })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="custom">Custom</option>
                  <option value="analytics">Analytics</option>
                  <option value="management">Management</option>
                  <option value="content">Content</option>
                  <option value="system">System</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newFeature.enabled}
                    onChange={(e) => setNewFeature({ ...newFeature, enabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Enabled</label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleAddFeature} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Feature'}
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Features List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : filteredFeatures.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No features found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatures.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.name}</h3>
                      <Badge className={CATEGORY_COLORS[feature.category] || CATEGORY_COLORS.custom}>
                        {feature.category}
                      </Badge>
                      {feature.id.startsWith('custom-') && (
                        <Badge variant="outline" className="text-xs">Custom</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFeature(feature.id, !feature.enabled)}
                      className="flex items-center gap-2 text-sm"
                    >
                      {feature.enabled ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium">Enabled</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-500">Disabled</span>
                        </>
                      )}
                    </button>
                  </div>
                  {feature.id.startsWith('custom-') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

