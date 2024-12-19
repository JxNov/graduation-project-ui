import type { Homework } from '~/schema'
import {
  fetchHomeworkClassService,
  createHomeworkService,
  updateHomeworkService,
  deleteHomeworkService,
  fetchDetailSubmittedAssignmentService,
  submitAssignmentService,
  giveScoreService
} from '~/services/homework'
import { toast } from 'vue-sonner'

export const useHomeworkStore = defineStore('homework', () => {
    const homeworks = ref<Homework[]>([])

    const fetchHomeworks = async (classSlug: string) => {
      try {
        homeworks.value = await fetchHomeworkClassService(classSlug)
      } catch (error: any) {
        if (error.response.status === 404) {
          homeworks.value = []
        }

        throw error
      }
    }

    const createHomework = async (data: {
      title: string
      dueDate: string
      criteria: string
      username: string
      subjectSlug: string
      classSlug: string
      semesterSlug: string
    }) => {
      try {
        const response = await createHomeworkService(data)
        replaceHomeworks(response)

        if (!response) {
          throw new Error('Tạo bài tập thất bại')
        }

        toast.success('Tạo bài tập thành công')

        return response
      } catch (error) {
        toast.error('Tạo bài tập thất bại')
      }
    }

    const updateHomework = async (slug: string, data: {
      title: string
      dueDate: string
      criteria: string
      username: string
      subjectSlug: string
      classSlug: string
      semesterSlug: string
    }) => {
      try {
        const response = await updateHomeworkService(slug, data)
        replaceHomeworks(response)

        if (!response) {
          throw new Error('Cập nhật bài tập thất bại')
        }

        toast.success('Cập nhật bài tập thành công')

        return response
      } catch (error) {
        toast.error('Cập nhật bài tập thất bại')
      }
    }

    const deleteHomework = async (slug: string) => {
      try {
        const response = await deleteHomeworkService(slug)

        if (!response) {
          throw new Error('Xóa bài tập thất bại')
        }

        toast.success('Bài tập đã được xóa')

        homeworks.value = homeworks.value.filter(homework => homework.slug !== slug)

        return response
      } catch (error) {
        toast.error('Xóa bài tập thất bại')
      }
    }

    const fetchDetailSubmittedAssignment = async (classSlug: string, assignmentSlug: string) => {
      try {
        return await fetchDetailSubmittedAssignmentService(classSlug, assignmentSlug)
      } catch (error) {
        throw error
      }
    }

    const submitAssignment = async (assignmentSlug: string, data: {
      username: string
      file: File
    }) => {
      try {
        const response = await submitAssignmentService(assignmentSlug, data)

        if (!response) {
          throw new Error('Nộp bài thất bại')
        }

        toast.success('Nộp bài thành công')

        return response
      } catch (error) {
        toast.error('Nộp bài thất bại')
        throw error
      }
    }

    const giveScore = async (assignmentSlug: string, username: string, data: {
      score: number
      feedback?: string
    }) => {
      try {
        const response = await giveScoreService(assignmentSlug, username, data)

        if (!response) {
          throw new Error('Cập nhật điểm thất bại')
        }

        toast.success('Cập nhật điểm thành công')

        return response
      } catch (error) {
        toast.error('Cập nhật điểm thất bại')
        throw error
      }
    }

    const replaceHomeworks = (response: any) => {
      const index = homeworks.value.findIndex(homework => homework.slug === response.slug)
      if (index !== -1) {
        homeworks.value = [
          ...homeworks.value.slice(0, index),
          response,
          ...homeworks.value.slice(index + 1)
        ]
      } else {
        homeworks.value = [...homeworks.value, response]
      }
    }

    const clearHomeworks = () => {
      homeworks.value = []
    }

    return {
      homeworks,
      fetchHomeworks,
      createHomework,
      updateHomework,
      deleteHomework,
      fetchDetailSubmittedAssignment,
      submitAssignment,
      giveScore,
      clearHomeworks
    }
  }
)