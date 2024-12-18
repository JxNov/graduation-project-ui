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
          throw new Error('Tạo tài liệu lớp học thất bại')
        }

        materialClass.value = [...materialClass.value, response]

        toast.success('Tạo tài liệu lớp học thành công')

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
          throw new Error('Tạo tài liệu khối thất bại')
        }

        materialBlock.value = [...materialBlock.value, response]

        toast.success('Tạo tài liệu khối thành công')

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
          throw new Error('Cập nhật tài liệu lớp học thất bại')
        }

        materialClass.value = materialClass.value.map((material) => {
          if (material.slug === materialSlug) {
            return response
          }

          return material
        })

        toast.success('Cập nhật tài liệu lớp học thàn công')

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
          throw new Error('Cập nhật tài liệu khối thất bại')
        }

        materialBlock.value = materialBlock.value.map((material) => {
          if (material.slug === materialSlug) {
            return response
          }

          return material
        })

        toast.success('Cập nhật tài liệu khối thành công')

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

        toast.success('Xóa tài liệu thành công')
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