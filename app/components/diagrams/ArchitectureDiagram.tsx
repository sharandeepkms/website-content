"use client"

import React, { useCallback, useRef, useState } from 'react'
// NOTE: ReactFlow integration pending - requires: npm install reactflow
// import ReactFlow, {
//   Node,
//   Edge,
//   Background,
//   Controls,
//   MiniMap,
//   Connection,
//   addEdge,
//   useNodesState,
//   useEdgesState,
//   Panel,
//   MarkerType
// } from 'reactflow'
// import 'reactflow/dist/style.css'

// Temporary types until reactflow is installed
interface Node {
  id: string
  type?: string
  position: { x: number; y: number }
  data: { label: string; [key: string]: unknown }
  style?: { [key: string]: string | number }
}

interface Edge {
  id: string
  source: string
  target: string
  type?: string
  animated?: boolean
  style?: { [key: string]: string | number }
  markerEnd?: { type: string; color: string }
}

interface Connection {
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

// Temporary MarkerType enum until reactflow is installed
const MarkerType = {
  ArrowClosed: 'arrowclosed',
  Arrow: 'arrow',
} as const
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Download, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface ArchitectureDiagramProps {
  initialNodes?: Node[]
  initialEdges?: Edge[]
  title?: string
  onNodeClick?: (node: Node) => void
  className?: string
}

const defaultNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { label: 'Core Switch' },
    style: { background: '#0041C2', color: '#fff', border: '2px solid #002B7B' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 150 },
    data: { label: 'Leaf Switch 1' },
    style: { background: '#00C2FF', color: '#fff' }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 150 },
    data: { label: 'Leaf Switch 2' },
    style: { background: '#00C2FF', color: '#fff' }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 50, y: 300 },
    data: { label: 'Server 1' },
    style: { background: '#00C48C', color: '#fff' }
  },
  {
    id: '5',
    type: 'default',
    position: { x: 200, y: 300 },
    data: { label: 'Server 2' },
    style: { background: '#00C48C', color: '#fff' }
  },
  {
    id: '6',
    type: 'default',
    position: { x: 350, y: 300 },
    data: { label: 'Server 3' },
    style: { background: '#00C48C', color: '#fff' }
  },
  {
    id: '7',
    type: 'default',
    position: { x: 500, y: 300 },
    data: { label: 'Server 4' },
    style: { background: '#00C48C', color: '#fff' }
  }
]

const defaultEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#0041C2', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed' as const, color: '#0041C2' }
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#0041C2', strokeWidth: 2 },
    markerEnd: { type: 'arrowclosed' as const, color: '#0041C2' }
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'smoothstep',
    style: { stroke: '#00C2FF', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00C2FF' }
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
    type: 'smoothstep',
    style: { stroke: '#00C2FF', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00C2FF' }
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    type: 'smoothstep',
    style: { stroke: '#00C2FF', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00C2FF' }
  },
  {
    id: 'e3-7',
    source: '3',
    target: '7',
    type: 'smoothstep',
    style: { stroke: '#00C2FF', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00C2FF' }
  }
]

export function ArchitectureDiagram({
  initialNodes = defaultNodes,
  initialEdges = defaultEdges,
  title = 'Network Architecture',
  onNodeClick,
  className
}: ArchitectureDiagramProps) {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const onNodesChange = () => {}
  const onEdgesChange = () => {}

  const onConnect = useCallback(
    (params: Connection) => {
      // TODO: Implement when reactflow is installed
      // setEdges((eds: Edge[]) => addEdge(params, eds))
    },
    []
  )

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeClick?.(node)
    },
    [onNodeClick]
  )

  const handleDownload = () => {
    // NOTE: Diagram export functionality pending ReactFlow integration
    // Feature will be implemented when ReactFlow is integrated
  }

  const handleZoomIn = () => {
    // NOTE: Zoom functionality pending ReactFlow integration
    // Feature will be implemented when ReactFlow is integrated
  }

  const handleZoomOut = () => {
    // NOTE: Zoom functionality pending ReactFlow integration
    // Feature will be implemented when ReactFlow is integrated
  }

  return (
    <Card className={className}>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleZoomIn} aria-label="Zoom in">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomOut} aria-label="Zoom out">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDownload} aria-label="Download diagram">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(!isFullscreen)} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="h-[600px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
        {/* TODO: Install reactflow and uncomment */}
        {/* <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow> */}
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold mb-2">Architecture Diagram</p>
          <p className="text-sm">Install reactflow to enable interactive diagrams</p>
          <p className="text-xs mt-2">npm install reactflow</p>
        </div>
      </div>
    </Card>
  )
}

