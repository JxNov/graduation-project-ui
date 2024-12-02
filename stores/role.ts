import type { Module, Permission, Role } from '~/schema'
import {
  fetchModulesService,
  fetchRolesService,
  fetchPermissionsService,
  createRoleService,
  updateRoleService,
  deleteRoleService
} from '~/services/role'
import { toast } from 'vue-sonner'

export const useRoleStore = defineStore('role', () => {
  const modules = ref<Module[]>([])
  const roles = ref<Role[]>([])
  const permissions = ref<Permission[]>([])

  const fetchModules = async () => {
    try {
      modules.value = await fetchModulesService()
    } catch (error) {
      throw error
    }
  }

  const fetchRoles = async () => {
    try {
      roles.value = await fetchRolesService()
    } catch (error) {
      throw error
    }
  }

  const fetchPermissions = async () => {
    try {
      permissions.value = await fetchPermissionsService()
    } catch (error) {
      throw error
    }
  }

  const createRole = async (data: { name: string, items: string[] }) => {
    try {
      const response = await createRoleService(data)
      replaceRoles(response)

      toast.success('Role created successfully')

      return response
    } catch (error) {
      toast.error('Role created failed')
    }
  }

  const updateRole = async (slug: string, data: { name: string, items: string[] }) => {
    try {
      const response = await updateRoleService(slug, data)
      replaceRoles(response)

      toast.success('Role updated successfully')

      return response
    } catch (error) {
      toast.error('Role updated failed')
    }
  }

  const deleteRole = async (slug: string) => {
    try {
      await deleteRoleService(slug)
      roles.value = roles.value.filter(role => role.slug !== slug)

      toast.success('Role deleted successfully')
    } catch (error) {
      toast.error('Failed to delete role')
    }
  }

  const reloadData = () => {
    const promise = () => Promise.all([
      fetchModules(),
      fetchRoles(),
      fetchPermissions()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
  }

  const replaceRoles = (response: any) => {
    const index = roles.value.findIndex(role => role.slug === response.slug)
    if (index !== -1) {
      roles.value = [
        ...roles.value.slice(0, index),
        response,
        ...roles.value.slice(index + 1)
      ]
    } else {
      roles.value = [...roles.value, response]
    }
  }

  const clearRoles = () => {
    modules.value = []
    roles.value = []
    permissions.value = []
  }

  return {
    modules,
    roles,
    permissions,
    fetchModules,
    fetchRoles,
    fetchPermissions,
    createRole,
    updateRole,
    deleteRole,
    reloadData,
    clearRoles
  }
})