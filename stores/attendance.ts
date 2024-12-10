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
    } catch (error) {
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
        throw new Error('Create attendance failed!!!')
      }

      toast.success('Attendance created successfully!!!')
      return response
    } catch (error) {
      toast.error('Attendance created failed!!!')
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
        throw new Error('Update attendance failed!!!')
      }

      toast.success('Attendance updated successfully!!!')
      return response
    } catch (error) {
      toast.error('Attendance updated failed!!!')
      throw error
    }
  }

  const showAttendance = async () => {
    try {
      attendanceShow.value = await showAttendanceService()
    } catch (error) {
      throw error
    }
  }

  const updateStudentAttendance = async (username: string, data: {
    shifts: string
  }) => {
    try {
      const response = await updateStudentAttendanceService(username, data)

      if (!response) {
        throw new Error('Update student attendance failed!!!')
      }

      toast.success('Student attendance updated successfully!!!')
      return response
    } catch (error) {
      toast.error('Student attendance updated failed!!!')
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