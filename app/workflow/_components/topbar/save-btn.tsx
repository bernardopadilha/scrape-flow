import { UpdateWorkflow } from '@/actions/workflows/update-workflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

function SaveBtn({ workflowId }: { workflowId: string }) {
  const { toObject } = useReactFlow()

  const saveMutation = useMutation({
    mutationFn: UpdateWorkflow,
    onSuccess: () => {
      toast.success('Flow saved successfully', { id: 'save-workflow' })
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'save-workflow' })
    },
  })

  return (
    <Button
      disabled={saveMutation.isPending}
      variant={'outline'}
      className="flex items-center gap-2"
      onClick={() => {
        const workflowDefinition = JSON.stringify(toObject())
        toast.loading('Saving workflow...', { id: 'save-workflow' })
        saveMutation.mutate({ id: workflowId, definition: workflowDefinition })
      }}
    >
      {saveMutation.isPending ? (
        <>
          <Loader2Icon size={16} className="stroke-green-400 animate-spin" />
          Saving
        </>
      ) : (
        <>
          <CheckIcon size={16} className="stroke-green-400" />
          Save
        </>
      )}
    </Button>
  )
}

export default SaveBtn