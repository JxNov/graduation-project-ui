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

export const exportSampleTeachersService = async (): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/excels/teachers/export-form', {
      responseType: 'blob'
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const importTeachersService = async (data: {
  file: File,
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/excels/teachers/import', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}