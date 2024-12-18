import type { Class } from '~/schema'
import {
  fetchClassesService,
  fetchClassForTeacherService,
  fetchClassForStudentService,
  showClassService,
  createClassService,
  updateClassService,
  deleteClassService,
  distributeStudentsService,
  assignStudentsToClassService,
  promoteStudentsService
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

  const fetchClassForTeacher = async (username: string) => {
    try {
      classes.value = await fetchClassForTeacherService(username)
    } catch (error) {
      throw error
    }
  }

  const fetchClassForStudent = async (username: string) => {
    try {
      classes.value = await fetchClassForStudentService(username)
    } catch (error) {
      throw error
    }
  }

  const showClass = async (slug: string, query?: string) => {
    try {
      return await showClassService(slug, query)
    } catch (error) {
      throw error
    }
  }

  const createClass = async (data: { name: string, username: string, academicYearSlug: string, blockSlug: string }) => {
    try {
      const response = await createClassService(data)
      replaceClasses(response)

      toast.success('Lớp được tạo thành công')

      return response
    } catch (error) {
      toast.error('Không tạo được lớp')
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

      toast.success('Lớp được cập nhật thành công')

      return response
    } catch (error) {
      toast.error('Không thể cập nhật lớp học')
      throw error
    }
  }

  const deleteClass = async (slug: string) => {
    try {
      await deleteClassService(slug)
      classes.value = classes.value.filter(cls => cls.slug !== slug)

      toast.success('Lớp đã được xóa thành công')
    } catch (error) {
      toast.error('Không thể xóa lớp học')
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
      toast.success('Phân chia học sinh vào lớp thành công')

      return response
    } catch (error) {
      toast.error('Không thể phân chia học sinh')
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

      toast.success('Thêm học sinh vào lớp thành công')

      return response
    } catch (error: any) {
      toast.error(error.response.data.error)
      throw error
    }
  }

  const promoteStudents = async (slug: string, data: {
    name: string
    username: string
    academicYearSlug: string
    blockSlug: string
  }) => {
    try {
      const response = await promoteStudentsService(slug, data)
      replaceClasses(response)

      toast.success('Lên lớp thành công')

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
    fetchClassForTeacher,
    fetchClassForStudent,
    showClass,
    createClass,
    updateClass,
    deleteClass,
    distributeStudents,
    assignStudentsToClass,
    promoteStudents,
    clearClasses
  }
})