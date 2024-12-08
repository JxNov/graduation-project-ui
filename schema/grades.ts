import { z } from 'zod'

export const gradeSchema = z.object({
  name: z.string(),
  score: z.number()
})