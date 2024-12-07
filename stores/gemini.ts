import type { Gemini } from '~/schema'
import { fetchGeminisService, createGeminiService } from '~/services/gemini'
import { toast } from 'vue-sonner'

export const useGeminiStore = defineStore('gemini', () => {
  const geminis = ref<Gemini[]>([])

  const fetchGeminis = async () => {
    try {
      geminis.value = await fetchGeminisService()
    } catch (error) {
      throw error
    }
  }


  const clearGeminis = () => {
    geminis.value = []
  }

  return {
    geminis,
    fetchGeminis,
    clearGeminis
  }
})