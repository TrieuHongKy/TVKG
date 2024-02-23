// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'TVKG',
      meta: [],
      htmlAttrs: {
        lang: 'vi'
      }
    }
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxt/ui',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    '@sidebase/nuxt-auth'
  ],
  runtimeConfig: {
    public: {
      GOOGLE_CLIENT_ID: '',
      GOOGLE_CLIENT_SECRET: '',
      FACEBOOK_CLIENT_ID: '',
      FACEBOOK_CLIENT_SECRET: '',
      API_PREFIX: '',
      API_ROOT: '',
      AUTH_ORIGIN: '',
      AUTH_SECRET: ''
    }
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN
  },
  colorMode: {
    classSuffix: ''
  },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true
  },
  googleFonts: {
    families: {
      'Be+Vietnam+Pro': true
    },
    display: 'swap'
  },
  imports: {
    dirs: ['~/stores']
  },
  ui: {
    icons: ['heroicons', 'logos']
  }
})
