import { z } from 'zod'

export const gradeSchema = z.object({
  studentName: z.string(),
  username: z.string(),
  class: z.string(),
  semester: z.string(),
  scores: z.array(z.object({
    subjectName: z.string(),
    detailedScores: z.object({
      diemMieng: z.array(z.number()),
      diem15Phut: z.array(z.number()),
      diemMotTiet: z.array(z.number()),
      diemGiuaKi: z.array(z.number()),
      diemCuoiKi: z.array(z.number())
    }),
    averageScore: z.string()
  }))
})

export type Grade = z.infer<typeof gradeSchema>

export const gradeClassSchema = z.object({
  teacherName: z.string(),
  username: z.string(),
  class: z.string(),
  scores: z.array(z.object({
    studentName: z.string(),
    subjectName: z.string(),
    semesterName: z.string(),
    detailedScores: z.object({
      diemMieng: z.array(z.number()),
      diem15Phut: z.array(z.number()),
      diemMotTiet: z.array(z.number()),
      diemGiuaKi: z.array(z.number()),
      diemCuoiKi: z.array(z.number())
    }),
    averageScore: z.string()
  }))
})

export type GradeClass = z.infer<typeof gradeClassSchema>