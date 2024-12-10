import type { Homework } from '~/schema'
import {
  fetchHomeworkClassService,
  createHomeworkService
} from '~/services/homework'
import { toast } from 'vue-sonner'

export const useHomeworkStore = defineStore('homework', () => {
  const homeworks = ref<Homework[]>([])

  const fetchHomeworks = async (classSlug: string) => {
    try {
      homeworks.value = await fetchHomeworkClassService(classSlug)
    } catch (error) {
      throw error
    }
  }

  const createHomework = async (data: {
    title: string
    dueDate: string
    criteria: string
    username: string
    subjectSlug: string
    classSlug: string
    semesterSlug: string
  }) => {
    try {
      const response = await createHomeworkService(data)
      replaceHomeworks(response)

      toast.success('Homework created successfully')

      return response
    } catch (error) {
      toast.error('Failed to create homework')
    }
  }

  const replaceHomeworks = (response: any) => {
    const index = homeworks.value.findIndex(homework => homework.slug === response.slug)
    if (index !== -1) {
      homeworks.value = [
        ...homeworks.value.slice(0, index),
        response,
        ...homeworks.value.slice(index + 1)
      ]
    } else {
      homeworks.value = [...homeworks.value, response]
    }
  }

  const clearHomeworks = () => {
    homeworks.value = []
  }

  return {
    homeworks,
    fetchHomeworks,
    createHomework,
    clearHomeworks
  }
})