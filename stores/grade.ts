import type { Grade } from '~/schema'
import { fetchGradeStudentService, createGradeService } from '~/services/grade'

export const useGradeStore = defineStore('grade', () => {
  const grades = ref<Grade[]>([])

  const fetchGradeStudent = async (query?: string) => {
    try {
      grades.value = await fetchGradeStudentService(query)
    } catch (error) {
      throw error
    }
  }

  const createGrade = async (data: {
    studentUsername: string
    subjectSlug: string
    classSlug: string
    semesterSlug: string
    detailedScores: {
      mouthPoints: {
        coefficient: number
        scores: number[]
      },
      fifteenMinutesPoints: {
        coefficient: number
        scores: number[]
      },
      onePeriodPoints: {
        coefficient: number
        scores: number[]
      },
      midSemesterPoints: {
        coefficient: number
        scores: number[]
      },
      endSemesterPoints: {
        coefficient: number
        scores: number[]
      }
    }
  }) => {
    try {
      return await createGradeService(data)
    } catch (error) {
      throw error
    }
  }

  const clearGrades = () => {
    grades.value = []
  }

  return {
    grades,
    fetchGradeStudent,
    createGrade,
    clearGrades
  }
})