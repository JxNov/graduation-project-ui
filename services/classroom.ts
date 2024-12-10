import type { Classroom } from '~/schema'

export const fetchClassroomsService = async (): Promise<Classroom[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/classrooms')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchDetailClassroomService = async (classSlug: string): Promise<Classroom> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/classrooms/${classSlug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchPeopleClassroomService = async (classSlug: string): Promise<Classroom> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/classrooms/people/${classSlug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchClassroomStudentService = async (): Promise<Classroom[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/classrooms/student')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}