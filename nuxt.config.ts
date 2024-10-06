export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_API_URL,
        }
    },

    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt'
    ],

    typescript: {
        typeCheck: true,
    },

    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },

    devtools: {enabled: true},
    compatibilityDate: '2024-10-07',
})