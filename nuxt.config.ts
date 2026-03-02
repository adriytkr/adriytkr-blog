import {getLocaleFiles} from './shared/utils/locale';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/content',
  ],
  imports:{
    dirs:[
      '~/shared/types',
      '~/shared/utils',
      '~/shared/constants',
    ],
  },
  css:[
    '~/assets/styles/variables.css',
    '~/assets/styles/theme.css',
    '~/assets/styles/main.css',
  ],
  i18n:{
    defaultLocale:'en',
    locales:[
      {
        code:'en',
        name:'English',
        files:getLocaleFiles('en'),
      },
      {
        code:'pt',
        name:'Portuguese',
        files:getLocaleFiles('pt'),
      },
    ],
    vueI18n:'./i18n.config.ts',
  },
});