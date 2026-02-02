"use client"

import { useState, useEffect } from 'react'
import { ConfiguratorWizard } from '@/app/components/configurator/ConfiguratorWizard'
import { LeadCaptureModal } from '@/app/components/LeadCaptureModal'
import { useToast } from '@/app/components/ui/use-toast'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { X, Plus, Trash2, Save, Upload, Share2, Copy, Check } from 'lucide-react'
import { Badge } from '@/app/components/ui/badge'
import jsPDF from 'jspdf'
import { getImageSrc } from '@/app/utils/image-path'
import { getApiUrl } from '@/lib/api-utils'

interface ConfigOption {
  id: string
  name: string
  description: string
  price?: number
  category: 'switch' | 'server' | 'nic' | 'dpu' | 'transceiver' | 'cable'
}

interface BOM {
  items: ConfigOption[]
  total: number
  estimatedDelivery: string
}

// Multi-Product Configurator Component
function MultiProductConfigurator({ onComplete }: { onComplete: (config: ConfigOption[]) => void }) {
  const [allSelectedProducts, setAllSelectedProducts] = useState<ConfigOption[]>([])
  const [activeProductType, setActiveProductType] = useState<'switch' | 'server' | 'nic' | 'dpu' | 'transceiver' | 'cable' | null>(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [isConfigurationCompleted, setIsConfigurationCompleted] = useState(false)
  const [productsBeforeCompletion, setProductsBeforeCompletion] = useState<ConfigOption[]>([])

  const productTypes: Array<{ type: 'switch' | 'server' | 'nic' | 'dpu' | 'transceiver' | 'cable', label: string }> = [
    { type: 'switch', label: 'Switches' },
    { type: 'server', label: 'Servers' },
    { type: 'nic', label: 'NICs' },
    { type: 'dpu', label: 'DPUs' },
    { type: 'transceiver', label: 'Transceivers' },
    { type: 'cable', label: 'Cables' },
  ]

  const handleProductTypeSelect = (productType: 'switch' | 'server' | 'nic' | 'dpu' | 'transceiver' | 'cable') => {
    setActiveProductType(productType)
    setShowAddProduct(true)
  }

  const handleWizardComplete = (config: ConfigOption[]) => {
    // Merge new products with existing ones
    setAllSelectedProducts(prev => {
      const updated = [...prev]
      config.forEach(newProduct => {
        // Check if product already exists, if not add it
        if (!updated.find(p => p.id === newProduct.id)) {
          updated.push(newProduct)
        }
      })
      return updated
    })
    setShowAddProduct(false)
    setActiveProductType(null)
    
    // If configuration was already completed, mark it as needing update
    if (isConfigurationCompleted) {
      // Configuration needs to be regenerated
    }
  }

  const handleRemoveProduct = (productId: string) => {
    setAllSelectedProducts(prev => prev.filter(p => p.id !== productId))
    // If configuration was completed and product is removed, mark as needing update
    if (isConfigurationCompleted) {
      // Configuration needs to be regenerated
    }
  }
  
  // Check if products have changed since completion
  const hasProductsChanged = () => {
    if (!isConfigurationCompleted || productsBeforeCompletion.length === 0) {
      return false
    }
    // Check if product count changed
    if (allSelectedProducts.length !== productsBeforeCompletion.length) {
      return true
    }
    // Check if any product IDs are different
    const currentIds = allSelectedProducts.map(p => p.id).sort()
    const previousIds = productsBeforeCompletion.map(p => p.id).sort()
    return JSON.stringify(currentIds) !== JSON.stringify(previousIds)
  }

  const handleFinalComplete = () => {
    if (allSelectedProducts.length === 0) {
      return
    }
    setIsConfigurationCompleted(true)
    setProductsBeforeCompletion([...allSelectedProducts])
    onComplete(allSelectedProducts)
  }
  
  const handleUpdateConfiguration = () => {
    if (allSelectedProducts.length === 0) {
      return
    }
    // Regenerate BOM with updated products
    setIsConfigurationCompleted(true)
    setProductsBeforeCompletion([...allSelectedProducts])
    onComplete(allSelectedProducts)
    // Scroll to export section after update
    setTimeout(() => {
      const exportSection = document.querySelector('[data-export-section]')
      if (exportSection) {
        exportSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const getCategoryLabel = (category: string) => {
    return productTypes.find(pt => pt.type === category)?.label || category
  }

  // Group products by category
  const productsByCategory = allSelectedProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, ConfigOption[]>)

  if (showAddProduct && activeProductType) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Add {productTypes.find(pt => pt.type === activeProductType)?.label}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowAddProduct(false)
              setActiveProductType(null)
            }}
          >
            Cancel
          </Button>
        </div>
        <ConfiguratorWizard 
          productType={activeProductType} 
          onComplete={handleWizardComplete}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Selected Products Summary */}
      {allSelectedProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Selected Products</h3>
            <Badge variant="outline" className="text-sm">
              {allSelectedProducts.length} {allSelectedProducts.length === 1 ? 'product' : 'products'}
            </Badge>
          </div>
          
          {/* Products grouped by category */}
          {Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{getCategoryLabel(category)}</h4>
              <div className="space-y-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {product.price && (
                        <span className="font-semibold text-gray-900">${product.price.toLocaleString()}</span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Show update notification if products were changed after completion */}
          {hasProductsChanged() && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-900 text-xs font-bold">!</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-yellow-900 mb-1">Configuration Changed</p>
                <p className="text-sm text-yellow-800">
                  {allSelectedProducts.length > productsBeforeCompletion.length 
                    ? "You've added new products. " 
                    : allSelectedProducts.length < productsBeforeCompletion.length
                    ? "You've removed products. "
                    : "Your product selection has changed. "}
                  Click "Update Configuration" to regenerate your BOM with the current selection.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-primary">
                ${allSelectedProducts.reduce((sum, p) => sum + (p.price || 0), 0).toLocaleString()}
              </p>
            </div>
            <Button 
              onClick={hasProductsChanged() ? handleUpdateConfiguration : handleFinalComplete} 
              size="lg"
            >
              {hasProductsChanged() ? 'Update Configuration' : 'Complete Configuration'}
            </Button>
          </div>
        </div>
      )}

      {/* Add Product Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {allSelectedProducts.length === 0 ? 'Start by adding products' : 'Add More Products'}
          </h3>
          <p className="text-sm text-gray-600">
            Select a product category to configure and add to your BOM
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {productTypes.map(({ type, label }) => (
            <Button
              key={type}
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5"
              onClick={() => handleProductTypeSelect(type)}
            >
              <Plus className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">{label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ConfiguratorPage() {
  const [bom, setBom] = useState<BOM | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [downloadType, setDownloadType] = useState<'pdf' | 'json' | null>(null)
  const [downloadName, setDownloadName] = useState('')
  const [downloadEmail, setDownloadEmail] = useState('')
  const [savedConfigs, setSavedConfigs] = useState<Array<{ id: string; name: string; config: ConfigOption[]; date: string }>>([])
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Load saved configurations from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('configurator_saved_configs')
      if (stored) {
        try {
          setSavedConfigs(JSON.parse(stored))
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [])

  const handleConfigComplete = (config: ConfigOption[]) => {
    // Calculate BOM from completed configuration
    const total = config.reduce((sum, opt) => sum + (opt.price || 0), 0)
    const newBom = {
      items: config,
      total,
      estimatedDelivery: '2-4 weeks'
    }
    setBom(newBom)
    // Scroll to Export & Engage section
    setTimeout(() => {
      const exportSection = document.querySelector('[data-export-section]')
      if (exportSection) {
        exportSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const handleDownloadPDF = () => {
    if (!bom) {
      toast({
        title: 'Configuration Required',
        description: 'Please complete the configuration first.',
        variant: 'destructive',
      })
      return
    }
    setDownloadType('pdf')
    setShowDownloadModal(true)
  }

  const handleExportJSON = () => {
    if (!bom) {
      toast({
        title: 'Configuration Required',
        description: 'Please complete the configuration first.',
        variant: 'destructive',
      })
      return
    }
    setDownloadType('json')
    setShowDownloadModal(true)
  }

  const handleDownloadSubmit = () => {
    if (!downloadName || !downloadEmail) {
      toast({
        title: 'Required Fields',
        description: 'Please provide your name and email.',
        variant: 'destructive',
      })
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(downloadEmail)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }

    if (!bom || !downloadType) return

    if (downloadType === 'pdf') {
      // Generate PDF with logo - async function
      const generatePDF = async () => {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        })

        const pageWidth = doc.internal.pageSize.getWidth()
        const pageHeight = doc.internal.pageSize.getHeight()
        const margin = 20
        const contentWidth = pageWidth - (margin * 2)
        let yPosition = margin

        // Header with dark theme background
        doc.setFillColor(5, 11, 24) // Dark theme color #050B18
        doc.rect(0, 0, pageWidth, 45, 'F')
        
        // Load and add logo
        try {
          const logoPath = getImageSrc('/images/logo/palc-logo-white.svg', true)
          const response = await fetch(logoPath)
          const svgText = await response.text()
          
          // Create a canvas to convert SVG to image
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = 120
          canvas.height = 40
          
          const img = new Image()
          const svgBlob = new Blob([svgText], { type: 'image/svg+xml' })
          const url = URL.createObjectURL(svgBlob)
          
          await new Promise((resolve, reject) => {
            img.onload = () => {
              if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                const imgData = canvas.toDataURL('image/png')
                doc.addImage(imgData, 'PNG', margin, 8, 30, 10)
              }
              URL.revokeObjectURL(url)
              resolve(null)
            }
            img.onerror = () => {
              URL.revokeObjectURL(url)
              resolve(null) // Continue without logo
            }
            img.src = url
          })
        } catch (error) {
          // Logo loading failed, continue with text-only header
          if (process.env.NODE_ENV === 'development') {
            console.warn('Logo loading failed, using text-only header:', error)
          }
        }
        
        // Company name and tagline in header (positioned after logo space)
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(18)
        doc.setFont('helvetica', 'bold')
        doc.text('PalC Networks', margin + 35, 15)
        
        doc.setFontSize(9)
        doc.setFont('helvetica', 'normal')
        doc.text('Enterprise Network Solutions & Cloud Services', margin + 35, 21)
        doc.text('www.palcnetworks.com', margin + 35, 27)
        
        doc.text('www.palcnetworks.com', margin + 35, 27)
        
        // Document title
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(18)
        doc.setFont('helvetica', 'bold')
        yPosition = 55
        doc.text('Product Configuration Summary', margin, yPosition)
        
        yPosition += 10
        
        // Metadata section
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, yPosition)
        yPosition += 6
        doc.text(`Requested by: ${downloadName}`, margin, yPosition)
        yPosition += 6
        doc.text(`Email: ${downloadEmail}`, margin, yPosition)
        yPosition += 6
        doc.text(`Document ID: PALC-${Date.now()}`, margin, yPosition)
        
        yPosition += 10
        
        // Horizontal line
        doc.setDrawColor(200, 200, 200)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8
        
        // BOM Items section
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.text('Bill of Materials (BOM)', margin, yPosition)
        yPosition += 6 // Reduced spacing
        
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        
        // Table header with proper column widths
        doc.setFillColor(240, 240, 240)
        doc.rect(margin, yPosition - 4, contentWidth, 7, 'F') // Reduced header height
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(10)
        doc.text('Item', margin + 8, yPosition)
        doc.text('Description', margin + 60, yPosition) // Moved description column right
        doc.text('Price', pageWidth - margin - 20, yPosition, { align: 'right' })
        yPosition += 7 // Reduced spacing after header
        
        doc.setFont('helvetica', 'normal')
        doc.setDrawColor(220, 220, 220)
        
        // Column positions - adjusted for better spacing
        const itemColX = margin + 8 // Item number column
        const nameColX = margin + 12 // Item name column (starts after number)
        const descColX = margin + 60 // Description column (moved right to give more space to item name)
        const priceColX = pageWidth - margin - 20 // Price column (right-aligned)
        const nameColWidth = 45 // Increased width for item name (was 35)
        const descColWidth = priceColX - descColX - 5 // Use available space up to price column
        const lineHeight = 5 // Height per line
        
        // BOM Items
        bom.items.forEach((item, idx) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 40) {
            doc.addPage()
            yPosition = margin
          }
          
          const itemNumber = `${idx + 1}.`
          const itemName = item.name
          // Split item name - allow natural wrapping
          const itemNameLines = doc.splitTextToSize(itemName, nameColWidth)
          
          // Split description - allow natural wrapping
          const itemDesc = doc.splitTextToSize(item.description || '', descColWidth)
          
          const itemPrice = item.price ? `$${item.price.toLocaleString()}` : 'N/A'
          
          // Starting Y position for this row
          const rowStartY = yPosition
          
          // Calculate row height based on tallest column (no line limit)
          const nameHeight = itemNameLines.length * lineHeight
          const descHeight = itemDesc.length > 0 ? itemDesc.length * lineHeight : lineHeight
          const rowHeight = Math.max(nameHeight, descHeight, lineHeight)
          
          // Top Y position for content (reduced top spacing)
          const contentTopY = rowStartY + 2 // Small top padding
          
          // Item number (left column, top-aligned)
          doc.setFontSize(10)
          doc.setFont('helvetica', 'normal')
          doc.text(itemNumber, itemColX, contentTopY)
          
          // Item name (middle-left column, top-aligned, natural wrapping)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(10)
          doc.text(itemNameLines, nameColX, contentTopY)
          
          // Description (middle column, top-aligned, natural wrapping)
          doc.setFont('helvetica', 'normal')
          doc.setFontSize(9)
          if (itemDesc.length > 0) {
            doc.text(itemDesc, descColX, contentTopY)
          }
          
          // Price (right column, top-aligned with first line)
          doc.setFontSize(10)
          doc.setFont('helvetica', 'bold')
          doc.text(itemPrice, priceColX, contentTopY, { align: 'right' })
          
          // Move yPosition down for next row
          yPosition = rowStartY + rowHeight
          
          // Line separator
          doc.line(margin, yPosition, pageWidth - margin, yPosition)
          yPosition += 8 // Increased spacing below divider
        })
        
        yPosition += 5
        
        // Check if we need a new page for totals
        if (yPosition > pageHeight - 30) {
          doc.addPage()
          yPosition = margin
        }
        
        // Total section
        doc.setDrawColor(0, 65, 194)
        doc.setLineWidth(0.5)
        doc.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8
        
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.text('Total:', pageWidth - margin - 50, yPosition)
        doc.setFontSize(14)
        doc.setTextColor(0, 65, 194)
        doc.text(`$${bom.total.toLocaleString()}`, pageWidth - margin - 20, yPosition, { align: 'right' })
        
        yPosition += 10
        doc.setTextColor(0, 0, 0)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.text(`Estimated Delivery: ${bom.estimatedDelivery}`, margin, yPosition)
        
        // Footer function
        const addFooter = (pageNum: number, totalPages: number) => {
          doc.setFontSize(8)
          doc.setTextColor(128, 128, 128)
          doc.text(
            `Page ${pageNum} of ${totalPages} | Generated by PalC Networks Product Configurator | www.palcnetworks.com`,
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
          )
          doc.text(
            `This document is generated for ${downloadName} (${downloadEmail}) and is proprietary to PalC Networks.`,
            pageWidth / 2,
            pageHeight - 5,
            { align: 'center' }
          )
        }
        
        // Add footer to all pages
        const totalPages = doc.internal.pages.length - 1
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i)
          addFooter(i, totalPages)
        }
      
        // Save PDF
        doc.save(`palc-configuration-${Date.now()}.pdf`)

        toast({
          title: 'Download Started',
          description: 'Your PDF specification sheet is downloading.',
          variant: 'success',
        })
      }
      
      // Call async PDF generation
      generatePDF()
    } else if (downloadType === 'json') {
      const jsonData = {
        generated: new Date().toISOString(),
        requestedBy: {
          name: downloadName,
          email: downloadEmail,
        },
        configuration: bom.items,
        total: bom.total,
        estimatedDelivery: bom.estimatedDelivery
      }

      const jsonString = JSON.stringify(jsonData, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `palc-configuration-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: 'Export Complete',
        description: 'Your JSON configuration file has been downloaded successfully.',
        variant: 'success',
      })
    }

    // Reset form and close modal
    setDownloadName('')
    setDownloadEmail('')
    setShowDownloadModal(false)
    setDownloadType(null)
  }

  const handleContactSales = () => {
    if (!bom) {
      toast({
        title: 'Configuration Required',
        description: 'Please complete the configuration first.',
        variant: 'destructive',
      })
      return
    }
    setShowContactModal(true)
  }

  // Save configuration
  const handleSaveConfig = () => {
    if (!bom || bom.items.length === 0) {
      toast({
        title: 'No Configuration',
        description: 'Please complete a configuration first.',
        variant: 'destructive',
      })
      return
    }

    const name = prompt('Enter a name for this configuration:')
    if (!name || !name.trim()) return

    const savedConfig = {
      id: Date.now().toString(),
      name: name.trim(),
      config: bom.items,
      date: new Date().toISOString(),
    }

    const updated = [savedConfig, ...savedConfigs].slice(0, 10) // Keep max 10
    setSavedConfigs(updated)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('configurator_saved_configs', JSON.stringify(updated))
    }

    toast({
      title: 'Configuration Saved',
      description: `"${name}" has been saved successfully.`,
    })
  }

  // Load configuration
  const handleLoadConfig = (savedConfig: typeof savedConfigs[0]) => {
    const total = savedConfig.config.reduce((sum, opt) => sum + (opt.price || 0), 0)
    const loadedBom = {
      items: savedConfig.config,
      total,
      estimatedDelivery: '2-4 weeks'
    }
    setBom(loadedBom)
    
    toast({
      title: 'Configuration Loaded',
      description: `"${savedConfig.name}" has been loaded.`,
    })
  }

  // Delete saved configuration
  const handleDeleteConfig = (id: string) => {
    if (!confirm('Are you sure you want to delete this saved configuration?')) return
    
    const updated = savedConfigs.filter(c => c.id !== id)
    setSavedConfigs(updated)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('configurator_saved_configs', JSON.stringify(updated))
    }

    toast({
      title: 'Configuration Deleted',
      description: 'The configuration has been removed.',
    })
  }

  // Share configuration
  const handleShareConfig = async () => {
    if (!bom || bom.items.length === 0) {
      toast({
        title: 'No Configuration',
        description: 'Please complete a configuration first.',
        variant: 'destructive',
      })
      return
    }

    const shareData = {
      items: bom.items,
      total: bom.total,
      timestamp: new Date().toISOString(),
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?config=${encodeURIComponent(JSON.stringify(shareData))}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: 'Link Copied!',
        description: 'Share this link to let others view your configuration.',
      })
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: 'Link Copied!',
        description: 'Share this link to let others view your configuration.',
      })
    }
  }

  // Load configuration from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const configParam = params.get('config')
      if (configParam) {
        try {
          const sharedConfig = JSON.parse(decodeURIComponent(configParam))
          if (sharedConfig.items && Array.isArray(sharedConfig.items)) {
            const total = sharedConfig.items.reduce((sum: number, opt: ConfigOption) => sum + (opt.price || 0), 0)
            const loadedBom = {
              items: sharedConfig.items,
              total,
              estimatedDelivery: '2-4 weeks'
            }
            setBom(loadedBom)
            toast({
              title: 'Shared Configuration Loaded',
              description: 'The shared configuration has been loaded.',
            })
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname)
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [toast])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark Banner */}
      <div className="h-[70vh] md:h-[60vh] bg-gradient-to-br from-[#050B18] via-[#0A1734] to-[#050B18] text-white relative overflow-hidden">
        <div className="container-custom h-full flex flex-col justify-center pt-16 md:pt-50 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-semibold">
              Guided BOM · SONiC · AI/Cloud Fabrics
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Product Configurator</h1>
            <p className="text-gray-200 text-lg">
              Assemble the right switch, optics, power/airflow, SONiC build, and AI fabric options. Export a spec summary
              or send to sales with one click.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'Switch model',
                'Port speed/density',
                'Breakouts & optics',
                'SONiC builds & feature packs',
                'Fabric role (leaf/spine/AI)',
                'Power/airflow direction',
              ].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/90">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="container-custom space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Overview & Purpose</h2>
                <p className="text-gray-600 mb-4">
                  Tell us what you are building so we can tune defaults for AI fabrics, cloud transit, or campus/core.
                </p>
                <MultiProductConfigurator onComplete={handleConfigComplete} />
              </section>

              <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Product Family Selection</h2>
              <p className="text-gray-600 mb-4">Pick the switch family and baseline chassis/PSU/airflow.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="p-3 rounded-xl bg-gray-50 border border-gray-100">Switch model picker (leaf/spine/AI)</li>
                <li className="p-3 rounded-xl bg-gray-50 border border-gray-100">Port speed: 1G–800G</li>
                <li className="p-3 rounded-xl bg-gray-50 border border-gray-100">Port density & breakout options</li>
                <li className="p-3 rounded-xl bg-gray-50 border border-gray-100">Optics/DAC/AOC selections</li>
              </ul>
              </section>

              <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Software Configuration</h2>
              <p className="text-gray-600 mb-4">
                Choose SONiC builds and feature packs aligned to your fabric role and operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">SONiC version / build</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">Feature packs: EVPN/VXLAN, SRv6</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">ZTP + automation hooks</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">Telemetry: gNMI/INT/sFlow</div>
              </div>
              </section>

              <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. AI Fabric Options</h2>
              <p className="text-gray-600 mb-4">Enable AI/ML fabric tuning for GPU clusters.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">RoCE/IB mode with ECN/PFC tuning</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">AQM profiles & deep buffers</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">GPU rack connectivity & leaf/Spine role</div>
              </div>
              </section>

              <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Environmental & Operational Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">Power: AC/DC, redundancy</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">Airflow: port-to-PSU / PSU-to-port</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">Mounting/environment notes</div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">Compliance / special requirements</div>
              </div>
              </section>
            </div>

          <div className="space-y-6">
            <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Architecture Preview</h3>
              <p className="text-sm text-gray-600 mb-3">
                Auto-generated summary of selected model, role, optics, software packs, and AI fabric settings.
              </p>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                <p>• Role: Leaf/Spine/AI fabric</p>
                <p>• Ports: Speed/density + breakout</p>
                <p>• Optics: SR/LR/ZR / DAC/AOC</p>
                <p>• Software: SONiC build + feature packs</p>
                <p>• AI tuning: RoCE/ECN/PFC, buffers</p>
                <p>• Power/airflow: Direction + redundancy</p>
              </div>
            </section>

            <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance KPIs</h3>
              <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <span>Fabric latency (target)</span>
                  <span className="font-semibold text-gray-900">&lt;100µs P99</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <span>Convergence</span>
                  <span className="font-semibold text-gray-900">&lt;150ms with BFD/TI-LFA</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 py-3">
                  <span>RoCE headroom</span>
                  <span className="font-semibold text-gray-900">ECN/PFC tuned</span>
                </div>
              </div>
            </section>

            {/* Save/Load Section */}
            {bom && bom.items.length > 0 && (
              <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Save & Share Configuration</h3>
                <div className="flex flex-col gap-3">
                  <Button variant="outline" onClick={handleSaveConfig} className="w-full flex items-center justify-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Configuration
                  </Button>
                  <Button variant="outline" onClick={handleShareConfig} className="w-full flex items-center justify-center gap-2">
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    {copied ? 'Link Copied!' : 'Share Configuration Link'}
                  </Button>
                </div>

                {/* Saved Configurations */}
                {savedConfigs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Saved Configurations</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {savedConfigs.map((saved) => (
                        <div key={saved.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{saved.name}</p>
                            <p className="text-xs text-gray-500">
                              {saved.config.length} items • {new Date(saved.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLoadConfig(saved)}
                              className="h-8 w-8 p-0 text-primary hover:text-primary-dark"
                              title="Load configuration"
                            >
                              <Upload className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteConfig(saved.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Delete configuration"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            <section className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3" data-export-section>
              <h3 className="text-lg font-semibold text-gray-900">Export & Engage</h3>
              <p className="text-sm text-gray-600">
                Export a PDF/JSON spec or send the configuration to sales with your contact details.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDownloadPDF}
                  disabled={!bom}
                  className="w-full rounded-lg bg-primary text-white font-semibold px-4 py-3 hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download PDF Spec Sheet
                </button>
                <button 
                  onClick={handleExportJSON}
                  disabled={!bom}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Export JSON
                </button>
                <button 
                  onClick={handleContactSales}
                  disabled={!bom}
                  className="w-full rounded-lg border border-primary/60 text-primary font-semibold px-4 py-3 hover:bg-primary/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Contact Sales With This Config
                </button>
              </div>
              {bom && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ Configuration ready! You can now export or contact sales.
                  </p>
                </div>
              )}
            </section>
          </div>
          </div>
        </div>
      </div>

      {/* Contact Sales Modal */}
      <LeadCaptureModal
        open={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={async (data) => {
          if (bom) {
            try {
              // Submit to API
              await fetch(getApiUrl('/api/contact'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...data,
                  subject: 'Product Configurator Inquiry',
                  message: `Configuration inquiry with ${bom.items.length} items. Total: $${bom.total.toLocaleString()}`,
                }),
              })
              
              toast({
                title: 'Thank You!',
                description: 'Our sales team will contact you shortly with details about your configuration.',
                variant: 'success',
              })
            } catch (error) {
              // Still show success even if API fails
              toast({
                title: 'Thank You!',
                description: 'Our sales team will contact you shortly with details about your configuration.',
                variant: 'success',
              })
            }
          }
          setShowContactModal(false)
        }}
      />

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-900">
                {downloadType === 'pdf' ? 'Download PDF Spec Sheet' : 'Export JSON Configuration'}
              </h2>
              <button
                onClick={() => {
                  setShowDownloadModal(false)
                  setDownloadName('')
                  setDownloadEmail('')
                  setDownloadType(null)
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600">
                Please provide your details to download the {downloadType === 'pdf' ? 'PDF specification sheet' : 'JSON configuration file'}.
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="download-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="download-name"
                    type="text"
                    placeholder="Enter your name"
                    value={downloadName}
                    onChange={(e) => setDownloadName(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="download-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="download-email"
                    type="email"
                    placeholder="Enter your email"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDownloadModal(false)
                    setDownloadName('')
                    setDownloadEmail('')
                    setDownloadType(null)
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDownloadSubmit}
                  className="flex-1"
                >
                  {downloadType === 'pdf' ? 'Download PDF' : 'Export JSON'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

