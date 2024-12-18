import type { AcademicYear } from '~/schema'
import {
  fetchAcademicYearsService,
  showAcademicYearService,
  createAcademicYearService,
  updateAcademicYearService,
  deleteAcademicYearService
} from '~/services/academicYear'
import { toast } from 'vue-sonner'

export const useAcademicYearStore = defineStore('academic-year', () => {
  const academicYears = ref<AcademicYear[]>([])

  const fetchAcademicYears = async () => {
    try {
      academicYears.value = await fetchAcademicYearsService()
    } catch (error) {
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
    } catch (error) {
      toast.error('Tạo mới năm học thất bại')
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
  }

  return {
    academicYears,
    fetchAcademicYears,
    showAcademicYear,
    createAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
    clearAcademicYears
  }
})