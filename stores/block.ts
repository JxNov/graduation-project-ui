import type { Block } from '~/schema'
import { fetchBlocksService } from '~/services/block'

export const useBlockStore = defineStore('block', () => {
  const blocks = ref<Block[]>([])

  const fetchBlocks = async () => {
    try {
      blocks.value = await fetchBlocksService()
    } catch (error: any) {
      if (error.response.status === 404) {
        blocks.value = []
      }

      throw error
    }
  }

  const clearBlocks = () => {
    blocks.value = []
  }

  return {
    blocks,
    fetchBlocks,
    clearBlocks
  }
})