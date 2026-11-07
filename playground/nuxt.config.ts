export default defineNuxtConfig({
  modules: ['../src/module'],
  // The key is public: set it here or with NUXT_PUBLIC_CMPKIT_API_KEY.
  cmpkit: { apiKey: '' },
  compatibilityDate: '2025-07-15',
})
