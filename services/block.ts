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

export const createBlockService = async (data: {
  name: string
  level: number
}): Promise<Block> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/blocks', {
      name: data.name,
      level: data.level
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateBlockService = async (slug: string, data: {
  name: string
  level: number
}): Promise<Block> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/blocks/${slug}`, {
      name: data.name,
      level: data.level
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteBlockService = async (slug: string): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/blocks/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}