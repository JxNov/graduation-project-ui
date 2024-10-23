import {useGeneralStore} from "~/stores/general";
import {useAuthStore} from "~/stores/auth";
import {useRoleStore} from "~/stores/role";
import {useGenerationStore} from "~/stores/generation";
import {useUserStore} from "~/stores/user";

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.provide("generalStore", useGeneralStore());
    NuxtApp.provide("authStore", useAuthStore());
    NuxtApp.provide("roleStore", useRoleStore());
    NuxtApp.provide("generationStore", useGenerationStore());
    NuxtApp.provide("userStore", useUserStore());
});
