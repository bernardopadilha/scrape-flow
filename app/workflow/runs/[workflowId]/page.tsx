import React, { Suspense } from 'react'
import Topbar from '../../_components/topbar/topbar'
import { GetWorkflowExecutions } from '@/actions/workflows/get-workflow-executions'
import { InboxIcon, Loader2Icon } from 'lucide-react'
import { waitFor } from '@/lib/helper/wait-for'
import ExecutionsTable from './_components/executions-table'

export default function ExecutionsPage({
  params,
}: {
  params: {
    workflowId: string
  }
}) {
  return (
    <div className="w-full h-full overflow-auto">
      <Topbar
        title="All runs"
        subtitle="List of all your workflow runs"
        workflowId={params.workflowId}
        hideButtons
      />

      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <Loader2Icon className="size-[30px] animate-spin stroke-primary" />
          </div>
        }
      >
        <ExecutionsTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  )
}

async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
  await waitFor(2000)
  const executions = await GetWorkflowExecutions(workflowId)
  if (!executions) {
    return <div>No data</div>
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full py-6">
        <div className="flex items-center flex-col gap-2 justify-center h-full w-full ">
          <div className="rounded-full bg-accent size-20 flex items-center justify-center">
            <InboxIcon className="size-10 stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">
              No runs have been triggered yet for this workflow
            </p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editpr page
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 w-full">
      <ExecutionsTable workflowId={workflowId} initialData={executions} />
    </div>
  )
}
