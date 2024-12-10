import type { Article } from '~/schema'
import { createArticleService, createCommentService } from '~/services/article'
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
    clearArticles
  }
})