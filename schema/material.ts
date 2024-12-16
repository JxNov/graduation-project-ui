import { z } from 'zod'

export const materialSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  filePath: z.string(),
  subjectName: z.string(),
  subjectSlug: z.string()
})

export type Material = z.infer<typeof materialSchema>

export const materialBlockSchema = z.object({
  blockName: z.string(),
  blockSlug: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  filePath: z.string(),
  subjectName: z.string(),
  subjectSlug: z.string()
})

export type MaterialBlock = z.infer<typeof materialBlockSchema>