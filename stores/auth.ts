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
    image: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    roles: [],
    permissions: [],
    subjects: []
  })
  const avatar = ref<string>(user.value.image)

  const login = async (data: { email: string, password: string }) => {
    try {
      await getCsrfTokenService()
      await loginService(data)
      user.value = await profileService()
      $generalStore.isLogged = true

      toast.success('Đăng nhập thành công!!!')
    } catch (error) {
      toast.error('Đăng nhập thất bại!!!')
    }
  }

  const logout = async () => {
    try {
      clearStores()
      navigateTo('/login')
      await logoutService()

      toast.success('Đăng xuất thành công!!!')
    } catch (error) {
      // toast.error('Đăng xuất thất bại!!!')
      toast.success('Đăng xuất thành công!!!')
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
      image: '',
      dateOfBirth: '',
      gender: '',
      phoneNumber: '',
      email: '',
      roles: [],
      permissions: [],
      subjects: []
    }

    avatar.value = user.value.image
  }

  return {
    user,
    avatar,
    login,
    logout,
    refreshToken,
    clearUser
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })
  }
})