// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  components: true,
  css: ['@/assets/scss/main.scss'],
  ssr: false,

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      "Space Grotesk": [400, 500, 600, 700],
    },
    display: 'swap', // recommandé pour de meilleures performances
  },

  runtimeConfig: {    
    public: {      
      supabaseUrl: process.env.SUPABASE_URL,      
      supabaseAnonKey: process.env.SUPABASE_KEY,    
    },  
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})