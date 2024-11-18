'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GetWorkflowsForUser() {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Não autenticado')
  }

  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
}
