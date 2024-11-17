import type { Student } from '~/schema'
import { fetchStudentsService } from '~/services/student'
import { toast } from 'vue-sonner'

export const useStudentStore = defineStore('student', () => {
  const students = ref<Student[]>([])

  const fetchStudents = async () => {
    try {
      students.value = await fetchStudentsService()
    } catch (error) {
      throw error
    }
  }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchStudents()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
  }

  const replaceStudents = (response: any) => {
    students.value = students.value.map((user: any) => {
      const responseStudent = response.find((res: any) => res.username === user.username)
      if (responseStudent) {
        return responseStudent
      }

      return user
    })
  }

  const clearStudents = () => {
    students.value = []
  }

  return {
    students,
    fetchStudents,
    reloadData,
    clearStudents
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})