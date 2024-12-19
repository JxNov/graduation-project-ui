import type { Class } from '~/schema'

export const fetchClassesService = async (): Promise<Class[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/classes')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const fetchClassForTeacherService = async (username: string): Promise<Class[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/classes/teacher/${username}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchClassForStudentService = async (username: string): Promise<Class[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/classes/student/${username}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const showClassService = async (slug: string, query?: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    let api: string = `/v1/classes/${slug}`
    if (query) {
      api += `?${query}`
    }

    const response = await $axios.get(api)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createClassService = async (data: {
  name: string
  username: string
  academicYearSlug: string
  blockSlug: string
}): Promise<Class> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/classes', {
      name: data.name,
      username: data.username,
      academic_year_slug: data.academicYearSlug,
      block_slug: data.blockSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateClassService = async (slug: string, data: {
  name: string
  username: string
  academicYearSlug: string
  blockSlug: string
}): Promise<Class> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/classes/${slug}`, {
      name: data.name,
      username: data.username,
      academic_year_slug: data.academicYearSlug,
      block_slug: data.blockSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteClassService = async (slug: string): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/classes/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export const distributeStudentsService = async (academicYearSlug: string, blockSlug: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/excels/students-class/distributeStudents/${academicYearSlug}/${blockSlug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const assignStudentsToClassService = async (data: {
  classSlug: string
  username: string[]
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/excels/students-class`, {
      classSlug: data.classSlug,
      usernames: data.username
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const assignTeachersToClassService = async (slug: string, data: {
  username: string[]
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/classes/assign-class/${slug}`, {
      username: data.username
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response
  } catch (error) {
    throw error
  }
}

export const promoteStudentsService = async (slug: string, data: {
  name: string
  username: string
  academicYearSlug: string
  blockSlug: string
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/classes/promote-student/${slug}`, {
      name: data.name,
      username: data.username,
      academic_year_slug: data.academicYearSlug,
      block_slug: data.blockSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const trashClassService = async (): Promise<Class[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/classes/trash')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const restoreClassService = async (slug: string): Promise<Class> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/classes/restore/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}