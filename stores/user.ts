import type { User, UserDetail } from '~/schema'
import {
  assignRolePermissionService,
  fetchUsersService,
  fetchUserDetailService,
  updateProfileInformationService
} from '~/services/user'
import { toast } from 'vue-sonner'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const userDetail = ref<UserDetail | null>(null)

  const fetchUsers = async () => {
    try {
      users.value = await fetchUsersService()
    } catch (error) {
      throw error
    }
  }

  const assignRolePermission = async (data: {
    users: string[],
    roles: string[],
    items: string[]
  }) => {
    try {
      const response = await assignRolePermissionService(data)
      replaceUsers(response)

      toast.success('Role permission assigned successfully')

      return response
    } catch (error) {
      toast.error('Failed to assign role permission')
    }
  }

  const fetchUserDetail = async (username: string) => {
    try {
      userDetail.value = await fetchUserDetailService(username)
    } catch (error) {
      throw error
    }
  }

  const updateProfileInformation = async (username: string, data: {
    images: File[],
    oldPassword?: string,
    newPassword?: string,
    confirmPassword?: string,
  }) => {
    try {
      const response = await updateProfileInformationService(username, data)

      if (!response) {
        throw new Error('Change student info failed!!!')
      }

      toast.success('Change student info successfully!!!')

      return response
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error)
        return
      }
      toast.error('Change student info failed!!!')
    }
  }

  const replaceUsers = (response: any) => {
    users.value = users.value.map((user: any) => {
      const responseUser = response.find((res: any) => res.username === user.username)
      if (responseUser) {
        return responseUser
      }

      return user
    })
  }

  const clearUsers = () => {
    users.value = []
    userDetail.value = null
  }

  return {
    users,
    userDetail,
    fetchUsers,
    assignRolePermission,
    fetchUserDetail,
    updateProfileInformation,
    clearUsers
  }
})