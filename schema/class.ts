import { z } from 'zod'

export const classSchema = z.object({
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  teacherName: z.string()
})

export type Class = z.infer<typeof classSchema>