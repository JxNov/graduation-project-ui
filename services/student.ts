import type { Student } from '~/schema'

export const fetchStudentsService = async (): Promise<Student[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/students')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}