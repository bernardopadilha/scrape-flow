/* eslint-disable no-useless-return */
'use client'

import { UnpublishWorkflow } from '@/actions/workflows/unpublish-workflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { DownloadIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function UnpublishBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: UnpublishWorkflow,
    onSuccess: () => {
      toast.success('Workflow unpublished', { id: workflowId })
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
        toast.loading('Unpublishing workflow...', { id: workflowId })
        mutation.mutate({
          id: workflowId,
        })
      }}
    >
      <DownloadIcon className="size-4 stroke-orange-400" />
      Unpublish
    </Button>
  )
}
