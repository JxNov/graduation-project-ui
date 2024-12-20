export const fetchStatisticPerformanceService = async (slug: string) => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/statistic/performation/${slug}`)

    if (!response) {
      throw new Error('Không thể lấy thông tin thống kê')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchStatisticAllService = async () => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/statistic/countall')

    if (!response) {
      throw new Error('Không thể lấy thông tin thống kê')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchStatisticGenderService = async () => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/statistic/gender')

    if (!response) {
      throw new Error('Không thể lấy thông tin thống kê')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchStatisticStudentAcademicYearService = async (slug: string) => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/statistic/${slug}`)

    if (!response) {
      throw new Error('Không thể lấy thông tin thống kê')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}