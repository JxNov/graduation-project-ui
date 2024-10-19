import mitt from 'mitt';

const emitter = mitt();

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.provide('bus', emitter);
});
