import type { Subject } from '~/schema'
import { fetchSubjectsService } from '~/services/subject'

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref<Subject[]>([])

  const fetchSubjects = async () => {
    try {
      subjects.value = await fetchSubjectsService()
    } catch (error) {
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