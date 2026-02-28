import type {LanguageCode} from '@/shared/types/language';

import {createI18n} from 'vue-i18n';

import enNav from './locales/en/nav.json';
import ptNav from './locales/pt/nav.json';

import enAbout from './locales/en/about.json';
import ptAbout from './locales/pt/about.json';

import enArticles from './locales/en/articles.json';
import ptArticles from './locales/pt/articles.json';

const messages:Record<LanguageCode,Record<string,any>>={
  en:{
    ...enNav,
    ...enAbout,
    ...enArticles,
  },
  pt:{
    ...ptNav,
    ...ptAbout,
    ...ptArticles,
  },
};

export const i18n=createI18n<{[key:string]:string},LanguageCode>({
  locale:'en',
  fallbackLocale:'en',
  messages,
});
