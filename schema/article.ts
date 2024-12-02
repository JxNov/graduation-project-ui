import { z } from 'zod'
import { commentSchema } from './comment'

export const articleSchema = z.object({
  id: z.number(),
  content: z.string(),
  className: z.string(),
  teacherName: z.string(),
  teacherImage: z.string(),
  createdAt: z.string(),
  comments: z.array(commentSchema)
})

export type Article = z.infer<typeof articleSchema>