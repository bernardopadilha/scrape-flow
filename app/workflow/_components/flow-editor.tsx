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
  getOutgoers,
  Node,
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
import { TaskRegistry } from '@/lib/workflow/task/registry'

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
  const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow()

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

  const onDrop = useCallback(
    (event: React.DragEvent) => {
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
    },
    [screenToFlowPosition, setNodes],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, animated: true }, eds))
      if (!connection.targetHandle) return
      // Remove input value if is present on connection

      const node = nodes.find((nd) => nd.id === connection.target)
      if (!node) return

      const nodeInputs = node.data.inputs
      updateNodeData(node.id, {
        inputs: {
          ...node.data.inputs,
          [connection.targetHandle]: '',
        },
      })
    },
    [nodes, setEdges, updateNodeData],
  )

  const isValidConnection = useCallback(
    (connection: Edge | Connection) => {
      // No self-connections allowed
      if (connection.source === connection.target) {
        return false
      }

      // Samen taskParam type connection
      const source = nodes.find((node) => node.id === connection.source)
      const target = nodes.find((node) => node.id === connection.target)

      if (!source || !target) {
        console.error('invalid connection: source or target node not found')
        return false
      }

      const sourceTask = TaskRegistry[source.data.type]
      const targetTask = TaskRegistry[target.data.type]

      const output = sourceTask.outputs.find(
        (o) => o.name === connection.sourceHandle,
      )

      const input = targetTask.inputs.find(
        (o) => o.name === connection.targetHandle,
      )

      if (input?.type !== output?.type) {
        console.error('invalid connection: type mismatch')
        return false
      }

      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false
        visited.add(node.id)

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true
          if (hasCycle(outgoer, visited)) return true
        }
      }

      const detectedCycle = hasCycle(target)
      return !detectedCycle
    },
    [nodes, edges],
  )

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
        isValidConnection={isValidConnection}
      >
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}

export default FlowEditor
