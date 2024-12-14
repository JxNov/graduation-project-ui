import type { Subject } from '~/schema'

export const fetchSubjectsService = async (): Promise<Subject[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/subjects')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const assignSubjectToTeacherService = async (username: string, subjectSlug: string[]): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/subject-teachers/${username}`, { subjectSlugs: subjectSlug })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}