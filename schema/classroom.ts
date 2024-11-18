import { z } from 'zod'

export const classroomSchema = z.object({
  className: z.string(),
  ClassSlug: z.string(),
  teacherName: z.string(),
  teacherImage: z.string()
})

export type Classroom = z.infer<typeof classroomSchema>
