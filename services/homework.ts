import type { Homework } from '~/schema'

export const fetchHomeworkClassService = async (classSlug: string): Promise<Homework[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/assignments/classes/${classSlug}`)

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const createHomeworkService = async (data: {
  title: string
  dueDate: string
  criteria: string
  username: string
  subjectSlug: string
  classSlug: string
  semesterSlug: string
}): Promise<Homework> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/assignments`, {
      title: data.title,
      due_date: data.dueDate,
      criteria: data.criteria,
      username: data.username,
      subject_slug: data.subjectSlug,
      class_slug: data.classSlug,
      semester_slug: data.semesterSlug
    })

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}