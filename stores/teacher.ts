import type { Teacher } from '~/schema'
import { fetchTeachersService, importTeachersService, exportSampleTeachersService } from '~/services/teacher'
import { assignSubjectToTeacherService } from '~/services/subject'
import { toast } from 'vue-sonner'

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = ref<Teacher[]>([])

  const fetchTeachers = async () => {
    try {
      teachers.value = await fetchTeachersService()
    } catch (error: any) {
      if (error.response.status === 404) {
        teachers.value = []
      }

      throw error
    }
  }

  const exportSampleTeachers = async () => {
    try {
      const response = await exportSampleTeachersService()

      if (!response) {
        throw new Error('Xuất file mẫu giáo viên thất bại!!!')
      }

      return response
    } catch (error) {
      toast.error('Xuất file mẫu giáo viên thất bại!!!')
    }
  }

  const importTeachers = async (data: { file: File }) => {
    try {
      const response = await importTeachersService(data)

      if (!response) {
        throw new Error('Nhập giáo viên thất bại!!!')
      }

      toast.success('Nhập giáo viên thành công!!!')

      return response
    } catch (error) {
      toast.error('Nhập giáo vuên thất bại!!!')
    }
  }

  const assignSubjectToTeacher = async (username: string, subjectSlug: string[]) => {
    try {
      const response = await assignSubjectToTeacherService(username, subjectSlug)
      replaceTeachers(response)

      if (!response) {
        throw new Error('Gán môn cho giáo viên thất bại!!!')
      }

      toast.success('Gán môn cho giáo viên thành công!!!')

      return response
    } catch (error) {
      toast.error('Gán môn cho giáo viên thất bại!!!')
    }
  }

  const replaceTeachers = (response: any) => {
    const index = teachers.value.findIndex(teacher => teacher.username === response.username)
    if (index !== -1) {
      teachers.value = [
        ...teachers.value.slice(0, index),
        response,
        ...teachers.value.slice(index + 1)
      ]
    } else {
      teachers.value = [...teachers.value, response]
    }
  }

  const clearTeachers = () => {
    teachers.value = []
  }

  return {
    teachers,
    fetchTeachers,
    exportSampleTeachers,
    importTeachers,
    assignSubjectToTeacher,
    clearTeachers
  }
})