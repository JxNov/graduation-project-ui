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
  oldPassword?: string,
  newPassword?: string,
  confirmPassword?: string,
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

export const createUserService = async (data: {
  name: string,
  dateOfBirth: string,
  gender: string,
  address: string,
  phone: string,
}): Promise<User> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/users', {
      name: data.name,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      phone_number: data.phone
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateUserService = async (username: string, data: {
  name: string,
  dateOfBirth: string,
  gender: string,
  address: string,
  phone: string,
}): Promise<User> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/users/change-info/${username}`, {
      name: data.name,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      address: data.address,
      phone_number: data.phone
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteUserService = async (username: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/users/${username}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response
  } catch (error) {
    throw error
  }
}

export const forgotPasswordService = async (data: {
  email: string[]
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch('/v1/users/forgot-password', {
      email: data.email
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const trashUserService = async (): Promise<User[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/users/trash')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data.data
  } catch (error) {
    throw error
  }
}

export const restoreUserService = async (username: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/users/restore/${username}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response
  } catch (error) {
    throw error
  }
}