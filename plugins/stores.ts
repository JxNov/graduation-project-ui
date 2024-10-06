import {useGeneralStore} from "~/stores/general";
import {useUserStore} from "~/stores/user";

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.provide("generalStore", useGeneralStore());
    NuxtApp.provide("userStore", useUserStore());
});
