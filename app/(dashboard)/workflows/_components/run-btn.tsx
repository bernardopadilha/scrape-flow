import { RunWorkflow } from '@/actions/workflows/run-workflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { PlayIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function RunBtn({ workflowId }: { workflowId: string }) {
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: () => {
      toast.success('Workflow started', { id: workflowId })
    },
    onError: () => {
      toast.error('Something went wrong', { id: workflowId })
    },
  })
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      className="flex items-center gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Scheduling run...', { id: workflowId })

        mutation.mutate({
          workflowId,
        })
      }}
    >
      <PlayIcon className="size-4" />
      Run
    </Button>
  )
}
