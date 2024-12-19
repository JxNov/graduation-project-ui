import { z } from 'zod'

export const classSchema = z.object({
  name: z.string(),
  slug: z.string(),
  code: z.string(),
  teacherName: z.string(),
  username: z.string(),
  academicYearName: z.string(),
  academicYearSlug: z.string(),
  blockSlug: z.string(),
  numberOfStudents: z.number()
})

export type Class = z.infer<typeof classSchema>