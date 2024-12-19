import { z } from 'zod'

export const studentSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  email: z.string()
})

export type Student = z.infer<typeof studentSchema>
