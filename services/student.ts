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

export const exportSampleStudentsService = async (): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/excels/students/export-form', {
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

export const importStudentsService = async (data: {
  file: File,
  generationSlug: string,
  academicYearSlug: string,
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/excels/students/import', data, {
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