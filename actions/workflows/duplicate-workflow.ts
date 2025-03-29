'use server'

import prisma from '@/lib/prisma'
import {
  duplicateWorkflowSchema,
  duplicateWorkflowType,
} from '@/schema/workflow'
import { WorkflowStatus } from '@/types/workflow'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function DuplicateWorkflow(form: duplicateWorkflowType) {
  const { success, data } = duplicateWorkflowSchema.safeParse(form)
  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = auth()
  if (!userId) {
    throw new Error('unathenticated')
  }

  const sourceWorkflow = await prisma.workflow.findUnique({
    where: {
      userId,
      id: data.workflowId,
    },
  })

  if (!sourceWorkflow) {
    throw new Error('Workflow not found')
  }

  const result = await prisma.workflow.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
      status: WorkflowStatus.DRAFT,
      definition: sourceWorkflow.definition,
    },
  })

  if (!result) {
    throw new Error('failed to duplicate workflow')
  }

  revalidatePath('/workflows')
}
