import type { Auth } from '~/schema'
import { clearStores } from './index'
import { getCsrfTokenService } from '~/services/general'
import { loginService, profileService, logoutService, refreshTokenService } from '~/services/auth'
import { toast } from 'vue-sonner'

export const useAuthStore = defineStore('auth', () => {
  const { $generalStore } = useNuxtApp()

  const user = ref<Auth>({
    name: '',
    username: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    roles: [],
    permissions: []
  })

  const login = async (data: { email: string, password: string }) => {
    try {
      await getCsrfTokenService()
      await loginService(data)
      user.value = await profileService()
      $generalStore.isLogged = true

      setTimeout(() => {
        toast.success('Login success!!!', {
          action: {
            label: 'Close'
          }
        })
      }, 300)
    } catch (error) {
      toast.error('Login failed!!!', {
        action: {
          label: 'Close'
        }
      })
    }
  }

  const logout = async () => {
    try {
      await logoutService()
      clearStores()

      setTimeout(() => {
        toast.success('Logout success!!!', {
          action: {
            label: 'Close'
          }
        })
      }, 300)
    } catch (error) {
      toast.error('Logout failed!!!', {
        action: {
          label: 'Close'
        }
      })
    }
  }

  const refreshToken = async () => {
    try {
      await refreshTokenService()
      user.value = await profileService()
    } catch (error) {
      console.error(error)
    }
  }

  const clearUser = () => {
    user.value = {
      name: '',
      username: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      email: '',
      roles: [],
      permissions: []
    }
  }

  return {
    user,
    login,
    logout,
    refreshToken,
    clearUser
  }
}, {
  persist: true
})