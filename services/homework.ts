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

export const updateHomeworkService = async (slug: string, data: {
  title: string,
  dueDate: string,
  criteria: string,
  username: string,
  subjectSlug: string,
  classSlug: string,
  semesterSlug: string
}): Promise<Homework> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/assignments/${slug}`, {
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

export const deleteHomeworkService = async (slug: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/assignments/${slug}`)

    if (!response) {
      throw new Error('No response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const fetchDetailSubmittedAssignmentService = async (classSlug: string, assignmentSlug: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/submitted_assignments/${classSlug}/${assignmentSlug}/submitted-assignments`)

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const submitAssignmentService = async (assignmentSlug: string, data: {
  username: string
  file: File
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/submitted_assignments/${assignmentSlug}`, {
      student_username: data.username,
      file_path: data.file
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const giveScoreService = async (assignmentSlug: string, username: string, data: {
  score: number
  feedback?: string
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/submitted_assignments/${assignmentSlug}/${username}/score-feedback`, {
      score: data.score,
      feedback: data.feedback
    })

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}