import type { Generation } from '~/schema'
import {
  fetchGenerationsService,
  createGenerationService,
  updateGenerationService,
  deleteGenerationService,
  trashGenerationService,
  restoreGenerationService
} from '~/services/generation'
import { toast } from 'vue-sonner'

export const useGenerationStore = defineStore('generation', () => {
  const generations = ref<Generation[]>([])
  const trashGenerations = ref<Generation[]>([])

  const fetchGenerations = async () => {
    try {
      generations.value = await fetchGenerationsService()
    } catch (error: any) {
      if (error.response.status === 404) {
        generations.value = []
      }

      throw error
    }
  }

  const createGeneration = async (data: { name: string, startDate: string, endDate: string }) => {
    try {
      const response = await createGenerationService(data)
      replaceGenerations(response)

      toast.success('Tạo mới khóa học sinh thành công')

      return response
    } catch (error) {
      toast.error('Tạo mới khóa học sinh thất bại')
    }
  }

  const updateGeneration = async (slug: string, data: {
    name: string,
    startDate: string,
    endDate: string
  }) => {
    try {
      const response = await updateGenerationService(slug, data)
      replaceGenerations(response)

      toast.success('Cập nhật khóa học sinh thành công')

      return response
    } catch (error) {
      toast.error('Cập nhật khóa học sinh thành công')
    }
  }

  const deleteGeneration = async (slug: string) => {
    try {
      await deleteGenerationService(slug)
      generations.value = generations.value.filter(generation => generation.slug !== slug)

      toast.success('Xóa khóa học sinh thành công')
    } catch (error) {
      toast.error('Xóa khóa học sinh thất bại')
    }
  }

  const trashGeneration = async () => {
    try {
      trashGenerations.value = await trashGenerationService()
    } catch (error: any) {
      if (error.response.status === 404) {
        trashGenerations.value = []
      }

      throw error
    }
  }

  const restoreGeneration = async (slug: string) => {
    try {
      const response = await restoreGenerationService(slug)

      if (!response) {
        throw new Error('Invalid response')
      }

      trashGenerations.value = trashGenerations.value.filter(generation => generation.slug !== slug)
      generations.value = [...generations.value, response]

      toast.success('Khôi phục khóa học sinh thành công')
      return response
    } catch (error: any) {
      toast.error(error.response.data.error)
      throw error
    }
  }

  const replaceGenerations = (response: any) => {
    const index = generations.value.findIndex(generation => generation.slug === response.slug)
    if (index !== -1) {
      generations.value = [
        ...generations.value.slice(0, index),
        response,
        ...generations.value.slice(index + 1)
      ]
    } else {
      generations.value = [...generations.value, response]
    }
  }

  const clearGenerations = () => {
    generations.value = []
  }

  return {
    generations,
    trashGenerations,
    fetchGenerations,
    createGeneration,
    updateGeneration,
    deleteGeneration,
    trashGeneration,
    restoreGeneration,
    clearGenerations
  }
})