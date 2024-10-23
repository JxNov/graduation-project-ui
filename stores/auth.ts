import {defineStore} from 'pinia';
import {clearStores} from "~/stores/index";

export const useAuthStore = defineStore('auth', () => {
    const {$axios, $generalStore} = useNuxtApp();

    const name = ref<string>('');
    const email = ref<string>('');
    const username = ref<string>('');
    const gender = ref<string>('');
    const dob = ref<string>('');
    const phone = ref<string>('');

    const login = async (data: { email: string, password: string }) => {
        const {email, password} = data;

        try {
            await $generalStore.getCsrfToken();
            const response = await $axios.post('/auth/login', {
                email,
                password,
            });

            if (!response) {
                throw new Error('Invalid response');
            }

            const user = await fetchUser();

            if (!user) {
                throw new Error('Invalid user');
            }

            $generalStore.isLogged = true;

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUser = async () => {
        try {
            const response = await $axios.get('/auth/profile');

            if (!response) {
                throw new Error('Invalid response');
            }

            const {data} = response;

            name.value = data.name;
            email.value = data.email;
            username.value = data.username;
            gender.value = data.gender;
            dob.value = data.date_of_birth;
            phone.value = data.phone_number;
            $generalStore.userRoles = data.roles;
            $generalStore.userPermissions = data.permissions;

            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const logout = async () => {
        try {
            const response = await $axios.post('/auth/logout');

            if (!response) {
                throw new Error('Invalid response');
            }

            clearStores();
        } catch (error) {
            console.error(error);
        }
    }

    const refreshToken = async () => {
        try {
            const response = await $axios.post('/auth/refresh-token');

            if (!response) {
                throw new Error('Invalid response');
            }

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    const clearUser = () => {
        name.value = '';
        email.value = '';
        username.value = '';
        gender.value = '';
        dob.value = '';
        phone.value = '';
    }

    return {
        name,
        email,
        username,
        gender,
        dob,
        phone,
        login,
        logout,
        refreshToken,
        clearUser,
    }
}, {
    persist: true,
});