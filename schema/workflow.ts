import { z } from 'zod'

export const createWorkflowSchema = z.object({
  name: z.string(),
  description: z.string().max(80).optional(),
})

export type createWorkflowType = z.infer<typeof createWorkflowSchema>

export const duplicateWorkflowSchema = createWorkflowSchema.extend({
  workflowId: z.string(),
})

export type duplicateWorkflowType = z.infer<typeof duplicateWorkflowSchema>
