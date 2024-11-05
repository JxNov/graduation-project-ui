import {z} from 'zod'

export const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
    gender: z.string(),
    roles: z.array(z.string()),
})

export type User = z.infer<typeof userSchema>
