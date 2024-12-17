import { z } from 'zod'

export const authSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
  permissions: z.array(z.string()),
  subjects: z.array(z.string())
})

export type Auth = z.infer<typeof authSchema>
