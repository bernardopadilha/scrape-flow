/* eslint-disable no-useless-return */
'use client'

import { PublishWorkflow } from '@/actions/workflows/publish-workflow'
import useExecutionPlan from '@/components/hooks/use-execution-plan'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { UploadIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function PublishBtn({ workflowId }: { workflowId: string }) {
  const generate = useExecutionPlan()
  const { toObject } = useReactFlow()

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow published', { id: workflowId })
    },
    onError: () => {
      toast.error('Something went wrong', { id: workflowId })
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

        toast.loading('publishing workflow...', { id: workflowId })
        mutation.mutate({
          id: workflowId,
          flowDefinition: JSON.stringify(toObject()),
        })
      }}
    >
      <UploadIcon className="size-4 stroke-green-400" />
      Publish
    </Button>
  )
}
