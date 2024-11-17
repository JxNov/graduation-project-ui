import { z } from 'zod'

export const teacherSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  email: z.string()
})

export type Teacher = z.infer<typeof teacherSchema>
