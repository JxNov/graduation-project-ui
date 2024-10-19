import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useGeneralStore = defineStore('general', () => {
    const {$axios} = useNuxtApp();
    const config = useRuntimeConfig();

    const isLogged = ref<boolean>(false);

    const getCsrfToken = async () => {
        try {
            const response = await $axios.get(`${config.public.baseApi}/sanctum/csrf-cookie`);

            if (!response) {
                throw new Error('Invalid response');
            }

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const clearGeneral = () => {
        isLogged.value = false;
    }

    return {
        isLogged,
        getCsrfToken,
        clearGeneral,
    }
}, {
    persist: true,
});