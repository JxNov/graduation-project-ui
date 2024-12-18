import type { User, UserDetail } from '~/schema'
import {
  assignRolePermissionService,
  fetchUsersService,
  fetchUserDetailService,
  updateProfileInformationService,
  createUserService
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

      toast.success('Quyền và vai trò được chỉ định thành công')

      return response
    } catch (error) {
      toast.error('Không thể chỉ định quyền vai trò')
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
        throw new Error('Thay đổi thông tin học sinh không thành công!!!')
      }

      toast.success('Thay đổi thông tin học sinh thành công!!!')

      return response
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error)
        return
      }
      toast.error('Thay đổi thông tin học sinh không thành công!!!')
    }
  }

  const createUser = async (data: {
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phone: string,
  }) => {
    try {
      const response = await createUserService(data)

      if (!response) {
        throw new Error('Tạo học sinh không thành công!!!')
      }

      users.value = [...users.value, response]

      toast.success('Tạo học sinh thành công!!!')

      return response
    } catch (error: any) {
      toast.error('Tạo học sinh không thành công!!!')
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
    createUser,
    clearUsers
  }
})