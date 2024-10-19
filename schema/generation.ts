import {z} from 'zod'

export const generationSchema = z.object({
    name: z.string(),
    year: z.number(),
    startDate: z.date(),
    endDate: z.date(),
})

export type Generation = z.infer<typeof generationSchema>
