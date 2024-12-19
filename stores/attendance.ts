import type { Attendance, AttendanceDetail, AttendanceShow } from '~/schema'
import {
  fetchAttendancesService,
  detailAttendanceService,
  createAttendanceService,
  updateAttendanceService,
  showAttendanceService,
  updateStudentAttendanceService
} from '~/services/attendance'
import { toast } from 'vue-sonner'

export const useAttendanceStore = defineStore('attendance', () => {
  const attendances = ref<Attendance[]>([])
  const attendance = ref<AttendanceDetail | null>(null)
  const attendanceShow = ref<AttendanceShow[]>([])

  const fetchAttendances = async () => {
    try {
      attendances.value = await fetchAttendancesService()
    } catch (error: any) {
      if (error.response.status === 404) {
        attendances.value = []
      }

      throw error
    }
  }

  const detailAttendance = async (slug: string) => {
    try {
      attendance.value = await detailAttendanceService(slug)
    } catch (error) {
      throw error
    }
  }

  const createAttendance = async (data: {
    classSlug: string
    students: {
      username: string
      status: string
      reason: string
    }[]
  }) => {
    try {
      const response = await createAttendanceService(data)

      if (!response) {
        throw new Error('Điểm danh thất bại!!!')
      }

      toast.success('Điểm danh thành công!!!')
      return response
    } catch (error) {
      toast.error('Điểm danh thất bại!!!')
      throw error
    }
  }

  const updateAttendance = async (id: number, data: {
    classSlug: string
    students: {
      username: string
      status: string
      reason: string
    }[]
  }) => {
    try {
      const response = await updateAttendanceService(id, data)

      if (!response) {
        throw new Error('Cập nhật điểm danh thất bại!!!')
      }

      toast.success('Cập nhật điểm danh thành công!!!')
      return response
    } catch (error) {
      toast.error('Cập nhật điểm danh thất bại!!!')
      throw error
    }
  }

  const showAttendance = async () => {
    try {
      attendanceShow.value = await showAttendanceService()
    } catch (error: any) {
      if (error.response.status === 404) {
        attendanceShow.value = []
      }
      throw error
    }
  }

  const updateStudentAttendance = async (username: string, data: {
    shifts: string
  }) => {
    try {
      const response = await updateStudentAttendanceService(username, data)

      if (!response) {
        throw new Error('Cập nhật diểm danh thất bại!!!')
      }

      attendanceShow.value = [...attendanceShow.value, response]

      toast.success('Cập nhật điểm danh thành công!!!')
      return response
    } catch (error) {
      toast.error('Cập nhật diểm danh thất bại!!!')
      throw error
    }
  }

  // const replaceAttendances = (response: any) => {
  //   const index = attendances.value.findIndex(attendance => attendance.id === response.id)
  //   if (index !== -1) {
  //     attendances.value = [
  //       ...attendances.value.slice(0, index),
  //       response,
  //       ...attendances.value.slice(index + 1)
  //     ]
  //   } else {
  //     attendances.value = [...attendances.value, response]
  //   }
  // }

  const clearAttendances = () => {
    attendances.value = []
    attendance.value = null
    attendanceShow.value = []
  }

  return {
    attendances,
    attendance,
    attendanceShow,
    fetchAttendances,
    detailAttendance,
    createAttendance,
    updateAttendance,
    showAttendance,
    updateStudentAttendance,
    clearAttendances
  }
})