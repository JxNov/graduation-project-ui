import type { Classroom } from '~/schema'
import {
  joinClassroomService,
  fetchClassroomsService,
  fetchDetailClassroomService,
  fetchPeopleClassroomService,
  fetchClassroomStudentService
} from '~/services/classroom'
import { toast } from 'vue-sonner'

export const useClassroomStore = defineStore('classroom', () => {
  const classrooms = ref<Classroom[]>([])

  const joinClassroom = async (code: string) => {
    try {
      const response = await joinClassroomService(code)

      if (!response) {
        throw new Error('Invalid response')
      }

      classrooms.value.push(response)
      toast.success('Successfully joined classroom')

      return response
    } catch (error) {
      toast.error('Failed to join classroom')
      throw error
    }
  }

  const fetchClassrooms = async () => {
    try {
      classrooms.value = await fetchClassroomsService()
    } catch (error) {
      throw error
    }
  }

  const fetchDetailClassroom = async (classSlug: string) => {
    try {
      return await fetchDetailClassroomService(classSlug)
    } catch (error) {
      throw error
    }
  }

  const fetchPeopleClassroom = async (classSlug: string) => {
    try {
      return await fetchPeopleClassroomService(classSlug)
    } catch (error) {
      throw error
    }
  }

  const fetchClassroomStudent = async () => {
    try {
      classrooms.value = await fetchClassroomStudentService()
    } catch (error) {
      throw error
    }
  }

  const clearClassrooms = () => {
    classrooms.value = []
  }

  return {
    classrooms,
    joinClassroom,
    fetchClassrooms,
    fetchDetailClassroom,
    fetchPeopleClassroom,
    fetchClassroomStudent,
    clearClassrooms
  }
})