import {useGeneralStore} from '~/stores/general';
import {useAuthStore} from '~/stores/auth';
import {useRoleStore} from '~/stores/role';
import {useGenerationStore} from "~/stores/generation";
import {useUserStore} from "~/stores/user";

declare module '#app' {
    interface NuxtApp {
        $generalStore: ReturnType<typeof useGeneralStore>;
        $authStore: ReturnType<typeof useAuthStore>;
        $roleStore: ReturnType<typeof useRoleStore>;
        $generationStore: ReturnType<typeof useGenerationStore>;
        $userStore: ReturnType<typeof useUserStore>;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $generalStore: ReturnType<typeof useGeneralStore>;
        $authStore: ReturnType<typeof useAuthStore>;
        $roleStore: ReturnType<typeof useRoleStore>;
        $generationStore: ReturnType<typeof useGenerationStore>;
        $userStore: ReturnType<typeof useUserStore>;
    }
}