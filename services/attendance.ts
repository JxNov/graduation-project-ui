import type { Attendance } from '~/schema'


export const fetchAttendancesService = async (): Promise<Attendance[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/attendances')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const updateAttendanceService = async (id: number, data: {
  classSlug: string
  date: string
  shifts: string
  students: {
    username: string
    status: string
    reason: string
  }[]
}): Promise<Attendance> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/attendances/update/${id}`, {
      class_slug: data.classSlug,
      date: data.date,
      shifts: data.shifts,
      students: data.students
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}
