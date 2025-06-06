export default defineNuxtConfig({
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      titleTemplate: '%s - App',
      title: 'app',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''},
        {name: 'format-detection', content: 'telephone=no'}
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ]
    },
  },

  typescript: {
    strict: true
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuetify/styles'
  ],

  build: {
    transpile: ['vuetify']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n'
  ],

  vite: {
    esbuild: {
      drop: process.env.DEBUG ? [] : ['console', 'debugger'],
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true
        }
      }
    },
    ssr: {
      // with ssr enabled, this config is required to load vuetify properly
      noExternal: ['vuetify']
    },
    server: {
      port: 443,
      hmr: {
        protocol: 'wss',
        port: 24678
      }
    }
  },

  compatibilityDate: '2025-02-28'
})
