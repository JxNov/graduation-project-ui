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

export const createStudentService = async (data: {
  name: string,
  dateOfBirth: string,
  gender: string,
  address: string,
  phone: string,
  academicYearSlug: string,
  generationSlug: string,
}): Promise<Student> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/students', {
      name: data.name,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      phone_number: data.phone,
      academicYearSlug: data.academicYearSlug,
      generationSlug: data.generationSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}
