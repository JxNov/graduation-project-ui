import type { User } from '~/schema'
import { assignRolePermissionService, fetchUsersService } from '~/services/user'
import { toast } from 'vue-sonner'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])

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

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchUsers()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
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
  }

  return {
    users,
    fetchUsers,
    assignRolePermission,
    reloadData,
    clearUsers
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.sessionStorage()
  }
})