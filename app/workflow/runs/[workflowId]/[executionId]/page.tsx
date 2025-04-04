import { GetWorkflowExecutionWithPhases } from '@/actions/workflows/get-workflow-execution'
import Topbar from '@/app/workflow/_components/topbar/topbar'
import { auth } from '@clerk/nextjs/server'
import { Loader2Icon } from 'lucide-react'
import { Suspense } from 'react'
import ExecutionViewer from './_components/execution-viewer'

export default function ExecutionViwerPage({
  params,
}: {
  params: {
    executionId: string
    workflowId: string
  }
}) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        workflowId={params.workflowId}
        title="Workflow run details"
        subtitle={`Run ID: ${params.executionId}`}
        hideButtons
      />
      <section className="flex h-full overflow-auto">
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center">
              <Loader2Icon className="size-10 animate-spin stroke-primary" />
            </div>
          }
        >
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  )
}

async function ExecutionViewerWrapper({
  executionId,
}: {
  executionId: string
}) {
  const { userId } = auth()
  if (!userId) {
    return <div>Unauthenticated</div>
  }

  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId)
  if (!workflowExecution) {
    return <div>Not found</div>
  }

  return <ExecutionViewer initialData={workflowExecution} />
}
