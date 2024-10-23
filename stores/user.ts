import {defineStore} from 'pinia';
import type {User} from '~/schema';

export const useUserStore = defineStore('user', () => {
    const {$axios} = useNuxtApp();

    const users = ref<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await $axios.get('/v1/users');

            if (!response) {
                throw new Error('No response');
            }

            users.value = response.data.data;

            return response;
        } catch (error) {
            console.error('Error fetching users', error);
        }
    }

    const clearUsers = () => {
    }

    return {
        users,
        fetchUsers,
        clearUsers,
    }
}, {
    persist: true,
});