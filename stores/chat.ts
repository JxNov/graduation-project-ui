import type { Chat, ChatPreview } from '~/schema'
import {
  getChatPreviewAdminService,
  getChatPreviewStudentsService,
  getChatAdminService,
  getChatStudentService,
  createChatAdminService,
  createChatStudentService
} from '~/services/chat'
import { toast } from 'vue-sonner'

export const useChatStore = defineStore('chat', () => {
  const chatPreviews = ref<ChatPreview[]>([])
  const chats = ref<Chat[]>([])

  const getChatPreviewAdmin = async () => {
    try {
      const response = await getChatPreviewAdminService()

      if (!response) {
        throw new Error('Không tìm thấy bản xem trước trò chuyện nào')
      }

      chatPreviews.value = response
      return response
    } catch (err) {
      throw err
    }
  }

  const getChatPreviewStudents = async () => {
    try {
      const response = await getChatPreviewStudentsService()

      if (!response) {
        throw new Error('Không tìm thấy bản xem trước trò chuyện nào')
      }

      chatPreviews.value = response
      return response
    } catch (err) {
      throw err
    }
  }

  const getChatAdmin = async (id: number) => {
    try {
      const response = await getChatAdminService(id)

      if (!response) {
        throw new Error('Không tìm thấy cuộc trò chuyện nào')
      }

      chats.value = response
      return response
    } catch (err) {
      throw err
    }
  }

  const getChatStudent = async (id: number) => {
    try {
      chats.value = await getChatStudentService(id)
    } catch (err) {
      throw err
    }
  }

  const createChatAdmin = async (username: string, message: string) => {
    try {
      const response = await createChatAdminService(username, message)

      if (!response) {
        throw new Error('Không gửi được tin nhắn')
      }

      return response
    } catch (err) {
      throw err
    }
  }

  const createChatStudent = async (message: string) => {
    try {
      const response = await createChatStudentService(message)

      if (!response) {
        throw new Error('Không gửi được tin nhắn')
      }

      return response
    } catch (err) {
      throw err
    }
  }

  const clearChats = () => {
    chatPreviews.value = []
    chats.value = []
  }

  return {
    chats,
    chatPreviews,
    getChatPreviewAdmin,
    getChatPreviewStudents,
    getChatAdmin,
    getChatStudent,
    createChatAdmin,
    createChatStudent,
    clearChats
  }
})