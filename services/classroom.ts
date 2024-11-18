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