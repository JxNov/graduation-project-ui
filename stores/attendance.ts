import type { Attendance } from '~/schema'
import { fetchAttendancesService, updateAttendanceService } from '~/services/attendance'
import { toast } from 'vue-sonner'

export const useAttendanceStore = defineStore('attendance', () => {
  const attendances = ref<Attendance[]>([])

  const fetchAttendances = async () => {
    try {
      attendances.value = await fetchAttendancesService()
    } catch (error) {
      throw error
    }
  }

  // const updateAttendance = async (slug: string, data: {
  //   name: string,
  //   username: string,
  //   academicYearSlug: string,
  //   blockSlug: string
  // }) => {
  //   try {
  //     const response = await updateAttendanceService(slug, data)
  //     replaceAttendances(response)
  //
  //     toast.success('Attendance updated successfully')
  //
  //     return response
  //   } catch (error) {
  //     toast.error('Failed to update attendance')
  //     throw error
  //   }
  // }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchAttendances()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
  }

  const replaceAttendances = (response: any) => {
    const index = attendances.value.findIndex(attendance => attendance.id === response.id)
    if (index !== -1) {
      attendances.value = [
        ...attendances.value.slice(0, index),
        response,
        ...attendances.value.slice(index + 1)
      ]
    } else {
      attendances.value = [...attendances.value, response]
    }
  }

  const clearAttendances = () => {
    attendances.value = []
  }

  return {
    attendances,
    fetchAttendances,
    reloadData,
    clearAttendances
  }
})