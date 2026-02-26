import {createI18n} from 'vue-i18n';

import enCommon from './locales/en/common.json';
import ptCommon from './locales/pt/common.json';

const messages={
  en:{
    ...enCommon,
  },
  pt:{
    ...ptCommon,
  },
};

export const i18n=createI18n({
  locale:'pt',
  fallbackLocale:'en',
  messages,
});
