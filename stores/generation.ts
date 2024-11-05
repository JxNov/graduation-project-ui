import type { Generation } from '~/schema'
import {
  fetchGenerationsService,
  createGenerationService,
  updateGenerationService,
  deleteGenerationService
} from '~/services/generation'
import { toast } from 'vue-sonner'

export const useGenerationStore = defineStore('generation', () => {
  const generations = ref<Generation[]>([])

  const fetchGenerations = async () => {
    try {
      generations.value = await fetchGenerationsService()
    } catch (error) {
      throw error
    }
  }

  const createGeneration = async (data: { name: string, startDate: string, endDate: string }) => {
    try {
      const response = await createGenerationService(data)
      replaceGenerations(response)

      toast.success('Generation created successfully', {
        action: {
          label: 'Close'
        }
      })
    } catch (error) {
      toast.error('Failed to create generation', {
        action: {
          label: 'Close'
        }
      })
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

      toast.success('Generation updated successfully', {
        action: {
          label: 'Close'
        }
      })
    } catch (error) {
      toast.error('Failed to update generation', {
        action: {
          label: 'Close'
        }
      })
    }
  }

  const deleteGeneration = async (slug: string) => {
    try {
      await deleteGenerationService(slug)
      generations.value = generations.value.filter(generation => generation.slug !== slug)

      toast.success('Generation deleted successfully', {
        action: {
          label: 'Close'
        }
      })
    } catch (error) {
      toast.error('Failed to delete generation', {
        action: {
          label: 'Close'
        }
      })
    }
  }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchGenerations()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
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
    fetchGenerations,
    createGeneration,
    updateGeneration,
    deleteGeneration,
    reloadData,
    clearGenerations
  }
}, {
  persist: true
})