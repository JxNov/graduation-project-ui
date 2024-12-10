import type { Auth } from '~/schema'

export const loginService = async (data: { email: string, password: string }): Promise<void> => {
  const { $axios } = useNuxtApp()
  const { email, password } = data

  try {
    const response = await $axios.post('/auth/login', {
      email,
      password
    })

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export const profileService = async (): Promise<Auth> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/auth/profile')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const logoutService = async (): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/auth/logout')

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}

export const refreshTokenService = async (): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/auth/refresh-token')

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}