import type { Student } from '~/schema'
import {
  fetchStudentsService,
  importStudentsService,
  exportSampleStudentsService,
  createStudentService
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
        throw new Error('Xuất file mẫu học sinh thất bại!!!')
      }

      return response
    } catch (error) {
      toast.error('Xuất file mẫu học sinh thất bại!!!')
    }
  }

  const importStudents = async (data: { file: File, generationSlug: string, academicYearSlug: string }) => {
    try {
      const response = await importStudentsService(data)

      if (!response) {
        throw new Error('Nhập học sinh thất bại!!!')
      }

      toast.success('Nhập học sinh thành công!!!')

      return response
    } catch (error) {
      toast.error('Nhập học sinh thất bại!!!')
    }
  }

  const createStudent = async (data: {
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phone: string,
    academicYearSlug: string,
    generationSlug: string,
  }) => {
    try {
      const response = await createStudentService(data)

      if (!response) {
        throw new Error('Tạo mới học sinh thất bại!!!')
      }

      students.value = [...students.value, response]

      toast.success('Tạo mới học sinh thành công!!!')

      return response
    } catch (error) {
      toast.error('Tạo mới học sinh thất bại!!!')
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
    importStudents,
    createStudent,
    clearStudents
  }
})