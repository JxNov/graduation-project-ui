import {z} from 'zod'

export const permissionSchema = z.object({
    value: z.string(),
    slug: z.string(),
})

export type Permission = z.infer<typeof permissionSchema>
