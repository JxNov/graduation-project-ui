import { z } from 'zod'

export const gradeSchema = z.object({
  studentName: z.string(),
  studentUsername: z.string(),
  studentImage: z.string(),
  subjectName: z.string(),
  academicYearName: z.string(),
  semesterName: z.string(),
  className: z.string(),
  mouthPoints: z.array(z.number()),
  fifteenMinutesPoints: z.array(z.number()),
  onePeriodPoints: z.array(z.number()),
  midSemesterPoints: z.array(z.number()),
  endSemesterPoints: z.array(z.number()),
  averageScore: z.string()
})

export type Grade = z.infer<typeof gradeSchema>