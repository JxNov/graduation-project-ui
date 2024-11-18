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
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    })
  }
})