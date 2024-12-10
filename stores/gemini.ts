import type { Gemini } from '~/schema'
import { fetchGeminisService, askGeminiService } from '~/services/gemini'
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

  const askGemini = async (question: string) => {
    try {
      const response = await askGeminiService(question)

      if (!response) {
        throw new Error('Failed to create Gemini')
      }

      return response
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
    askGemini,
    clearGeminis
  }
})