import type { Teacher } from '~/schema'
import { fetchTeachersService } from '~/services/teacher'
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

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchTeachers()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
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
    reloadData,
    clearTeachers
  }
}, {
  persist: true
})