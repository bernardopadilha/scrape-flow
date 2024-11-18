/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable valid-typeof */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import { TaskType } from '@/types/task'
import { Workflow } from '@prisma/client'
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import NodeComponent from './nodes/node-component'
import { useCallback, useEffect } from 'react'
import { AppNode } from '@/types/app-node'
import DeletableEdge from './edges/delete-edge'

const nodeTypes = {
  FlowScrapeNode: NodeComponent,
}

const edgeTypes = {
  default: DeletableEdge,
}

const snapGrid: [number, number] = [25, 25]
const fitViewOptions = { padding: 1 }

function FlowEditor({ workflow }: { workflow: Workflow }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const { setViewport, screenToFlowPosition } = useReactFlow()

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition)
      if (!flow) return
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      if (!flow.viewport) return

      const { x = 0, y = 0, zoom = 1 } = flow.viewport

      setViewport({ x, y, zoom })
    } catch (error) {}
  }, [workflow.definition, setEdges, setNodes, setViewport])

  const onDragOver = useCallback((event: React.DragEvent) => {
    if (!event.dataTransfer) return

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback((event: React.DragEvent) => {
    if (!event.dataTransfer) return

    event.preventDefault()
    const taskType = event.dataTransfer.getData('application/reactflow')
    if (typeof taskType === undefined || !taskType) return

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    })

    const newNode = CreateFlowNode(taskType as TaskType, position)
    setNodes((nds) => nds.concat(newNode))
  }, [])

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
  }, [])

  return (
    <main className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
