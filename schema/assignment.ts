import { z } from 'zod'

export const assignmentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  dueDate: z.string(),
  criteria: z.string(),
  subject: z.string(),
  teacher: z.object({
    name: z.string(),
    image: z.string()
  })
})

export type Assignment = z.infer<typeof assignmentSchema>