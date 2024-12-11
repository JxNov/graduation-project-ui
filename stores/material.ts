import type { Material } from '~/schema'
import {
  fetchMaterialClassService,
  fetchMaterialBlockService,
  createMaterialClassService,
  createMaterialBlockService,
  updateMaterialClassService,
  updateMaterialBlockService
} from '~/services/material'
import { toast } from 'vue-sonner'

export const useMaterialStore = defineStore('material', () => {
  const materials = ref<Material[]>([])

  const fetchMaterialsClass = async (classSlug: string) => {
    try {
      materials.value = await fetchMaterialClassService(classSlug)
    } catch (error) {
      throw error
    }
  }

  const clearMaterials = () => {
    materials.value = []
  }

  return {
    materials,
    fetchMaterialsClass,
    clearMaterials
  }
})