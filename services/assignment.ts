import type { Assignment } from '~/schema'

export const fetchAssignmentsService = async (): Promise<Assignment[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/assignments')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}
