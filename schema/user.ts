import { z } from 'zod'

export const userSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  email: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  roles: z.array(z.string())
})

export type User = z.infer<typeof userSchema>

export const userDetailSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  email: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  address: z.string(),
  phoneNumber: z.string()
})

export type UserDetail = z.infer<typeof userDetailSchema>
