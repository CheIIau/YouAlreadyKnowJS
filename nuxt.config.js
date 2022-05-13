export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'You Already Know JS',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: 'YakJS' },
      { name: 'application-name', content: 'YakJS' },
      { name: 'msapplication-TileColor', content: '#3f444e' },
      { name: 'theme-color', content: '#3f444e' },
      {
        hid: 'description',
        name: 'description',
        content: 'Сайт для оценки уровня владения Javascript',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-ico', href: '/safari-pinned-tab.svg', color: '#fbbf24' },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/http',
    ['@nuxtjs/axios'],
    '@nuxtjs/toast',
    [
      'nuxt-highlightjs',
      {
        style: 'atom-one-dark',
      },
    ],
  ],

  toast: {
    position: 'bottom-center',
    duration: 3000,
    singleton: true,
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL,
  //   },
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.BASE_URL,
  //   },
  // },

  serverMiddleware: {
    '/api': '~/api',
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
        tailwindcss: {},
      },
    },
  },
};
