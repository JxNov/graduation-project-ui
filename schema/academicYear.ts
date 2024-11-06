import { z } from 'zod'

export const academicYearSchema = z.object({
  name: z.string(),
  slug: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  generationName: z.string()
})

export type AcademicYear = z.infer<typeof academicYearSchema>
