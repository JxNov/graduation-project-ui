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
    } catch (error: any) {
      if (error.response.status === 404) {
        modules.value = []
      }

      throw error
    }
  }

  const fetchRoles = async () => {
    try {
      roles.value = await fetchRolesService()
    } catch (error: any) {
      if (error.response.status === 404) {
        roles.value = []
      }

      throw error
    }
  }

  const fetchPermissions = async () => {
    try {
      permissions.value = await fetchPermissionsService()
    } catch (error: any) {
      if (error.response.status === 404) {
        permissions.value = []
      }

      throw error
    }
  }

  const createRole = async (data: { name: string, items: string[] }) => {
    try {
      const response = await createRoleService(data)
      replaceRoles(response)

      toast.success('Tạo vai trò thành công')

      return response
    } catch (error) {
      toast.error('Tạo vai trò thất bại')
    }
  }

  const updateRole = async (slug: string, data: { name: string, items: string[] }) => {
    try {
      const response = await updateRoleService(slug, data)
      replaceRoles(response)

      toast.success('Cập nhật vai trò thành công')

      return response
    } catch (error) {
      toast.error('Cập nhật vai trò thất bại')
    }
  }

  const deleteRole = async (slug: string) => {
    try {
      await deleteRoleService(slug)
      roles.value = roles.value.filter(role => role.slug !== slug)

      toast.success('Xóa vai trò thành công')
    } catch (error) {
      toast.error('Xóa vai trò thất bại')
    }
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
    clearRoles
  }
})