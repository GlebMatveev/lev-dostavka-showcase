// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
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
    },
    app: {
        head: {
          title: 'ЛЕВ | Роллы в Лаишево',
          meta: [
            { property: 'og:title', content: 'ЛЕВ | Роллы в Лаишево' },
            { property: 'og:site_name', content: 'ЛЕВ | Роллы в Лаишево' },
            { property: 'og:url', content: 'https:/lev-dostavka.ru/' },
            { property: 'og:description', content: 'Доставка роллов в Лаишево' },
            { property: 'og:type', content: 'restaurant.menu' },
            { property: 'og:image', content: 'https://lev-dostavka.ru/img/og/og.jpg' },
          ],
          htmlAttrs: {
            prefix: 'og: http://ogp.me/ns#'
          },
          // script: [
          //   { src: "https://telegram.org/js/telegram-web-app.js" }
          // ],
        },
        
      }
})
