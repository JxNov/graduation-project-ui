import {defineStore} from "pinia";
import {ref} from "vue";

export const useGeneralStore = defineStore("general", () => {
    const isLogged = ref<boolean>(false);

    const fetchPermissions = async () => {
        const {$axios} = useNuxtApp();

        try {
            const response = await $axios.get("/v1/permissions");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        isLogged,
        fetchPermissions,
    }
}, {
    persist: true,
});