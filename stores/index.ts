import {useGeneralStore} from "~/stores/general";
import {useAuthStore} from "~/stores/auth";
import {useRoleStore} from "~/stores/role";
import {useGenerationStore} from "~/stores/generation";

export const clearStores = () => {
    useGeneralStore().clearGeneral();
    useAuthStore().clearUser();
    useRoleStore().clearRole();
    useGenerationStore().clearGeneration();
}
