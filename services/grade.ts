import type { Grade } from '~/schema'

export const fetchGradeClass = async (classSlug: string, semesterSlug: string, yearSlug: string): Promise<Grade> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/statistic/list/${classSlug}/${semesterSlug}/${yearSlug}`)

    if (!response) {
      throw new Error('No response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}