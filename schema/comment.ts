import { z } from 'zod'

export const commentSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  userImage: z.string(),
  content: z.string(),
  createdAt: z.string()
})

export type Comment = z.infer<typeof commentSchema>