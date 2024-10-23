import {defineStore} from 'pinia';
import type {Generation} from "~/schema";

export const useGenerationStore = defineStore('generation', () => {
    const {$axios} = useNuxtApp();

    const generations = ref<Generation[]>([]);

    const fetchGenerations = async () => {
        try {
            const response = await $axios.get('/v1/generations');

            if (!response) {
                throw new Error('Failed to fetch generations');
            }

            generations.value = response.data.data.data;

            return response;
        } catch (e) {
            console.error(e);
        }
    }

    const reloadData = async () => {
    }

    const clearGeneration = () => {
        generations.value = [];
    }

    return {
        generations,
        fetchGenerations,
        reloadData,
        clearGeneration
    }
}, {
    persist: true,
});