import type { User } from '~/schema'

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
      username: data.users,
      roles_slug: data.roles,
      permissions_slug: data.items
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}