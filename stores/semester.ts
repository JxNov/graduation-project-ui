import type { Semester } from '~/schema'
import {
  fetchSemestersService,
  createSemesterService,
  updateSemesterService,
  deleteSemesterService,
  trashSemesterService,
  restoreSemesterService
} from '~/services/semester'
import { toast } from 'vue-sonner'

export const useSemesterStore = defineStore('semester', () => {
  const semesters = ref<Semester[]>([])
  const trashSemesters = ref<Semester[]>([])

  const fetchSemesters = async () => {
    try {
      semesters.value = await fetchSemestersService()
    } catch (error: any) {
      if (error.response.status === 404) {
        semesters.value = []
      }

      throw error
    }
  }

  const createSemester = async (data: {
    name: string
    startDate: string
    endDate: string
    academicYearSlug: string
  }) => {
    try {
      const response = await createSemesterService(data)
      replaceSemesters(response)

      toast.success('Tạo mới học kỳ thành công')

      return response
    } catch (error: any) {
      for (const key in error.response.data.errors) {
        toast.error(error.response.data.errors[key][0])
      }

      if (!error.response.data.errors) {
        toast.error(error.response.data.error)
      }

      throw error
    }
  }

  const updateSemester = async (slug: string, data: {
    name: string
    startDate: string
    endDate: string
    academicYearSlug: string
  }) => {
    try {
      const response = await updateSemesterService(slug, data)
      replaceSemesters(response)

      toast.success('Cập nhật học kỳ thành công')

      return response
    } catch (error) {
      toast.error('Cập nhật học kỳ thất abị')
    }
  }

  const deleteSemester = async (slug: string) => {
    try {
      await deleteSemesterService(slug)
      semesters.value = semesters.value.filter(semester => semester.slug !== slug)

      toast.success('Xóa học kỳ thành công')
    } catch (error) {
      toast.error('Xóa học kỳ thất bại')
    }
  }

  const trashSemester = async () => {
    try {
      trashSemesters.value = await trashSemesterService()
    } catch (error: any) {
      if (error.response.status === 404) {
        trashSemesters.value = []
      }

      throw error
    }
  }

  const restoreSemester = async (slug: string) => {
    try {
      const response = await restoreSemesterService(slug)

      if (!response) {
        throw new Error('Invalid response')
      }

      trashSemesters.value = trashSemesters.value.filter(semester => semester.slug !== slug)
      semesters.value = [...semesters.value, response]

      toast.success('Khôi phục học kỳ thành công')
      return response
    } catch (error: any) {
      toast.error(error.response.data.error)
      throw error
    }
  }

  const replaceSemesters = (response: any) => {
    const index = semesters.value.findIndex(semester => semester.slug === response.slug)
    if (index !== -1) {
      semesters.value = [
        ...semesters.value.slice(0, index),
        response,
        ...semesters.value.slice(index + 1)
      ]
    } else {
      semesters.value = [...semesters.value, response]
    }
  }

  const clearSemesters = () => {
    semesters.value = []
    trashSemesters.value = []
  }

  return {
    semesters,
    trashSemesters,
    fetchSemesters,
    createSemester,
    updateSemester,
    deleteSemester,
    trashSemester,
    restoreSemester,
    clearSemesters
  }
})