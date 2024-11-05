export const getCsrfTokenService = async (): Promise<void> => {
  const { $axios } = useNuxtApp()
  const config = useRuntimeConfig()

  try {
    const response = await $axios.get(`${config.public.baseApi}/sanctum/csrf-cookie`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}