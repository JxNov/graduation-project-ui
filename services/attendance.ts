import type { Attendance, AttendanceDetail, AttendanceShow } from '~/schema'

export const fetchAttendancesService = async (): Promise<Attendance[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/attendances')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const detailAttendanceService = async (classSlug: string): Promise<AttendanceDetail> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/attendances/${classSlug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createAttendanceService = async (data: {
  classSlug: string
  students: {
    username: string
    status: string
    reason: string
  }[]
}): Promise<AttendanceDetail> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/attendances', {
      class_slug: data.classSlug,
      students: data.students
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const updateAttendanceService = async (id: number, data: {
  classSlug: string
  students: {
    username: string
    status: string
    reason: string
  }[]
}): Promise<AttendanceDetail> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/attendances/${id}`, {
      class_slug: data.classSlug,
      students: data.students
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const showAttendanceService = async (): Promise<AttendanceShow[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/attendances/show`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateStudentAttendanceService = async (username: string, data: {
  shifts: string
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/attendances/student/${username}`, data)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}
