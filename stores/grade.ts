import type { Grade } from '~/schema'
import { fetchGradeStudentService } from '~/services/grade'

export const useGradeStore = defineStore('grade', () => {
  const grades = ref<Grade[]>([])

  const fetchGradeStudent = async (classSlug: string, semesterSlug: string, yearSlug: string) => {
    try {
      grades.value = await fetchGradeStudentService(classSlug, semesterSlug, yearSlug)
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
    clearGrades
  }
})