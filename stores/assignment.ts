import type { Assignment } from '~/schema'
import { fetchAssignmentsService } from '~/services/assignment'
import { toast } from 'vue-sonner'

export const useAssignmentStore = defineStore('assignment', () => {
  const assignments = ref<Assignment[]>([])

  const fetchAssignments = async () => {
    try {
      assignments.value = await fetchAssignmentsService()
    } catch (error) {
      throw error
    }
  }

  const reloadData = async () => {
    const promise = () => Promise.all([
      fetchAssignments()
    ])

    toast.promise(promise, {
      loading: 'Reloading data...',
      success: 'Data reloaded successfully!!!',
      error: 'Data reloaded failed!!!'
    })
  }

  const replaceAssignments = (response: any) => {
    const index = assignments.value.findIndex(assignment => assignment.slug === response.slug)
    if (index !== -1) {
      assignments.value = [
        ...assignments.value.slice(0, index),
        response,
        ...assignments.value.slice(index + 1)
      ]
    } else {
      assignments.value = [...assignments.value, response]
    }
  }

  const clearAssignments = () => {
    assignments.value = []
  }

  return {
    assignments,
    fetchAssignments,
    reloadData,
    clearAssignments
  }
})