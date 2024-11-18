import type { AcademicYear } from '~/schema'
import {
  fetchAcademicYearsService,
  createAcademicYearService,
  updateAcademicYearService,
  deleteAcademicYearService
} from '~/services/academicYear'
import { toast } from 'vue-sonner'
import { skipHydrate } from 'pinia'

export const useAcademicYearStore = defineStore('academic-year', () => {
  const academicYears = ref<AcademicYear[]>([])

  const fetchAcademicYears = async () => {
    try {
      academicYears.value = await fetchAcademicYearsService()
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

      toast.success('Academic year created successfully')

      return response
    } catch (error) {
      toast.error('Academic year created failed')
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

      toast.success('Academic year updated successfully')

      return response
    } catch (error) {
      toast.error('Academic year updated failed')
    }
  }

  const deleteAcademicYear = async (slug: string) => {
    try {
      await deleteAcademicYearService(slug)
      academicYears.value = academicYears.value.filter(academicYear => academicYear.slug !== slug)

      toast.success('Academic year deleted successfully')
    } catch (error) {
      toast.error('Academic year deleted failed')
    }
  }

  const reloadData = async () => {
    const promise = Promise.all([
      fetchAcademicYears()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
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
    createAcademicYear,
    updateAcademicYear,
    deleteAcademicYear,
    reloadData,
    clearAcademicYears
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage()
  }
})