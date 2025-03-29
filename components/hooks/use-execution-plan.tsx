/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FlowToExecutionPlan,
  FlowToExecutionPlanValidationError,
} from '@/lib/workflow/execution-plan'
import { AppNode } from '@/types/app-node'
import { useReactFlow } from '@xyflow/react'
import { useCallback } from 'react'
import UseFlowValidation from './use-flow-validation'
import { toast } from 'sonner'

export default function useExecutionPlan() {
  const { toObject } = useReactFlow()
  const { setInvalidInputs, clearErrors } = UseFlowValidation()

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
          toast.error('No entry point found')
          break
        case FlowToExecutionPlanValidationError.INVALID_INPUTS:
          toast.error('Not all inputs values are set')
          setInvalidInputs(error.invalidElements)
          break
        default:
          toast.error('something went wrong')
          break
      }
    },
    [setInvalidInputs],
  )

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject()

    const { executionPlan, error } = FlowToExecutionPlan(
      nodes as AppNode[],
      edges,
    )

    if (error) {
      handleError(error)
      return null
    }

    clearErrors()
    return executionPlan
  }, [toObject, handleError, clearErrors])

  return generateExecutionPlan
}
