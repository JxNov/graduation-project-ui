import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
    const config = useRuntimeConfig();

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = config.public.apiUrl;

    NuxtApp.provide("axios", axios);
});
