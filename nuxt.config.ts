// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt'],
  imports:{
    dirs:[
      '~/shared/types',
      '~/shared/constants',
    ],
  },
  css:[
    '~/assets/styles/variables.css',
    '~/assets/styles/theme.css',
    '~/assets/styles/main.css',
  ],
  routeRules:{
    // '/articles':{appLayout:'article'},
  },
  i18n:{
    defaultLocale:'en',
    locales:[
      {code:'en',name:'English',file:'en.json'},
      {code:'pt',name:'Portuguese',file:'pt.json'},
    ],
  },
})