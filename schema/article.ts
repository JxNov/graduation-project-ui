import { z } from 'zod'

export const articleSchema = z.object({
  id: z.number(),
  content: z.string(),
  teacherName: z.string(),
  teacherImage: z.string(),
  className: z.string(),
  publishedAt: z.string()
})

export type Article = z.infer<typeof articleSchema>