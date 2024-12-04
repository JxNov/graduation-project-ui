import type { ChatPreview, Chat } from '~/schema'

export const getChatPreviewStudentsService = async (): Promise<ChatPreview[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/chat/students/conversations')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getChatPreviewAdminService = async (): Promise<ChatPreview[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get('/v1/chat/admin/conversations')

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getChatAdminService = async (id: number): Promise<Chat[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/chat/admin/conversation-message/${id}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const getChatStudentService = async (id: number): Promise<Chat[]> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.get(`/v1/chat/students/conversation-message/${id}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createChatAdminService = async (username: string, message: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/chat/admin/message-to-student/${username}`, {
      message
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createChatStudentService = async (message: string): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/chat/students/message-to-admin`, {
      message
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}