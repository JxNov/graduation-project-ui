import type { Class } from '~/schema'
import {
  fetchClassesService,
  createClassService,
  updateClassService,
  deleteClassService,
  distributeStudentsService,
  assignStudentsToClassService
} from '~/services/class'
import { toast } from 'vue-sonner'

export const useClassStore = defineStore('class', () => {
  const classes = ref<Class[]>([])

  const fetchClasses = async () => {
    try {
      classes.value = await fetchClassesService()
    } catch (error) {
      throw error
    }
  }

  const createClass = async (data: { name: string, username: string, academicYearSlug: string, blockSlug: string }) => {
    try {
      const response = await createClassService(data)
      replaceClasses(response)

      toast.success('Class created successfully')

      return response
    } catch (error) {
      toast.error('Failed to create class')
      throw error
    }
  }

  const updateClass = async (slug: string, data: {
    name: string,
    username: string,
    academicYearSlug: string,
    blockSlug: string
  }) => {
    try {
      const response = await updateClassService(slug, data)
      replaceClasses(response)

      toast.success('Class updated successfully')

      return response
    } catch (error) {
      toast.error('Failed to update class')
      throw error
    }
  }

  const deleteClass = async (slug: string) => {
    try {
      await deleteClassService(slug)
      classes.value = classes.value.filter(cls => cls.slug !== slug)

      toast.success('Class deleted successfully')
    } catch (error) {
      toast.error('Failed to delete class')
      throw error
    }
  }

  const distributeStudents = async (academicYearSlug: string, blockSlug: string) => {
    try {
      const response = await distributeStudentsService(academicYearSlug, blockSlug)

      if (!response) {
        throw new Error('Invalid response')
      }

      await fetchClasses()
      toast.success('Students distributed successfully')

      return response
    } catch (error) {
      toast.error('Failed to distribute students')
      throw error
    }
  }

  const assignStudentsToClass = async (data: {
    classSlug: string
    username: string[]
  }) => {
    try {
      const response = await assignStudentsToClassService(data)
      incrementNumberOfStudents(data.classSlug)

      toast.success('Students assigned to class successfully')

      return response
    } catch (error: any) {
      toast.error(error.response.data.error)
      throw error
    }
  }

  const replaceClasses = (response: any) => {
    const index = classes.value.findIndex(cls => cls.slug === response.slug)
    if (index !== -1) {
      classes.value = [
        ...classes.value.slice(0, index),
        response,
        ...classes.value.slice(index + 1)
      ]
    } else {
      classes.value = [...classes.value, response]
    }
  }

  const incrementNumberOfStudents = (classSlug: string) => {
    const index = classes.value.findIndex(cls => cls.slug === classSlug)
    if (index !== -1) {
      classes.value = [
        ...classes.value.slice(0, index),
        {
          ...classes.value[index],
          numberOfStudents: classes.value[index].numberOfStudents + 1
        },
        ...classes.value.slice(index + 1)
      ]
    }
  }

  const clearClasses = () => {
    classes.value = []
  }

  return {
    classes,
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    distributeStudents,
    assignStudentsToClass,
    clearClasses
  }
})