'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function DeleteCredential(name: string) {
  const { userId } = auth()
  if (!userId) {
    throw new Error('unathenticated')
  }

  await prisma.credential.delete({
    where: {
      name_userId: {
        userId,
        name,
      },
    },
  })

  redirect(`/credentials`)
}
