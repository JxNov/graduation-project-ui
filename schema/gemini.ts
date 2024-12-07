import { z } from 'zod'

export const geminiSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.array(z.object({
    question: z.string(),
    answer: z.string()
  }))
})

export type Gemini = z.infer<typeof geminiSchema>