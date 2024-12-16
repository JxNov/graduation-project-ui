import { z } from 'zod'

export const gradeSchema = z.object({
  subjectName: z.string(),
  teacherName: z.string(),
  teacherUsername: z.string(),
  studentName: z.string(),
  studentUsername: z.string(),
  className: z.string(),
  semesterName: z.string(),
  academicYearName: z.string(),
  mouthPoints: z.array(z.number()),
  fifteenMinutesPoints: z.array(z.number()),
  onePeriodPoints: z.array(z.number()),
  midSemesterPoints: z.array(z.number()),
  endSemesterPoints: z.array(z.number()),
  averageScore: z.string()
})

export type Grade = z.infer<typeof gradeSchema>