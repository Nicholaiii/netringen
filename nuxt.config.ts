// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-25',
  // Nuxt 4 directory structure and features
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  // Nuxt Modules
  // https://nuxt.com/modules
  modules: [
    'P@nuxthub/core',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
  ],
  css: ['@/assets/style/reset.scss', '@/assets/style/main.scss'],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'dk', name: 'Danish', file: 'dk.json' },
    ],
  },
  // Development
  devtools: { enabled: true },
  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    test: {
      includeSource: ['server/**/*.test.ts', 'features/**/*.test.ts'],
    },
  },
})
