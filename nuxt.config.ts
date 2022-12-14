// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
          apiBase: 'https://lev-dostavka.ru/api'
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: 
                    '@import "@/assets/scss/variables.scss"; @import "@/assets/scss/base.scss";',
                },
            },
        },
    }
})
