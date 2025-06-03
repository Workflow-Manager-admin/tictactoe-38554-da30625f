// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  // Allow Nuxt server to listen on all network interfaces
  server: {
    host: '0.0.0.0'
  },
  nitro: {
    // Global CORS for all routes
    routeRules: {
      '/**': {
        cors: true
      }
    }
  }
})
