import type { User, UserDetail } from '~/schema'

export const fetchUsersService = async (): Promise<User[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/users')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const assignRolePermissionService = async (data: {
  users: string[],
  roles: string[],
  items: string[]
}): Promise<User> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch('/v1/users/assign-roles-permissions', {
      users: data.users,
      roles: data.roles,
      permissions: data.items
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchUserDetailService = async (username: string): Promise<UserDetail> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/users/showUser/${username}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateProfileInformationService = async (username: string, data: {
  images: File[],
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/users/updateUser/${username}`, {
      images: data.images,
      current_password: data.oldPassword,
      new_password: data.newPassword,
      confirm_new_password: data.confirmPassword,
      '_method': 'PATCH'
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}