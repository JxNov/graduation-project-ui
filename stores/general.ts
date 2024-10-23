import {defineStore} from 'pinia';

export const useGeneralStore = defineStore('general', () => {
    const {$axios} = useNuxtApp();
    const config = useRuntimeConfig();

    const isLogged = ref<boolean>(false);
    const userRoles = ref<string[]>([]);
    const userPermissions = ref<string[]>([]);

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
        userRoles.value = [];
        userPermissions.value = [];
    }

    return {
        isLogged,
        userRoles,
        userPermissions,
        getCsrfToken,
        clearGeneral,
    }
}, {
    persist: true,
});