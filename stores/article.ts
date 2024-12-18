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

      toast.success('Tạo mới thông báo thành công')

      return response
    } catch (error) {
      toast.error('Tạo mới thông báo thất bại')
    }
  }

  const createComment = async (data: {
    articleId: number
    content: string
  }) => {
    try {
      const response = await createCommentService(data)
      replaceArticles(response)

      toast.success('Bìn luận thành công')

      return response
    } catch (error) {
      toast.error('Bình luận thất bại')
    }
  }

  const updateComment = async (commentId: number, data: {
    content: string
  }) => {
    try {
      const response = await updateCommentService(commentId, data)

      if (!response) {
        throw new Error('Phản hồi không hợp lệ')
      }

      toast.success('Sửa bình luận thành công')

      return response
    } catch (error) {
      toast.error('Sửa bình luận thất bại')
    }
  }

  const deleteComment = async (commentId: number) => {
    try {
      const response = await deleteCommentService(commentId)

      if (!response) {
        throw new Error('Phản hồi không hợp lệ')
      }

      toast.success('Xóa bình luận thành công')
      return response
    } catch (error) {
      toast.error('Xóa bình luận thất bại')
    }
  }

  const deleteArticle = async (articleId: number) => {
    try {
      const response = await deleteArticleService(articleId)

      if (!response) {
        throw new Error('Phản hồi không hợp lệ')
      }

      toast.success('Xóa thông báo thành công')
      return response
    } catch (error) {
      toast.error('Xóa thông báo thất bại')
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