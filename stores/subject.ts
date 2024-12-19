import type { Subject } from '~/schema'
import { fetchSubjectsService } from '~/services/subject'

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref<Subject[]>([])

  const fetchSubjects = async () => {
    try {
      subjects.value = await fetchSubjectsService()
    } catch (error: any) {
      if (error.response.status === 404) {
        subjects.value = []
      }

      throw error
    }
  }

  const clearSubjects = () => {
    subjects.value = []
  }

  return {
    subjects,
    fetchSubjects,
    clearSubjects
  }
})