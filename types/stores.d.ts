import {useGeneralStore} from '~/stores/general';
import {useUserStore} from '~/stores/user';

declare module '#app' {
    interface NuxtApp {
        $generalStore: ReturnType<typeof useGeneralStore>;
        $userStore: ReturnType<typeof useUserStore>;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $generalStore: ReturnType<typeof useGeneralStore>;
        $userStore: ReturnType<typeof useUserStore>;
    }
}