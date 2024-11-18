import type { Block } from '~/schema'

export const fetchBlocksService = async (): Promise<Block[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/blocks')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}