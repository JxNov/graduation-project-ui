import type { Teacher } from '~/schema'
import { fetchTeachersService, importTeachersService, exportSampleTeachersService } from '~/services/teacher'
import { assignSubjectToTeacherService } from '~/services/subject'
import { toast } from 'vue-sonner'

export const useTeacherStore = defineStore('teacher', () => {
  const teachers = ref<Teacher[]>([])

  const fetchTeachers = async () => {
    try {
      teachers.value = await fetchTeachersService()
    } catch (error) {
      throw error
    }
  }

  const exportSampleTeachers = async () => {
    try {
      const response = await exportSampleTeachersService()

      if (!response) {
        throw new Error('Teachers export failed!!!')
      }

      return response
    } catch (error) {
      toast.error('Teachers export failed!!!')
    }
  }

  const importTeachers = async (data: { file: File }) => {
    try {
      const response = await importTeachersService(data)

      if (!response) {
        throw new Error('Teachers import failed!!!')
      }

      toast.success('Teachers imported successfully!!!')

      return response
    } catch (error) {
      toast.error('Teachers import failed!!!')
    }
  }

  const assignSubjectToTeacher = async (username: string, subjectSlug: string[]) => {
    try {
      const response = await assignSubjectToTeacherService(username, subjectSlug)
      replaceTeachers(response)

      if (!response) {
        throw new Error('Assign subject to teacher failed!!!')
      }

      toast.success('Assign subject to teacher successfully!!!')

      return response
    } catch (error) {
      toast.error('Assign subject to teacher failed!!!')
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