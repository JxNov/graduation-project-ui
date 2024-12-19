import { z } from 'zod'

export const attendanceSchema = z.object({
  id: z.number(),
  date: z.string(),
  className: z.string(),
  classSlug: z.string(),
  teacherName: z.string(),
  totalStudents: z.number(),
  attendedStudents: z.number(),
  status: z.boolean()
})

export type Attendance = z.infer<typeof attendanceSchema>

export const attendanceDetailSchema = z.object({
  id: z.number().nullable(),
  className: z.string(),
  teacherName: z.string(),
  teacherImage: z.string(),
  numberStudentInClass: z.number(),
  students: z.array(z.object({
    name: z.string(),
    username: z.string(),
    userImage: z.string(),
    status: z.string(),
    reason: z.string()
  }))
})

export type AttendanceDetail = z.infer<typeof attendanceDetailSchema>

export const attendanceShowSchema = z.object({
  date: z.string(),
  shifts: z.string(),
  className: z.string(),
  status: z.string(),
  reason: z.string(),
  username: z.string()
})

export type AttendanceShow = z.infer<typeof attendanceShowSchema>