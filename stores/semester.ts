import type { Semester } from '~/schema'
import {
  fetchSemestersService,
  createSemesterService,
  updateSemesterService,
  deleteSemesterService
} from '~/services/semester'
import { toast } from 'vue-sonner'

export const useSemesterStore = defineStore('semester', () => {
  const semesters = ref<Semester[]>([])

  const fetchSemesters = async () => {
    try {
      semesters.value = await fetchSemestersService()
    } catch (error) {
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

      toast.success('Semester created successfully')

      return response
    } catch (error) {
      toast.error('Semester created failed')
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

      toast.success('Semester updated successfully')

      return response
    } catch (error) {
      toast.error('Semester updated failed')
    }
  }

  const deleteSemester = async (slug: string) => {
    try {
      await deleteSemesterService(slug)
      semesters.value = semesters.value.filter(semester => semester.slug !== slug)

      toast.success('Semester deleted successfully')
    } catch (error) {
      toast.error('Semester deleted failed')
    }
  }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchSemesters()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
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
  }

  return {
    semesters,
    fetchSemesters,
    createSemester,
    updateSemester,
    deleteSemester,
    reloadData,
    clearSemesters
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage()
  }
})