import { NextRequest, NextResponse } from 'next/server'
import { 
  getFeatures, 
  getFeature, 
  toggleFeature, 
  addCustomFeature, 
  updateFeature, 
  deleteFeature,
  loadFeatureConfig,
} from '@/app/utils/feature-config'
import { checkAdminAuth } from '@/app/utils/admin-auth-server'

/**
 * GET /api/admin/features
 * Get all features
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await checkAdminAuth(request)
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Load latest config (server-side only, safe)
    if (typeof window === 'undefined') {
      loadFeatureConfig()
    }
    
    const features = getFeatures()
    
    return NextResponse.json({
      success: true,
      features,
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to get features:', error)
    }
    return NextResponse.json(
      { error: 'Failed to get features', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/features
 * Add a custom feature
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await checkAdminAuth(request)
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, category, enabled, icon, settings, order } = body

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

    const feature = addCustomFeature({
      name,
      description,
      category: category || 'custom',
      enabled: enabled ?? true,
      icon,
      settings,
      order,
    })

    return NextResponse.json({
      success: true,
      feature,
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to add feature:', error)
    }
    return NextResponse.json(
      { error: 'Failed to add feature', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/features/[id]
 * Update a feature (toggle enable/disable or update settings)
 */
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await checkAdminAuth(request)
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Feature ID is required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { enabled, ...updates } = body

    // If enabled is provided, toggle it
    if (enabled !== undefined) {
      toggleFeature(id, enabled)
    }

    // Update other properties
    if (Object.keys(updates).length > 0) {
      updateFeature(id, updates)
    }

    const feature = getFeature(id)

    return NextResponse.json({
      success: true,
      feature,
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to update feature:', error)
    }
    return NextResponse.json(
      { error: 'Failed to update feature', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/admin/features/[id]
 * Delete a custom feature
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authResult = await checkAdminAuth(request)
    if (!authResult.authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Feature ID is required' },
        { status: 400 }
      )
    }

    const deleted = deleteFeature(id)

    if (!deleted) {
      return NextResponse.json(
        { error: 'Feature not found or cannot be deleted' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Feature deleted successfully',
    })
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Failed to delete feature:', error)
    }
    return NextResponse.json(
      { error: 'Failed to delete feature', details: error.message },
      { status: 500 }
    )
  }
}

