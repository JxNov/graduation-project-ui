import type { AcademicYear } from '~/schema'
import {
  fetchAcademicYearsService,
  showAcademicYearService,
  createAcademicYearService,
  updateAcademicYearService,
  deleteAcademicYearService,
  trashAcademicYearService,
  restoreAcademicYearService
} from '~/services/academicYear'
import { toast } from 'vue-sonner'

export const useAcademicYearStore = defineStore('academic-year', () => {
  const academicYears = ref<AcademicYear[]>([])
  const trashAcademicYears = ref<AcademicYear[]>([])

  const fetchAcademicYears = async () => {
    try {
      academicYears.value = await fetchAcademicYearsService()
    } catch (error: any) {
      if (error.response.status === 404) {
        academicYears.value = []
      }
      throw error
    }
  }

  const showAcademicYear = async (slug: string) => {
    try {
      return await showAcademicYearService(slug)
    } catch (error) {
      throw error
    }
  }

  const createAcademicYear = async (data: {
    name: string,
    startDate: string,
    endDate: string,
    generationSlug: string
  }) => {
    try {
      const response = await createAcademicYearService(data)
      replaceAcademicYears(response)

      toast.success('Tạo mới năm học thành công')

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

  const updateAcademicYear = async (slug: string, data: {
    name: string,
    startDate: string,
    endDate: string,
    generationSlug: string
  }) => {
    try {
      const response = await updateAcademicYearService(slug, data)
      replaceAcademicYears(response)

      toast.success('Cập nhật năm học thành công')

      return response
    } catch (error) {
      toast.error('Cập nhật năm học thất bại')
    }
  }

  const deleteAcademicYear = async (slug: string) => {
    try {
      await deleteAcademicYearService(slug)
      academicYears.value = academicYears.value.filter(academicYear => academicYear.slug !== slug)

      toast.success('Xóa năm học thành công')
    } catch (error) {
      toast.error('Xóa năm học thất bại')
    }
  }

  const trashAcademicYear = async () => {
    try {
      trashAcademicYears.value = await trashAcademicYearService()
    } catch (error: any) {
      if (error.response.status === 404) {
        trashAcademicYears.value = []
      }
      throw error
    }
  }

  const restoreAcademicYear = async (slug: string) => {
    try {
      const response = await restoreAcademicYearService(slug)

      if (!response) {
        throw new Error('Không thể khôi phục năm học')
      }

      trashAcademicYears.value = trashAcademicYears.value.filter(academicYear => academicYear.slug !== slug)
      replaceAcademicYears(response)

      toast.success('Khôi phục năm học thành công')
      return response
    } catch (error: any) {
      toast.error(error.response.data.error)
      throw error
    }
  }

  const replaceAcademicYears = (response: any) => {
    const index = academicYears.value.findIndex(academicYear => academicYear.slug === response.slug)
    if (index !== -1) {
      academicYears.value = [
        ...academicYears.value.slice(0, index),
        response,
        ...academicYears.value.slice(index + 1)
      ]
    } else {
      academicYears.value = [...academicYears.value, response]
    }
  }

  const clearAcademicYears = () => {
    academicYears.value = []
    trashAcademicYears.value = []
  }

  return {
    academicYears,
    trashAcademicYears,
    fetchAcademicYears,
    showAcademicYear,
    createAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
    trashAcademicYear,
    restoreAcademicYear,
    clearAcademicYears
  }
})