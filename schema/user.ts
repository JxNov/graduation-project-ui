import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  email: z.string(),
  gender: z.string(),
  roles: z.array(z.string())
})

export type User = z.infer<typeof userSchema>

export const userDetailSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  email: z.string(),
  date_of_birth: z.string(),
  gender: z.string(),
  address: z.string(),
  phone_number: z.string()
})

export type UserDetail = z.infer<typeof userDetailSchema>
