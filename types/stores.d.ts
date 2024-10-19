import {useGeneralStore} from '~/stores/general';
import {useUserStore} from '~/stores/user';
import {useRoleStore} from '~/stores/role';
import {useGenerationStore} from "~/stores/generation";

declare module '#app' {
    interface NuxtApp {
        $generalStore: ReturnType<typeof useGeneralStore>;
        $userStore: ReturnType<typeof useUserStore>;
        $roleStore: ReturnType<typeof useRoleStore>;
        $generationStore: ReturnType<typeof useGenerationStore>;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $generalStore: ReturnType<typeof useGeneralStore>;
        $userStore: ReturnType<typeof useUserStore>;
        $roleStore: ReturnType<typeof useRoleStore>;
        $generationStore: ReturnType<typeof useGenerationStore>;
    }
}