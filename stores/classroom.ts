import type { Classroom } from '~/schema'
import {
  fetchClassroomsService,
  fetchDetailClassroomService,
  fetchPeopleClassroomService,
  fetchClassroomStudentService
} from '~/services/classroom'
import { toast } from 'vue-sonner'

export const useClassroomStore = defineStore('classroom', () => {
  const classrooms = ref<Classroom[]>([])

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
    fetchClassrooms,
    fetchDetailClassroom,
    fetchPeopleClassroom,
    fetchClassroomStudent,
    clearClassrooms
  }
})