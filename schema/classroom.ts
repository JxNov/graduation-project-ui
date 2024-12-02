import { z } from 'zod'
import { articleSchema } from './article'

export const classroomSchema = z.object({
  className: z.string(),
  classSlug: z.string(),
  classCode: z.string(),
  teacherName: z.string(),
  teacherImage: z.string(),
  // articles: z.array(
  //   z.object({
  //     id: z.number(),
  //     content: z.string(),
  //     teacherName: z.string(),
  //     teacherImage: z.string(),
  //     createdAt: z.string(),
  //     comments: z.array(
  //       z.object({
  //         id: z.number(),
  //         name: z.string(),
  //         userImage: z.string(),
  //         content: z.string(),
  //         createdAt: z.string()
  //       })
  //     )
  //   })
  // ),
  articles: z.array(articleSchema),
  teachers: z.array(
    z.object({
      name: z.string(),
      image: z.string()
    })
  ),
  students: z.array(
    z.object({
      name: z.string(),
      image: z.string()
    })
  )
})

export type Classroom = z.infer<typeof classroomSchema>
