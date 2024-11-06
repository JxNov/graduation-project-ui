import type { Teacher } from '~/schema'

export const fetchTeachersService = async (): Promise<Teacher[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/teachers')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}