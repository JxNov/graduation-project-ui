import type { Article, Comment } from '~/schema'

export const createArticleService = async (data: {
  content: string
  classSlug: string
}): Promise<Article> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post('/v1/articles', {
      content: data.content,
      class_slug: data.classSlug
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const createCommentService = async (data: {
  articleId: number
  content: string
}): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/comments`, {
      article_id: data.articleId,
      content: data.content
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const updateCommentService = async (commentId: number, data: {
  content: string
}): Promise<Comment> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.post(`/v1/comments/${commentId}`, {
      content: data.content,
      '_method': 'PATCH'
    })

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data.data
  } catch (error) {
    throw error
  }
}

export const deleteCommentService = async (commentId: number): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/comments/${commentId}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteArticleService = async (articleId: number): Promise<any> => {
  const { $axios } = useNuxtApp()

  try {
    const response = await $axios.delete(`/v1/articles/force-delete/${articleId}`)

    if (!response) {
      throw new Error('Invalid response')
    }

    return response.data
  } catch (error) {
    throw error
  }
}