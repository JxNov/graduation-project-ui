import type { Grade } from '~/schema'
import {
  fetchGradeService,
  fetchGradeByTeacherService,
  fetchGradeStudentService,
  createGradeService,
  fetchFinalGradeService
} from '~/services/grade'

export const useGradeStore = defineStore('grade', () => {
  const grades = ref<Grade[]>([])

  const fetchGrade = async (query?: string) => {
    try {
      grades.value = await fetchGradeService(query)
    } catch (error: any) {
      if (error.response.status === 404) {
        grades.value = []
      }

      throw error
    }
  }

  const fetchGradeByTeacher = async (query?: string) => {
    try {
      grades.value = await fetchGradeByTeacherService(query)
    } catch (error: any) {
      if (error.response.status === 404) {
        grades.value = []
      }

      throw error
    }
  }

  const fetchGradeStudent = async (query?: string) => {
    try {
      grades.value = await fetchGradeStudentService(query)
    } catch (error: any) {
      if (error.response.status === 404) {
        grades.value = []
      }

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

  const fetchFinalGrade = async (classSlug: string, academicYearSlug: string) => {
    try {
      return await fetchFinalGradeService(classSlug, academicYearSlug)
    } catch (error) {
      throw error
    }
  }

  const clearGrades = () => {
    grades.value = []
  }

  return {
    grades,
    fetchGrade,
    fetchGradeByTeacher,
    fetchGradeStudent,
    createGrade,
    clearGrades,
    fetchFinalGrade
  }
})