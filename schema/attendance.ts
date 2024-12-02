import { z } from 'zod'

export const attendanceSchema = z.object({
  id: z.number(),
  date: z.string(),
  shifts: z.string(),
  className: z.string()
})

export type Attendance = z.infer<typeof attendanceSchema>