import {useGeneralStore} from "~/stores/general";
import {useUserStore} from "~/stores/user";
import {useRoleStore} from "~/stores/role";
import {useGenerationStore} from "~/stores/generation";

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.provide("generalStore", useGeneralStore());
    NuxtApp.provide("userStore", useUserStore());
    NuxtApp.provide("roleStore", useRoleStore());
    NuxtApp.provide("generationStore", useGenerationStore());
});
