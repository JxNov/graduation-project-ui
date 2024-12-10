import i18nConfig from './config/i18n.config'

export default defineNuxtConfig({
  $production: {
    devtools: { enabled: false }
  },

  runtimeConfig: {
    public: {
      baseApi: process.env.NUXT_BASE_API_URL,
      apiUrl: process.env.NUXT_API_URL,

      schoolNetworkIPv4: process.env.NUXT_SCHOOL_NETWORK_IPV4,
      schoolNetworkSubnetMask: process.env.NUXT_SCHOOL_NETWORK_SUBNET_MASK,

      firebase: {
        apiKey: process.env.NUXT_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_FIREBASE_APP_ID,
        measurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID
      }
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    'nuxt-tiptap-editor',
    'nuxt-laravel-echo'
  ],

  echo: {
    broadcaster: 'pusher',
    key: process.env.NUXT_PUSHER_APP_KEY,
    cluster: process.env.NUXT_PUSHER_APP_CLUSTER,
    authentication: {
      baseUrl: `${process.env.NUXT_BASE_API_URL}`,
      authEndpoint: process.env.NUXT_PUSHER_AUTH_ENDPOINT,
      csrfEndpoint: process.env.NUXT_CSRF_ENDPOINT,
      csrfCookie: 'XSRF-TOKEN',
      csrfHeader: 'X-XSRF-TOKEN'
    }
  },

  piniaPluginPersistedstate: {
    key: 'persist:%id'
  },

  i18n: {
    strategy: 'no_prefix',
    ...i18nConfig
  },

  typescript: {
    typeCheck: true
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },

  tiptap: {
    prefix: 'Tiptap' //prefix for Tiptap imports, composables not included
  },

  vite: {
    optimizeDeps: {
      include: ['@intlify/core-base', 'pusher-js']
    }
  },

  devtools: { enabled: false },
  compatibilityDate: '2024-10-07'
})