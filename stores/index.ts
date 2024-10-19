import {useGeneralStore} from "~/stores/general";
import {useUserStore} from "~/stores/user";
import {useRoleStore} from "~/stores/role";
import {useGenerationStore} from "~/stores/generation";

export const clearStores = () => {
    useGeneralStore().clearGeneral();
    useUserStore().clearUser();
    useRoleStore().clearRole();
    useGenerationStore().clearGeneration();
}
