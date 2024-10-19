import {AxiosInstance} from 'axios';
import {Emitter} from 'mitt';

declare module '#app' {
    interface NuxtApp {
        $axios: AxiosInstance;
        $bus: Emitter
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
        $bus: Emitter
    }
}