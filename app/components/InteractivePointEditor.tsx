"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { X, Download, Copy, Check } from 'lucide-react'
import { getImageSrc } from '@/app/utils/image-path'
import { Button } from './ui/button'

interface Point {
  id: string
  label: string
  top: number
  left: number
  pointSize?: string
  pointSizeMobile?: string
  pointShape?: 'circle' | 'square' | 'diamond' | 'rectangle'
  pointWidth?: string
  pointHeight?: string
  pointWidthMobile?: string
  pointHeightMobile?: string
}

interface InteractivePointEditorProps {
  imagePath: string
  imageAlt?: string
  onClose?: () => void
  initialPoints?: Point[]
}

export function InteractivePointEditor({
  imagePath,
  imageAlt = 'Architecture Diagram',
  onClose,
  initialPoints = []
}: InteractivePointEditorProps) {
  const [points, setPoints] = useState<Point[]>(initialPoints)
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [copied, setCopied] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track image and container dimensions
  useEffect(() => {
    const updateSizes = () => {
      if (imageRef.current && containerRef.current) {
        const imgRect = imageRef.current.getBoundingClientRect()
        const containerRect = containerRef.current.getBoundingClientRect()
        setImageSize({ width: imgRect.width, height: imgRect.height })
        setContainerSize({ width: containerRect.width, height: containerRect.height })
      }
    }

    updateSizes()
    window.addEventListener('resize', updateSizes)
    const img = imageRef.current?.querySelector('img')
    if (img) {
      img.addEventListener('load', updateSizes)
    }

    return () => {
      window.removeEventListener('resize', updateSizes)
      if (img) {
        img.removeEventListener('load', updateSizes)
      }
    }
  }, [])

  // Handle click on image to add/update point
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (selectedPoint) {
      // Update existing point
      setPoints(points.map(p => 
        p.id === selectedPoint.id 
          ? { ...p, top: y, left: x }
          : p
      ))
      setSelectedPoint(null)
    } else {
      // Create new point
      const newPoint: Point = {
        id: `point-${Date.now()}`,
        label: `Point ${points.length + 1}`,
        top: y,
        left: x,
        pointSize: '72px',
        pointSizeMobile: '30px',
        pointShape: 'circle'
      }
      setPoints([...points, newPoint])
      setSelectedPoint(newPoint)
    }
  }

  // Handle point drag
  const handlePointMouseDown = (e: React.MouseEvent, point: Point) => {
    e.stopPropagation()
    setIsDragging(true)
    setSelectedPoint(point)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedPoint || !imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

    setPoints(points.map(p => 
      p.id === selectedPoint.id 
        ? { ...p, top: y, left: x }
        : p
    ))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Generate config code
  const generateConfig = () => {
    return points.map((point, index) => {
      const config: any = {
        icon: 'Code', // You'll need to set this manually
        label: point.label,
        id: point.id,
        color: 'from-blue-500/40 to-blue-600/30',
        top: `${point.top.toFixed(2)}%`,
        left: `${point.left.toFixed(2)}%`,
        size: 'w-100 h-100',
        pointSize: point.pointSize || '72px',
        pointSizeMobile: point.pointSizeMobile || '30px',
        pointShape: point.pointShape || 'circle',
      }

      if (point.pointShape === 'rectangle') {
        config.pointWidth = point.pointWidth || '220px'
        config.pointHeight = point.pointHeight || '60px'
        if (point.pointWidthMobile) config.pointWidthMobile = point.pointWidthMobile
        if (point.pointHeightMobile) config.pointHeightMobile = point.pointHeightMobile
      }

      return `      {
        icon: Code,
        label: '${point.label}',
        id: '${point.id}',
        color: 'from-blue-500/40 to-blue-600/30',
        top: '${config.top}',
        left: '${config.left}',
        ${point.pointSizeMobile ? `topMobile: '${(point.top * 0.9).toFixed(2)}%',` : ''}
        ${point.pointSizeMobile ? `leftMobile: '${(point.left * 0.9).toFixed(2)}%',` : ''}
        size: 'w-100 h-100',
        pointSize: '${config.pointSize}',
        ${config.pointSizeMobile ? `pointSizeMobile: '${config.pointSizeMobile}',` : ''}
        pointShape: '${config.pointShape}',
        ${config.pointWidth ? `pointWidth: '${config.pointWidth}',` : ''}
        ${config.pointHeight ? `pointHeight: '${config.pointHeight}',` : ''}
        ${config.pointWidthMobile ? `pointWidthMobile: '${config.pointWidthMobile}',` : ''}
        ${config.pointHeightMobile ? `pointHeightMobile: '${config.pointHeightMobile}',` : ''}
      }${index < points.length - 1 ? ',' : ''}`
    }).join('\n')
  }

  const copyToClipboard = () => {
    const config = generateConfig()
    navigator.clipboard.writeText(config)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updatePointProperty = (pointId: string, property: keyof Point, value: any) => {
    setPoints(points.map(p => 
      p.id === pointId ? { ...p, [property]: value } : p
    ))
  }

  const deletePoint = (pointId: string) => {
    setPoints(points.filter(p => p.id !== pointId))
    if (selectedPoint?.id === pointId) {
      setSelectedPoint(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Interactive Point Editor</h2>
            <p className="text-sm text-gray-600 mt-1">Click on the image to add points, drag to reposition</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Config'}
            </Button>
            {onClose && (
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Image Area */}
          <div className="flex-1 p-6 overflow-auto">
            <div
              ref={containerRef}
              className="relative bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300"
              style={{ aspectRatio: '4/3' }}
            >
              <div
                ref={imageRef}
                className="relative w-full h-full cursor-crosshair"
                onClick={handleImageClick}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Image
                  src={getImageSrc(imagePath, true)}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  unoptimized
                />
                
                {/* Render points */}
                {points.map((point) => (
                  <div
                    key={point.id}
                    className={`absolute cursor-move transition-all ${
                      selectedPoint?.id === point.id ? 'z-20' : 'z-10'
                    }`}
                    style={{
                      top: `${point.top}%`,
                      left: `${point.left}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onMouseDown={(e) => handlePointMouseDown(e, point)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPoint(point)
                    }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg ${
                        selectedPoint?.id === point.id ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                    />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {point.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Points ({points.length})</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {points.map((point) => (
                <div
                  key={point.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedPoint?.id === point.id
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="text"
                      value={point.label}
                      onChange={(e) => updatePointProperty(point.id, 'label', e.target.value)}
                      className="font-semibold text-sm flex-1 border-none bg-transparent focus:outline-none focus:ring-0"
                    />
                    <button
                      onClick={() => deletePoint(point.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-600">Top (%)</label>
                        <input
                          type="number"
                          value={point.top.toFixed(2)}
                          onChange={(e) => updatePointProperty(point.id, 'top', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Left (%)</label>
                        <input
                          type="number"
                          value={point.left.toFixed(2)}
                          onChange={(e) => updatePointProperty(point.id, 'left', parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-600">Shape</label>
                      <select
                        value={point.pointShape || 'circle'}
                        onChange={(e) => updatePointProperty(point.id, 'pointShape', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                        <option value="diamond">Diamond</option>
                        <option value="rectangle">Rectangle</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-gray-600">Size (Desktop)</label>
                        <input
                          type="text"
                          value={point.pointSize || '72px'}
                          onChange={(e) => updatePointProperty(point.id, 'pointSize', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="72px"
                        />
                      </div>
                      <div>
                        <label className="text-gray-600">Size (Mobile)</label>
                        <input
                          type="text"
                          value={point.pointSizeMobile || '30px'}
                          onChange={(e) => updatePointProperty(point.id, 'pointSizeMobile', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          placeholder="30px"
                        />
                      </div>
                    </div>

                    {point.pointShape === 'rectangle' && (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-gray-600">Width (Desktop)</label>
                            <input
                              type="text"
                              value={point.pointWidth || '220px'}
                              onChange={(e) => updatePointProperty(point.id, 'pointWidth', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-gray-600">Height (Desktop)</label>
                            <input
                              type="text"
                              value={point.pointHeight || '60px'}
                              onChange={(e) => updatePointProperty(point.id, 'pointHeight', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-gray-600">Width (Mobile)</label>
                            <input
                              type="text"
                              value={point.pointWidthMobile || '98px'}
                              onChange={(e) => updatePointProperty(point.id, 'pointWidthMobile', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-gray-600">Height (Mobile)</label>
                            <input
                              type="text"
                              value={point.pointHeightMobile || '30px'}
                              onChange={(e) => updatePointProperty(point.id, 'pointHeightMobile', e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {points.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <p>No points yet. Click on the image to add one.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

