import type { Class } from '~/schema'
import { fetchClassesService, createClassService, updateClassService, deleteClassService } from '~/services/class'
import { toast } from 'vue-sonner'

export const useClassStore = defineStore('class', () => {
  const classes = ref<Class[]>([])

  const fetchClasses = async () => {
    try {
      classes.value = await fetchClassesService()
    } catch (error) {
      throw error
    }
  }

  const createClass = async (data: { name: string, username: string }) => {
    try {
      const response = await createClassService(data)
      replaceClasses(response)

      toast.success('Class created successfully', {
        action: {
          label: 'Close'
        }
      })

      return response
    } catch (error) {
      toast.error('Failed to create class', {
        action: {
          label: 'Close'
        }
      })
      throw error
    }
  }

  const updateClass = async (slug: string, data: { name: string, username: string }) => {
    try {
      const response = await updateClassService(slug, data)
      replaceClasses(response)

      toast.success('Class updated successfully', {
        action: {
          label: 'Close'
        }
      })

      return response
    } catch (error) {
      toast.error('Failed to update class', {
        action: {
          label: 'Close'
        }
      })
      throw error
    }
  }

  const deleteClass = async (slug: string) => {
    try {
      await deleteClassService(slug)
      classes.value = classes.value.filter(cls => cls.slug !== slug)

      toast.success('Class deleted successfully', {
        action: {
          label: 'Close'
        }
      })
    } catch (error) {
      toast.error('Failed to delete class', {
        action: {
          label: 'Close'
        }
      })
      throw error
    }
  }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchClasses()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
  }

  const replaceClasses = (response: any) => {
    const index = classes.value.findIndex(cls => cls.slug === response.slug)
    if (index !== -1) {
      classes.value = [
        ...classes.value.slice(0, index),
        response,
        ...classes.value.slice(index + 1)
      ]
    } else {
      classes.value = [...classes.value, response]
    }
  }

  const clearClasses = () => {
    classes.value = []
  }

  return {
    classes,
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    reloadData,
    clearClasses
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage()
  }
})