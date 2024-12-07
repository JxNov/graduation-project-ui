import type { Gemini } from '~/schema'

export const fetchGeminisService = async (): Promise<Gemini[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/chat-bots')

    if (!response) {
      throw new Error('Failed to get Gemini')
    }

    console.log(response)

    return response.data
  } catch (error) {
    throw error
  }
}

export const createGeminiService = async (question: string): Promise<Gemini[]> => {
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