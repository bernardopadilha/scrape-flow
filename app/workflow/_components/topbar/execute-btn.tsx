/* eslint-disable no-useless-return */
'use client'

import { RunWorkflow } from '@/actions/workflows/run-workflow'
import useExecutionPlan from '@/components/hooks/use-execution-plan'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { PlayIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function ExecuteBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan()
  const { toObject } = useReactFlow()

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Execution started', { id: 'flow-execution' })
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'flow-execution' })
    },
  })
  return (
    <Button
      variant={'outline'}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        const plan = generate()
        if (!plan) {
          // Client side validatio
          return
        }
        mutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject()),
        })
      }}
    >
      <PlayIcon className="size-4 stroke-orange-400" />
      Execute
    </Button>
  )
}
