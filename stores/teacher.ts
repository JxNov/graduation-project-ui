import type { Teacher } from '~/schema'
import { fetchTeachersService, importTeachersService, exportSampleTeachersService } from '~/services/teacher'
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

  const replaceTeachers = (response: any) => {
    teachers.value = teachers.value.map((user: any) => {
      const responseTeacher = response.find((res: any) => res.username === user.username)
      if (responseTeacher) {
        return responseTeacher
      }

      return user
    })
  }

  const clearTeachers = () => {
    teachers.value = []
  }

  return {
    teachers,
    fetchTeachers,
    exportSampleTeachers,
    importTeachers,
    clearTeachers
  }
})