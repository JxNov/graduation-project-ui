import {z} from 'zod'

export const generationSchema = z.object({
    name: z.string(),
    slug: z.string(),
    startDate: z.string(),
    endDate: z.string(),
})

export type Generation = z.infer<typeof generationSchema>
