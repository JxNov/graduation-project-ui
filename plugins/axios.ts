import axios from "axios";
import {clearStores} from "~/stores";

export default defineNuxtPlugin((NuxtApp) => {
    const config = useRuntimeConfig();

    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    axios.defaults.baseURL = config.public.apiUrl;

    let isRefreshing: boolean = false;
    let failedQueue: { resolve: Function, reject: Function }[] = [];

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const {$generalStore, $authStore} = useNuxtApp();
            const router = useRouter();

            const processQueue = (error: any) => {
                failedQueue.forEach(prom => {
                    if (error) {
                        prom.reject(error);
                    } else {
                        prom.resolve();
                    }
                });

                failedQueue = [];
            };

            if (error.response && error.response.status === 401 && $generalStore.isLogged) {
                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        await $authStore.refreshToken();
                        processQueue(null);
                        return axios.request(error.config);
                    } catch (err) {
                        processQueue(err);
                        return Promise.reject(err);
                    } finally {
                        isRefreshing = false;
                    }
                }

                clearStores();
                await router.push('/login');

                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                });
            }

            return Promise.reject(error);
        }
    );

    NuxtApp.provide("axios", axios);
});
