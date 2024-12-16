import type { Gemini } from '~/schema'

export const fetchGeminisService = async (): Promise<Gemini[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/chat-bots')

    if (!response) {
      throw new Error('Failed to get Gemini')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const askGeminiService = async (question: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/chat-bots', { question })

    if (!response) {
      throw new Error('Failed to ask Gemini')
    }

    return response.data
  } catch (error) {
    throw error
  }
}