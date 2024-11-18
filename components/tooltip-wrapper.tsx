'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { ReactNode } from 'react'

interface TooltipWrapperProps {
  children: ReactNode
  content: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

function TooltipWrapper(props: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side}>{props.content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper
