import type { AcademicYear } from '~/schema'


export const fetchAcademicYearsService = async (): Promise<AcademicYear[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/academic-years')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const createAcademicYearService = async (data: {
  name: string
  startDate: string
  endDate: string
  generationSlug: string
}): Promise<AcademicYear> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/academic-years', {
      name: data.name,
      start_date: data.startDate,
      end_date: data.endDate,
      generation_slug: data.generationSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateAcademicYearService = async (slug: string, data: {
  name: string
  startDate: string
  endDate: string
  generationSlug: string
}): Promise<AcademicYear> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/academic-years/${slug}`, {
      name: data.name,
      start_date: data.startDate,
      end_date: data.endDate,
      generation_slug: data.generationSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteAcademicYearService = async (slug: string): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/academic-years/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}