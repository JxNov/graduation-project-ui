import type { Semester } from '~/schema'

export const fetchSemestersService = async (): Promise<Semester[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/semesters')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const createSemesterService = async (data: {
  name: string
  startDate: string
  endDate: string
  academicYearSlug: string
}): Promise<Semester> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/semesters', {
      name: data.name,
      start_date: data.startDate,
      end_date: data.endDate,
      academic_year_slug: data.academicYearSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateSemesterService = async (slug: string, data: {
  name: string
  startDate: string
  endDate: string
  academicYearSlug: string
}): Promise<Semester> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/semesters/${slug}`, {
      name: data.name,
      start_date: data.startDate,
      end_date: data.endDate,
      academic_year_slug: data.academicYearSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteSemesterService = async (slug: string): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/semesters/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export const trashSemesterService = async (): Promise<Semester[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/semesters/trash')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const restoreSemesterService = async (slug: string): Promise<Semester> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/semesters/restore/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}