import { z } from 'zod'

export const classSchema = z.object({
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  teacherName: z.string(),
  username: z.string(),
  academicYearSlug: z.string(),
  blockSlug: z.string()
})

export type Class = z.infer<typeof classSchema>