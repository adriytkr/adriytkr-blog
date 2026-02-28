import {LANGUAGES} from '@/shared/constants/languages';

export const isLanguageValid=(lang:string)=>
  LANGUAGES.some(l=>l.code===lang);
