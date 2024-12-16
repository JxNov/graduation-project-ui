import type { Material, MaterialBlock } from '~/schema'
import {
  fetchMaterialClassService,
  fetchMaterialBlockService,
  createMaterialClassService,
  createMaterialBlockService,
  updateMaterialClassService,
  updateMaterialBlockService,
  deleteMaterialService
} from '~/services/material'
import { toast } from 'vue-sonner'

export const useMaterialStore = defineStore('material', () => {
    const materialBlock = ref<MaterialBlock[]>([])
    const materialClass = ref<Material[]>([])

    const fetchMaterialBlock = async () => {
      try {
        materialBlock.value = await fetchMaterialBlockService()
      } catch (error) {
        throw error
      }
    }

    const fetchMaterialClass = async (classSlug: string) => {
      try {
        materialClass.value = await fetchMaterialClassService(classSlug)
      } catch (error) {
        throw error
      }
    }

    const createMaterialClass = async (data: {
      title: string
      description: string | null
      file: File
      subjectSlug: string
      classSlug: string
    }) => {
      try {
        const response = await createMaterialClassService(data)

        if (!response) {
          throw new Error('Failed to create material class')
        }

        materialClass.value = [...materialClass.value, response]

        toast.success('Material class created successfully')

        return response
      } catch (error) {
        throw error
      }
    }

    const createMaterialBlock = async (data: {
      title: string
      description: string | null
      file: File
      subjectSlug: string
      blockSlug: string
    }) => {
      try {
        const response = await createMaterialBlockService(data)

        if (!response) {
          throw new Error('Failed to create material block')
        }

        materialBlock.value = [...materialBlock.value, response]

        toast.success('Material block created successfully')

        return response
      } catch (error: any) {
        for (const key in error.response.data.errors) {
          toast.error(error.response.data.errors[key][0])
        }

        throw error
      }
    }

    const updateMaterialClass = async (materialSlug: string, data: {
      title: string
      description: string | null
      file: File
      subjectSlug: string
      classSlug: string
    }) => {
      try {
        const response = await updateMaterialClassService(materialSlug, data)

        if (!response) {
          throw new Error('Failed to update material class')
        }

        materialClass.value = materialClass.value.map((material) => {
          if (material.slug === materialSlug) {
            return response
          }

          return material
        })

        toast.success('Material class updated successfully')

        return response
      } catch (error) {
        throw error
      }
    }

    const updateMaterialBlock = async (materialSlug: string, data: {
      title: string
      description: string | null
      file: File
      subjectSlug: string
      blockSlug: string
    }) => {
      try {
        const response = await updateMaterialBlockService(materialSlug, data)

        if (!response) {
          throw new Error('Failed to update material block')
        }

        materialBlock.value = materialBlock.value.map((material) => {
          if (material.slug === materialSlug) {
            return response
          }

          return material
        })

        toast.success('Material block updated successfully')

        return response
      } catch (error) {
        throw error
      }
    }

    const deleteMaterial = async (materialSlug: string) => {
      try {
        await deleteMaterialService(materialSlug)

        materialClass.value = materialClass.value.filter((material) => material.slug !== materialSlug)
        materialBlock.value = materialBlock.value.filter((material) => material.slug !== materialSlug)

        toast.success('Material deleted successfully')
      } catch (error) {
        throw error
      }
    }

    const clearMaterials = () => {
      materialBlock.value = []
      materialClass.value = []
    }

    return {
      materialBlock,
      materialClass,
      fetchMaterialBlock,
      fetchMaterialClass,
      createMaterialClass,
      createMaterialBlock,
      updateMaterialClass,
      updateMaterialBlock,
      deleteMaterial,
      clearMaterials
    }
  }
)