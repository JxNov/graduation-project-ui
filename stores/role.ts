import {defineStore} from 'pinia';
import type {Module, Role, Permission} from "~/schema";

export const useRoleStore = defineStore('role', () => {
    const {$axios} = useNuxtApp();

    const modules = ref<Module[]>([]);
    const roles = ref<Role[]>([]);
    const permissions = ref<Permission[]>([]);

    const fetchModules = async () => {
        try {
            const response = await $axios.get('/v1/modules');

            if (!response) {
                throw new Error('Invalid response');
            }

            return modules.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const fetchRoles = async () => {
        try {
            const response = await $axios.get('/v1/roles');

            if (!response) {
                throw new Error('Invalid response');
            }

            return roles.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPermissions = async () => {
        try {
            const response = await $axios.get('/v1/permissions');

            if (!response) {
                throw new Error('Invalid response');
            }

            return permissions.value = response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const createRole = async (role: { name: string, items: string[] }) => {
        try {
            const response = await $axios.post('/v1/roles', {
                name: role.name.trim(),
                permissions: role.items
            });

            if (!response) {
                throw new Error('Invalid response');
            }
            replaceRoles(response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const updateRole = async (slug: string, role: { name: string, items: string[] }) => {
        try {
            const response = await $axios.patch(`/v1/roles/${slug}`, {
                name: role.name.trim(),
                permissions: role.items
            });

            if (!response) {
                throw new Error('Invalid response');
            }
            replaceRoles(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRole = async (slug: string) => {
        try {
            const response = await $axios.delete(`/v1/roles/${slug}`);

            if (!response) {
                throw new Error('Invalid response');
            }

            roles.value = roles.value.filter(r => r.slug !== slug);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    const reloadData = async () => {
        await fetchModules();
        await fetchRoles();
        await fetchPermissions();
    }

    const clearRole = () => {
        modules.value = [];
        roles.value = [];
        permissions.value = [];
    }

    const replaceRoles = (response: any) => {
        const index = roles.value.findIndex(r => r.slug === response.data.data.slug);
        if (index !== -1) {
            roles.value = [
                ...roles.value.slice(0, index),
                response.data.data,
                ...roles.value.slice(index + 1)
            ];
        } else {
            roles.value = [...roles.value, response.data.data];
        }
    }

    return {
        modules,
        roles,
        permissions,
        fetchModules,
        fetchRoles,
        fetchPermissions,
        createRole,
        updateRole,
        deleteRole,
        reloadData,
        clearRole,
    }
}, {
    persist: true,
});