import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore("user", () => {
    const id = ref<string>("");
    const name = ref<string>("");
    const email = ref<string>("");
    const username = ref<string>("");
    const gender = ref<string>("");
    const dob = ref<string>("");
    const phone = ref<string>("");

    return {
        id,
        name,
        email,
        username,
        gender,
        dob,
        phone,
    }
}, {
    persist: true,
});