import type {LanguageCode} from '@/shared/types/language';

import {createI18n, type VueMessageType} from 'vue-i18n';

import enCommon from './locales/en/common.json';
import ptCommon from './locales/pt/common.json';

const messages:Record<LanguageCode,Record<string,any>>={
  en:{
    ...enCommon,
  },
  pt:{
    ...ptCommon,
  },
};

export const i18n=createI18n<{[key:string]:string},LanguageCode>({
  locale:'en',
  fallbackLocale:'en',
  messages,
});
