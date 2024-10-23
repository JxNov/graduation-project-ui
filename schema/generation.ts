import {z} from 'zod'

export const generationSchema = z.object({
    name: z.string(),
    year: z.string(),
    start_date: z.string(),
    end_date: z.string(),
})

export type Generation = z.infer<typeof generationSchema>
