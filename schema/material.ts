import { z } from 'zod'

export const materialSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  file_path: z.string(),
  subjectName: z.string(),
  subjectSlug: z.string()
})

export type Material = z.infer<typeof materialSchema>

export const materialBlockSchema = z.object({
  blockName: z.string(),
  blockSlug: z.string(),
  materials: z.array(materialSchema)
})

export type MaterialBlock = z.infer<typeof materialBlockSchema>