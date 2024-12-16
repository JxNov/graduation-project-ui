import type { Material, MaterialBlock } from '~/schema'

export const fetchMaterialClassService = async (classSlug: string): Promise<Material[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/classrooms/class-material/${classSlug}`)

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchMaterialBlockService = async (): Promise<MaterialBlock[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/materials/blocks')

    if (!response) {
      throw new Error('No response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createMaterialClassService = async (data: {
  title: string
  description: string | null
  file: File
  subjectSlug: string
  classSlug: string
}): Promise<Material> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/materials/classes', {
      title: data.title,
      description: data.description,
      file_path: data.file,
      subject_slug: data.subjectSlug,
      class_slug: data.classSlug
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

export const createMaterialBlockService = async (data: {
  title: string
  description: string | null
  file: File
  subjectSlug: string
  blockSlug: string
}): Promise<MaterialBlock> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/materials/blocks', {
      title: data.title,
      description: data.description,
      file_path: data.file,
      subject_slug: data.subjectSlug,
      block_slug: data.blockSlug
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

export const updateMaterialClassService = async (materialSlug: string, data: {
  title: string
  description: string | null
  file: File
  subjectSlug: string
  classSlug: string
}): Promise<Material> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/materials/classes/${materialSlug}`, {
      '_method': 'PATCH',
      title: data.title,
      description: data.description,
      file_path: data.file,
      subject_slug: data.subjectSlug,
      class_slug: data.classSlug
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

export const updateMaterialBlockService = async (materialSlug: string, data: {
  title: string
  description: string | null
  file: File
  subjectSlug: string
  blockSlug: string
}): Promise<MaterialBlock> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/materials/blocks/${materialSlug}`, {
      '_method': 'PATCH',
      title: data.title,
      description: data.description,
      file_path: data.file,
      subject_slug: data.subjectSlug,
      block_slug: data.blockSlug
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

export const deleteMaterialService = async (materialSlug: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/materials/force-delete/${materialSlug}`)

    if (!response) {
      throw new Error('No response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}