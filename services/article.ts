import type { Article } from '~/schema'

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