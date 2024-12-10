import { z } from 'zod'

export const homeworkSchema = z.object({
  title: z.string(),
  slug: z.string(),
  criteria: z.string(),
  dueDate: z.string(),
  subject: z.string(),
  teacher: z.string(),
  class: z.string(),
  semester: z.object({
    name: z.string(),
    academicYearName: z.string()
  })
})

export type Homework = z.infer<typeof homeworkSchema>