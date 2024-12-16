import { z } from 'zod'

export const homeworkSchema = z.object({
  title: z.string(),
  slug: z.string(),
  criteria: z.string(),
  dueDate: z.string(),
  subjectName: z.string(),
  subjectSlug: z.string(),
  teacherName: z.string(),
  teacherImage: z.string(),
  semesterName: z.string(),
  semesterSlug: z.string(),
  submitted: z.number(),
  notSubmitted: z.number()
})

export type Homework = z.infer<typeof homeworkSchema>