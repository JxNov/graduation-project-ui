import type { Student } from '~/schema'
import {
  fetchStudentsService,
  importStudentsService,
  exportSampleStudentsService,
  updateProfileInformationService
} from '~/services/student'
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

  const exportSampleStudents = async () => {
    try {
      const response = await exportSampleStudentsService()

      if (!response) {
        throw new Error('Students export failed!!!')
      }

      return response
    } catch (error) {
      toast.error('Students export failed!!!')
    }
  }

  const updateProfileInformation = async (username: string, data: {
    images: File[],
    password: string,
  }) => {
    try {
      const response = await updateProfileInformationService(username, data)

      if (!response) {
        throw new Error('Change student info failed!!!')
      }

      toast.success('Change student info successfully!!!')

      return response
    } catch (error) {
      toast.error('Change student info failed!!!')
    }
  }

  const importStudents = async (data: { file: File, generationSlug: string, academicYearSlug: string }) => {
    try {
      const response = await importStudentsService(data)

      if (!response) {
        throw new Error('Students import failed!!!')
      }

      toast.success('Students imported successfully!!!')

      return response
    } catch (error) {
      toast.error('Students import failed!!!')
    }
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
    exportSampleStudents,
    fetchStudents,
    updateProfileInformation,
    importStudents,
    clearStudents
  }
})