// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // ssr: false,
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
            // og tags
            { property: 'og:title', content: 'ЛЕВ | Роллы в Лаишево' },
            { property: 'og:site_name', content: 'ЛЕВ | Роллы в Лаишево' },
            { property: 'og:url', content: 'https:/lev-dostavka.ru/' },
            { property: 'og:description', content: 'Доставка роллов в Лаишево' },
            { property: 'og:type', content: 'restaurant.menu' },
            { property: 'og:image', content: 'https://lev-dostavka.ru/img/og/og.jpg' },

            // favicon
            { name: 'msapplication-TileColor', content: '#f2bb2d' },
            { name: 'theme-color', content: '#f2bb2d' },
          ],
          link: [
            // favicon
            {
              rel: 'apple-touch-icon',
              sizes: '180x180',
              href: '/apple-touch-icon.png'
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '32x32',
              href: '/favicon-32x32.png'
            },
            {
              rel: 'icon',
              type: 'image/png',
              sizes: '16x16',
              href: '/favicon-16x16.png'
            },
            {
              rel: 'manifest',
              href: '/site.webmanifest'
            },
            {
              rel: 'mask-icon',
              href: '/safari-pinned-tab.svg',
              color: '#f2bb2d',
            },
          ],
          htmlAttrs: {
            // og tags
            prefix: 'og: http://ogp.me/ns#'
          },
          // script: [
          //   { src: "https://telegram.org/js/telegram-web-app.js" }
          // ],
        },
        
      }
})
