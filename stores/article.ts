import type { Article } from '~/schema'
import {
  createArticleService,
  createCommentService,
  updateCommentService,
  deleteCommentService,
  deleteArticleService
} from '~/services/article'
import { toast } from 'vue-sonner'

export const useArticleStore = defineStore('article', () => {
  const articles = ref<Article[]>([])

  const createArticle = async (data: {
    content: string
    classSlug: string
  }) => {
    try {
      const response = await createArticleService(data)
      replaceArticles(response)

      toast.success('Article created successfully')

      return response
    } catch (error) {
      toast.error('Article created failed')
    }
  }

  const createComment = async (data: {
    articleId: number
    content: string
  }) => {
    try {
      const response = await createCommentService(data)
      replaceArticles(response)

      toast.success('Comment created successfully')

      return response
    } catch (error) {
      toast.error('Comment created failed')
    }
  }

  const updateComment = async (commentId: number, data: {
    content: string
  }) => {
    try {
      const response = await updateCommentService(commentId, data)

      if (!response) {
        throw new Error('Invalid response')
      }

      toast.success('Comment updated successfully')

      return response
    } catch (error) {
      toast.error('Comment updated failed')
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      const response = await deleteCommentService(commentId)

      if (!response) {
        throw new Error('Invalid response')
      }

      toast.success('Comment deleted successfully')
      return response
    } catch (error) {
      toast.error('Comment deleted failed')
    }
  }

  const deleteArticle = async (articleId: number) => {
    try {
      const response = await deleteArticleService(articleId)

      if (!response) {
        throw new Error('Invalid response')
      }

      toast.success('Article deleted successfully')
      return response
    } catch (error) {
      toast.error('Article deleted failed')
    }
  }

  const replaceArticles = (response: any) => {
    const index = articles.value.findIndex(article => article.id === response.id)
    if (index !== -1) {
      articles.value = [
        ...articles.value.slice(0, index),
        response,
        ...articles.value.slice(index + 1)
      ]
    } else {
      articles.value = [...articles.value, response]
    }
  }

  const clearArticles = () => {
    articles.value = []
  }

  return {
    articles,
    createArticle,
    createComment,
    updateComment,
    deleteComment,
    deleteArticle,
    clearArticles
  }
})