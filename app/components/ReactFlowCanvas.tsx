"use client"

import React, { useCallback, useMemo, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Download, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as htmlToImage from 'html-to-image'

import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow'
import 'reactflow/dist/style.css'

type PresetType = 'sonic-deploy' | 'dc-ai-fabric' | 'cloud-hybrid' | 'data-optimization' | 'network-visibility'

interface ReactFlowCanvasProps {
  preset: PresetType
  className?: string
  height?: string
}

// Preset Definitions
const presets: Record<PresetType, { nodes: Node[]; edges: Edge[]; title: string; description: string }> = {
  'sonic-deploy': {
    title: 'SONiC Deployment Workflow',
    description: 'Complete workflow from hardware bring-up to production deployment',
    nodes: [
      { id: '1', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Hardware Bring-up', description: 'Physical hardware installation and power-on' } },
      { id: '2', type: 'default', position: { x: 300, y: 50 }, data: { label: 'ONIE Installation', description: 'Open Network Install Environment setup' } },
      { id: '3', type: 'default', position: { x: 500, y: 50 }, data: { label: 'Base Image Build', description: 'SONiC image compilation and customization' } },
      { id: '4', type: 'default', position: { x: 100, y: 200 }, data: { label: 'SONiC Image Deployment', description: 'Image installation via ONIE or USB' } },
      { id: '5', type: 'default', position: { x: 300, y: 200 }, data: { label: 'Provisioning Engine', description: 'Automated configuration management' } },
      { id: '6', type: 'default', position: { x: 500, y: 200 }, data: { label: 'EVPN-VXLAN Config', description: 'Layer 2/3 overlay network configuration' } },
      { id: '7', type: 'default', position: { x: 300, y: 350 }, data: { label: 'Telemetry Pipeline', description: 'gNMI, OpenTelemetry, Prometheus integration' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3', animated: true },
      { id: 'e3-4', source: '3', target: '4', animated: true },
      { id: 'e4-5', source: '4', target: '5', animated: true },
      { id: 'e5-6', source: '5', target: '6', animated: true },
      { id: 'e6-7', source: '6', target: '7', animated: true },
    ]
  },
  'dc-ai-fabric': {
    title: 'Data Center AI Fabric Architecture',
    description: 'High-performance AI/ML infrastructure with GPU pods and NVMe-oF',
    nodes: [
      { id: 'spine1', type: 'default', position: { x: 400, y: 50 }, data: { label: 'Spine Switch 1', description: '100GbE/400GbE spine' }, style: { background: '#0041C2', color: '#fff' } },
      { id: 'spine2', type: 'default', position: { x: 600, y: 50 }, data: { label: 'Spine Switch 2', description: '100GbE/400GbE spine' }, style: { background: '#0041C2', color: '#fff' } },
      { id: 'leaf1', type: 'default', position: { x: 200, y: 200 }, data: { label: 'Leaf Switch 1', description: '25GbE/100GbE leaf' }, style: { background: '#00C2FF', color: '#fff' } },
      { id: 'leaf2', type: 'default', position: { x: 400, y: 200 }, data: { label: 'Leaf Switch 2', description: '25GbE/100GbE leaf' }, style: { background: '#00C2FF', color: '#fff' } },
      { id: 'leaf3', type: 'default', position: { x: 600, y: 200 }, data: { label: 'Leaf Switch 3', description: '25GbE/100GbE leaf' }, style: { background: '#00C2FF', color: '#fff' } },
      { id: 'gpu-pod', type: 'default', position: { x: 200, y: 350 }, data: { label: 'GPU Pod', description: 'NVIDIA A100/H100 cluster' }, style: { background: '#00C48C', color: '#fff' } },
      { id: 'nvmeof', type: 'default', position: { x: 400, y: 350 }, data: { label: 'NVMe-oF Cluster', description: 'High-speed storage fabric' }, style: { background: '#00C48C', color: '#fff' } },
      { id: 'observability', type: 'default', position: { x: 600, y: 350 }, data: { label: 'Observability Layer', description: 'Prometheus, Grafana, ELK' }, style: { background: '#5A5EFF', color: '#fff' } },
      { id: 'dpu', type: 'default', position: { x: 300, y: 500 }, data: { label: 'DPU Offload', description: 'SmartNIC/DPU acceleration' }, style: { background: '#FACC15', color: '#000' } },
      { id: 'roce', type: 'default', position: { x: 500, y: 500 }, data: { label: 'RoCE Pipeline', description: 'RDMA over Converged Ethernet' }, style: { background: '#FACC15', color: '#000' } },
    ],
    edges: [
      { id: 's1-l1', source: 'spine1', target: 'leaf1', animated: true },
      { id: 's1-l2', source: 'spine1', target: 'leaf2', animated: true },
      { id: 's1-l3', source: 'spine1', target: 'leaf3', animated: true },
      { id: 's2-l1', source: 'spine2', target: 'leaf1', animated: true },
      { id: 's2-l2', source: 'spine2', target: 'leaf2', animated: true },
      { id: 's2-l3', source: 'spine2', target: 'leaf3', animated: true },
      { id: 'l1-gpu', source: 'leaf1', target: 'gpu-pod', animated: true },
      { id: 'l2-nvme', source: 'leaf2', target: 'nvmeof', animated: true },
      { id: 'l3-obs', source: 'leaf3', target: 'observability', animated: true },
      { id: 'gpu-dpu', source: 'gpu-pod', target: 'dpu', animated: true },
      { id: 'nvme-roce', source: 'nvmeof', target: 'roce', animated: true },
    ]
  },
  'cloud-hybrid': {
    title: 'Cloud Hybrid Architecture',
    description: 'Seamless integration between on-premises and cloud infrastructure',
    nodes: [
      { id: 'onprem-router', type: 'default', position: { x: 100, y: 200 }, data: { label: 'On-prem Router', description: 'BGP/OSPF edge router' }, style: { background: '#0041C2', color: '#fff' } },
      { id: 'cloud-gateway', type: 'default', position: { x: 400, y: 200 }, data: { label: 'Cloud Gateway', description: 'AWS Direct Connect / Azure ExpressRoute' }, style: { background: '#00C2FF', color: '#fff' } },
      { id: 'vpc', type: 'default', position: { x: 700, y: 100 }, data: { label: 'VPC/VNet Fabric', description: 'Virtual private cloud network' }, style: { background: '#00C48C', color: '#fff' } },
      { id: 'k8s', type: 'default', position: { x: 700, y: 300 }, data: { label: 'Managed K8s Cluster', description: 'EKS / AKS / GKE' }, style: { background: '#5A5EFF', color: '#fff' } },
      { id: 'object-storage', type: 'default', position: { x: 700, y: 500 }, data: { label: 'Object Storage', description: 'S3 / Blob / GCS' }, style: { background: '#5A5EFF', color: '#fff' } },
      { id: 'monitoring', type: 'default', position: { x: 400, y: 400 }, data: { label: 'Monitoring Stack', description: 'CloudWatch / Azure Monitor / Stackdriver' }, style: { background: '#FACC15', color: '#000' } },
    ],
    edges: [
      { id: 'r-g', source: 'onprem-router', target: 'cloud-gateway', animated: true, label: 'BGP/MPLS' },
      { id: 'g-v', source: 'cloud-gateway', target: 'vpc', animated: true },
      { id: 'g-k', source: 'cloud-gateway', target: 'k8s', animated: true },
      { id: 'g-s', source: 'cloud-gateway', target: 'object-storage', animated: true },
      { id: 'g-m', source: 'cloud-gateway', target: 'monitoring', animated: true },
    ]
  },
  'data-optimization': {
    title: 'Data Optimization Flow',
    description: 'Multi-tier storage architecture with intelligent data placement',
    nodes: [
      { id: 'hot-nvme', type: 'default', position: { x: 200, y: 100 }, data: { label: 'Hot Tier NVMe', description: 'Ultra-low latency, high IOPS' }, style: { background: '#EF4444', color: '#fff' } },
      { id: 'warm-ssd', type: 'default', position: { x: 200, y: 300 }, data: { label: 'Warm SSD Tier', description: 'Balanced performance and capacity' }, style: { background: '#FACC15', color: '#000' } },
      { id: 'cold-s3', type: 'default', position: { x: 200, y: 500 }, data: { label: 'Cold S3 Tier', description: 'Cost-effective archival storage' }, style: { background: '#00C2FF', color: '#fff' } },
      { id: 'indexing', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Indexing Engine', description: 'Elasticsearch / OpenSearch' }, style: { background: '#00C48C', color: '#fff' } },
      { id: 'caching', type: 'default', position: { x: 500, y: 400 }, data: { label: 'Caching Layer', description: 'Redis / Memcached' }, style: { background: '#5A5EFF', color: '#fff' } },
      { id: 'analytics', type: 'default', position: { x: 800, y: 300 }, data: { label: 'Analytics Pipeline', description: 'Spark / Flink / Kafka' }, style: { background: '#0041C2', color: '#fff' } },
    ],
    edges: [
      { id: 'h-i', source: 'hot-nvme', target: 'indexing', animated: true },
      { id: 'w-i', source: 'warm-ssd', target: 'indexing', animated: true },
      { id: 'w-c', source: 'warm-ssd', target: 'caching', animated: true },
      { id: 'c-a', source: 'cold-s3', target: 'analytics', animated: true },
      { id: 'i-a', source: 'indexing', target: 'analytics', animated: true },
      { id: 'c-a2', source: 'caching', target: 'analytics', animated: true },
    ]
  },
  'network-visibility': {
    title: 'Network Visibility and Monitoring Architecture',
    description: 'Disaggregated packet broker architecture for full-fidelity traffic visibility',
    nodes: [
      { id: 'network-taps', type: 'default', position: { x: 100, y: 200 }, data: { label: 'Network Taps & SPAN', description: 'Traffic acquisition sources' }, style: { background: '#0041C2', color: '#fff' } },
      { id: 'packet-broker', type: 'default', position: { x: 400, y: 200 }, data: { label: 'Disaggregated Packet Broker', description: 'SONiC-based packet broker software' }, style: { background: '#00C2FF', color: '#fff' } },
      { id: 'traffic-processing', type: 'default', position: { x: 400, y: 350 }, data: { label: 'Traffic Processing', description: 'De-duplication, slicing, filtering, replication' }, style: { background: '#00C48C', color: '#fff' } },
      { id: 'monitoring-tools', type: 'default', position: { x: 700, y: 100 }, data: { label: 'Monitoring Tools', description: 'Network performance monitoring' }, style: { background: '#5A5EFF', color: '#fff' } },
      { id: 'security-tools', type: 'default', position: { x: 700, y: 250 }, data: { label: 'Security Tools', description: 'Threat detection and analysis' }, style: { background: '#EF4444', color: '#fff' } },
      { id: 'analytics-tools', type: 'default', position: { x: 700, y: 400 }, data: { label: 'Analytics Tools', description: 'Traffic analysis and insights' }, style: { background: '#FACC15', color: '#000' } },
      { id: 'ocp-platform', type: 'default', position: { x: 100, y: 350 }, data: { label: 'OCP-Compliant Platform', description: 'Hardware-agnostic deployment' }, style: { background: '#8B5CF6', color: '#fff' } },
    ],
    edges: [
      { id: 'taps-broker', source: 'network-taps', target: 'packet-broker', animated: true, label: 'Traffic' },
      { id: 'broker-processing', source: 'packet-broker', target: 'traffic-processing', animated: true },
      { id: 'processing-monitor', source: 'traffic-processing', target: 'monitoring-tools', animated: true },
      { id: 'processing-security', source: 'traffic-processing', target: 'security-tools', animated: true },
      { id: 'processing-analytics', source: 'traffic-processing', target: 'analytics-tools', animated: true },
      { id: 'ocp-broker', source: 'ocp-platform', target: 'packet-broker', animated: true, label: 'Deployment' },
    ]
  }
}

function ReactFlowCanvasInner({ preset, height }: { preset: PresetType; height: string }) {
  const presetData = presets[preset]
  const [nodes, setNodes, onNodesChange] = useNodesState(presetData.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    presetData.edges.map((edge) => ({
      ...edge,
      markerEnd: { type: MarkerType.ArrowClosed },
      animated: edge.animated ?? true,
      style: edge.style || { strokeWidth: 2, stroke: '#0041C2' },
    }))
  )
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleDownload = useCallback(async () => {
    if (!wrapperRef.current) return
    try {
      const dataUrl = await htmlToImage.toPng(wrapperRef.current, { pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = `${presetData.title.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('Export failed', err)
        }
      }
    }
  }, [presetData.title])

  const handleReset = useCallback(() => {
    fitView({ padding: 0.2, duration: 400 })
  }, [fitView])

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: true,
            style: { strokeWidth: 2, stroke: '#0041C2' },
          },
          eds
        )
      ),
    [setEdges]
  )

  return (
    <>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{presetData.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{presetData.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => zoomIn()} title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => zoomOut()} title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} title="Reset View">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload} title="Download PNG">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={wrapperRef}
          className="relative bg-gray-50 rounded-b-lg overflow-hidden"
          style={{ height }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-left"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </CardContent>
    </>
  )
}

export function ReactFlowCanvas({ preset, className, height = '600px' }: ReactFlowCanvasProps) {
  return (
    <Card className={className}>
      <ReactFlowProvider>
        <ReactFlowCanvasInner preset={preset} height={height} />
      </ReactFlowProvider>
    </Card>
  )
}

