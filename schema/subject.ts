import { z } from 'zod'

export const subjectSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string()
})

export type Subject = z.infer<typeof subjectSchema>