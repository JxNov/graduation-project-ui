export const useGeneralStore = defineStore('general', () => {
  const isLogged = ref<boolean>(false)

  const clearGeneral = () => {
    isLogged.value = false
  }

  return {
    isLogged,
    clearGeneral
  }
}, {
  persist: true
})