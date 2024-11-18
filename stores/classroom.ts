import type { Classroom } from '~/schema'
import { fetchClassroomsService } from '~/services/classroom'
import { toast } from 'vue-sonner'

export const useClassroomStore = defineStore('classroom', () => {
  const classrooms = ref<Classroom[]>([])

  const fetchClassrooms = async () => {
    try {
      classrooms.value = await fetchClassroomsService()
    } catch (error) {
      throw error
    }
  }

  const clearClassrooms = () => {
    classrooms.value = []
  }

  return {
    classrooms,
    fetchClassrooms,
    clearClassrooms
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage()
  }
})