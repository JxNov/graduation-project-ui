import type { User, UserDetail } from '~/schema'
import {
  assignRolePermissionService,
  fetchUsersService,
  fetchUserDetailService,
  updateProfileInformationService,
  createUserService,
  updateUserService,
  deleteUserService,
  forgotPasswordService,
  trashUserService,
  restoreUserService
} from '~/services/user'
import { useStudentStore } from '~/stores/student'
import { useTeacherStore } from '~/stores/teacher'
import { toast } from 'vue-sonner'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const userDetail = ref<UserDetail | null>(null)
  const trashUsers = ref<User[]>([])

  const fetchUsers = async () => {
    try {
      users.value = await fetchUsersService()
    } catch (error: any) {
      if (error.response.status === 404) {
        users.value = []
      }

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
    } catch (error: any) {
      if (error.response.status === 404) {
        userDetail.value = null
      }

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

  const updateUser = async (username: string, data: {
    name: string,
    dateOfBirth: string,
    gender: string,
    address: string,
    phone: string,
  }) => {
    try {
      const response = await updateUserService(username, data)

      if (!response) {
        throw new Error('Cập nhật học sinh không thành công!!!')
      }

      users.value = []
      await fetchUsers()
      useStudentStore().clearStudents()
      await useStudentStore().fetchStudents()
      useTeacherStore().clearTeachers()
      await useTeacherStore().fetchTeachers()

      toast.success('Cập nhật học sinh thành công!!!')

      return response
    } catch (error: any) {
      toast.error('Cập nhật học sinh không thành công!!!')
      throw error
    }
  }

  const forgotPassword = async (data: {
    email: string[]
  }) => {
    try {
      const response = await forgotPasswordService(data)

      if (!response) {
        throw new Error('Có lỗi xảy ra khi khôi phục mật khẩu')
      }

      toast.success('Khôi phục mật khẩu thành công')
      return response
    } catch (error: any) {
      toast.error('Có lỗi xảy ra khi khôi phục mật khẩu')
      throw error
    }
  }

  const deleteUser = async (username: string) => {
    try {
      const response = await deleteUserService(username)

      if (!response) {
        throw new Error('Xóa người dùng không thành công')
      }

      users.value = users.value.filter((user: any) => user.username !== username)
      useStudentStore().students = useStudentStore().students.filter((student: any) => student.username !== username)
      useTeacherStore().teachers = useTeacherStore().teachers.filter((teacher: any) => teacher.username !== username)

      toast.success('Xóa người dùng thành công')
      return response
    } catch (error: any) {
      console.log(error)
      toast.error('Xóa người dùng không thành công')
      throw error
    }
  }

  const trashUser = async () => {
    try {
      trashUsers.value = await trashUserService()
    } catch (error: any) {
      if (error.response.status === 404) {
        trashUsers.value = []
      }

      throw error
    }
  }

  const restoreUser = async (username: string) => {
    try {
      const response = await restoreUserService(username)

      if (!response) {
        throw new Error('Khôi phục người dùng không thành công')
      }

      trashUsers.value = trashUsers.value.filter((user: any) => user.username !== username)
      await fetchUsers()

      toast.success('Khôi phục người dùng thành công')
      return response
    } catch (error: any) {
      toast.error('Khôi phục người dùng không thành công')
      throw error
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
    trashUsers.value = []
  }

  return {
    users,
    userDetail,
    trashUsers,
    fetchUsers,
    assignRolePermission,
    fetchUserDetail,
    updateProfileInformation,
    createUser,
    updateUser,
    deleteUser,
    forgotPassword,
    trashUser,
    restoreUser,
    clearUsers
  }
})