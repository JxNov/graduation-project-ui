import { z } from 'zod'

export const semesterSchema = z.object({
  name: z.string(),
  slug: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  generationName: z.string(),
  academicYearName: z.string()
})

export type Semester = z.infer<typeof semesterSchema>