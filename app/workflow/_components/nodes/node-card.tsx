/* eslint-disable no-useless-return */
'use client'

import UseFlowValidation from '@/components/hooks/use-flow-validation'
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import { ReactNode } from 'react'

function NodeCard({
  nodeId,
  children,
  isSelected,
}: {
  nodeId: string
  children: ReactNode
  isSelected: boolean
}) {
  const { getNode, setCenter } = useReactFlow()
  const { invalidInputs } = UseFlowValidation()
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId)

  return (
    <div
      onDoubleClick={() => {
        const node = getNode(nodeId) as
          | {
              position?: { x: number; y: number }
              measured?: { height: number; width: number }
            }
          | undefined
        if (!node || !node.position || !node.measured) return

        const { position, measured } = node
        const { height, width } = measured
        const x = position.x + width! / 2
        const y = position.y + height! / 2
        console.log('@POSITION', position)

        if (!x || !y) return
        setCenter(x, y, {
          zoom: 1,
          duration: 500,
        })
      }}
      className={cn(
        'rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col',
        isSelected && 'border-primary',
        hasInvalidInputs && 'border-destructive boreder-2',
      )}
    >
      {children}
    </div>
  )
}

export default NodeCard
