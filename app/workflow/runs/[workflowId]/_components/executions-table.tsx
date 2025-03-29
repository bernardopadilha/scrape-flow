'use client'

import { GetWorkflowExecutions } from '@/actions/workflows/get-workflow-executions'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DatesDurationString } from '@/lib/helper/dates-duration-string'
import { useQuery } from '@tanstack/react-query'
import ExecutionsStatusIndicator from './execution-status-indicator'
import { WorkflowExecutionStatus } from '@/types/workflow'
import { CoinsIcon } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>

export default function ExecutionsTable({
  workflowId,
  initialData,
}: {
  workflowId: string
  initialData: InitialDataType
}) {
  const router = useRouter()
  const query = useQuery({
    queryKey: ['executions', workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 5000,
  })
  return (
    <div className="border- rounded-lg shadow-md overflow-auto">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-xs text-muted-foreground">
              Started at (desc)
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="gap-2 h-full overflow-auto">
          {query.data.map((execution) => {
            const duration = DatesDurationString(
              execution.completedAt,
              execution.startedAt,
            )

            const formattedStartedAt =
              execution.startedAt &&
              formatDistanceToNow(execution.startedAt, {
                addSuffix: true,
              })

            return (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/workflow/runs/${workflowId}/${execution.id}`)
                }}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{execution.id}</span>
                    <div className="text-muted-foreground text-xs">
                      <span>Triggered via</span>
                      <Badge variant={'outline'}>{execution.trigger}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <ExecutionsStatusIndicator
                          status={execution.status as WorkflowExecutionStatus}
                        />
                        <span className="font-semibold capitalize">
                          {execution.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-xs mx-5">
                      {duration}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <CoinsIcon className="size-4 text-primary" />
                        <span className="font-semibold capitalize">
                          {execution.creditsConsumed}
                        </span>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-xs mx-5">
                      Credits
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formattedStartedAt}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
