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
      schoolNetworkSubnetMask: process.env.NUXT_SCHOOL_NETWORK_SUBNET_MASK
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
    'nuxt-tiptap-editor'
  ],

  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax'
    },
    debug: true
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
      include: ['@intlify/core-base']
    }
  },

  devtools: { enabled: false },
  compatibilityDate: '2024-10-07'
})