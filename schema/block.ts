import { z } from 'zod'

export const blockSchema = z.object({
  name: z.string(),
  slug: z.string()
})

export type Block = z.infer<typeof blockSchema>
