'use client'

import TooltipWrapper from '@/components/tooltip-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { WorkflowStatus } from '@/types/workflow'
import { Workflow } from '@prisma/client'
import {
  FileTextIcon,
  MoreVerticalIcon,
  PlayIcon,
  ShuffleIcon,
  TrashIcon,
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import DeleteWorkflowDialog from './delete-workflow-dialog'

const statusColors = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISHED]: 'bg-primary',
}

function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT

  return (
    <Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
      <CardContent className="p-4 flex items-center justify-between h-[100px]">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'size-10 rounded-full flex items-center justify-center',
              statusColors[workflow.status as WorkflowStatus],
            )}
          >
            {isDraft ? (
              <FileTextIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-muted-foreground items-center">
              <Link
                href={`/workflow/editor/${workflow.id}`}
                className="items-center hover:underline"
              >
                {workflow.name}
              </Link>
              {isDraft && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={'outline'} size={'sm'} asChild>
            <Link
              href={`/workflow/editor/${workflow.id}`}
              className="flex items-center gap-2"
            >
              <ShuffleIcon className="size-4" />
              Editar
            </Link>
          </Button>
          <WorkflowActions
            workflowId={workflow.id}
            workflowName={workflow.name}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function WorkflowActions({
  workflowName,
  workflowId,
}: {
  workflowName: string
  workflowId: string
}) {
  const [isOpenDeleteWorkflowDialog, setIsOpenDeleteWorkflowDialog] =
    useState(false)

  return (
    <>
      <DeleteWorkflowDialog
        workflowId={workflowId}
        workflowName={workflowName}
        isOpen={isOpenDeleteWorkflowDialog}
        setIsOpen={setIsOpenDeleteWorkflowDialog}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'sm'}>
            <TooltipWrapper content={'More actions'}>
              <div className="flex items-center justify-center w-full h-full ">
                <MoreVerticalIcon size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive flex items-center gap-2 "
            onSelect={() => {
              setIsOpenDeleteWorkflowDialog((prev) => !prev)
            }}
          >
            <TrashIcon className="size-4" /> Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default WorkflowCard
