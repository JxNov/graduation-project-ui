import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Generation} from "~/schema";

export const useGenerationStore = defineStore('generation', () => {
    const {$axios} = useNuxtApp();

    const generation = ref<Generation[]>([]);

    const clearGeneration = () => {
        generation.value = [];
    }

    return {
        clearGeneration
    }
}, {
    persist: true,
});