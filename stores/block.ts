import type { Block } from '~/schema'
import { fetchBlocksService, createBlockService, updateBlockService, deleteBlockService } from '~/services/block'
import { toast } from 'vue-sonner'

export const useBlockStore = defineStore('block', () => {
  const blocks = ref<Block[]>([])

  const fetchBlocks = async () => {
    try {
      blocks.value = await fetchBlocksService()
    } catch (error) {
      throw error
    }
  }

  const createBlock = async (data: { name: string, level: number }) => {
    try {
      const response = await createBlockService(data)
      replaceBlocks(response)

      toast.success('Block created successfully', {
        action: {
          label: 'Close'
        }
      })

      return response
    } catch (error: any) {
      toast.error(error.response.data.message, {
        action: {
          label: 'Close'
        }
      })
      throw error
    }
  }

  const updateBlock = async (slug: string, data: { name: string, level: number }) => {
    try {
      const response = await updateBlockService(slug, data)
      replaceBlocks(response)

      toast.success('Block updated successfully', {
        action: {
          label: 'Close'
        }
      })

      return response
    } catch (error) {
      console.log(error)
      toast.error('Block updated failed', {
        action: {
          label: 'Close'
        }
      })
      throw error
    }
  }

  const deleteBlock = async (slug: string) => {
    try {
      await deleteBlockService(slug)
      blocks.value = blocks.value.filter(block => block.slug !== slug)

      toast.success('Block deleted successfully', {
        action: {
          label: 'Close'
        }
      })
    } catch (error) {
      toast.error('Block deleted failed', {
        action: {
          label: 'Close'
        }
      })
    }
  }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchBlocks()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
  }

  const replaceBlocks = (response: any) => {
    const index = blocks.value.findIndex(block => block.slug === response.slug)
    if (index !== -1) {
      blocks.value = [
        ...blocks.value.slice(0, index),
        response,
        ...blocks.value.slice(index + 1)
      ]
    } else {
      blocks.value = [...blocks.value, response]
    }
  }

  const clearBlocks = () => {
    blocks.value = []
  }

  return {
    blocks,
    fetchBlocks,
    createBlock,
    updateBlock,
    deleteBlock,
    reloadData,
    clearBlocks
  }
}, {
  persist: true
})