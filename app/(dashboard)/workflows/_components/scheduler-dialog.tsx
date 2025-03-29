'use client'

import { UpdateWorkflowCron } from '@/actions/workflows/update-workflow-cron'
import CustomDialogHeader from '@/components/custom-dialog-header'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { CalendarIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import cronstrue from 'cronstrue'
import parser from 'cron-parser'
import { RemoveWorkflowSchedule } from '@/actions/workflows/remove-workflow-schedule'
import { Separator } from '@/components/ui/separator'

export default function SchedulerDialog(props: {
  workflowId: string
  cron: string | null
}) {
  const [cron, setCron] = useState(props.cron || '')
  const [validCron, setValidCron] = useState(false)
  const [readableCron, setReadableCron] = useState('')

  const mutation = useMutation({
    mutationFn: UpdateWorkflowCron,
    onSuccess: () => {
      toast.success('Schedule update successfully', { id: 'cron' })
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'cron' })
    },
  })

  const removeScheduleMutation = useMutation({
    mutationFn: RemoveWorkflowSchedule,
    onSuccess: () => {
      toast.success('Schedule update successfully', { id: 'cron' })
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'cron' })
    },
  })

  useEffect(() => {
    try {
      parser.parseExpression(cron)
      const humanCronStr = cronstrue.toString(cron)
      setValidCron(true)
      setReadableCron(humanCronStr)
    } catch (error) {
      setValidCron(false)
    }
  }, [cron])

  const workflowHasvalidCron = props.cron && props.cron.length > 0
  const readableSaveCron =
    workflowHasvalidCron && cronstrue.toString(props.cron!)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'link'}
          size={'sm'}
          className={cn(
            'text-sm p-0 h-auto text-orange-500',
            workflowHasvalidCron && 'text-primary',
          )}
        >
          {workflowHasvalidCron ? (
            <div className="flex items-center gap-1">
              <ClockIcon className="size-3" />
              {readableSaveCron}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <TriangleAlertIcon className="size-3" />
              Set schedule
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
        />
        <div className="p-6 space-y-4">
          <p>
            Specify a cron expression to schedule periodc workflow execution.
            All times are in UTC.
          </p>
          <Input
            value={cron}
            onChange={(e) => setCron(e.target.value)}
            placeholder="E.g * * * * *"
          />

          {cron !== '' && (
            <div
              className={cn(
                'bg-accent rounded-md p-4 border text-sm border-destructive text-destructive',
                validCron && 'border-primary text-primary',
              )}
            >
              {validCron ? readableCron : 'Not a valid cron expression '}
            </div>
          )}

          {workflowHasvalidCron && (
            <DialogClose asChild>
              <div className="">
                <Button
                  variant={'outline'}
                  disabled={
                    mutation.isPending || removeScheduleMutation.isPending
                  }
                  onClick={() => {
                    toast.loading('Removing schedule...', { id: 'cron' })
                    removeScheduleMutation.mutate(props.workflowId)
                  }}
                  className="w-full text-destructive border-destructive hover:text-destructive"
                >
                  Remove current schedule
                </Button>

                <Separator className="my-4" />
              </div>
            </DialogClose>
          )}
        </div>
        <DialogFooter className="px-6 gap-2">
          <DialogClose asChild>
            <Button className="w-full" variant={'secondary'}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              disabled={mutation.isPending || !validCron}
              onClick={() => {
                toast.loading('Saving...', { id: 'cron' })
                mutation.mutate({
                  id: props.workflowId,
                  cron,
                })
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
