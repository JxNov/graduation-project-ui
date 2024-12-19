import type { Generation } from '~/schema'

export const fetchGenerationsService = async (): Promise<Generation[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/generations')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const createGenerationService = async (data: {
  name: string,
  startDate: string,
  endDate: string
}): Promise<Generation> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/generations', {
      name: data.name,
      start_date: data.startDate,
      end_date: data.endDate
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateGenerationService = async (slug: string, data: {
  name: string,
  startDate: string,
  endDate: string
}): Promise<Generation> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/generations/${slug}`, {
      name: data.name,
      start_date: data.startDate,
      end_date: data.endDate
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteGenerationService = async (slug: string): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/generations/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export const trashGenerationService = async (): Promise<Generation[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/generations/trash')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const restoreGenerationService = async (slug: string): Promise<Generation> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/generations/restore/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}