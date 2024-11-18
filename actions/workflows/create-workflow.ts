'use server'

import prisma from '@/lib/prisma'
import { CreateFlowNode } from '@/lib/workflow/create-flow-node'
import { createWorkflowSchema, createWorkflowType } from '@/schema/workflow'
import { AppNode } from '@/types/app-node'
import { TaskType } from '@/types/task'
import { WorkflowStatus } from '@/types/workflow'
import { auth } from '@clerk/nextjs/server'
import { Edge } from '@xyflow/react'
import { redirect } from 'next/navigation'

export async function CreateWorkflow(form: createWorkflowType) {
  const { success, data } = createWorkflowSchema.safeParse(form)
  if (!success) {
    throw new Error('invalid form data')
  }

  const { userId } = auth()

  if (!userId) {
    throw new Error('Não autenticado')
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  }

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

  const result = await prisma.workflow.create({
    data: {
      userId,
      ...data,
      definition: JSON.stringify(initialFlow),
      status: WorkflowStatus.DRAFT,
    },
  })

  console.log(result, userId)

  if (!result) {
    throw new Error('Erro ao criar o workflow')
  }

  redirect(`/workflow/editor/${result.id}`)
}
