import type { Module, Permission, Role } from '~/schema'


export const fetchModulesService = async (): Promise<Module[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/modules')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchRolesService = async (): Promise<Role[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/roles')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const fetchPermissionsService = async (): Promise<Permission[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/permissions')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createRoleService = async (role: { name: string, items: string[] }): Promise<Role> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/roles', {
      name: role.name.trim(),
      permissions: role.items
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateRoleService = async (slug: string, role: { name: string, items: string[] }): Promise<Role> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.patch(`/v1/roles/${slug}`, {
      name: role.name.trim(),
      permissions: role.items
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteRoleService = async (slug: string): Promise<void> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/roles/${slug}`)

    if (!response) {
      throw new Error('Invalid response')
    }
  } catch (error) {
    throw error
  }
}