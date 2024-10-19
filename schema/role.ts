import {z} from 'zod'

export const roleSchema = z.object({
    name: z.string(),
    slug: z.string(),
    permissions: z.array(z.string()),
})

export type Role = z.infer<typeof roleSchema>
